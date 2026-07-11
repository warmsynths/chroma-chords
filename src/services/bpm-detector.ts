/**
 * A lightweight, self-contained beat/BPM detection algorithm for AudioBuffers.
 * Based on energy peak detection and interval grouping.
 */
export function estimateBPM(audioBuffer: AudioBuffer): number {
  const sampleRate = audioBuffer.sampleRate;
  const channelData = audioBuffer.getChannelData(0);
  
  // 1. Calculate energy envelope (RMS over 20ms windows)
  const windowSize = Math.round(sampleRate * 0.02); // 20ms window
  const hopSize = Math.round(sampleRate * 0.01);    // 10ms hop
  const energies: number[] = [];
  const times: number[] = [];
  
  for (let i = 0; i < channelData.length - windowSize; i += hopSize) {
    let sum = 0;
    for (let j = 0; j < windowSize; j++) {
      sum += channelData[i + j] * channelData[i + j];
    }
    energies.push(Math.sqrt(sum / windowSize));
    times.push(i / sampleRate);
  }
  
  // 2. Find peaks in the energy envelope
  // We use a dynamic threshold: 1.3 * local average (within a 1.5s window)
  const localAvgWindow = Math.round(1.5 / 0.01); // 1.5 seconds in hops (100ms * 15)
  const peaks: number[] = [];
  
  for (let i = 0; i < energies.length; i++) {
    const val = energies[i];
    
    // Calculate local average around i
    const start = Math.max(0, i - Math.round(localAvgWindow / 2));
    const end = Math.min(energies.length, i + Math.round(localAvgWindow / 2));
    let sum = 0;
    for (let k = start; k < end; k++) sum += energies[k];
    const avg = sum / (end - start);
    
    // Peak conditions:
    // - Value is greater than dynamic threshold
    // - Value is a local maximum
    // - Minimum distance from last peak: 0.25 seconds (240 BPM max)
    const dynamicThreshold = Math.max(0.01, avg * 1.3); // minimum floor to avoid noise peaks
    if (val > dynamicThreshold) {
      const isLocalMax = (i === 0 || val >= energies[i - 1]) && (i === energies.length - 1 || val >= energies[i + 1]);
      if (isLocalMax) {
        const peakTime = times[i];
        if (peaks.length === 0 || (peakTime - peaks[peaks.length - 1]) > 0.25) {
          peaks.push(peakTime);
        }
      }
    }
  }
  
  if (peaks.length < 2) {
    return 0; // Not enough peaks detected
  }
  
  // 3. Calculate intervals between peaks
  const intervals: number[] = [];
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1]);
  }
  
  // 4. Cluster intervals to find the dominant tempo
  // We group intervals that are close to each other (within 5% tolerance)
  const clusters: { interval: number; count: number }[] = [];
  const tolerance = 0.05; // 5% tolerance
  
  intervals.forEach(interval => {
    let matched = false;
    for (const c of clusters) {
      if (Math.abs(c.interval - interval) / c.interval < tolerance) {
        c.interval = (c.interval * c.count + interval) / (c.count + 1); // average interval
        c.count++;
        matched = true;
        break;
      }
    }
    if (!matched) {
      clusters.push({ interval, count: 1 });
    }
  });
  
  if (clusters.length === 0) return 0;
  
  // Sort clusters by count descending
  clusters.sort((a, b) => b.count - a.count);
  
  const dominantInterval = clusters[0].interval;
  let estimatedBpm = 60 / dominantInterval;
  
  // Normalise BPM to a standard range: 60 to 180 BPM
  while (estimatedBpm < 60 && estimatedBpm > 0) estimatedBpm *= 2;
  while (estimatedBpm > 180) estimatedBpm /= 2;
  
  return Math.round(estimatedBpm);
}
