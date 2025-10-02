import { NgIf,NgFor,CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-profile',
  imports: [NgIf,NgFor,CurrencyPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{

  constructor(private authService:AuthService){}

  ngOnInit(): void {
      
  }

  orderList = [
    {"id":1,"name":"g","price":120},
    {"id":2,"name":"Ai","price":500}
  ]

  orderListWithExpand = this.orderList.map(e => ({...e,expand:false}))

  onExpend(index:number){
    this.orderListWithExpand[index].expand = !this.orderListWithExpand[index].expand
  }

  onLogout(){
    this.authService.logout()
  }
}
