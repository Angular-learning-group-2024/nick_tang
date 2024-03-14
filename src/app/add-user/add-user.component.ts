import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AddUserService } from './add-user.service';
import { NzMessageService } from 'ng-zorro-antd/message';




@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzGridModule, RouterLink, NzInputModule,
  NzDatePickerModule, NzButtonModule, NzFormModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder, private addUserService: AddUserService,
    private message: NzMessageService) {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      registrationDate: [null, [Validators.required]],
      signature: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

   submitForm() {
    if (this.validateForm.valid) {
      this.addUserService.saveData(this.validateForm.value).subscribe(response => {
        if (response?.status === 200) {
          this.message.info('添加成功');
          this.validateForm.reset()
        } else {
          this.message.error('添加失败');
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
