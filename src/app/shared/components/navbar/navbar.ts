import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { ProductModel } from '../../../models/product-model';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { NgFor,CurrencyPipe,NgIf } from '@angular/common';
import { CartService } from '../../../services/cart-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ReactiveFormsModule, NgFor, NgIf, CurrencyPipe, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  constructor(private productService: ProductService,private cartService:CartService,private router:Router) { }
  ngOnInit(): void {
    this.loadProduct()
    this.loadCart()
    this.searchObserver()
  }

  baseProduct: ProductModel[] = []
  filteredProduct:ProductModel[] = []
  productsInCart:number = 0
  userID: number = 1

  searchBox = new FormControl('')

  filterKeyword(keyword:string){
    keyword = keyword.toLowerCase()
    this.filteredProduct = this.baseProduct.filter(p => p.name.toLowerCase().includes(keyword)&& p.quantity !== 0)
  }

  searchObserver(){
    this.searchBox.valueChanges.subscribe(
      keyword => {this.filterKeyword(keyword ?? '')}
    )
  }

  onSearchProduct(id:number){
    this.router.navigate(['/detail',id])
    this.searchBox.setValue('')
    //console.log('Card Click!')
  }

  loadProduct() {
    this.productService.originProduct$.subscribe(
      res => {
        this.baseProduct = res
        this.filteredProduct = res
      }
    )
  }

  loadCart(){
    this.cartService.cartStock$.subscribe(
      res => {
        this.productsInCart = res.length
      }
    )
  }
}
