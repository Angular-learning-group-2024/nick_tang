import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { emailValidator } from './validator/email.directive';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NzIconModule, NgIf, NzDividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private router: Router, private message: NzMessageService) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, emailValidator(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)]],
    password: ['', Validators.required],
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }


  onSubmit() {
    if (!this.loginForm.valid) {
       return;
    }
    // TODO check from backend
    if (this.email?.value === 'nick_tang@epam.com' && this.password?.value === '123') {
      localStorage.setItem('token', 'true')
      this.router.navigate(['/admin']);
      return;
    }

    this.createMessage('error', '登陆失败');
  }

}
