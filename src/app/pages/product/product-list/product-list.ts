import { Component,OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [NgFor],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.loadProduct()
  }

  baseProducts:ProductModel[] = []

  loadProduct(){
    this.productService.fetchProduct().subscribe()
    this.productService.originProduct$.subscribe(
      {
        next:(res) => {this.baseProducts = res},
        error:(err) => console.error("ERROR IS " + err)
      }
    )
  }
}
