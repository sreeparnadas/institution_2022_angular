import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Picture} from "../models/picture.model";


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }
  getImages() {
    return this.http.get<any>('assets/gallery/photos.json')
      .toPromise()
      .then(res => <Picture[]>res.data)
      .then(data => { return data; });
  }
}
