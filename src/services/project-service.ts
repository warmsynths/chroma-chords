export interface ProjectChord {
  name: string;
  tag: string;
  roman: string;
  color: string;
  grain: number;
  functionLabel: string;
  notes: string[];
  scaleLabel: string;
  desc: string;
  degree: string;
  scaleKey: string;
  tension: number;
}

export interface ProjectData {
  id: string;
  name: string;
  lastModified: number;
  genre: string;
  mood: string;
  key: string;
  scaleType: string;
  bpm: number;
  chords: ProjectChord[];
  showTheory?: boolean;
  syncedToCloud?: boolean;
}

const STORAGE_KEY = 'chord_voyager_projects';

export class ProjectService {
  static getProjects(): ProjectData[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as ProjectData[];
      }
    } catch (e) {
      console.error('Failed to load projects from localStorage:', e);
    }
    return [];
  }

  static setProjects(projects: ProjectData[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to set projects to localStorage:', e);
    }
  }

  static mergeProjects(local: ProjectData[], cloud: ProjectData[]): ProjectData[] {
    const mergedMap = new Map<string, ProjectData>();
    
    // Add all local projects
    local.forEach(p => mergedMap.set(p.id, p));

    // Add or overwrite with cloud projects if they are newer
    cloud.forEach(cp => {
      const existing = mergedMap.get(cp.id);
      if (!existing || cp.lastModified > existing.lastModified) {
        mergedMap.set(cp.id, cp);
      } else if (cp.lastModified === existing.lastModified) {
        existing.syncedToCloud = true;
      }
    });

    return Array.from(mergedMap.values());
  }

  static saveProject(project: ProjectData): void {
    const projects = this.getProjects();
    const existingIndex = projects.findIndex(p => p.id === project.id);
    
    project.lastModified = Date.now();
    
    if (existingIndex >= 0) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save project to localStorage:', e);
    }
  }

  static deleteProject(id: string): void {
    let projects = this.getProjects();
    projects = projects.filter(p => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to delete project from localStorage:', e);
    }
  }

  static exportProjectFile(project: ProjectData): void {
    const dataStr = JSON.stringify(project, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_chord_voyager.json`;
    
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static importProjectFile(file: File): Promise<ProjectData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const parsed = JSON.parse(result);
          
          // Basic validation
          if (parsed && typeof parsed === 'object' && Array.isArray(parsed.chords)) {
            // Ensure imported project gets a new ID to avoid collisions
            parsed.id = Math.random().toString(36).substr(2, 9);
            parsed.lastModified = Date.now();
            resolve(parsed as ProjectData);
          } else {
            reject(new Error('Invalid project file format'));
          }
        } catch (err) {
          reject(new Error('Failed to parse JSON file'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
}
