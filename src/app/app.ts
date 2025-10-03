import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { ProductService } from './services/product-service';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar,NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(private productService:ProductService,private authService:AuthService){}

  ngOnInit(): void {
      this.productService.fetchProduct() // เรียก api ดึงรายการสินค้าจาก backend
  }

  get loginCheck():boolean{
    return this.authService.isLogin()
  }
}
