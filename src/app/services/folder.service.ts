import {Injectable} from '@angular/core';
import {folderOrImageInterface} from "../interfaces/FolderOrImageInterface";
import {environment} from "../environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor() {
  }

  public async getAccountFolders(): Promise<folderOrImageInterface[]> {
    const response = await fetch(`${API_URL}/account/folders`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken')
      }
    })
    const data = await response.json();
    return data.map((item: any) => ({
      name: item.name,
      username: item.username,
      date: item.creationdate,
      visibility: item.visibility,
      source: item.thumbnailsource,
      downloads: 5
    }));
  }

  public async getEditableFolders() {
    const response = await fetch(`${API_URL}/account/folders/editable`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken')
      }
    })
    const data = await response.json();
    return data.map((item: any) => ({
      name: item.name,
      deletable: item.deletable,
      folderId: item.folder_id,
      owner: item.owner
    }));
  }
}
