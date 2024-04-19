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
}
