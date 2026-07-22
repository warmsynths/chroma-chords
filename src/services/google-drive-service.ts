import { ProjectData } from './project-service';

export class GoogleDriveService {
  private accessToken: string | null = null;
  private readonly FILENAME = 'chroma_chords_projects.json';
  private readonly OLD_FILENAME = 'chord_voyager_projects.json';

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  hasAccessToken(): boolean {
    return this.accessToken !== null;
  }

  private get headers() {
    if (!this.accessToken) {
      throw new Error('Not authorized. Missing access token.');
    }
    return {
      'Authorization': `Bearer ${this.accessToken}`
    };
  }

  /**
   * Searches for the projects file in the appDataFolder.
   * Returns the fileId if found, or null if not.
   */
  async findProjectFileId(): Promise<string | null> {
    try {
      const query = encodeURIComponent(`name='${this.FILENAME}' and trashed=false`);
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${query}&fields=files(id)`, 
        {
          method: 'GET',
          headers: this.headers
        }
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized');
        throw new Error(`Drive API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.files && data.files.length > 0) {
        return data.files[0].id;
      }

      // Check legacy file name if new file isn't found
      const oldQuery = encodeURIComponent(`name='${this.OLD_FILENAME}' and trashed=false`);
      const oldResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${oldQuery}&fields=files(id)`,
        {
          method: 'GET',
          headers: this.headers
        }
      );

      if (oldResponse.ok) {
        const oldData = await oldResponse.json();
        if (oldData.files && oldData.files.length > 0) {
          return oldData.files[0].id;
        }
      }

      return null;
    } catch (e) {
      console.error('Failed to find project file in Google Drive:', e);
      throw e;
    }
  }

  /**
   * Downloads the project data from Google Drive.
   */
  async loadProjects(): Promise<ProjectData[] | null> {
    try {
      const fileId = await this.findProjectFileId();
      if (!fileId) return null;

      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          method: 'GET',
          headers: this.headers
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }

      const projects = await response.json();
      return projects as ProjectData[];
    } catch (e) {
      console.error('Failed to load projects from Google Drive:', e);
      throw e;
    }
  }

  /**
   * Saves the project data to Google Drive.
   * Creates the file if it doesn't exist, otherwise updates it.
   */
  async saveProjects(projects: ProjectData[]): Promise<void> {
    try {
      const fileId = await this.findProjectFileId();
      const content = JSON.stringify(projects);

      if (fileId) {
        // Update existing file content
        const response = await fetch(
          `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
          {
            method: 'PATCH',
            headers: {
              ...this.headers,
              'Content-Type': 'application/json'
            },
            body: content
          }
        );
        if (!response.ok) throw new Error(`Failed to update file: ${response.statusText}`);
      } else {
        // Create new file metadata
        const metadataResponse = await fetch(
          'https://www.googleapis.com/drive/v3/files',
          {
            method: 'POST',
            headers: {
              ...this.headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.FILENAME,
              parents: ['appDataFolder']
            })
          }
        );
        
        if (!metadataResponse.ok) throw new Error(`Failed to create file metadata: ${metadataResponse.statusText}`);
        const metadata = await metadataResponse.json();
        const newFileId = metadata.id;

        // Upload content to new file
        const uploadResponse = await fetch(
          `https://www.googleapis.com/upload/drive/v3/files/${newFileId}?uploadType=media`,
          {
            method: 'PATCH',
            headers: {
              ...this.headers,
              'Content-Type': 'application/json'
            },
            body: content
          }
        );
        if (!uploadResponse.ok) throw new Error(`Failed to upload new file content: ${uploadResponse.statusText}`);
      }
    } catch (e) {
      console.error('Failed to save projects to Google Drive:', e);
      throw e;
    }
  }

  // --- Audio Track specific methods ---

  private async findAudioFileId(projectId: string): Promise<string | null> {
    try {
      const filename = `recording_${projectId}.webm`;
      const query = encodeURIComponent(`name='${filename}' and trashed=false`);
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${query}&fields=files(id)`, 
        {
          method: 'GET',
          headers: this.headers
        }
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error('Unauthorized');
        throw new Error(`Drive API error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.files && data.files.length > 0) {
        return data.files[0].id;
      }
      return null;
    } catch (e) {
      console.error(`Failed to find audio file for project ${projectId}:`, e);
      throw e;
    }
  }

  async uploadAudioFile(projectId: string, audioBlob: Blob): Promise<string> {
    try {
      const filename = `recording_${projectId}.webm`;
      const fileId = await this.findAudioFileId(projectId);

      if (fileId) {
        // Update existing file content
        const response = await fetch(
          `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
          {
            method: 'PATCH',
            headers: {
              ...this.headers,
              'Content-Type': audioBlob.type || 'audio/webm'
            },
            body: audioBlob
          }
        );
        if (!response.ok) throw new Error(`Failed to update audio file: ${response.statusText}`);
        return fileId;
      } else {
        // Create new file metadata
        const metadataResponse = await fetch(
          'https://www.googleapis.com/drive/v3/files',
          {
            method: 'POST',
            headers: {
              ...this.headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: filename,
              parents: ['appDataFolder']
            })
          }
        );
        
        if (!metadataResponse.ok) throw new Error(`Failed to create audio file metadata: ${metadataResponse.statusText}`);
        const metadata = await metadataResponse.json();
        const newFileId = metadata.id;

        // Upload content to new file
        const uploadResponse = await fetch(
          `https://www.googleapis.com/upload/drive/v3/files/${newFileId}?uploadType=media`,
          {
            method: 'PATCH',
            headers: {
              ...this.headers,
              'Content-Type': audioBlob.type || 'audio/webm'
            },
            body: audioBlob
          }
        );
        if (!uploadResponse.ok) throw new Error(`Failed to upload new audio file content: ${uploadResponse.statusText}`);
        return newFileId;
      }
    } catch (e) {
      console.error(`Failed to upload audio file for project ${projectId}:`, e);
      throw e;
    }
  }

  async downloadAudioFile(projectId: string): Promise<Blob | null> {
    try {
      const fileId = await this.findAudioFileId(projectId);
      if (!fileId) return null;

      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
        {
          method: 'GET',
          headers: this.headers
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download audio file: ${response.statusText}`);
      }

      return await response.blob();
    } catch (e) {
      console.error(`Failed to download audio file for project ${projectId}:`, e);
      throw e;
    }
  }

  async deleteAudioFile(projectId: string): Promise<void> {
    try {
      const fileId = await this.findAudioFileId(projectId);
      if (!fileId) return;

      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}`,
        {
          method: 'DELETE',
          headers: this.headers
        }
      );

      if (!response.ok && response.status !== 404) {
        throw new Error(`Failed to delete audio file: ${response.statusText}`);
      }
    } catch (e) {
      console.error(`Failed to delete audio file for project ${projectId}:`, e);
      throw e;
    }
  }
}
