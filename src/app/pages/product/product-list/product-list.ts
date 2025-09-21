import { Component,OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';
import { NgFor } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, CurrencyPipe, NgClass],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  constructor(private productService:ProductService,private router:Router){}

  ngOnInit(): void {
    this.loadProduct()
  }

  baseProducts:ProductModel[] = []
  fillteredProduct:ProductModel[] = []
  paginationProdcut:ProductModel[] = []
  showProduct:ProductModel[] = []


  fillterProduct(categoryProduct:string){
    if(categoryProduct === 'ทั้งหมด' || categoryProduct === ''){
      this.fillteredProduct = [...this.baseProducts]
      console.log('แสดงรายการสินค้า ' + categoryProduct)
    }
    else{
      this.fillteredProduct = this.baseProducts.filter(p => p.category === categoryProduct)
      console.log('แสดงรายการสินค้าประเภท ' + categoryProduct)
    }
  }



  loadProduct(){
    this.productService.fetchProduct().subscribe()//เรียกใช้ api เพื่อดึงรายการสินค้า
    this.productService.originProduct$.subscribe(
      {
        next:(res) => {this.baseProducts = res
          this.fillterProduct('ทั้งหมด')
        },
        error:(err) => console.error("ERROR LoadProduct : " + err)
      }
    )
  }


  //#region Interaction
  onCardProduct(id:number){
    this.router.navigate(['/detail',id])
    console.log('Card Click!')
  }

  onButtonBuy(){
    console.log('Buying Click!')
  }
  //#endregion
}
