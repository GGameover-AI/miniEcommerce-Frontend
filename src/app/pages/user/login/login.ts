import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { UserLoginModel } from '../../../models/user-login-model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private authService: AuthService) { }

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  usernameBearer: string = this.formLogin.get('username')?.value as string
  passwordBearer: string = this.formLogin.get('password')?.value as string

  loginPayload: UserLoginModel = { "username": this.usernameBearer, "password": this.passwordBearer }

  onLogin() {
    if (this.formLogin.valid) {
      this.authService.login(this.loginPayload).subscribe(
        {
          error: (err) => alert(err.error?.message ||"เกิดข้อมผิดพลาด")
        })
    }
  }
}
