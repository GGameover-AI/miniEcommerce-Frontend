import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginModel } from '../models/user-login-model';
import { Observable, tap } from 'rxjs';
import { UserRegisterModel } from '../models/user-register-model';
import { UserInfoModel } from '../models/user-info-model';
import {jwtDecode} from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private route:Router){}

  private API_URL:string = environment.apiUrl
  private tokenKey:string = 'jwt_token'

  login(user:UserLoginModel):Observable<any>{
    return this.http.post<any>(`${this.API_URL}/Auth/login`,user)
    .pipe(
      tap(
        res => {
          if(res && res.token){
            sessionStorage.setItem(this.tokenKey,res.token)
            this.route.navigate([''])
          }
        }
      )
    )
  }

  register(createUser:UserRegisterModel):Observable<any>{
    return this.http.post<any>(`${this.API_URL}/Auth/Register`,createUser)
  }

  logout(){
    sessionStorage.removeItem(this.tokenKey)//ลบ token
    this.route.navigate(['/login'])//กลับไปหน้า login
  }

  getToken():string|null{
    return sessionStorage.getItem(this.tokenKey)
  }

  getUserInfo():any{
    const token = this.getToken()
    if(!token) return
    const decoded = jwtDecode<UserInfoModel>(token)

    return decoded
  }

  isLogin():boolean{
    return !!this.getToken()
  }
}
