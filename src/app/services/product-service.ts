import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient){}
  private API_URL = 'http://localhost:3000/products'

  private originProduct = new BehaviorSubject<ProductModel[]>([])
  originProduct$ = this.originProduct.asObservable()

  //#region API
  fetchProduct():void{
    this.http.get<ProductModel[]>(this.API_URL).subscribe(
      res => this.originProduct.next(res)
    )
  }
  //#endregion
}
