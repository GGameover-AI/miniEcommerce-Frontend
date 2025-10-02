import { Component,HostListener,OnInit } from '@angular/core';
import { NgFor,NgClass,CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductModel } from '../../../models/product-model';
import { ProductService } from '../../../services/product-service';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, CurrencyPipe, NgClass],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  constructor(private productService:ProductService,private cartService:CartService , private router:Router){}

  ngOnInit(): void {
    this.loadProduct()
    this.updateProductPerPage()
  }

  baseProducts:ProductModel[] = []
  filteredProduct:ProductModel[] = []
  paginatedProduct:ProductModel[][] = [] // เก็บ array ใน array
  showProduct:ProductModel[] = []

  productsPerPage:number = 10
  currentPage:number = 0
  filterType:string[] = ['ทั้งหมด','อาหาร','เสื้อผ้า','ไอที']
  currentType:string = ''

  @HostListener('window:resize')
  onResize(){
    this.updateProductPerPage()
    this.paginateProduct()
  }

  updateProductPerPage(){
    if(window.innerWidth < 1024){
      this.productsPerPage = 10
    }else{
      this.productsPerPage = 12
    }
  }

  //#region Interaction

  //Filter
  filterProduct(categoryProduct:string){
    if(categoryProduct === 'ทั้งหมด' || categoryProduct === ''){
      this.filteredProduct = [...this.baseProducts]
      console.log('แสดงรายการสินค้า ' + categoryProduct)
    }
    else{
      this.filteredProduct = this.baseProducts.filter(p => p.category === categoryProduct)
      console.log('แสดงรายการสินค้าประเภท ' + categoryProduct)
    }
    this.currentType = categoryProduct
    this.paginateProduct()
  }

  //Pagiantion
  paginateProduct(){
    this.paginatedProduct = []
    let totalPerPage:number = Math.ceil(this.filteredProduct.length/this.productsPerPage)
    let startIndex:number = 0
    let endIndex:number = this.productsPerPage

    for(let i = 0;i < totalPerPage;i++){
      this.paginatedProduct.push(this.filteredProduct.slice(startIndex,endIndex))
      startIndex = endIndex
      endIndex += this.productsPerPage
    }

    this.onButtonNextPage(1) //Index ที่ 0 ของ pagination / แสดงหน้าที่ 1
    console.log('paginatedProduct : ',this.paginatedProduct)
  }

  //Go To ProductDetail Page
  onCardProduct(id:number){
    this.router.navigate(['/detail',id])
    console.log('Card Click!')
  }

  //Add Product to Cart
  onButtonBuy(product:ProductModel){
    this.cartService.addToCart(product)
  }

  //นำ index ของ paginatedProduct มาแสดง
  onButtonNextPage(pageNumber:number){
    this.showProduct = this.paginatedProduct[pageNumber - 1]
    this.currentPage = pageNumber - 1
    console.log(this.currentPage)
  }

  //#endregion



  loadProduct(){
    this.productService.originProduct$.subscribe(
      {
        next:(res) => {this.baseProducts = res
          this.filterProduct('ทั้งหมด')
          console.log('baseProduct : ',this.baseProducts)
        },
        error:(err) => console.error("ERROR LoadProduct : " + err)
      }
    )
  }
}