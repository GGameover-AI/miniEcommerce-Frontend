import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { UserRegisterModel } from '../../../models/user-register-model';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  constructor(private authService: AuthService,private route:Router) { }

  //#region Form
  formRegister = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(16)]),
    password: new FormControl('', [Validators.required,Validators.minLength(10)]),
    confirmPassword: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email]),
  }, { validators: (form) => this.passwordMathCheck })
  //#endregion Form

  get username(){return this.formRegister.get('username')}
  get password() { return this.formRegister.get('password') }
  get confirmPassword() { return this.formRegister.get('confirmPassword') }
  get email() { return this.formRegister.get('email') }

  //เช็คยืนยันรหัสตรงกันไหม
  passwordMathCheck(form: AbstractControl): ValidationErrors | null {
    const password = this.formRegister.get('password')?.value
    const confirmPassword = this.formRegister.get('confirmPassword')?.value

    if (password !== confirmPassword) {
      return { passwordCorrect: true }
    }
    return null
  }

  passwordMathAlert():boolean{
    const password = this.formRegister.get('password')?.value
    const confirmPassword = this.formRegister.get('confirmPassword')?.value

    if (confirmPassword !== password) {
      return false
    }else{
      return true
    }
    
  }

  onRegister() {
    if (this.formRegister.valid) {
      const registerPayload: UserRegisterModel = {
        "username": this.formRegister.get('username')?.value as string,
        "password": this.formRegister.get('password')?.value as string,
        "email": this.formRegister.get('email')?.value as string,
      }

      this.authService.register(registerPayload).subscribe(
        {
          error: (err) => { alert(err.error?.message || 'เกิดข้อผิดพลาด') }
        }
      )

      this.route.navigate(['/login'])
    } else {
      alert('ข้อมูลบางส่วนไม่ถูกต้อง')
    }
  }
}
