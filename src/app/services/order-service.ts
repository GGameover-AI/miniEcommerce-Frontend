import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderModel } from '../models/order-model';
import { CartService } from './cart-service';
import { HttpClient } from '@angular/common/http';
import { OrderHistoryModel } from '../models/order-history-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private cartService: CartService, private http: HttpClient) { }

  private API_URL = 'https://localhost:7112/Order'

  private orderHistory = new BehaviorSubject<OrderHistoryModel[]>([])
  orderHistory$ = this.orderHistory.asObservable()

  //ดึงรายการสั่งซื้อทั้งหมด
  fetchOrders():void {
    this.http.get<OrderHistoryModel[]>(`${this.API_URL}/GetOrders`).subscribe(
      {
        next: (res) => this.orderHistory.next(res)
      }
    )
  }

  //สร้างรายการสั่งซื้อ
  createOrder(orderInfo:OrderModel): Observable<OrderModel> {
    return this.http.post<OrderModel>(`${this.API_URL}/CreateOrder`, orderInfo)
  }

}
