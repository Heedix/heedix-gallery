import { Injectable } from '@angular/core';
import {folderOrImageInterface} from "../interfaces/folderOrImageInterface";

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  baseUrl = 'http://localhost:3000'

  constructor() { }

  public async getAccountFolders(): Promise<folderOrImageInterface[]> {
    const response = await fetch(`${this.baseUrl}/api/account/folders`, {
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
}
