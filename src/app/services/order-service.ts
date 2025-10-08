import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderModel } from '../models/order-model';
import { CartService } from './cart-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderHistoryModel } from '../models/order-history-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private cartService: CartService, private http: HttpClient) { }

  private API_URL = 'https://localhost:7112/Order'

  private orderHistory = new BehaviorSubject<OrderHistoryModel[]>([])
  orderHistory$ = this.orderHistory.asObservable()

  private getHeader():HttpHeaders{
    const token = sessionStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Authorization':`Bearer ${token}`,
      'Content-Type':'application/json'
    })
  }

  //ดึงรายการสั่งซื้อทั้งหมด
  fetchOrders():void {
    const headers = this.getHeader()
    this.http.get<OrderHistoryModel[]>(`${this.API_URL}`,{headers}).subscribe(
      {
        next: (res) => this.orderHistory.next(res)
      }
    )
  }

  //สร้างรายการสั่งซื้อ
  createOrder(orderInfo:OrderModel): Observable<string> {
    const headers = this.getHeader()
    return this.http.post<string>(`${this.API_URL}`, orderInfo,{headers})
  }

}
