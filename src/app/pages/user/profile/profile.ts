import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { OrderService } from '../../../services/order-service';
import { OrderHistoryModel } from '../../../models/order-history-model';
import { UserInfoModel } from '../../../models/user-info-model';
import { ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-profile',
  imports: [NgIf, NgFor, CurrencyPipe, ɵInternalFormsSharedModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  constructor(private authService: AuthService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadProfile()
    this.loadOrderHistory()
  }

  orderList: OrderHistoryModel[] = []
  userInfo: UserInfoModel | undefined

  // ถ้าไม่ประกาศ (OrderHistoryModel & {expand:boolean})[] expend ใน onExpend จะหาไม่เจอ
  //& {expand:boolean,total:number} คือการประกาศ field เพิ่ม
  orderListWithExpand:(OrderHistoryModel & {expand:boolean,total:number})[] = [] 

  onExpend(index: number) {
    this.orderListWithExpand[index].expand = !this.orderListWithExpand[index].expand
  }

  onLogout() {
    this.authService.logout()
  }

  loadProfile() {
    this.userInfo = this.authService.getUserInfo()
  }

  loadOrderHistory() {
    this.orderService.fetchOrders()
    this.orderService.orderHistory$.subscribe(
      {
        next: (res) => { 
          this.orderList = res 
          this.orderListWithExpand =  this.orderList.map(e => (
            { 
              ...e, 
              expand: false,
              total:e.products.reduce((sum,p) => sum + p.price,0) 
            }))
        },
        error: (err) => console.log(err)
      }
    )
  }
}
