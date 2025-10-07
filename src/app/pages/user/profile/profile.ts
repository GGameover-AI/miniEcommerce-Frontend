import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { OrderService } from '../../../services/order-service';
import { OrderHistoryModel } from '../../../models/order-history-model';
import { UserInfoModel } from '../../../models/user-info-model';

@Component({
  selector: 'app-profile',
  imports: [NgIf, NgFor, CurrencyPipe],
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
  userInfo: UserInfoModel = { sub: '', unique_name: '', email: '' }

  // ถ้าไม่ประกาศ (OrderHistoryModel & {expand:boolean})[] expend ใน onExpend จะหาไม่เจอ
  orderListWithExpand:(OrderHistoryModel & {expand:boolean})[] = [] 

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
    this.orderService.orderHistory$.subscribe(
      {
        next: (res) => { 
          this.orderList = res 
          this.orderListWithExpand =  this.orderList.map(e => ({ ...e, expand: false }))
        },
        error: (err) => console.log(err)
      }
    )
  }
}
