import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { UserLoginModel } from '../../../models/user-login-model';
import { Loading } from "../../../shared/components/loading/loading";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Loading],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private authService: AuthService) { }

  messageLoading: string = 'กำลังล็อกอิน'
  isLoading: boolean = false

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  onLogin() {

    if (this.formLogin.valid) {
      this.isLoading = true
      const loginPayload: UserLoginModel = {
        "username": this.formLogin.get('username')?.value as string,
        "password": this.formLogin.get('password')?.value as string,
      }


      this.authService.login(loginPayload).subscribe(
        {
          next: () => { this.isLoading = false },
          error: (err) => {
            this.isLoading = false
            alert(err.error?.message || "เกิดข้อผิดพลาด:Server อาจอยู่ในโหมด Sleep ZZzzz...")
          }
        })
    }
  }
}
