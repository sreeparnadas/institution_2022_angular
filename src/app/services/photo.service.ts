import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Picture} from "../models/picture.model";

export interface Product {
  id?:string;
  code?:string;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}

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
  getProductsSmall() {
    return this.http.get<any>('assets/carousel/carousel-file.json')
      .toPromise()
      .then(res => <Product[]>res.data)
      .then(data => { return data; });
  }
}