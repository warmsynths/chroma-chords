import { LitElement, html, css, svg } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { ProjectService, ProjectData } from './services/project-service';
import { GoogleDriveService } from './services/google-drive-service';
import { playChordFromInput, loadAudioTrack, playAudioTrack, stopAudioTrack, setAudioTrackVolume, unloadAudioTrack } from './services/audio-service';
import { estimateBPM } from './services/bpm-detector';
import './components/chord-profile-card.ts';
import './components/next-options-table.ts';
import './components/chord-timeline.ts';
import './components/onboarding-landing.ts';

interface NextChordOption {
  name: string;
  description: string;
  tension: string;
  vibe: 'tonic-major' | 'tonic-minor' | 'subdominant' | 'dominant' | 'modal-interchange';
  nodeId: string;
  targetChordId: string;
}

interface ChordDefinition {
  notes: string;
  hex_values: string;
  voicings_listed: string[];
}

interface ScaleDegree {
  chord_name: string;
  next_chord_options: NextChordOption[];
}

interface ScaleProfile {
  root: string;
  type: string;
  degrees: Record<string, ScaleDegree>;
}

interface NormalizedChordData {
  chords: Record<string, ChordDefinition>;
  scales: Record<string, ScaleProfile>;
}

interface ChordProfile {
  header: string;
  chord_name: string;
  chord_notes: string;
  hex_values: string;
  scale: string;
  function_text: string;
  voicings_listed: string[];
  next_chord_options: NextChordOption[];
}

type ChordStep = {
  name: string;
  tension: string;
  mood: string;
  notes?: string;
  core: string;
  modifier: string;
  windowStartMidi: number;
  targetChordId?: string;
  nodeId?: string;
} | null;

export type ProgressionSection = {
  id: string;
  name: string;
  steps: ChordStep[];
};

const NOTE_TO_MIDI: Record<string, number> = {
  'C': 60, 'C#': 61, 'Db': 61, 'Cx': 62, 'D': 62, 'D#': 63, 'Eb': 63, 'Dx': 64, 'E': 64, 'E#': 65, 'F': 65, 'F#': 66, 'Gb': 66, 'Fx': 67, 'G': 67, 'G#': 68, 'Ab': 68, 'Gx': 69, 'A': 69, 'A#': 70, 'Bb': 70, 'Ax': 71, 'B': 71, 'B#': 72
};

const SCALE_TYPES = [
  {
    id: 'MAJOR',
    emoji: '☀️',
    title: 'Sunlit Harbor',
    subtitle: 'Major / Ionian',
    desc: 'A clear, optimistic vibe of home and sanctuary. Excellent for open, joyous landscapes and peaceful resolution.',
    phase: 1
  },
  {
    id: 'MIXOLYDIAN',
    emoji: '🌊',
    title: 'The Warm Current',
    subtitle: 'Mixolydian Mode',
    desc: 'A sun-drenched, fluid breeze. Shifting away from standard major keys, Mixolydian introduces a mellow, flattened 7th degree, delivering classic neo-soul warmth and smooth electronic movement.',
    phase: 1
  },
  {
    id: 'DORIAN',
    emoji: '🌆',
    title: 'The Twilight Hour',
    subtitle: 'Dorian Mode',
    desc: 'A smooth, cinematic dusk. The Dorian Mode blends a minor foundation with a bright major twist, perfect for sophisticated, driving lofi tracks and jazzy, late-night cruising vibes.',
    phase: 2
  },
  {
    id: 'LYDIAN',
    emoji: '🌫️',
    title: 'The Floating Mist',
    subtitle: 'Lydian Mode',
    desc: 'An ethereal, weightless drift. With its raised 4th degree, Lydian creates a suspended, dreamlike atmosphere—like sailing through a glowing fog where the boundary between sea and sky dissolves.',
    phase: 2
  },
  {
    id: 'NATURAL MINOR',
    emoji: '🌌',
    title: 'Clear Night',
    subtitle: 'Natural Minor / Aeolian',
    desc: 'A midnight journey into shadow and solitude. Charts introspective, melancholic vibes, capturing deep emotional groundings and quiet nostalgia.',
    phase: 3
  },
  {
    id: 'HARMONIC MINOR',
    emoji: '⛈️',
    title: 'The Storm',
    subtitle: 'Harmonic Minor',
    desc: 'A dramatic crossing filled with gravitational friction. The Harmonic Minor Scale introduces exotic mystery and heightened tension, providing powerful resolution paths.',
    phase: 3
  }
];

const MAJOR_KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
const MINOR_KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

@customElement('chord-voyager-app')
export class ChordVoyagerApp extends LitElement {
  @state() private chordData: NormalizedChordData = { chords: {}, scales: {} };
  @state() private activeProfile: ChordProfile | null = null;
  @state() private sections: ProgressionSection[] = [];
  @state() private activeLocation: { sectionId: string, stepIndex: number } | null = null;

  @state() private isPlaying = false;
  @state() private isLooping = false;
  @state() timelineCollapsed = true;
  @state() private compactMode = false;
  @state() private lightMode = false;

  @state() projects: ProjectData[] = [];
  @state() currentProjectId: string | null = null;
  @state() currentProjectName: string = 'Untitled Project';
  @state() showProjectModal = false;
  @state() private showShareModal = false;
  @state() private showCloudPromptModal = false;

  @state() private isAuthenticated = false;
  @state() private authUserEmail = '';
  @state() private authError = '';
  @state() private isAudioUploading = false;

  @state() private activeOptionsTab: 'diatonic' | 'borrowed' = 'diatonic';
  @state() private humanState: any = null;

  private readonly AUTHORIZED_HASHES = [
    'cc801a4c62860be6a11bbae1c7ff2a4156e4332e0cc9ed03fcb41ffe20c712e2', // user_1
    '99c0bce064de4add7fc8e2433b627113e7d1ef63b97ad627b37194c9bace3dac'  // user_2
  ];

  @state()
  private previewVoicing: 'low' | 'middle' | 'high' = 'middle';

  private driveService = new GoogleDriveService();
  private tokenClient: any = null;
  @state()
  private isDriveSyncing = false;
  @state() private setupStep: 'scale' | 'tonic' = 'scale';
  @state() private selectedScaleType: 'MAJOR' | 'NATURAL MINOR' | 'HARMONIC MINOR' | 'MELODIC MINOR' | 'DORIAN' | 'MIXOLYDIAN' | 'LYDIAN' | null = null;
  @state() private showSeaMonster = false;
  @state() private seaMonsterSpawnSide: 'bottom' | 'left' | 'right' = 'bottom';

  private playTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private seaMonsterTimeoutId: ReturnType<typeof setTimeout> | null = null;
  @state() private showSun = false;
  private sunTimeoutId: ReturnType<typeof setTimeout> | null = null;
  @state() private showWind = false;
  private windTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private windEasterEggTriggered = false;

  static styles = css`
    * {
      box-sizing: border-box;
    }
    
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      color: var(--text-primary);
    }
    
    .glass-panel {
      background: var(--bg-card);
      border: none;
      border-radius: 16px;
      box-shadow: var(--neu-flat);
      transition: all 0.25s ease;
    }
    
    .glass-panel:hover {
      box-shadow: var(--neu-flat-sm);
    }
    
    .app-layout {
      max-width: 1400px;
      margin: 0 auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      min-height: 100vh;
      box-sizing: border-box;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    header.glass-panel {
      background-image: linear-gradient(var(--header-overlay), var(--header-overlay)), url('./header-bg.jpg');
      background-size: cover;
      background-position: center 30%;
      border: 1px solid var(--border-color);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }
    
    .branding {
      display: flex;
      flex-direction: column;
    }
    
    .brand-title {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--accent-terracotta);
      font-family: var(--font-heading);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    .brand-sub {
      font-size: 0.75rem;
      color: var(--text-secondary);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    
    .header-controls {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }
    
    .auth-info {
      font-size: 0.7rem;
      color: var(--text-muted);
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-family: var(--font-mono);
      line-height: 1.2;
    }
    
    .email-text {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .toggle-group {
      display: flex;
      gap: 8px;
    }
    
    .scenario-picker {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .select-scenario {
      background: var(--bg-card);
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 0.85rem;
      cursor: pointer;
      outline: none;
      box-shadow: var(--neu-pressed-sm);
      transition: all 0.2s ease;
    }
    
    .select-scenario:focus {
      color: var(--accent-gold);
    }
    
    .btn-compact-toggle {
      background: var(--bg-card);
      border: none;
      border-radius: 6px;
      color: var(--text-secondary);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: var(--neu-flat-sm);
    }
    
    .btn-compact-toggle:hover {
      color: var(--text-primary);
      box-shadow: var(--neu-pressed-sm);
    }
    
    .btn-compact-toggle.active {
      color: var(--accent-terracotta);
      box-shadow: var(--neu-pressed-sm);
    }

    header.glass-panel .btn-compact-toggle {
      background: var(--header-btn-bg);
      border: 1px solid var(--header-btn-border);
      color: var(--text-secondary);
      box-shadow: var(--header-btn-shadow);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }
    
    header.glass-panel .btn-compact-toggle:hover {
      background: var(--header-btn-bg-hover);
      border-color: var(--header-btn-border-hover);
      color: var(--text-primary);
      box-shadow: var(--header-btn-shadow);
    }
    
    header.glass-panel .btn-compact-toggle.active {
      background: var(--accent-terracotta);
      border-color: var(--accent-terracotta);
      color: #ffffff;
      box-shadow: none;
    }
    
    /* Workspace container to hold overlay timeline */
    .workspace-container {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
 
    /* Workspace split layout */
    .workspace-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 0;
      transition: margin-top 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    
    @media (max-width: 900px) {
      .workspace-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .auth-container {
      display: flex;
      align-items: center;
    }
    
    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--accent-terracotta);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--bg-primary);
      margin-left: 10px;
      flex-shrink: 0;
      box-shadow: var(--neu-flat-sm);
    }

    @media (max-width: 600px) {
      .app-layout {
        padding: 16px 12px;
        gap: 16px;
      }
      
      header {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
        padding: 16px !important;
      }
      
      .branding {
        align-items: center;
        text-align: center;
      }
      
      .header-controls {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 12px 16px;
        width: 100%;
      }
      
      .auth-container {
        flex-direction: row-reverse;
        gap: 8px;
      }
      
      .user-avatar {
        margin-left: 0;
      }
      
      .auth-info {
        align-items: flex-start;
      }
      
      .email-text {
        max-width: 140px;
      }
      
      .scenario-picker {
        flex-direction: column;
        align-items: stretch;
      }
      
      .select-scenario {
        width: 100%;
      }
      
      .brand-title {
        font-size: 1.3rem;
      }
      
      .brand-sub {
        font-size: 0.65rem;
      }
      
      .is-compact .options-tabs {
        padding: 6px 12px 0;
        justify-content: center;
        gap: 32px;
      }
      
      .is-compact .tab-btn {
        padding: 6px 16px 8px;
        font-size: 1.5rem;
      }
    }
    
    .is-compact .compact-header-tabs {
      display: block;
    }
    
    .is-compact .desktop-pane-tabs {
      display: none;
    }
    
    /* Left column panel (Active Chord) */
    .chord-pane {
    }
    
    /* Right column panel (Transitions options) */
    .options-pane {
      display: flex;
      flex-direction: column;
    }
    
    .options-tabs {
      display: flex;
      gap: 12px;
      padding: 16px 20px 0;
      border-bottom: 1px solid var(--border-color);
    }
    
    .header-tabs {
      padding: 0;
      border-bottom: none;
      gap: 16px;
    }
    
    .header-tabs .tab-btn {
      padding: 6px 12px;
      font-size: 1.4rem;
    }
    
    .compact-header-tabs {
      display: none;
    }
    
    .tab-btn {
      padding: 8px 16px 12px;
      font-size: 0.8rem;
      font-weight: 700;
      font-family: var(--font-heading);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .tab-btn:hover {
      color: var(--text-secondary);
    }
    
    .tab-btn.active {
      color: var(--accent-gold);
      border-bottom: 2px solid var(--accent-gold);
    }
    
    .tab-explanation {
      padding: 12px 20px;
      border-bottom: 1px solid var(--border-color);
      font-size: 0.8rem;
      line-height: 1.5;
      color: var(--text-secondary);
    }
    
    next-options-table {
      flex: 1;
      min-height: 0;
    }
    
    /* Timeline panel positioning at the top of workspace overlaying content */
    .timeline-pane {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--bg-card) !important; /* Opaque background to prevent text bleed-through when overlaying */
      border: none;
      border-radius: 12px;
      box-shadow: var(--neu-flat);
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    
    .setup-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
      gap: 24px;
      width: 100%;
      max-width: 900px;
      margin: 20px auto;
      text-align: center;
    }
    
    .setup-title {
      font-size: 2.2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    
    .setup-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 650px;
    }
    
    /* Scale Choice Grid */
    /* Scale Choice Grid */
    .scale-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      width: 100%;
      margin: 15px 0;
      justify-content: center;
    }

    .phases-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 20px;
    }
    
    .phase-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .phase-header {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-secondary);
      opacity: 0.6;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      padding-bottom: 6px;
      margin-bottom: 4px;
    }

    .light-theme .phase-header {
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }
    
    .scale-card {
      background: var(--bg-card);
      border: none;
      border-radius: 12px;
      padding: 24px;
      cursor: pointer;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: var(--neu-flat);
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      width: calc(50% - 10px);
      box-sizing: border-box;
    }
    
    .scale-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--neu-flat-sm);
    }

    @media (max-width: 700px) {
      .scale-card {
        width: 100%;
      }
    }
    
    .scale-card-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .scale-emoji {
      font-size: 2rem;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-card);
      border-radius: 8px;
      box-shadow: var(--neu-pressed-sm);
    }
    
    .scale-header-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .scale-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      font-family: var(--font-heading);
    }
    
    .scale-subtitle {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-secondary);
      opacity: 0.7;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    
    .scale-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
    
    /* Tonic Key selection view */
    .key-selector-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      margin: 15px 0;
    }
    
    .key-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 12px;
      width: 100%;
    }
    
    .btn-key {
      padding: 18px 12px;
      background: var(--bg-card);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--text-primary);
      font-family: var(--font-heading);
      transition: all 0.2s ease;
      box-shadow: var(--neu-flat-sm);
    }
    
    .btn-key:hover {
      color: var(--accent-terracotta);
      box-shadow: var(--neu-pressed-sm);
    }
    
    .btn-back {
      padding: 8px 16px;
      background: var(--bg-card);
      border: none;
      border-radius: 6px;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 600;
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      box-shadow: var(--neu-flat-sm);
    }
    
    .btn-back:hover {
      color: var(--accent-gold);
      box-shadow: var(--neu-pressed-sm);
    }

    .share-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin: 10px 0;
    }
    
    @media (min-width: 600px) {
      .share-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .device-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 24px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
      box-shadow: var(--neu-flat-sm);
    }
    
    .device-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent-gold);
      background: rgba(255,255,255,0.04);
    }
    
    .device-card.selected {
      border-color: var(--accent-terracotta);
      background: rgba(255,255,255,0.05);
      box-shadow: 0 0 10px rgba(194, 82, 51, 0.2), var(--neu-flat-sm);
    }

    .studio-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px 0 8px 0;
      margin-top: auto;
      font-size: 0.8rem;
      font-family: var(--font-body);
      color: var(--text-muted);
      opacity: 0.6;
      gap: 16px;
      flex-wrap: wrap;
      text-align: center;
      width: 100%;
    }

    .studio-footer .footer-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .studio-footer a {
      color: inherit;
      text-decoration: none;
      transition: color 0.25s ease, opacity 0.25s ease;
      font-weight: 500;
      opacity: 0.85;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .studio-footer a:hover {
      color: var(--accent-terracotta);
      opacity: 1;
    }

    .studio-footer a:active {
      color: var(--accent-terracotta);
      opacity: 1;
    }

    .footer-divider {
      opacity: 0.5;
    }

    @media (max-width: 768px) {
      .studio-footer {
        flex-direction: column;
        gap: 8px;
        padding: 16px 0 8px 0;
      }
      .studio-footer .footer-content {
        flex-direction: column;
        gap: 8px;
      }
      .footer-divider {
        display: none;
      }
    }

    @keyframes sea-monster-bottom {
      0% { transform: translateY(100%); }
      20% { transform: translateY(25%); }
      80% { transform: translateY(25%); }
      100% { transform: translateY(100%); }
    }

    @keyframes sea-monster-left {
      0% { transform: translateX(-100%) rotate(90deg) scaleX(-1); }
      20% { transform: translateX(-25%) rotate(90deg) scaleX(-1); }
      80% { transform: translateX(-25%) rotate(90deg) scaleX(-1); }
      100% { transform: translateX(-100%) rotate(90deg) scaleX(-1); }
    }

    @keyframes sea-monster-right {
      0% { transform: translateX(100%) rotate(-90deg); }
      20% { transform: translateX(25%) rotate(-90deg); }
      80% { transform: translateX(25%) rotate(-90deg); }
      100% { transform: translateX(100%) rotate(-90deg); }
    }

    .sea-monster-easter-egg {
      position: fixed;
      width: 160px;
      height: auto;
      z-index: 10000;
      pointer-events: none;
    }

    .sea-monster-easter-egg.bottom {
      bottom: -10px;
      right: 15%;
      animation: sea-monster-bottom 5s ease-in-out forwards;
      transform: translateY(100%);
    }

    .sea-monster-easter-egg.left {
      bottom: 20%;
      left: -10px;
      animation: sea-monster-left 5s ease-in-out forwards;
      transform: translateX(-100%) scaleX(-1);
    }

    .sea-monster-easter-egg.right {
      bottom: 20%;
      right: -10px;
      animation: sea-monster-right 5s ease-in-out forwards;
      transform: translateX(100%) rotate(-90deg);
    }

    @keyframes sun-drop {
      0% { transform: translateY(-100%); }
      33% { transform: translateY(0); }
      66% { transform: translateY(0); }
      100% { transform: translateY(-100%); }
    }

    .sun-easter-egg {
      position: fixed;
      top: 0;
      left: 50%;
      margin-left: -150px;
      width: 300px;
      height: auto;
      z-index: 9999;
      pointer-events: none;
      animation: sun-drop 3s ease-in-out forwards;
      transform: translateY(-100%);
    }

    @keyframes wind-blow {
      0% {
        transform: translate(-100%, -50%);
        opacity: 0;
      }
      15% {
        transform: translate(20px, -50%);
        opacity: 1;
      }
      85% {
        transform: translate(20px, -50%);
        opacity: 1;
      }
      100% {
        transform: translate(-100%, -50%);
        opacity: 0;
      }
    }

    .wind-easter-egg {
      position: fixed;
      top: 50%;
      left: 0;
      width: 250px;
      height: auto;
      z-index: 10001;
      pointer-events: none;
      animation: wind-blow 4.5s ease-in-out forwards;
      transform: translate(-100%, -50%);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.projects = ProjectService.getProjects();
  }

  async firstUpdated() {
    const savedCompact = localStorage.getItem('chord-voyager-compact-mode');
    if (savedCompact) {
      this.compactMode = savedCompact === 'true';
    }

    const savedLightMode = localStorage.getItem('chord-voyager-light-mode');
    if (savedLightMode === 'true') {
      this.lightMode = true;
      document.documentElement.classList.add('light-theme');
    }

    try {
      console.log('Fetching chord_voyager_data.json...');
      const res = await fetch('./chord_voyager_data.json');
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      this.chordData = await res.json();

      // Dynamically inject Dorian and Mixolydian modes
      if (this.chordData && this.chordData.scales) {
        const MIXOLYDIAN_PARENT_ROOTS: Record<string, string> = {
          'C': 'F', 'Db': 'F#', 'D': 'G', 'Eb': 'Ab', 'E': 'A', 'F': 'Bb',
          'F#': 'B', 'G': 'C', 'Ab': 'Db', 'A': 'D', 'Bb': 'Eb', 'B': 'E'
        };

        const DORIAN_PARENT_ROOTS: Record<string, string> = {
          'C': 'Bb', 'C#': 'B', 'D': 'C', 'D#': 'Db', 'E': 'D', 'F': 'Eb',
          'F#': 'E', 'G': 'F', 'G#': 'F#', 'A': 'G', 'A#': 'Ab', 'B': 'A'
        };

        const LYDIAN_PARENT_ROOTS: Record<string, string> = {
          'C': 'G', 'Db': 'Ab', 'D': 'A', 'Eb': 'Bb', 'E': 'B', 'F': 'C',
          'F#': 'Db', 'G': 'D', 'Ab': 'Eb', 'A': 'E', 'Bb': 'F', 'B': 'F#'
        };

        const parentToModeDegree: Record<string, string> = {
          // Dorian
          'DORIAN_SUPERTONIC': 'TONIC',
          'DORIAN_MEDIANT': 'SUPERTONIC',
          'DORIAN_SUBDOMINANT': 'MEDIANT',
          'DORIAN_DOMINANT': 'SUBDOMINANT',
          'DORIAN_SUBMEDIANT': 'DOMINANT',
          'DORIAN_LEADING-TONE': 'SUBMEDIANT',
          'DORIAN_TONIC': 'SUBTONIC',
          // Mixolydian
          'MIXOLYDIAN_DOMINANT': 'TONIC',
          'MIXOLYDIAN_SUBMEDIANT': 'SUPERTONIC',
          'MIXOLYDIAN_LEADING-TONE': 'MEDIANT',
          'MIXOLYDIAN_TONIC': 'SUBDOMINANT',
          'MIXOLYDIAN_SUPERTONIC': 'DOMINANT',
          'MIXOLYDIAN_MEDIANT': 'SUBMEDIANT',
          'MIXOLYDIAN_SUBDOMINANT': 'SUBTONIC',
          // Lydian
          'LYDIAN_SUBDOMINANT': 'TONIC',
          'LYDIAN_DOMINANT': 'SUPERTONIC',
          'LYDIAN_SUBMEDIANT': 'MEDIANT',
          'LYDIAN_LEADING-TONE': 'SUBDOMINANT',
          'LYDIAN_TONIC': 'DOMINANT',
          'LYDIAN_SUPERTONIC': 'SUBMEDIANT',
          'LYDIAN_MEDIANT': 'LEADING-TONE'
        };

        const modeToParentDegree: Record<string, string> = {
          // Dorian
          'DORIAN_TONIC': 'SUPERTONIC',
          'DORIAN_SUPERTONIC': 'MEDIANT',
          'DORIAN_MEDIANT': 'SUBDOMINANT',
          'DORIAN_SUBDOMINANT': 'DOMINANT',
          'DORIAN_DOMINANT': 'SUBMEDIANT',
          'DORIAN_SUBMEDIANT': 'LEADING-TONE',
          'DORIAN_SUBTONIC': 'TONIC',
          // Mixolydian
          'MIXOLYDIAN_TONIC': 'DOMINANT',
          'MIXOLYDIAN_SUPERTONIC': 'SUBMEDIANT',
          'MIXOLYDIAN_MEDIANT': 'LEADING-TONE',
          'MIXOLYDIAN_SUBDOMINANT': 'TONIC',
          'MIXOLYDIAN_DOMINANT': 'SUPERTONIC',
          'MIXOLYDIAN_SUBMEDIANT': 'MEDIANT',
          'MIXOLYDIAN_SUBTONIC': 'SUBDOMINANT',
          // Lydian
          'LYDIAN_TONIC': 'SUBDOMINANT',
          'LYDIAN_SUPERTONIC': 'DOMINANT',
          'LYDIAN_MEDIANT': 'SUBMEDIANT',
          'LYDIAN_SUBDOMINANT': 'LEADING-TONE',
          'LYDIAN_DOMINANT': 'TONIC',
          'LYDIAN_SUBMEDIANT': 'SUPERTONIC',
          'LYDIAN_LEADING-TONE': 'MEDIANT'
        };

        // Inject Mixolydian Mode
        for (const [modeRoot, parentRoot] of Object.entries(MIXOLYDIAN_PARENT_ROOTS)) {
          const parentScaleKey = `${parentRoot}_MAJOR`;
          const parentScale = this.chordData.scales[parentScaleKey];
          if (!parentScale) continue;

          const scaleKey = `${modeRoot}_MIXOLYDIAN`;
          const degreesObj: any = {};

          for (const modeDegree of ['TONIC', 'SUPERTONIC', 'MEDIANT', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT', 'SUBTONIC']) {
            const parentDegree = modeToParentDegree[`MIXOLYDIAN_${modeDegree}`];
            const parentDegProfile = parentScale.degrees[parentDegree];
            if (!parentDegProfile) continue;

            const degProfile = JSON.parse(JSON.stringify(parentDegProfile));
            degProfile.next_chord_options = (degProfile.next_chord_options || []).map((opt: any) => {
              if (opt.nodeId.startsWith(`${parentRoot}_MAJOR_`)) {
                const parentDeg = opt.nodeId.replace(`${parentRoot}_MAJOR_`, '');
                const modeDeg = parentToModeDegree[`MIXOLYDIAN_${parentDeg}`];
                if (modeDeg) {
                  return {
                    name: opt.name,
                    nodeId: `${modeRoot}_MIXOLYDIAN_${modeDeg}`
                  };
                }
              }
              return opt;
            });

            degreesObj[modeDegree] = degProfile;
          }

          this.chordData.scales[scaleKey] = {
            root: modeRoot,
            type: 'MIXOLYDIAN',
            degrees: degreesObj
          };
        }

        // Inject Dorian Mode
        for (const [modeRoot, parentRoot] of Object.entries(DORIAN_PARENT_ROOTS)) {
          const parentScaleKey = `${parentRoot}_MAJOR`;
          const parentScale = this.chordData.scales[parentScaleKey];
          if (!parentScale) continue;

          const scaleKey = `${modeRoot}_DORIAN`;
          const degreesObj: any = {};

          for (const modeDegree of ['TONIC', 'SUPERTONIC', 'MEDIANT', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT', 'SUBTONIC']) {
            const parentDegree = modeToParentDegree[`DORIAN_${modeDegree}`];
            const parentDegProfile = parentScale.degrees[parentDegree];
            if (!parentDegProfile) continue;

            const degProfile = JSON.parse(JSON.stringify(parentDegProfile));
            degProfile.next_chord_options = (degProfile.next_chord_options || []).map((opt: any) => {
              if (opt.nodeId.startsWith(`${parentRoot}_MAJOR_`)) {
                const parentDeg = opt.nodeId.replace(`${parentRoot}_MAJOR_`, '');
                const modeDeg = parentToModeDegree[`DORIAN_${parentDeg}`];
                if (modeDeg) {
                  return {
                    name: opt.name,
                    nodeId: `${modeRoot}_DORIAN_${modeDeg}`
                  };
                }
              }
              return opt;
            });

            degreesObj[modeDegree] = degProfile;
          }

          this.chordData.scales[scaleKey] = {
            root: modeRoot,
            type: 'DORIAN',
            degrees: degreesObj
          };
        }

        // Inject Lydian Mode
        for (const [modeRoot, parentRoot] of Object.entries(LYDIAN_PARENT_ROOTS)) {
          const parentScaleKey = `${parentRoot}_MAJOR`;
          const parentScale = this.chordData.scales[parentScaleKey];
          if (!parentScale) continue;

          const scaleKey = `${modeRoot}_LYDIAN`;
          const degreesObj: any = {};

          for (const modeDegree of ['TONIC', 'SUPERTONIC', 'MEDIANT', 'SUBDOMINANT', 'DOMINANT', 'SUBMEDIANT', 'LEADING-TONE']) {
            const parentDegree = modeToParentDegree[`LYDIAN_${modeDegree}`];
            const parentDegProfile = parentScale.degrees[parentDegree];
            if (!parentDegProfile) continue;

            const degProfile = JSON.parse(JSON.stringify(parentDegProfile));
            degProfile.next_chord_options = (degProfile.next_chord_options || []).map((opt: any) => {
              if (opt.nodeId.startsWith(`${parentRoot}_MAJOR_`)) {
                const parentDeg = opt.nodeId.replace(`${parentRoot}_MAJOR_`, '');
                const modeDeg = parentToModeDegree[`LYDIAN_${parentDeg}`];
                if (modeDeg) {
                  return {
                    name: opt.name,
                    nodeId: `${modeRoot}_LYDIAN_${modeDeg}`
                  };
                }
              }
              return opt;
            });

            degreesObj[modeDegree] = degProfile;
          }

          this.chordData.scales[scaleKey] = {
            root: modeRoot,
            type: 'LYDIAN',
            degrees: degreesObj
          };
        }
      }

      const scaleCount = this.chordData.scales ? Object.keys(this.chordData.scales).length : 0;
      const chordCount = this.chordData.chords ? Object.keys(this.chordData.chords).length : 0;
      console.log(`Loaded ${scaleCount} scales and ${chordCount} unique chords.`);
    } catch (err) {
      console.error('Failed to load chord voyager data:', err);
    }

    // Check local storage for existing session
    const savedToken = localStorage.getItem('chord_voyager_auth_token');
    const savedEmail = localStorage.getItem('chord_voyager_auth_email');
    const savedAuth = localStorage.getItem('chord-voyager-auth');
    if (window.location.search.includes('bypass=true')) {
      this.isAuthenticated = true;
      this.authUserEmail = 'developer@local.test';
    } else if (savedAuth) {
      const hash = await this.hashEmail(savedAuth);
      if (this.AUTHORIZED_HASHES.includes(hash)) {
        this.isAuthenticated = true;
        this.authUserEmail = savedAuth;
      } else {
        this.initGoogleAuth();
      }
    } else {
      this.initGoogleAuth();
    }
  }

  private initGoogleAuth() {
    // Wait for the external Google script to load
    const checkGoogle = setInterval(() => {
      if ((window as any).google) {
        clearInterval(checkGoogle);

        // Unified OAuth2 client for both Identity and Drive API
        this.tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: '184710057667-s8j8uvuthct60tpppbhp7iiphp0s8qpq.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email',
          callback: async (tokenResponse: any) => {
            if (tokenResponse && tokenResponse.access_token) {
              try {
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                if (!userInfoRes.ok) throw new Error('Failed to fetch user info');
                const userInfo = await userInfoRes.json();

                if (userInfo && userInfo.email) {
                  const hash = await this.hashEmail(userInfo.email);
                  if (this.AUTHORIZED_HASHES.includes(hash)) {
                    this.isAuthenticated = true;
                    this.authUserEmail = userInfo.email;
                    this.authError = '';
                    localStorage.setItem('chord-voyager-auth', userInfo.email);

                    this.driveService.setAccessToken(tokenResponse.access_token);
                    await this.syncProjectsFromCloud();
                    await this.syncProjectsToCloud();
                    return;
                  }
                }
                // If not authorized:
                this.isAuthenticated = false;
                this.authUserEmail = '';
                this.authError = 'Access Denied: Email not authorized.';
              } catch (e) {
                this.authError = 'Login failed. Please try again.';
                console.error(e);
              }
            }
          }
        });
      }
    }, 200);
  }

  private requestDriveAccess() {
    if (this.tokenClient) {
      this.tokenClient.requestAccessToken();
    }
  }



  private async syncProjectsFromCloud() {
    if (this.isDriveSyncing || !this.driveService.hasAccessToken()) return;
    this.isDriveSyncing = true;
    try {
      const cloudProjects = await this.driveService.loadProjects();
      if (cloudProjects) {
        // Cloud projects are inherently synced to cloud
        cloudProjects.forEach(p => p.syncedToCloud = true);
        const localProjects = ProjectService.getProjects();
        const merged = ProjectService.mergeProjects(localProjects, cloudProjects);
        ProjectService.setProjects(merged);
        this.projects = merged;
      }
    } catch (e) {
      console.error('Failed to sync from cloud', e);
    } finally {
      this.isDriveSyncing = false;
    }
  }

  private async syncProjectsToCloud() {
    if (!this.isAuthenticated) return;
    if (this.isDriveSyncing) return;

    if (!this.driveService.hasAccessToken()) {
      // Trigger OAuth popup; the callback will handle the actual sync later via syncProjectsFromCloud,
      // but let's also sync to cloud after that. Actually, the callback in initTokenClient currently
      // just calls syncProjectsFromCloud. Let's make it so that once authorized, it handles both.
      this.requestDriveAccess();
      return;
    }

    this.isDriveSyncing = true;
    try {
      const projects = ProjectService.getProjects();
      await this.driveService.saveProjects(projects);

      // Mark all as synced
      projects.forEach(p => p.syncedToCloud = true);
      ProjectService.setProjects(projects);
      this.projects = projects;
    } catch (e) {
      console.error('Failed to sync to cloud', e);
      if (e instanceof Error && e.message.includes('Unauthorized')) {
        this.requestDriveAccess(); // Token might have expired
      }
    } finally {
      this.isDriveSyncing = false;
    }
  }



  private async hashEmail(email: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(email);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private handleLogout() {
    this.isAuthenticated = false;
    this.authUserEmail = '';
    localStorage.removeItem('chord-voyager-auth');
    this.initGoogleAuth();
  }

  private playChordNotes(notesInput: string | number[]) {
    playChordFromInput(notesInput, NOTE_TO_MIDI, this.humanState);
  }

  private normalizeChordName(name: string): string {
    const upper = name.toUpperCase();
    const match = upper.match(/^([A-G](?:#|B|X)?)(.*)$/);
    if (!match) return upper;

    const root = match[1];
    const rest = match[2];

    let quality = 'MAJ'; // default
    if (!rest || rest === '7') {
      quality = 'MAJ';
    } else if (rest.startsWith('MAJ') || rest === 'M7') {
      quality = 'MAJ';
    } else if (rest.startsWith('MIN')) {
      quality = 'MIN';
    } else if (rest.startsWith('DIM')) {
      quality = 'DIM';
    } else if (rest.startsWith('AUG')) {
      quality = 'AUG';
    } else if (rest.startsWith('XDIM')) {
      quality = 'XDIM';
    }

    return root + quality;
  }

  private resolveProfile(targetId: string): ChordProfile | null {
    if (!this.chordData || !this.chordData.scales) return null;

    const parts = targetId.split('_');
    if (parts.length < 3) return null;

    const root = parts[0];
    const degree = parts[parts.length - 1];
    const scaleType = parts.slice(1, parts.length - 1).join(' '); // e.g. "NATURAL MINOR"

    const scaleKey = `${root}_${parts.slice(1, parts.length - 1).join('_')}`;
    const scaleProfile = this.chordData.scales[scaleKey];
    if (!scaleProfile) return null;

    const degreeProfile = scaleProfile.degrees[degree];
    if (!degreeProfile) return null;

    const chordDef = this.chordData.chords[degreeProfile.chord_name];
    if (!chordDef) return null;

    const scaleName = `${scaleProfile.root} ${scaleProfile.type} SCALE`;
    const functionText = this.generateActiveChordDescription(degreeProfile.chord_name, degree, scaleName);
    const history = this.getCurrentProgressionHistory();

    const enrichedOptions = (degreeProfile.next_chord_options || []).map(opt => {
      const isBorrowed = false;
      const targetNodeId = opt.nodeId;
      const vibe = this.getVibeKeyForOption(targetNodeId, isBorrowed);
      const dynamicTensionVal = this.calculateDynamicTension(opt.name, history);
      const dynamicDesc = this.generateDynamicDescription(degreeProfile.chord_name, opt.name, vibe, targetNodeId.split('_').pop() || '');

      return {
        name: opt.name,
        nodeId: targetNodeId,
        targetChordId: targetNodeId,
        tension: `${dynamicTensionVal}%`,
        vibe: vibe as any,
        description: dynamicDesc
      };
    });

    return {
      header: degree,
      chord_name: degreeProfile.chord_name,
      chord_notes: chordDef.notes,
      hex_values: chordDef.hex_values,
      scale: scaleName,
      function_text: functionText,
      voicings_listed: chordDef.voicings_listed,
      next_chord_options: enrichedOptions
    };
  }

  private calculateDynamicTension(activeChord: string, activeProgressionHistory: string[]): number {
    if (!this.activeProfile) return 50;

    const scaleRoot = this.activeProfile.scale.split(' ')[0] || 'C';
    const chordRoot = activeChord.match(/^[A-G][#b]?/)?.[0] || 'C';

    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const scaleRootIdx = notes.indexOf(scaleRoot.replace('Db', 'C#').replace('Eb', 'D#').replace('Gb', 'F#').replace('Ab', 'G#').replace('Bb', 'A#'));
    const chordRootIdx = notes.indexOf(chordRoot.replace('Db', 'C#').replace('Eb', 'D#').replace('Gb', 'F#').replace('Ab', 'G#').replace('Bb', 'A#'));

    if (scaleRootIdx === -1 || chordRootIdx === -1) return 50;

    const interval = (chordRootIdx - scaleRootIdx + 12) % 12;

    switch (interval) {
      case 0:
        return 10;
      case 7:
        return 80;
      case 5:
        return 45;
      case 2:
        return 40;
      case 9:
        return 30;
      case 4:
        return 20;
      case 11:
        return 90;
      case 1:
      case 8:
      case 3:
      case 10:
      case 6:
        return 95;
      default:
        return 50;
    }
  }

  private generateActiveChordDescription(chordName: string, degree: string, scale: string): string {
    const isMajor = scale.toUpperCase().includes('MAJOR');
    const cleanDegree = degree.toUpperCase();

    if (cleanDegree === 'TONIC') {
      if (isMajor) {
        return `The ${chordName} chord is the stable Tonic of the key, serving as the home foundation. It provides a complete sense of resolution, clarity, and peace.`;
      } else {
        return `The ${chordName} chord is the minor Tonic of the key, creating a reflective, introspective home. It feels deeply grounded yet carries a shaded, thoughtful mood.`;
      }
    }
    if (cleanDegree === 'DOMINANT' || cleanDegree === 'LEADING-TONE') {
      return `Operating as a dominant force, ${chordName} creates significant tension and gravity. It establishes a strong harmonic pull that naturally directs the ear back to the tonic home.`;
    }
    if (cleanDegree === 'SUBDOMINANT' || cleanDegree === 'SUPERTONIC') {
      return `Functioning as a subdominant, ${chordName} introduces a pleasant sense of departure and lift. It expands the musical horizon and sets up the transition toward dominant tension.`;
    }
    if (cleanDegree === 'MEDIANT' || cleanDegree === 'SUBMEDIANT') {
      return `As a tonic substitute, ${chordName} offers a soft, introspective variation of the key's center. It blends feelings of stability with subtle emotional color.`;
    }
    return `The ${chordName} chord functions within the ${scale}, contributing unique color and voice leading to the overall progression.`;
  }

  private generateDynamicDescription(
    currentChord: string,
    targetChord: string,
    vibe: string,
    targetDegree: string,
    borrowedScale?: string
  ): string {
    const templates: Record<string, string[]> = {
      'MAJOR': [
        `Transitioning to ${targetChord} brings a profound sense of resolution and stability. It feels like returning to the sunlit harbor, anchoring the progression.`,
        `Moving to the bright tonic ${targetChord} establishes a clear point of rest and clarity, offering a warm and welcoming release.`
      ],
      'MIXOLYDIAN': [
        `Transitioning to ${targetChord} brings a sun-drenched, fluid breeze. It introduces a mellow warmth and smooth movement.`,
        `Moving to ${targetChord} carries the warm current of Mixolydian, delivering classic neo-soul warmth and smooth movement.`
      ],
      'DORIAN': [
        `Shifting to ${targetChord} evokes the smooth, cinematic dusk of Dorian. It blends a minor foundation with a bright, sophisticated twist.`,
        `The Dorian character of ${targetChord} grounds the harmony in a twilight mood, perfect for driving lofi vibes.`
      ],
      'LYDIAN': [
        `Stepping into ${targetChord} feels like an ethereal, weightless drift. Lydian's raised fourth degree creates a suspended, dreamlike atmosphere.`,
        `Moving to ${targetChord} carries you into a floating mist, where the boundaries of the key dissolve in a suspended glow.`
      ],
      'NATURAL MINOR': [
        `Shifting to ${targetChord} introduces the quiet, introspective calm of a clear night. It feels like retreating into a peaceful, shadowed space of solitude.`,
        `The minor chord ${targetChord} grounds the harmony in a reflective, gentle mood, inviting deep emotional grounding.`
      ],
      'HARMONIC MINOR': [
        `Progressing to ${targetChord} introduces the dramatic friction of a storm. It injects heightened tension and exotic mystery.`,
        `The harmonic minor force of ${targetChord} creates a powerful sense of friction and gravity, actively demanding resolution.`
      ],
      'MELODIC MINOR': [
        `Transitioning to ${targetChord} introduces a mysterious, fluid motion. Melodic minor offers a sophisticated path between light and shadow.`,
        `Moving to ${targetChord} adds a touch of melodic mystery, shifting gracefully between major-like brightness and minor introspection.`
      ]
    };

    const categoryTemplates = templates[vibe.toUpperCase()] || templates['MAJOR'];
    const hash = (currentChord.charCodeAt(0) + targetChord.charCodeAt(0)) % categoryTemplates.length;
    return categoryTemplates[hash];
  }

  private getVibeKeyForOption(targetId: string, isBorrowed: boolean): string {
    const parts = targetId.split('_');
    const degree = parts[parts.length - 1];

    if (isBorrowed) {
      if (parts.length > 2) {
        const scaleType = parts.slice(1, parts.length - 1).join(' ').toUpperCase();
        return scaleType || 'MAJOR';
      }
      return 'MAJOR';
    }

    const activeScaleType = this.selectedScaleType || 'MAJOR';

    if (degree === 'DOMINANT' || degree === 'LEADING-TONE') {
      return 'HARMONIC MINOR';
    }

    if (degree === 'TONIC' || degree === 'MEDIANT' || degree === 'SUBMEDIANT') {
      const isMajorLeaning = ['MAJOR', 'MIXOLYDIAN', 'LYDIAN'].includes(activeScaleType);
      return isMajorLeaning ? 'MAJOR' : 'NATURAL MINOR';
    }

    if (activeScaleType === 'LYDIAN') {
      return 'LYDIAN';
    }
    if (['MAJOR', 'MIXOLYDIAN'].includes(activeScaleType)) {
      return 'MIXOLYDIAN';
    }
    return 'DORIAN';
  }

  private getCurrentProgressionHistory(): string[] {
    const history: string[] = [];
    for (const sec of this.sections) {
      for (const step of sec.steps) {
        if (step) {
          history.push(step.name);
        }
      }
    }
    return history;
  }

  private getTargetIdByChordName(chordName: string): string | null {
    if (!this.chordData || !this.chordData.scales) return null;

    for (const [scaleKey, scale] of Object.entries(this.chordData.scales)) {
      for (const [degree, degData] of Object.entries(scale.degrees)) {
        if (degData.chord_name === chordName) {
          return `${scale.root}_${scale.type.replace(/ /g, '_')}_${degree}`;
        }
      }
    }
    return null;
  }

  private get borrowedChordOptions(): NextChordOption[] {
    if (!this.activeProfile || !this.chordData || !this.chordData.scales) return [];

    const rootNote = this.activeProfile.scale.split(' ')[0];
    const currentScale = this.activeProfile.scale;
    const history = this.getCurrentProgressionHistory();

    const options: NextChordOption[] = [];
    const seenChords = new Set<string>();

    for (const [scaleKey, scale] of Object.entries(this.chordData.scales)) {
      if (scale.root === rootNote && `${scale.root} ${scale.type} SCALE` !== currentScale) {
        for (const [degree, degData] of Object.entries(scale.degrees)) {
          const chordName = degData.chord_name;
          if (!seenChords.has(chordName)) {
            seenChords.add(chordName);

            const targetId = `${scale.root}_${scale.type.replace(/ /g, '_')}_${degree}`;
            const vibeKey = this.getVibeKeyForOption(targetId, true);
            const dynamicTensionVal = this.calculateDynamicTension(chordName, history);
            const dynamicDesc = this.generateDynamicDescription(
              this.activeProfile.chord_name,
              chordName,
              vibeKey,
              degree,
              `${scale.root} ${scale.type}`
            );

            options.push({
              name: chordName,
              description: dynamicDesc,
              tension: `${dynamicTensionVal}%`,
              vibe: vibeKey as any,
              nodeId: targetId,
              targetChordId: targetId
            });
          }
        }
      }
    }

    return options;
  }

  private handlePlayChordEvent(e: CustomEvent<{ notes: string | number[] }>) {
    this.playChordNotes(e.detail.notes);
  }

  private handlePreviewChordNameEvent(e: CustomEvent<{ name: string }>) {
    const chordName = this.normalizeChordName(e.detail.name);
    const chordDef = this.chordData.chords[chordName];
    if (chordDef) {
      const dummyStep = {
        name: chordName,
        tension: 'T1',
        mood: '0',
        core: this.getActiveStepCore(),
        modifier: this.getActiveStepModifier(),
        windowStartMidi: this.getActiveStepVoicing()
      } as ChordStep;
      const dummyProfile = {
        chord_name: chordName,
        chord_notes: chordDef.notes,
        voicings_listed: chordDef.voicings_listed
      } as any as ChordProfile;
      const voicedNotes = this.getVoicedMidiNotesForStep(dummyStep, dummyProfile);
      this.playChordNotes(voicedNotes);
    }
  }

  private getVoicedMidiNotesForStep(step: ChordStep, prof: ChordProfile): number[] {
    const baseNotes = prof.chord_notes ? prof.chord_notes.split(' ') : [];
    if (!baseNotes.length) return [];

    const rootMidi = NOTE_TO_MIDI[baseNotes[0]] || 60;
    const rootPc = rootMidi % 12;

    let relativePcs = baseNotes.map(n => ((NOTE_TO_MIDI[n] || 60) - rootMidi + 24) % 12);

    const hasSeventh = relativePcs.some(pc => pc >= 9);
    const isDiminished = relativePcs.includes(3) && relativePcs.includes(6);
    const isAugmented = relativePcs.includes(4) && relativePcs.includes(8);
    const isMinor = relativePcs.includes(3) && !isDiminished;
    const isMajor = relativePcs.includes(4) && !isAugmented;

    const core = step && step.core ? step.core : 'maj';
    const modifier = step && step.modifier !== undefined ? step.modifier : '7';

    let modifiedPcs: number[] = [...relativePcs];

    // Core adjustments
    if (core === 'm') {
      if (modifiedPcs.includes(4)) modifiedPcs[modifiedPcs.indexOf(4)] = 3;
    } else if (core === 'maj') {
      if (modifiedPcs.includes(3)) modifiedPcs[modifiedPcs.indexOf(3)] = 4;
    } else if (core === 'sus4') {
      if (modifiedPcs.includes(4)) modifiedPcs[modifiedPcs.indexOf(4)] = 5;
      if (modifiedPcs.includes(3)) modifiedPcs[modifiedPcs.indexOf(3)] = 5;
    } else if (core === 'dim') {
      if (modifiedPcs.includes(4)) modifiedPcs[modifiedPcs.indexOf(4)] = 3;
      if (modifiedPcs.includes(7)) modifiedPcs[modifiedPcs.indexOf(7)] = 6;
    }

    // Modifier additions
    if (modifier === '7') {
      if (!modifiedPcs.includes(10)) modifiedPcs.push(10);
    } else if (modifier === 'maj7') {
      if (!modifiedPcs.includes(11)) modifiedPcs.push(11);
    } else if (modifier === '9') {
      if (!modifiedPcs.includes(10)) modifiedPcs.push(10);
      if (!modifiedPcs.includes(2)) modifiedPcs.push(2);
    } else if (modifier === '6') {
      if (!modifiedPcs.includes(9)) modifiedPcs.push(9);
    }
    if (modifier === '') {
       // Just triad, remove any 7ths or higher (from base notes if any)
       modifiedPcs = modifiedPcs.filter(pc => pc < 9);
    }

    const windowStartMidi = step && step.windowStartMidi !== undefined ? step.windowStartMidi : 60;
    const orchidWindowSize = 13;

    const midiNotes: number[] = [];
    for (const pc of modifiedPcs) {
      const absPc = (rootPc + pc) % 12;
      let targetMidi = absPc;
      while (targetMidi < windowStartMidi) {
        targetMidi += 12;
      }
      while (targetMidi < windowStartMidi + orchidWindowSize) {
        if (!midiNotes.includes(targetMidi)) {
          midiNotes.push(targetMidi);
        }
        targetMidi += 12;
      }
    }

    return midiNotes.sort((a, b) => a - b);
  }

  private getActiveStep(): ChordStep | null {
    if (!this.activeLocation) return null;
    const sec = this.sections.find(s => s.id === this.activeLocation!.sectionId);
    if (!sec) return null;
    return sec.steps[this.activeLocation.stepIndex] || null;
  }

  private updateActiveStep(updateFn: (step: NonNullable<ChordStep>) => void) {
    if (!this.activeLocation) return;
    const secIndex = this.sections.findIndex(s => s.id === this.activeLocation!.sectionId);
    if (secIndex === -1) return;

    const step = this.sections[secIndex].steps[this.activeLocation.stepIndex];
    if (step) {
      updateFn(step);
      this.sections = [...this.sections];
    }
  }

  private getActiveStepCore(): string {
    const step = this.getActiveStep();
    return step && step.core ? step.core : 'maj';
  }

  private getActiveStepModifier(): string {
    const step = this.getActiveStep();
    return step && step.modifier !== undefined ? step.modifier : '7';
  }

  private async handleChangeCoreEvent(e: CustomEvent<{ core: string }>) {
    this.updateActiveStep(step => {
      step.core = e.detail.core;
      this.updateStepNameFromCoreAndModifier(step);
    });
    await this.updateComplete;
    this.handlePlayActiveChord();
  }

  private async handleChangeModifierEvent(e: CustomEvent<{ modifier: string }>) {
    this.updateActiveStep(step => {
      step.modifier = e.detail.modifier;
      this.updateStepNameFromCoreAndModifier(step);
    });
    await this.updateComplete;
    this.handlePlayActiveChord();
  }

  private updateStepNameFromCoreAndModifier(step: ChordStep | null) {
    if (!step) return;
    const rootMatch = step.name.match(/^[A-G][#b]?/i);
    const root = rootMatch ? rootMatch[0] : 'C';
    let coreStr = step.core === 'maj' ? '' : (step.core === 'm' ? 'min' : step.core);
    if (coreStr === '' && step.modifier === '') coreStr = 'maj'; // default to maj if no modifier and maj core
    step.name = root + coreStr + (step.modifier || '');
    // Ensure capitalization matches the app's style (e.g. Dbmaj)
    step.name = step.name.charAt(0).toUpperCase() + step.name.slice(1).toLowerCase();
  }

  private parseCoreAndModifier(chordName: string): { core: string, modifier: string } {
    const rootMatch = chordName.match(/^[A-G][#b]?/i);
    const root = rootMatch ? rootMatch[0] : 'C';
    const quality = chordName.substring(root.length).toLowerCase();
    
    let core = 'maj';
    let modifier = '';
    
    if (quality.startsWith('min') || (quality.startsWith('m') && !quality.startsWith('maj'))) {
      core = 'm';
    } else if (quality.startsWith('dim')) {
      core = 'dim';
    } else if (quality.startsWith('sus')) {
      core = 'sus4';
    }
    
    if (quality.includes('maj7')) modifier = 'maj7';
    else if (quality.includes('7')) modifier = '7';
    else if (quality.includes('9')) modifier = '9';
    else if (quality.includes('6')) modifier = '6';
    
    return { core, modifier };
  }

  private getActiveStepVoicing(): number {
    const step = this.getActiveStep();
    return step && step.windowStartMidi !== undefined ? step.windowStartMidi : 60;
  }

  private handleChangeVoicingWindowEvent(e: CustomEvent<{ windowStartMidi: number }>) {
    this.updateActiveStep(step => step.windowStartMidi = e.detail.windowStartMidi);
  }

  private triggerSeaMonsterEasterEgg() {
    const isBelowFold = document.documentElement.scrollHeight > window.innerHeight;
    if (isBelowFold) {
      this.seaMonsterSpawnSide = Math.random() > 0.5 ? 'left' : 'right';
    } else {
      this.seaMonsterSpawnSide = 'bottom';
    }
    this.showSeaMonster = true;
    if (this.seaMonsterTimeoutId) clearTimeout(this.seaMonsterTimeoutId);
    this.seaMonsterTimeoutId = setTimeout(() => {
      this.showSeaMonster = false;
    }, 5500);
  }

  private triggerSunEasterEgg() {
    this.showSun = true;
    if (this.sunTimeoutId) clearTimeout(this.sunTimeoutId);
    this.sunTimeoutId = setTimeout(() => {
      this.showSun = false;
    }, 3500);
  }

  private triggerWindEasterEgg() {
    this.windEasterEggTriggered = true;
    this.showWind = true;
    if (this.windTimeoutId) clearTimeout(this.windTimeoutId);
    this.windTimeoutId = setTimeout(() => {
      this.showWind = false;
    }, 4500);
  }

  private checkWindEasterEgg() {
    if (this.windEasterEggTriggered) return;

    const activeSteps = this.sections.flatMap(s => s.steps).filter(step => step !== null);
    if (activeSteps.length === 0) return;

    const mistCount = activeSteps.filter(step => step.mood === 'LYDIAN').length;
    const percent = mistCount / activeSteps.length;

    if (percent > 0.5) {
      this.triggerWindEasterEgg();
    }
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('sections')) {
      this.checkWindEasterEgg();
    }
  }

  private handlePlayActiveChord() {
    const step = this.getActiveStep();
    if (step && this.activeProfile) {
      const notes = this.getVoicedMidiNotesForStep(step, this.activeProfile);
      this.playChordNotes(notes);
    }
  }

  private handleSelectNextChord(e: CustomEvent<{ option: NextChordOption }>) {
    const opt = e.detail.option;

    let prof = null;
    let targetId = opt.nodeId;
    if (targetId) {
      prof = this.resolveProfile(targetId);
    }
    if (!prof) {
      targetId = this.getTargetIdByChordName(this.normalizeChordName(opt.name)) || '';
      if (targetId) {
        prof = this.resolveProfile(targetId);
      }
    }

    if (prof) {
      this.activeProfile = prof;
      const { core, modifier } = this.parseCoreAndModifier(prof.chord_name);
      const newChord: ChordStep = {
        name: prof.chord_name,
        tension: opt.tension,
        mood: opt.vibe,
        core,
        modifier,
        windowStartMidi: 60,
        targetChordId: targetId,
        nodeId: targetId
      };

      const secIndex = this.activeLocation ? this.sections.findIndex(s => s.id === this.activeLocation!.sectionId) : -1;

      if (secIndex !== -1) {
        const sec = this.sections[secIndex];
        const nextIndex = this.activeLocation!.stepIndex + 1;

        const prevChord = sec.steps[this.activeLocation!.stepIndex];
        
        const isDominant = (chord: ChordStep) => {
          if (!chord || !chord.nodeId) return false;
          const parts = chord.nodeId.split('_');
          const deg = parts[parts.length - 1];
          return deg === 'DOMINANT' || deg === 'LEADING-TONE';
        };

        const isTonic = (chord: ChordStep) => {
          if (!chord || !chord.nodeId) return false;
          const parts = chord.nodeId.split('_');
          const deg = parts[parts.length - 1];
          return deg === 'TONIC' || deg === 'MEDIANT' || deg === 'SUBMEDIANT';
        };

        if (prevChord && isDominant(prevChord) && isDominant(newChord)) {
          this.triggerSeaMonsterEasterEgg();
        }

        const totalChords = this.sections.reduce((acc, s) => acc + s.steps.filter(step => step !== null).length, 0);
        if ((totalChords + 1) === 8 && newChord && newChord.mood === 'MAJOR') {
          this.triggerSunEasterEgg();
        }

        if (nextIndex < sec.steps.length) {
          if (sec.steps[nextIndex] === null) {
            sec.steps[nextIndex] = newChord;
          } else {
            sec.steps.splice(nextIndex, 0, newChord);
          }
          this.activeLocation = { sectionId: sec.id, stepIndex: nextIndex };
        } else {
          sec.steps.push(newChord);
          this.activeLocation = { sectionId: sec.id, stepIndex: sec.steps.length - 1 };
        }

        this.sections = [...this.sections];
      } else if (this.sections.length > 0) {
        // Fallback to appending to the last section
        const lastSec = this.sections[this.sections.length - 1];
        lastSec.steps.push(newChord);
        this.activeLocation = { sectionId: lastSec.id, stepIndex: lastSec.steps.length - 1 };
        this.sections = [...this.sections];
      }

      const voicedNotes = this.getVoicedMidiNotesForStep(newChord, prof);
      this.playChordNotes(voicedNotes);
      this.requestUpdate();
    }
  }

  private lastSelectStepTime = 0;

  private handleSelectStep(e: CustomEvent<{ sectionId: string, index: number } | null>) {
    const detail = e.detail;
    if (!detail) {
      this.activeLocation = null;
      return;
    }
    const sec = this.sections.find(s => s.id === detail.sectionId);
    if (!sec) return;

    const step = sec.steps[detail.index];
    if (step) {
      let prof = null;
      let targetId = step.nodeId || step.targetChordId || (step as any).target_id;
      if (targetId) {
        prof = this.resolveProfile(targetId);
      }
      if (!prof) {
        targetId = this.getTargetIdByChordName(step.name) || '';
        if (targetId) {
          prof = this.resolveProfile(targetId);
          step.nodeId = targetId;
          step.targetChordId = targetId;
        }
      }

      if (prof) {
        const now = Date.now();
        const isSameStep = this.activeLocation && this.activeLocation.sectionId === detail.sectionId && this.activeLocation.stepIndex === detail.index;
        const isRapidRepeat = isSameStep && (now - this.lastSelectStepTime < 350);
        this.lastSelectStepTime = now;

        this.activeProfile = prof;
        this.activeLocation = { sectionId: sec.id, stepIndex: detail.index };

        if (!isRapidRepeat) {
          const voicedNotes = this.getVoicedMidiNotesForStep(step, prof);
          this.playChordNotes(voicedNotes);
        }
      }
    } else {
      this.activeLocation = { sectionId: sec.id, stepIndex: detail.index };
    }
  }

  private handleHumanPreview(e: CustomEvent<any>) {
    this.humanState = e.detail;
    const step = this.getActiveStep();
    if (step && this.activeProfile) {
      const voicedNotes = this.getVoicedMidiNotesForStep(step, this.activeProfile);
      this.playChordNotes(voicedNotes);
    }
  }

  private handleRemoveStep(e: CustomEvent<{ sectionId: string, index: number }>) {
    // Prevent deletion of the very first step of the first section to protect key/scale flow
    if (this.sections.length > 0 && this.sections[0].id === e.detail.sectionId && e.detail.index === 0) {
      return;
    }

    const secIndex = this.sections.findIndex(s => s.id === e.detail.sectionId);
    if (secIndex === -1) return;

    const sec = this.sections[secIndex];
    const newSteps = [...sec.steps];
    const index = e.detail.index;

    if (newSteps[index] === null || index === newSteps.length - 1) {
      newSteps.splice(index, 1);
      while (newSteps.length > 0 && newSteps[newSteps.length - 1] === null) {
        newSteps.pop();
      }
    } else {
      newSteps[index] = null;
    }

    sec.steps = newSteps;
    this.sections = [...this.sections];

    // If all that's left are nulls, maybe we just leave it empty.
    // If entire timeline is empty:
    if (this.sections.every(s => s.steps.every(st => st === null))) {
      this.activeProfile = null;
      this.activeLocation = null;
      this.stopProgressionPlayback();
      return;
    }

    // Find the best valid step to focus on.
    let bestIndex = -1;
    for (let i = Math.min(index - 1, sec.steps.length - 1); i >= 0; i--) {
      if (sec.steps[i] !== null) {
        bestIndex = i;
        break;
      }
    }
    if (bestIndex === -1) {
      for (let i = index + 1; i < sec.steps.length; i++) {
        if (sec.steps[i] !== null) {
          bestIndex = i;
          break;
        }
      }
    }

    if (bestIndex !== -1) {
      const step = sec.steps[bestIndex];
      let prof = null;
      let targetId = step!.nodeId || step!.targetChordId || (step as any).target_id;
      if (targetId) {
        prof = this.resolveProfile(targetId);
      }
      if (!prof) {
        targetId = this.getTargetIdByChordName(step!.name) || '';
        if (targetId) {
          prof = this.resolveProfile(targetId);
          step!.nodeId = targetId;
          step!.targetChordId = targetId;
        }
      }
      this.activeProfile = prof || null;
      this.activeLocation = { sectionId: sec.id, stepIndex: bestIndex };
    } else {
      this.activeProfile = null;
      this.activeLocation = null;
    }
  }

  private handleClearTimeline() {
    this.stopProgressionPlayback();
    this.windEasterEggTriggered = false;
    this.showWind = false;
    if (this.windTimeoutId) {
      clearTimeout(this.windTimeoutId);
      this.windTimeoutId = null;
    }

    if (this.sections.length > 0 && this.sections[0].steps.length > 0) {
      const firstStep = this.sections[0].steps[0];
      this.sections = [{
        ...this.sections[0],
        steps: [firstStep]
      }];
      this.activeLocation = { sectionId: this.sections[0].id, stepIndex: 0 };
      
      if (firstStep) {
        let prof = null;
        let targetId = firstStep.nodeId || firstStep.targetChordId || (firstStep as any).target_id;
        if (targetId) {
          prof = this.resolveProfile(targetId);
        }
        if (!prof) {
          targetId = this.getTargetIdByChordName(firstStep.name) || '';
          if (targetId) {
            prof = this.resolveProfile(targetId);
            firstStep.nodeId = targetId;
            firstStep.targetChordId = targetId;
          }
        }
        if (prof) {
          this.activeProfile = prof;
        }
      }
    } else {
      this.sections = [];
      this.activeProfile = null;
      this.activeLocation = null;
    }
  }

  private handleAddSection() {
    const newSection: ProgressionSection = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Section ${this.sections.length + 1}`,
      steps: [null]
    };
    this.sections = [...this.sections, newSection];
    this.activeLocation = { sectionId: newSection.id, stepIndex: 0 };
  }

  private handleDuplicateSection(e: CustomEvent<{ sectionId: string }>) {
    const secIndex = this.sections.findIndex(s => s.id === e.detail.sectionId);
    if (secIndex === -1) return;
    const sec = this.sections[secIndex];

    // deep copy steps
    const newSteps = sec.steps.map(step => step ? { ...step } : null);

    const newSection: ProgressionSection = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${sec.name} (Copy)`,
      steps: newSteps
    };

    // Insert immediately after
    this.sections.splice(secIndex + 1, 0, newSection);
    this.sections = [...this.sections];
    this.activeLocation = { sectionId: newSection.id, stepIndex: 0 };
  }

  private handleDeleteSection(e: CustomEvent<{ sectionId: string }>) {
    this.sections = this.sections.filter(s => s.id !== e.detail.sectionId);
    if (this.sections.length === 0) {
      this.handleClearTimeline();
    } else {
      if (this.activeLocation?.sectionId === e.detail.sectionId) {
        // Just focus first valid block
        this.activeLocation = { sectionId: this.sections[0].id, stepIndex: 0 };
      }
    }
  }

  private handleRenameSection(e: CustomEvent<{ sectionId: string, name: string }>) {
    const sec = this.sections.find(s => s.id === e.detail.sectionId);
    if (sec) {
      sec.name = e.detail.name;
      this.sections = [...this.sections];
    }
  }

  private handleOpenProjectModal() {
    this.projects = ProjectService.getProjects();
    this.showProjectModal = true;
  }

  private handleCloseProjectModal() {
    this.showProjectModal = false;
  }

  private handleSaveProject() {
    if (this.sections.length === 0) return;

    let targetId = this.currentProjectId;

    // Check if another project has the exact same name
    const existingByName = this.projects.find(p => p.name.toLowerCase() === this.currentProjectName.toLowerCase() && p.id !== targetId);

    if (existingByName) {
      if (!confirm(`A project named "${this.currentProjectName}" already exists. Overwrite it?`)) {
        return;
      }
      targetId = existingByName.id;
    } else if (targetId) {
      // It's a loaded project being updated
      const existingById = this.projects.find(p => p.id === targetId);
      if (existingById && !confirm(`Overwrite loaded project "${existingById.name}"?`)) {
        return;
      }
    }

    if (!targetId) {
      targetId = Math.random().toString(36).substr(2, 9);
    }

    this.currentProjectId = targetId;

    const project: ProjectData = {
      id: targetId,
      name: this.currentProjectName,
      lastModified: Date.now(),
      sections: this.sections,
      setupStep: this.setupStep,
      selectedScaleType: this.selectedScaleType
    };

    ProjectService.saveProject(project);
    this.projects = ProjectService.getProjects();
    this.syncProjectsToCloud();
  }

  private async handleSaveAudioTrack(e: CustomEvent<{blob: Blob}>) {
    if (!this.currentProjectId) return;
    this.isAudioUploading = true;
    try {
      const blob = e.detail.blob;
      
      let bpm = 0;
      try {
        const audioCtx = new AudioContext();
        const arrayBuf = await blob.arrayBuffer();
        const audioBuf = await audioCtx.decodeAudioData(arrayBuf);
        bpm = estimateBPM(audioBuf);
      } catch (e) {
        console.warn('Failed to estimate BPM', e);
      }

      await this.driveService.uploadAudioFile(this.currentProjectId, blob);
      
      const project = this.projects.find(p => p.id === this.currentProjectId);
      if (project) {
        project.audioTrack = {
          filename: `recording_${this.currentProjectId}.webm`,
          duration: blob.size / (16000), // rough estimate, but actual duration is less important here
          volumeDb: 0,
          bpm: bpm || undefined
        };
        ProjectService.saveProject(project);
        this.projects = ProjectService.getProjects();
        await this.loadProjectAudio(this.currentProjectId);
      }
    } catch (err) {
      console.error('Failed to save audio track', err);
    } finally {
      this.isAudioUploading = false;
    }
  }

  private async handleDeleteAudioTrack() {
    if (!this.currentProjectId) return;
    try {
      await this.driveService.deleteAudioFile(this.currentProjectId);
      const project = this.projects.find(p => p.id === this.currentProjectId);
      if (project) {
        delete project.audioTrack;
        ProjectService.saveProject(project);
        this.projects = ProjectService.getProjects();
        unloadAudioTrack();
      }
    } catch(err) {
      console.error('Failed to delete audio track', err);
    }
  }

  private handleChangeAudioTrackVolume(e: CustomEvent<{volumeDb: number}>) {
    if (!this.currentProjectId) return;
    const project = this.projects.find(p => p.id === this.currentProjectId);
    if (project && project.audioTrack) {
      project.audioTrack.volumeDb = e.detail.volumeDb;
      setAudioTrackVolume(e.detail.volumeDb);
      ProjectService.saveProject(project);
    }
  }

  private handleSyncBpmToRecording(e: CustomEvent<{bpm: number}>) {
    if (this.humanState) {
       this.humanState = { ...this.humanState, bpm: e.detail.bpm };
    }
  }
  
  private async loadProjectAudio(projectId: string) {
    const project = this.projects.find(p => p.id === projectId);
    if (project && project.audioTrack && this.isAuthenticated) {
       const blob = await this.driveService.downloadAudioFile(projectId);
       if (blob) {
         const url = URL.createObjectURL(blob);
         await loadAudioTrack(url, project.audioTrack.volumeDb);
       }
    } else {
       unloadAudioTrack();
    }
  }

  private handleLoadProject(project: ProjectData) {
    this.stopProgressionPlayback();
    this.loadProjectAudio(project.id);
    this.currentProjectId = project.id;
    this.currentProjectName = project.name;
    this.setupStep = project.setupStep;
    this.selectedScaleType = project.selectedScaleType;
    this.windEasterEggTriggered = false;
    this.showWind = false;
    if (this.windTimeoutId) {
      clearTimeout(this.windTimeoutId);
      this.windTimeoutId = null;
    }
    this.sections = project.sections;

    if (this.sections.length > 0) {
      this.activeLocation = { sectionId: this.sections[0].id, stepIndex: 0 };
      const firstStep = this.sections[0].steps.find(s => s !== null);
      if (firstStep) {
        let prof = null;
        let targetId = firstStep.nodeId || firstStep.targetChordId || (firstStep as any).target_id;
        if (targetId) {
          prof = this.resolveProfile(targetId);
        }
        if (!prof) {
          targetId = this.getTargetIdByChordName(firstStep.name) || '';
          if (targetId) {
            prof = this.resolveProfile(targetId);
            firstStep.nodeId = targetId;
            firstStep.targetChordId = targetId;
          }
        }
        if (prof) {
          this.activeProfile = prof;
        }
      }
    } else {
      this.activeLocation = null;
      this.activeProfile = null;
    }

    this.showProjectModal = false;
  }

  private handleDeleteProject(id: string) {
    ProjectService.deleteProject(id);
    this.projects = ProjectService.getProjects();
    this.syncProjectsToCloud();
    if (this.currentProjectId === id) {
      this.currentProjectId = null;
    }
  }

  private handleExportProject(project: ProjectData) {
    ProjectService.exportProjectFile(project);
  }

  private handleImportProject(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      ProjectService.importProjectFile(target.files[0])
        .then(project => {
          ProjectService.saveProject(project);
          this.projects = ProjectService.getProjects();
          this.syncProjectsToCloud();
        })
        .catch(err => alert(err.message));
    }
    target.value = '';
  }

  // Progression sequential playback loop
  private togglePlayProgression() {
    if (this.isPlaying) {
      this.stopProgressionPlayback();
    } else {
      this.startProgressionPlayback();
    }
  }

  private startProgressionPlayback() {
    if (this.sections.length === 0) return;
    this.isPlaying = true;

    // Step interval: 2 beats (half note) calculated from BPM. Default 80 BPM → 1500ms.
    const bpm = this.humanState?.bpm ?? 80;
    const stepIntervalMs = Math.round((2 * 60 / bpm) * 1000);

    let secIndex = 0;
    let stepIndex = 0;

    if (this.activeLocation) {
      secIndex = this.sections.findIndex(s => s.id === this.activeLocation!.sectionId);
      if (secIndex !== -1) {
        stepIndex = this.activeLocation.stepIndex;
      } else {
        secIndex = 0;
      }
    }

    let timeOffsetMs = 0;
    for (let i = 0; i < secIndex; i++) {
       timeOffsetMs += this.sections[i].steps.length * stepIntervalMs;
    }
    timeOffsetMs += stepIndex * stepIntervalMs;
    playAudioTrack(timeOffsetMs / 1000);

    const playNextStep = () => {
      if (!this.isPlaying) return;

      let sec = this.sections[secIndex];
      let step = sec ? sec.steps[stepIndex] : null;

      while (!step && secIndex < this.sections.length) {
        stepIndex++;
        if (stepIndex >= sec.steps.length) {
          secIndex++;
          stepIndex = 0;
          if (secIndex < this.sections.length) {
            sec = this.sections[secIndex];
            step = sec.steps[stepIndex];
          } else {
            step = null;
          }
        } else {
          step = sec.steps[stepIndex];
        }
      }

      if (!step) {
        if (this.isLooping && this.sections.some(s => s.steps.some(st => st !== null))) {
          secIndex = 0;
          stepIndex = 0;
          this.playTimeoutId = setTimeout(playNextStep, 100);
        } else {
          this.isPlaying = false;
        }
        return;
      }

      let prof = null;
      let targetId = step!.nodeId || step!.targetChordId || (step as any).target_id;
      if (targetId) {
        prof = this.resolveProfile(targetId);
      }
      if (!prof) {
        targetId = this.getTargetIdByChordName(step!.name) || '';
        if (targetId) {
          prof = this.resolveProfile(targetId);
          step!.nodeId = targetId;
          step!.targetChordId = targetId;
        }
      }

      if (prof) {
        this.activeProfile = prof;
        this.activeLocation = { sectionId: sec.id, stepIndex: stepIndex };
        const voicedNotes = this.getVoicedMidiNotesForStep(step, prof);
        this.playChordNotes(voicedNotes);
      }

      stepIndex++;
      if (stepIndex >= sec.steps.length) {
        secIndex++;
        stepIndex = 0;
      }

      if (secIndex >= this.sections.length) {
        if (this.isLooping && this.sections.some(s => s.steps.some(st => st !== null))) {
          secIndex = 0;
          stepIndex = 0;
          this.playTimeoutId = setTimeout(playNextStep, stepIntervalMs);
        } else {
          this.playTimeoutId = setTimeout(() => {
            this.stopProgressionPlayback();
          }, stepIntervalMs);
        }
        return;
      }
      this.playTimeoutId = setTimeout(playNextStep, stepIntervalMs);
    };

    playNextStep();
  }

  private stopProgressionPlayback() {
    stopAudioTrack();
    this.isPlaying = false;
    if (this.playTimeoutId) {
      clearTimeout(this.playTimeoutId);
      this.playTimeoutId = null;
    }
  }

  private handleToggleLoop() {
    this.isLooping = !this.isLooping;
  }

  private toggleCompactMode() {
    this.compactMode = !this.compactMode;
    localStorage.setItem('chord-voyager-compact-mode', this.compactMode.toString());
  }

  private toggleLightMode() {
    this.lightMode = !this.lightMode;
    localStorage.setItem('chord-voyager-light-mode', this.lightMode.toString());
    document.documentElement.classList.toggle('light-theme', this.lightMode);
  }

  // Select scale type in first step (kept for internal use / future)
  private handleScaleTypeSelect(scaleId: 'MAJOR' | 'NATURAL MINOR' | 'HARMONIC MINOR' | 'MELODIC MINOR' | 'DORIAN' | 'MIXOLYDIAN' | 'LYDIAN') {
    this.selectedScaleType = scaleId;
    this.setupStep = 'tonic';
  }

  // Bridge from <onboarding-landing> → existing handleKeySelect flow
  private handleOnboardingScaleSelected(e: CustomEvent<{ key: string; scaleType: string }>) {
    const { key, scaleType } = e.detail;
    this.selectedScaleType = scaleType as any;
    this.handleKeySelect(key);
  }

  private renderScaleCard(sc: any) {
    return html`
      <div class="scale-card" @click="${() => this.handleScaleTypeSelect(sc.id as any)}">
        <div class="scale-card-header">
          <div class="scale-emoji">${sc.emoji}</div>
          <div class="scale-header-text">
            <div class="scale-name">${sc.title}</div>
            <div class="scale-subtitle">${sc.subtitle}</div>
          </div>
        </div>
        ${!this.compactMode ? html`<div class="scale-desc">${sc.desc}</div>` : ''}
      </div>
    `;
  }

  // Select key in second step, instantiate chord profile context
  private handleKeySelect(key: string) {
    if (!this.selectedScaleType) return;

    const scaleKey = `${key}_${this.selectedScaleType.replace(/ /g, '_')}`;
    const targetId = `${scaleKey}_TONIC`;
    const prof = this.resolveProfile(targetId);

    if (prof) {
      this.activeProfile = prof;

      // Instantiate progression
      const vibeVal = this.getVibeKeyForOption(targetId, false);
      const { core, modifier } = this.parseCoreAndModifier(prof.chord_name);
      const step: ChordStep = {
        name: prof.chord_name,
        tension: '10%',
        mood: vibeVal,
        core,
        modifier,
        windowStartMidi: 60,
        targetChordId: targetId,
        nodeId: targetId
      };

      const defaultSection: ProgressionSection = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Verse 1',
        steps: [step]
      };

      this.sections = [defaultSection];
      this.activeLocation = { sectionId: defaultSection.id, stepIndex: 0 };
      this.setupStep = 'scale'; // Reset for future clear states
    } else {
      console.warn(`Could not find profile for scale: ${scaleKey}`);
    }
  }

  render() {
    return html`
      <div class="app-layout">
        
        <!-- Header Branding Section -->
        <header class="glass-panel" style="padding: 16px 24px;">
          <div class="branding">
            <div class="brand-title">CHORD VOYAGER</div>
            <div class="brand-sub">DYNAMIC CHORD STUDIO</div>
          </div>
          
          <!-- Header Controls -->
          <div class="header-controls">
            <div class="toggle-group">
              <button 
                class="btn-compact-toggle" 
                @click=${this.handleOpenProjectModal}
                title="Manage Projects"
                style="margin: 0;"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
              </button>
              <button 
                class="btn-compact-toggle ${this.lightMode ? 'active' : ''}" 
                @click=${this.toggleLightMode}
                title="Toggle Light/Dark Theme"
                style="margin: 0;"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${this.lightMode
        ? svg`<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`
        : svg`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`
      }
                </svg>
              </button>
              <button 
                class="btn-compact-toggle ${this.compactMode ? 'active' : ''}" 
                @click=${this.toggleCompactMode}
                title="Toggle Compact Mode (Hide verbose text)"
                style="margin: 0;"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  ${this.compactMode
        ? svg`
                        <polyline points="4 7 4 4 20 4 20 7" opacity="0.4"></polyline>
                        <line x1="9" y1="20" x2="15" y2="20" opacity="0.4"></line>
                        <line x1="12" y1="4" x2="12" y2="20" opacity="0.4"></line>
                        <line x1="3" y1="3" x2="21" y2="21"></line>
                      `
        : svg`
                        <polyline points="4 7 4 4 20 4 20 7"></polyline>
                        <line x1="9" y1="20" x2="15" y2="20"></line>
                        <line x1="12" y1="4" x2="12" y2="20"></line>
                      `
      }
                </svg>
              </button>
              <button 
                class="btn-compact-toggle" 
                @click=${this.handleOpenShareModal}
                title="Share Progression"
                style="margin: 0;"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        ${this.activeProfile === null ? html`
          <div class="setup-view glass-panel">
            <onboarding-landing
              .compactMode=${this.compactMode}
              .chordDataLoaded=${Object.keys(this.chordData.scales).length > 0}
              @scale-selected=${this.handleOnboardingScaleSelected}
            ></onboarding-landing>
          </div>
        ` : html`
          <div class="workspace-container">
            <!-- Workspace Panel: Progression deck at the top -->
            <div class="timeline-pane glass-panel">
              <chord-timeline
                .sections="${this.sections}"
                .activeLocation="${this.activeLocation}"
                .isPlaying="${this.isPlaying}"
                .isLooping="${this.isLooping}"
                .collapsed="${this.timelineCollapsed}"
                .activeNotes="${this.activeProfile && this.getActiveStep() ? this.getVoicedMidiNotesForStep(this.getActiveStep()!, this.activeProfile) : []}"
                .rootNoteName="${this.activeProfile ? this.activeProfile.chord_notes.split(' ')[0] : ''}"
                .windowStartMidi="${this.getActiveStepVoicing()}"
                .bpm="${this.humanState?.bpm ?? 80}"
                @toggle-play="${this.togglePlayProgression}"
                @toggle-loop="${this.handleToggleLoop}"
                @clear-timeline="${this.handleClearTimeline}"
                @select-step="${this.handleSelectStep}"
                @remove-step="${this.handleRemoveStep}"
                @toggle-collapse="${() => this.timelineCollapsed = !this.timelineCollapsed}"
                @duplicate-section="${this.handleDuplicateSection}"
                @delete-section="${this.handleDeleteSection}"
                @rename-section="${this.handleRenameSection}"
                @add-section="${this.handleAddSection}"
                @change-voicing-window="${this.handleChangeVoicingWindowEvent}"
                @play-active-chord="${this.handlePlayActiveChord}"
                @change-core="${this.handleChangeCoreEvent}"
                @change-modifier="${this.handleChangeModifierEvent}"
                @human-state-change="${(e: CustomEvent<any>) => this.humanState = e.detail}"
                @human-preview="${this.handleHumanPreview}"
                .isAuthenticated="${this.isAuthenticated}"
                .projectId="${this.currentProjectId || ''}"
                .audioTrack="${this.currentProjectId ? this.projects.find(p => p.id === this.currentProjectId)?.audioTrack : null}"
                .isUploading="${this.isAudioUploading}"
                @save-audio-track="${this.handleSaveAudioTrack}"
                @delete-audio-track="${this.handleDeleteAudioTrack}"
                @change-audio-track-volume="${this.handleChangeAudioTrackVolume}"
                @sync-bpm-to-recording="${this.handleSyncBpmToRecording}"
              ></chord-timeline>
            </div>

            <!-- Active Workspace Panel -->
            <div class="workspace-grid glass-panel ${this.compactMode ? 'is-compact' : ''}" style="padding: 0; display: flex; flex-direction: column;">
              
              <!-- Top portion: Active Chord Profile Card -->
              <div class="chord-pane" style="border-bottom: 1px solid var(--border-color);">
                <chord-profile-card
                  .header="${this.activeProfile.header}"
                  .chordName="${this.activeProfile.chord_name}"
                  .chordNotes="${this.activeProfile.chord_notes}"
                  .scale=${this.activeProfile.scale}
                  .functionText=${this.activeProfile.function_text}
                  .voicingsListed=${this.activeProfile.voicings_listed}
                  .compactMode=${this.compactMode}
                  .core=${this.getActiveStepCore()}
                  .modifier=${this.getActiveStepModifier()}
                  .windowStartMidi=${this.getActiveStepVoicing()}
                  @play-chord=${this.handlePlayChordEvent}
                  @change-voicing-window=${this.handleChangeVoicingWindowEvent}
                >
                  <div slot="tabs" class="compact-header-tabs">
                    <div class="options-tabs header-tabs">
                      <button 
                        class="tab-btn ${this.activeOptionsTab === 'diatonic' ? 'active' : ''}" 
                        @click=${() => this.activeOptionsTab = 'diatonic'}
                        title="Charted Waters"
                      >
                        ⛵
                      </button>
                      <button 
                        class="tab-btn ${this.activeOptionsTab === 'borrowed' ? 'active' : ''}" 
                        @click=${() => this.activeOptionsTab = 'borrowed'}
                        title="Uncharted Waters"
                      >
                        🧭
                      </button>
                    </div>
                  </div>
                </chord-profile-card>
              </div>
              
              <!-- Bottom portion: Chord Voyager options list -->
              <div class="options-pane">
                <div class="desktop-pane-tabs">
                  <div class="options-tabs">
                    <button 
                      class="tab-btn ${this.activeOptionsTab === 'diatonic' ? 'active' : ''}" 
                      @click=${() => this.activeOptionsTab = 'diatonic'}
                      title="Charted Waters (Diatonic Chords)"
                    >
                      ${this.compactMode ? '⛵' : 'Charted Waters'}
                    </button>
                    <button 
                      class="tab-btn ${this.activeOptionsTab === 'borrowed' ? 'active' : ''}" 
                      @click=${() => this.activeOptionsTab = 'borrowed'}
                      title="Uncharted Waters (Borrowed Chords)"
                    >
                      ${this.compactMode ? '🧭' : 'Uncharted Waters'}
                    </button>
                  </div>
                </div>
                
                ${!this.compactMode ? html`
                  <div class="tab-explanation">
                    ${this.activeOptionsTab === 'diatonic' ?
            'Cruising safe, familiar routes using diatonic chords built strictly from your active scale to provide comfortable stability.' :
            'Venturing into mysterious, unmapped territory using borrowed chords from parallel modes to introduce tension and emotional color.'
          }
                  </div>
                ` : ''}
                
                ${this.activeOptionsTab === 'diatonic' ? html`
                  <next-options-table
                    .options=${this.activeProfile.next_chord_options}
                    .compactMode=${this.compactMode}
                    @select-next-chord=${this.handleSelectNextChord}
                    @preview-chord-name="${this.handlePreviewChordNameEvent}"
                  ></next-options-table>
                ` : html`
                  <next-options-table
                    .options=${this.borrowedChordOptions}
                    .compactMode=${this.compactMode}
                    @select-next-chord=${this.handleSelectNextChord}
                    @preview-chord-name="${this.handlePreviewChordNameEvent}"
                  ></next-options-table>
                `}
              </div>
              
            </div>
          </div>
        `}
        
        ${this.showProjectModal ? this.renderProjectModal() : ''}
        ${this.showShareModal ? this.renderShareModal() : ''}
        ${this.showCloudPromptModal ? this.renderCloudPromptModal() : ''}
        ${this.showSeaMonster ? html`<img src="./sea-monster.png" class="sea-monster-easter-egg ${this.seaMonsterSpawnSide}" alt="Sea Monster" />` : ''}
        ${this.showSun ? html`<img src="./sun.png" class="sun-easter-egg" alt="Sun" />` : ''}
        ${this.showWind ? html`<img src="./wind.png" class="wind-easter-egg" alt="Wind" />` : ''}
        
        <footer class="studio-footer">
          <div class="footer-content">
            <a href="https://github.com/warmsynths/chord-voyager" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="display: inline-block; vertical-align: middle;"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>GitHub</a>
            <span class="footer-divider">|</span>
            <span>Made with ❤️ by <a href="mailto:warmsynthsiloveyou@gmail.com" target="_blank" rel="noopener">warmsynths</a></span>
            <span class="footer-divider">|</span>
            <a href="https://ko-fi.com/warmsynths" target="_blank" rel="noopener">☕ Support the Voyage</a>
          </div>
        </footer>
      </div>
    `;
  }

  private renderProjectModal() {
    return html`
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center;" @click=${this.handleCloseProjectModal}>
        <div class="glass-panel" style="width: 600px; max-width: 90vw; max-height: 80vh; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 24px;" @click=${(e: Event) => e.stopPropagation()}>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2 style="margin: 0; font-family: var(--font-heading); color: var(--accent-gold);">Project Manager</h2>
            <button class="btn-compact-toggle" @click=${this.handleCloseProjectModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 12px;">
            <h3 style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">Current Workspace</h3>
            <div style="display: flex; gap: 12px; align-items: center;">
              <input 
                type="text" 
                .value=${this.currentProjectName} 
                @input=${(e: Event) => this.currentProjectName = (e.target as HTMLInputElement).value}
                style="flex: 1; background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-primary); padding: 8px 12px; border-radius: 6px; font-family: var(--font-heading);"
                placeholder="Project Name..."
              />
              <button 
                @click=${this.handleSaveProject} 
                ?disabled=${this.sections.length === 0}
                style="background: var(--accent-terracotta); color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; opacity: ${this.sections.length === 0 ? 0.5 : 1};"
              >
                Save
              </button>
              ${!this.isAuthenticated ? html`
                <button
                  @click=${() => this.showCloudPromptModal = true}
                  title="Enable Cloud Backup"
                  style="background: transparent; border: 1px dashed var(--border-color); color: var(--text-secondary); padding: 8px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 0.85rem;"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.78-3.5-4-3.5a5.5 5.5 0 0 0-5.38 4.41c-2.3.26-4.12 2.2-4.12 4.59A3.5 3.5 0 0 0 6 20h11.5a1 1 0 0 0 .5-1z"></path>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                    <polyline points="12 12 12 18"></polyline>
                  </svg>
                  Sync to Cloud
                </button>
              ` : html`
                <button
                  @click=${this.syncProjectsToCloud}
                  ?disabled=${this.isDriveSyncing}
                  title="Sync to Cloud Now"
                  style="background: transparent; border: 1px solid var(--accent-blue); color: var(--accent-blue); padding: 8px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 0.85rem;"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.78-3.5-4-3.5a5.5 5.5 0 0 0-5.38 4.41c-2.3.26-4.12 2.2-4.12 4.59A3.5 3.5 0 0 0 6 20h11.5a1 1 0 0 0 .5-1z"></path>
                  </svg>
                  ${this.isDriveSyncing ? 'Syncing...' : 'Sync Active'}
                </button>
              `}
            </div>
            ${!this.isAuthenticated ? html`
              <div style="display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 0.75rem; margin-top: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                </svg>
                <span>Saved locally to browser storage (Guest Mode)</span>
              </div>
            ` : html`
              <div style="display: flex; align-items: center; gap: 6px; color: var(--accent-blue); font-size: 0.75rem; margin-top: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Google Cloud Sync Enabled</span>
              </div>
            `}
          </div>

          <!-- Cloud Sync Settings & Account Block -->
          <div style="background: rgba(43, 107, 187, 0.08); padding: 16px; border-radius: 8px; border: 1px dashed rgba(43, 107, 187, 0.3); display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; font-size: 0.9rem; color: var(--accent-blue); font-family: var(--font-heading); display: flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42-1.89-1.78-3.5-4-3.5a5.5 5.5 0 0 0-5.38 4.41c-2.3.26-4.12 2.2-4.12 4.59A3.5 3.5 0 0 0 6 20h11.5a1 1 0 0 0 .5-1z"></path>
                </svg>
                Cloud Synchronization
              </h3>
              ${this.isAuthenticated ? html`
                <span style="font-size: 0.75rem; color: var(--accent-gold); background: rgba(212, 175, 55, 0.15); padding: 2px 8px; border-radius: 4px; font-weight: 600;">CONNECTED</span>
              ` : html`
                <span style="font-size: 0.75rem; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 4px; font-weight: 600;">LOCAL-FIRST</span>
              `}
            </div>
            
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
              ${this.isAuthenticated
        ? `You are signed in as ${this.authUserEmail}. Your projects are automatically synced and backed up to your personal Google Drive.`
        : 'Projects are saved locally to this browser by default. Sign in with Google only if you want to sync your projects and access them from other devices.'
      }
            </p>
            
            <div style="display: flex; justify-content: flex-end;">
              ${this.isAuthenticated ? html`
                <button 
                  @click=${this.handleLogout}
                  style="background: transparent; border: 1px solid var(--accent-terracotta); color: var(--accent-terracotta); padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 0.8rem;"
                >
                  Sign Out
                </button>
              ` : html`
                <button 
                  @click=${this.requestDriveAccess}
                  style="background: var(--accent-blue); color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; box-shadow: var(--neu-flat-sm);"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.753 1 .5 6.253.5 12.75s5.253 11.75 11.74 11.75c6.776 0 11.28-4.76 11.28-11.46 0-.77-.085-1.35-.188-1.755H12.24z"/>
                  </svg>
                  Sign in with Google
                </button>
              `}
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h3 style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">Saved Projects</h3>
              <label style="cursor: pointer; font-size: 0.8rem; color: var(--accent-gold); display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 4px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Import JSON
                <input type="file" accept=".json" style="display: none;" @change=${this.handleImportProject} />
              </label>
            </div>

            ${this.projects.length === 0 ? html`
              <div style="text-align: center; padding: 30px; color: var(--text-muted); font-style: italic; background: rgba(0,0,0,0.1); border-radius: 8px;">
                No saved projects found.
              </div>
            ` : html`
              <div style="display: flex; flex-direction: column; gap: 8px; max-height: 300px; overflow-y: auto;">
                ${this.projects.sort((a, b) => b.lastModified - a.lastModified).map(p => html`
                  <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 12px 16px; border-radius: 8px; border: 1px solid ${this.currentProjectId === p.id ? 'var(--accent-gold)' : 'transparent'};">
                    <div style="display: flex; flex-direction: column;">
                      <span style="font-weight: bold; font-family: var(--font-heading); color: var(--text-primary);">
                        ${p.name}
                        ${p.syncedToCloud
          ? html`<span style="margin-left: 8px; font-size: 0.65rem; background: rgba(43, 107, 187, 0.2); color: var(--accent-blue); padding: 2px 6px; border-radius: 4px; vertical-align: middle;">CLOUD</span>`
          : html`<span style="margin-left: 8px; font-size: 0.65rem; background: rgba(255, 255, 255, 0.1); color: var(--text-muted); padding: 2px 6px; border-radius: 4px; vertical-align: middle;">LOCAL</span>`
        }
                      </span>
                      <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">${new Date(p.lastModified).toLocaleString()}</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                      <button @click=${() => this.handleLoadProject(p)} style="background: var(--bg-card); color: var(--text-primary); border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">Load</button>
                      <button @click=${() => this.handleExportProject(p)} style="background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">Export</button>
                      <button @click=${() => this.handleDeleteProject(p.id)} style="background: transparent; color: var(--accent-terracotta); border: 1px solid transparent; padding: 6px 12px; border-radius: 4px; font-weight: bold; cursor: pointer;">Delete</button>
                    </div>
                  </div>
                `)}
              </div>
            `}
          </div>

        </div>
      </div>
    `;
  }

  private handleOpenShareModal() {
    this.showShareModal = true;
  }

  private handleCloseShareModal() {
    this.showShareModal = false;
  }

  private getShareableChordName(step: ChordStep): string {
    if (!step) return '';

    // Parse root and quality
    // step.name is like 'CMAJ', 'AMIN', 'BDIM', 'BAUG', 'CXDIM', etc.
    const match = step.name.match(/^([A-G](?:#|b|x)?)(MAJ|MIN|DIM|AUG|XDIM)$/i);
    if (!match) return step.name;

    let root = match[1];
    let quality = match[2].toUpperCase();

    // If it's XDIM, append 'x' to the root and set quality to DIM
    if (quality === 'XDIM') {
      root = root + 'x';
      quality = 'DIM';
    }

    // Normalize enharmonic spellings for sharing compatibility
    const rootMapping: Record<string, string> = {
      'Cx': 'D', 'CX': 'D',
      'Dx': 'E', 'DX': 'E',
      'Fx': 'G', 'FX': 'G',
      'Gx': 'A', 'GX': 'A',
      'Ax': 'B', 'AX': 'B',
      'B#': 'C',
      'E#': 'F'
    };
    root = rootMapping[root] || root;

    const core = step.core || 'maj';
    const modifier = step.modifier !== undefined ? step.modifier : '7';
    const suffix = (core === 'maj' ? '' : core) + modifier;
    return root + suffix;
  }

  private async openDeviceLink(device: 'm8' | 'circuit') {
    const steps = this.sections
      .flatMap(s => s.steps)
      .filter((step): step is Exclude<ChordStep, null> => step !== null);

    if (steps.length === 0) {
      const baseUrl = device === 'm8'
        ? 'https://warmsynths.github.io/hypersyn-chord-helper/'
        : 'https://warmsynths.github.io/circuit-chords/';
      window.open(baseUrl, '_blank');
      return;
    }

    let encodedState = '';
    try {
      const engineUrl = import.meta.env.VITE_HUMAN_ENGINE_URL;
      const { encodeProgression } = engineUrl 
        ? await import(/* @vite-ignore */ engineUrl)
        : await import('human-engine');

      const sharedChords = steps.map(step => {
        const rootMatch = step.name.match(/^[A-G][#b]?/);
        const root = rootMatch ? rootMatch[0] : 'C';
        const quality = step.name.substring(root.length) || 'maj';
        
        let prof = step.nodeId ? this.resolveProfile(step.nodeId) : null;
        if (!prof) {
          const chordDef = this.chordData?.chords[step.name];
          if (chordDef) {
            prof = { chord_name: step.name, chord_notes: chordDef.notes } as any as ChordProfile;
          }
        }
        
        let midiNotes: number[] = [];
        if (prof) {
          midiNotes = this.getVoicedMidiNotesForStep(step, prof);
        }
        
        return {
          symbol: step.name,
          root,
          quality,
          core: step.core,
          modifier: step.modifier,
          midiNotes
        };
      });

      const sharedProgression = {
        chords: sharedChords,
        bpm: this.humanState?.bpm ?? 80,
        humanState: this.humanState
      };

      encodedState = '?state=' + encodeProgression(sharedProgression);
    } catch (err) {
      console.warn('Failed to load human-engine for encode, falling back to basic sharing', err);
      const chords = steps.map(step => this.getShareableChordName(step));
      encodedState = '?p=' + chords.join('+');
    }

    let baseUrl = device === 'm8'
      ? 'https://warmsynths.github.io/hypersyn-chord-helper/'
      : 'https://warmsynths.github.io/circuit-chords/';
      
    // Local dev override
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      if (device === 'circuit') {
        baseUrl = 'http://localhost:43302/';
      } else if (device === 'm8') {
        baseUrl = 'http://localhost:43303/';
      }
    }

    window.open(baseUrl + encodedState, '_blank');
  }

  private renderCloudPromptModal() {
    return html`
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1100; display: flex; align-items: center; justify-content: center;" @click=${() => this.showCloudPromptModal = false}>
        <div class="glass-panel" style="width: 420px; max-width: 90vw; padding: 32px; display: flex; flex-direction: column; gap: 20px; text-align: center;" @click=${(e: Event) => e.stopPropagation()}>
          
          <div style="display: flex; justify-content: flex-end; margin-bottom: -10px;">
            <button class="btn-compact-toggle" @click=${() => this.showCloudPromptModal = false} style="margin: 0; padding: 4px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div style="font-size: 2.5rem; line-height: 1; margin-bottom: 5px;">☁️</div>
          
          <div>
            <h2 style="margin: 0 0 8px 0; font-family: var(--font-heading); color: var(--accent-gold); font-size: 1.5rem;">Enable Cloud Sync</h2>
            <p style="color: var(--text-secondary); margin: 0; font-size: 0.95rem; line-height: 1.5;">
              Sign in with Google to safely back up your projects, custom progressions, and configuration variables to the cloud. Access your files on any device!
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 8px;">
            <button 
              @click=${() => { this.showCloudPromptModal = false; this.requestDriveAccess(); }}
              style="background: var(--accent-blue); color: #fff; border: none; padding: 12px 20px; border-radius: 8px; font-weight: bold; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; box-shadow: var(--neu-flat-sm);"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="vertical-align: middle;">
                <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.753 1 .5 6.253.5 12.75s5.253 11.75 11.74 11.75c6.776 0 11.28-4.76 11.28-11.46 0-.77-.085-1.35-.188-1.755H12.24z"/>
              </svg>
              Sign in with Google
            </button>
            
            <button 
              @click=${() => this.showCloudPromptModal = false}
              style="background: transparent; border: 1px solid var(--border-color); color: var(--text-secondary); padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 0.9rem; cursor: pointer; width: 100%;"
            >
              Keep Saving Locally
            </button>
          </div>

        </div>
      </div>
    `;
  }

  private renderShareModal() {
    return html`
      <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center;" @click=${this.handleCloseShareModal}>
        <div class="glass-panel" style="width: 640px; max-width: 90vw; max-height: 90vh; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 24px;" @click=${(e: Event) => e.stopPropagation()}>
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h2 style="margin: 0; font-family: var(--font-heading); color: var(--accent-gold);">Share Progression</h2>
            <button class="btn-compact-toggle" @click=${this.handleCloseShareModal}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
            Select a destination device to export your chord progression. Clicking the device opens it in a new tab.
          </p>

          <div class="share-grid">
            <!-- M8 Tracker Card -->
            <div 
              @click=${() => this.openDeviceLink('m8')}
              class="device-card"
            >
              <!-- Dirtywave M8 Tracker SVG -->
              <svg width="140" height="200" viewBox="0 0 240 340" style="filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));">
                <defs>
                  <linearGradient id="m8-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#2a2d32" />
                    <stop offset="100%" stop-color="#15171a" />
                  </linearGradient>
                  <linearGradient id="m8-key-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#3c4046" />
                    <stop offset="100%" stop-color="#1d2024" />
                  </linearGradient>
                  <linearGradient id="m8-key-top-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#2a2c30" />
                    <stop offset="100%" stop-color="#141518" />
                  </linearGradient>
                  <filter id="m8-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5" />
                  </filter>
                  <filter id="m8-key-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.4" />
                  </filter>
                </defs>
                
                <!-- Outer Casing -->
                <rect x="2" y="2" width="236" height="336" rx="14" fill="url(#m8-body-grad)" stroke="#3e434a" stroke-width="1.5" />
                
                <!-- Screen Bezel -->
                <rect x="18" y="18" width="204" height="132" rx="6" fill="#090a0c" stroke="#1c1f24" stroke-width="1" />
                
                <!-- Screen Display -->
                <rect x="24" y="24" width="192" height="120" rx="3" fill="#070c12" />
                
                <!-- Screen Contents -->
                <text x="32" y="44" fill="#ff4d6d" font-family="monospace" font-size="9" font-weight="bold">SONG</text>
                <text x="185" y="44" fill="#00e5ff" font-family="monospace" font-size="8" text-anchor="end">T▸140</text>
                
                <!-- Column Headers -->
                <text x="56" y="44" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.6">1  2  3  4  5  6  7  8</text>
                
                <!-- Grid Tracker Rows -->
                <text x="32" y="58" fill="#00e5ff" font-family="monospace" font-size="7">00 C4 D4 E4 G4 A4 C5 D5 E5</text>
                <text x="32" y="68" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.5">01 -- -- -- -- -- -- -- --</text>
                <text x="32" y="78" fill="#00e5ff" font-family="monospace" font-size="7">02 E4 G4 A4 C5 D5 E5 G5 A5</text>
                <text x="32" y="88" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.5">03 -- -- -- -- -- -- -- --</text>
                <text x="32" y="98" fill="#00e5ff" font-family="monospace" font-size="7">04 A4 C5 D5 E5 G5 A5 C6 D6</text>
                <text x="32" y="108" fill="#00e5ff" font-family="monospace" font-size="7" opacity="0.5">05 -- -- -- -- -- -- -- --</text>
                
                <!-- M8 Logo -->
                <g transform="translate(24, 178)">
                  <path d="M0,0 h16 v4 h-16 z M0,6 h16 v2 h-16 z" fill="#717780" />
                  <text x="0" y="16" fill="#8d94a0" font-family="sans-serif" font-size="10" font-weight="bold" letter-spacing="1">M8</text>
                </g>
                
                <!-- Upper Right Edit Keys -->
                <!-- OPT Key -->
                <rect x="124" y="166" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="126" y="168" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                <text x="143" y="214" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">⚯ OPT</text>
                
                <!-- EDIT Key -->
                <rect x="174" y="166" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="176" y="168" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                <text x="193" y="214" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">✶ EDIT</text>
                
                <!-- Navigation Cluster -->
                <!-- UP Caret Label -->
                <text x="93" y="172" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">▴</text>
                <!-- UP Key -->
                <rect x="74" y="176" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="76" y="178" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                
                <!-- LEFT Caret Label -->
                <text x="16" y="248" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">◂</text>
                <!-- LEFT Key -->
                <rect x="24" y="226" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="26" y="228" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                
                <!-- DOWN Caret Label -->
                <text x="93" y="274" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">▾</text>
                <!-- DOWN Key -->
                <rect x="74" y="226" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="76" y="228" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                
                <!-- RIGHT Caret Label -->
                <text x="170" y="248" fill="#717780" font-family="sans-serif" font-size="8" text-anchor="middle">▸</text>
                <!-- RIGHT Key -->
                <rect x="124" y="226" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="126" y="228" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                
                <!-- Action Bottom Keys -->
                <!-- SHIFT Key -->
                <rect x="74" y="278" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="76" y="280" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                <text x="93" y="326" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">⇪ SHIFT</text>
                
                <!-- PLAY Key -->
                <rect x="124" y="278" width="38" height="38" rx="4" fill="url(#m8-key-grad)" filter="url(#m8-key-shadow)" />
                <rect x="126" y="280" width="34" height="32" rx="3" fill="url(#m8-key-top-grad)" />
                <text x="143" y="326" fill="#717780" font-family="sans-serif" font-size="6.5" text-anchor="middle" font-weight="bold">▸ PLAY</text>
                
                <!-- Speaker Grills -->
                <g transform="translate(24, 286)" fill="#090a0c">
                  <rect x="0" y="0" width="16" height="2" rx="0.5" />
                  <rect x="0" y="4" width="16" height="2" rx="0.5" />
                  <rect x="0" y="8" width="16" height="2" rx="0.5" />
                  <rect x="0" y="12" width="16" height="2" rx="0.5" />
                  <rect x="0" y="16" width="16" height="2" rx="0.5" />
                </g>
                <g transform="translate(198, 286)" fill="#090a0c">
                  <rect x="0" y="0" width="16" height="2" rx="0.5" />
                  <rect x="0" y="4" width="16" height="2" rx="0.5" />
                  <rect x="0" y="8" width="16" height="2" rx="0.5" />
                  <rect x="0" y="12" width="16" height="2" rx="0.5" />
                  <rect x="0" y="16" width="16" height="2" rx="0.5" />
                </g>
              </svg>

              <div style="margin-top: 16px; font-weight: bold; font-family: var(--font-heading); color: var(--accent-gold); font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">M8 Tracker</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; text-align: center;">Opens Hypersyn helper with progression</div>
            </div>

            <!-- Circuit Tracks Card -->
            <div 
              @click=${() => this.openDeviceLink('circuit')}
              class="device-card"
            >
              <!-- Novation Circuit Tracks SVG -->
              <svg width="140" height="200" viewBox="0 0 240 340" style="filter: drop-shadow(0 8px 16px rgba(0,0,0,0.4));">
                <defs>
                  <linearGradient id="ct-body-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#2a2d32" />
                    <stop offset="100%" stop-color="#15171a" />
                  </linearGradient>
                  <linearGradient id="ct-knob-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#3c4046" />
                    <stop offset="100%" stop-color="#1d2024" />
                  </linearGradient>
                  <linearGradient id="ct-knob-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#2a2c30" />
                    <stop offset="100%" stop-color="#141518" />
                  </linearGradient>
                  
                  <filter id="ct-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                </defs>

                <!-- Outer Casing -->
                <rect x="2" y="52" width="236" height="236" rx="14" fill="url(#ct-body-grad)" stroke="#3e434a" stroke-width="1.5" />

                <!-- Logo & Text -->
                <text x="18" y="74" fill="#e2e8f0" font-family="sans-serif" font-size="10" font-weight="900" letter-spacing="1">CIRCUIT TRACKS</text>
                
                <!-- Novation Logo (Upper Right) -->
                <g transform="translate(202, 60)">
                  <rect x="0" y="0" width="18" height="18" rx="4" fill="#090a0c" stroke="#1c1f24" stroke-width="1" />
                  <path d="M4 14 L14 4" stroke="#ab8b61" stroke-width="2.5" stroke-linecap="round" />
                  <path d="M7 14 L14 7" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round" />
                </g>

                <!-- Knobs Row 1 -->
                <!-- Master Volume -->
                <g transform="translate(32, 104) rotate(-45)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="32" y="118" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">VOLUME</text>
                <circle cx="32" cy="112" r="1.5" fill="#f59e0b" filter="url(#ct-glow-cyan)"/>

                <!-- 2 Oscillator Mod -->
                <g transform="translate(76, 104) rotate(30)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="76" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">OSC 2 MOD</text>
                <circle cx="76" cy="112" r="1.5" fill="#a855f7" filter="url(#ct-glow-cyan)"/>

                <!-- 4 Filter Envelope -->
                <g transform="translate(120, 104) rotate(90)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="120" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FLT ENV</text>
                <circle cx="120" cy="112" r="1.5" fill="#ec4899" filter="url(#ct-glow-cyan)"/>

                <!-- 6 Resonance -->
                <g transform="translate(164, 104) rotate(-90)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="164" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">RESONANCE</text>
                <circle cx="164" cy="112" r="1.5" fill="#3b82f6" filter="url(#ct-glow-cyan)"/>

                <!-- 8 FX -->
                <g transform="translate(208, 104) rotate(15)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="208" y="93" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FX DEPTH</text>
                <circle cx="208" cy="112" r="1.5" fill="#06b6d4" filter="url(#ct-glow-cyan)"/>

                <!-- Knobs Row 2 -->
                <!-- 1 Oscillator -->
                <g transform="translate(54, 138) rotate(-60)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="54" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">OSC 1 MOD</text>
                <circle cx="54" cy="146" r="1.5" fill="#a855f7" filter="url(#ct-glow-cyan)"/>

                <!-- 3 Amp Envelope -->
                <g transform="translate(98, 138) rotate(45)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="98" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">AMP ENV</text>
                <circle cx="98" cy="146" r="1.5" fill="#ec4899" filter="url(#ct-glow-cyan)"/>

                <!-- 5 Filter Frequency -->
                <g transform="translate(142, 138) rotate(0)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="142" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FLT FREQ</text>
                <circle cx="142" cy="146" r="1.5" fill="#3b82f6" filter="url(#ct-glow-cyan)"/>

                <!-- 7 Modulation -->
                <g transform="translate(186, 138) rotate(120)">
                  <circle cx="0" cy="0" r="9" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="9" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="6" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-8" stroke="#ab8b61" stroke-width="1.2" stroke-linecap="round"/>
                </g>
                <text x="186" y="152" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">MODULATION</text>
                <circle cx="186" cy="146" r="1.5" fill="#06b6d4" filter="url(#ct-glow-cyan)"/>

                <!-- Master Filter -->
                <g transform="translate(208, 138) rotate(-20)">
                  <circle cx="0" cy="0" r="11" fill="#000" opacity="0.4" transform="translate(0, 1)"/>
                  <circle cx="0" cy="0" r="11" fill="url(#ct-knob-grad)" stroke="#303338" stroke-width="1"/>
                  <circle cx="0" cy="0" r="8" fill="url(#ct-knob-cap-grad)"/>
                  <line x1="0" y1="-2" x2="0" y2="-10" stroke="#ab8b61" stroke-width="1.5" stroke-linecap="round"/>
                </g>
                <text x="208" y="153" fill="#717780" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">MST FILTER</text>
                <circle cx="208" cy="148" r="1.5" fill="#ec4899" filter="url(#ct-glow-cyan)"/>

                <!-- Buttons Row 1 -->
                <g fill="#1b1c1f" stroke="#2e3136" stroke-width="0.5">
                  <rect x="22" y="168" width="16" height="8" rx="1.5" />
                  <rect x="42" y="168" width="16" height="8" rx="1.5" />
                  <rect x="62" y="168" width="16" height="8" rx="1.5" />
                  <rect x="82" y="168" width="16" height="8" rx="1.5" />
                  <rect x="102" y="168" width="16" height="8" rx="1.5" />
                  <rect x="122" y="168" width="16" height="8" rx="1.5" />
                  <rect x="142" y="168" width="16" height="8" rx="1.5" />
                  <rect x="162" y="168" width="16" height="8" rx="1.5" />
                  <rect x="182" y="168" width="16" height="8" rx="1.5" />
                  <rect x="202" y="168" width="16" height="8" rx="1.5" />
                </g>
                <polygon points="47,171 53,171 50,174" fill="#717780" />
                <polygon points="67,173 73,173 70,170" fill="#717780" />
                <rect x="85" y="171" width="3" height="2" rx="0.5" fill="#ab8b61" />
                <rect x="105" y="171" width="10" height="2" fill="#717780" />
                <circle cx="129" cy="172" r="1.5" fill="#717780" />
                <circle cx="149" cy="172" r="1.5" fill="#717780" />
                <rect x="167" y="171" width="6" height="2" fill="#717780" />
                <rect x="187" y="171" width="6" height="2" fill="#717780" />
                <text x="210" y="174" fill="#ab8b61" font-family="sans-serif" font-size="4" text-anchor="middle" font-weight="bold">SHIFT</text>

                <!-- Buttons Row 2 -->
                <g stroke="#2e3136" stroke-width="0.5">
                  <rect x="22" y="180" width="16" height="8" rx="1.5" fill="#1b1c1f" />
                  <rect x="42" y="180" width="16" height="8" rx="1.5" fill="#db2777" />
                  <rect x="62" y="180" width="16" height="8" rx="1.5" fill="#9333ea" />
                  <rect x="82" y="180" width="16" height="8" rx="1.5" fill="#2563eb" />
                  <rect x="102" y="180" width="16" height="8" rx="1.5" fill="#3b82f6" />
                  <rect x="122" y="180" width="16" height="8" rx="1.5" fill="#e11d48" />
                  <rect x="142" y="180" width="16" height="8" rx="1.5" fill="#f43f5e" />
                  <rect x="162" y="180" width="16" height="8" rx="1.5" fill="#ea580c" />
                  <rect x="182" y="180" width="16" height="8" rx="1.5" fill="#d97706" />
                  <rect x="202" y="180" width="16" height="8" rx="1.5" fill="#1b1c1f" />
                </g>
                <text x="30" y="186" fill="#717780" font-family="sans-serif" font-size="4" text-anchor="middle">PRESET</text>
                <text x="210" y="186" fill="#717780" font-family="sans-serif" font-size="4" text-anchor="middle">PTN</text>

                <!-- Left Vertical Buttons -->
                <g fill="#1b1c1f" stroke="#2e3136" stroke-width="0.5">
                  <rect x="16" y="198" width="16" height="13" rx="2" />
                  <rect x="16" y="216" width="16" height="13" rx="2" />
                  <rect x="16" y="234" width="16" height="13" rx="2" />
                  <rect x="16" y="252" width="16" height="13" rx="2" />
                </g>
                <text x="24" y="206" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">NOTE</text>
                <text x="24" y="224" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">VEL</text>
                <text x="24" y="242" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">GATE</text>
                <text x="24" y="260" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">PTN</text>

                <!-- Right Vertical Buttons -->
                <g fill="#1b1c1f" stroke="#2e3136" stroke-width="0.5">
                  <rect x="208" y="198" width="16" height="13" rx="2" />
                  <rect x="208" y="216" width="16" height="13" rx="2" />
                  <rect x="208" y="234" width="16" height="13" rx="2" />
                  <rect x="208" y="252" width="16" height="13" rx="2" />
                </g>
                <text x="216" y="206" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">MIX</text>
                <text x="216" y="224" fill="#8e94a0" font-family="sans-serif" font-size="4.5" text-anchor="middle" font-weight="bold">FX</text>
                <circle cx="216" cy="240.5" r="3.5" fill="#ef4444" filter="url(#ct-glow-cyan)" />
                <polygon points="214,255.5 214,261.5 219,258.5" fill="#22c55e" filter="url(#ct-glow-cyan)" />

                <!-- 4x8 Pad Grid -->
                <g stroke="#090a0c" stroke-width="0.5">
                  <!-- Row 0 -->
                  <rect x="38" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="59" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="80" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="101" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="122" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="143" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="164" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />
                  <rect x="185" y="198" width="17" height="13" rx="2.5" fill="#bae6fd" filter="url(#ct-glow-cyan)" />

                  <!-- Row 1 -->
                  <rect x="38" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="59" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="80" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="101" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="122" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="143" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="164" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />
                  <rect x="185" y="216" width="17" height="13" rx="2.5" fill="#38bdf8" filter="url(#ct-glow-cyan)" />

                  <!-- Row 2 -->
                  <rect x="38" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="59" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="80" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="101" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="122" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="143" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="164" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />
                  <rect x="185" y="234" width="17" height="13" rx="2.5" fill="#a855f7" filter="url(#ct-glow-cyan)" />

                  <!-- Row 3 -->
                  <rect x="38" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
                  <rect x="59" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
                  <rect x="80" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
                  <rect x="101" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
                  <rect x="122" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
                  <rect x="143" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
                  <rect x="164" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
                  <rect x="185" y="252" width="17" height="13" rx="2.5" fill="#ec4899" filter="url(#ct-glow-cyan)" />
                </g>
              </svg>

              <div style="margin-top: 16px; font-weight: bold; font-family: var(--font-heading); color: var(--accent-gold); font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em;">Circuit Tracks</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; text-align: center;">Opens Circuit Tracks helper with progression</div>
            </div>
          </div>

        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chord-voyager-app': ChordVoyagerApp;
  }
}
