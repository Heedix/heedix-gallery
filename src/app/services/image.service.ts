import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {response} from "express";
import {ImageInterface} from "../interfaces/ImageInterface";
import {folderOrImageInterface} from "../interfaces/FolderOrImageInterface";
import {environment} from "../environments/environment";

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('authToken')
    })
  };

  constructor(private http: HttpClient) { }

  public getImages() {
    return this.http.get<any>(`${API_URL}/images`, this.httpOptions).pipe(
      //tap(response => console.log(response))
    );
  }

  public async getAccountImages(): Promise<folderOrImageInterface[]> {
    const response = await fetch(`${API_URL}/account/images`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('authToken')
      }
    })
    const data = await response.json();
    return data.map((item: any) => ({
      name: item.name,
      username: item.username,
      date: item.upload_date_time,
      visibility: item.visibility,
      source: item.source,
      downloads: item.downloads
    }));
  }

  public getSignedImageUrl(source: string) {
    return this.http.get<{ signedUrl: string }>(API_URL + `/getSignedImageUrl/${source}`, this.httpOptions).pipe(
      //tap(response => console.log(response))
    );
  }

  public getImageById(id: number){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${API_URL}/images/${id}`, httpOptions).pipe(

      tap(response => console.log(response))
    );
  }

  public updateImages() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
