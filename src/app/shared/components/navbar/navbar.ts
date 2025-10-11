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

  isExpand:boolean = false
  private expandTimeout?:ReturnType<typeof setTimeout>
  private collapseTimeout?:ReturnType<typeof setTimeout>


  baseProduct: ProductModel[] = []
  filteredProduct:ProductModel[] = []
  productsInCart:number = 0
  userID: number = 1

  searchBox = new FormControl('')

  //แสดงตามคำที่ค้นหาโดยไม่เอาสินค้าที่มีจำนวน 0
  filterKeyword(keyword:string){
    keyword = keyword.toLowerCase()
    this.filteredProduct = this.baseProduct.filter(p => p.name.toLowerCase().includes(keyword)&& p.quantity !== 0)
  }

  //รับค่าที่ค้นหา
  searchObserver(){
    this.searchBox.valueChanges.subscribe(
      keyword => {this.filterKeyword(keyword ?? '')}
    )
  }

  //กดเลือกสินค้า
  onSearchProduct(id:number){
    this.router.navigate(['/detail',id])
    this.searchBox.setValue('')
    //console.log('Card Click!')
  }

  //ดึงข้อมูลสินค้ามาไว้ใช้ใน การค้นหา
  loadProduct() {
    this.productService.originProduct$.subscribe(
      res => {
        this.baseProduct = res
        this.filteredProduct = res
      }
    )
  }

  //ติดตามจำนวนสินค้า
  loadCart(){
    this.cartService.cartStock$.subscribe(
      res => {
        this.productsInCart = res.length
        this.animCartItem()
      }
    )
  }

  //anim ของไอคอนบอกจำนวนสินค้าในตะกร้า
  animCartItem(){

    //เคลียร์animเก่า
    if(this.expandTimeout) clearTimeout(this.expandTimeout)
    if(this.collapseTimeout) clearTimeout(this.collapseTimeout)

    //รีเซ็ตสถานะ
    this.isExpand = false

    //ดีเลย์ไว้ DOM จับการเปลี่ยนแปลง
    this.expandTimeout = setTimeout(
      ()=>{
        this.isExpand = true
      },50)

    this.collapseTimeout = setTimeout(
      ()=>{
        this.isExpand = false
      },1000)

  }


}
