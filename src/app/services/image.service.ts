import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {response} from "express";
import {ImageInterface} from "../interfaces/ImageInterface";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public getImages(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.baseUrl}/images`, httpOptions).pipe(

      tap(response => console.log(response))
    );
  }

  public getImageById(id: number){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<any>(`${this.baseUrl}/images/${id}`, httpOptions).pipe(

      tap(response => console.log(response))
    );
  }

  /*imageInterfaceList: ImageInterface[] = [];

  public mapResponseAsImageInterface(input: Observable<any[]>) {
    let returnInterfaceList: ImageInterface[] = [];
    input.subscribe((imageInterfaceList) => {
      returnInterfaceList = imageInterfaceList.map((item: any) => ({
        imageId: item.imageid,
        source: item.source,
        downloads: item.downloads,
        width: item.width,
        height: item.height,
        size: parseInt(item.size),
        visible: item.visible
      }));
    })
    console.log(this.imageInterfaceList + 'hallo hallo hallo')
    return returnInterfaceList;
  }*/

  public updateImages() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    //this.http.put<any>('${this.baseUrl}/images/:imageid', body)
  }
}
