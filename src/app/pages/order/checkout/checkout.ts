import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
    userContact = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]),
    email: new FormControl('', [Validators.email]),
    address: new FormControl('',[Validators.required])
  })

  get fullName(){return this.userContact.get('fullName')}
  get phone(){return this.userContact.get('phone')}
  get email(){return this.userContact.get('email')}
  get address(){return this.userContact.get('address')}

  onSubmit() {
    console.log(this.userContact.value)
  }

  //ป้องกันการใส่ตัวอักษรอื่นนอกจาก 0-9
  onlyNumberPhone(event: KeyboardEvent) {
    const charCode = event.charCode
    //ตัวเลขคือ ASCII code ของ keyboard
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
