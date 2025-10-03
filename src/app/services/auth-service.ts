import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginModel } from '../models/user-login-model';
import { Observable, tap } from 'rxjs';
import { UserRegisterModel } from '../models/user-register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private route:Router){}

  private API_URL:string = 'https://localhost:7112/Auth'
  private tokenKey:string = 'jwt_token'

  login(user:UserLoginModel):Observable<any>{
    return this.http.post<any>(`${this.API_URL}/login`,user)
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
    return this.http.post<any>(`${this.API_URL}/Register`,createUser)
  }

  logout(){
    sessionStorage.removeItem(this.tokenKey)//ลบ token
    this.route.navigate(['/login'])//กลับไปหน้า login
  }

  getToken():string|null{
    return sessionStorage.getItem(this.tokenKey)
  }

  isLogin():boolean{
    return !!this.getToken()
  }
}
