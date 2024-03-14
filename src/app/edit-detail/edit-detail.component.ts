import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddUserService } from '../add-user/add-user.service';
import { RandomUser } from '../user-list/user-list.component';
import { API_BASE_URL } from '../constants';


@Component({
  selector: 'app-edit-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzGridModule, RouterLink, NzInputModule,
    NzDatePickerModule, NzButtonModule, NzFormModule],
  templateUrl: './edit-detail.component.html',
  styleUrl: './edit-detail.component.css'
})
export class EditDetailComponent {
  validateForm!: FormGroup;
  userId!:number;
  constructor(private fb: FormBuilder, private addUserService: AddUserService,
    private message: NzMessageService, private route: ActivatedRoute) {
    this.userId = parseInt(this.route.snapshot.params['id'], 10);
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      registrationDate: [null, [Validators.required]],
      signature: [null, [Validators.required]]
    });
    
    this.getUserDetail(this.userId).then(user => {
      const u = {...user, registrationDate: new Date(user?.registrationDate as string).toISOString()}
      this.validateForm.patchValue(u)
    });
  }

  async getUserDetail(id: number): Promise<RandomUser | undefined> {
    const data = await fetch(`${API_BASE_URL}/api/users/${id}`);
    return await data.json() ?? {};
  }

  submitForm() {
    if (this.validateForm.valid) {
      this.addUserService.editData(this.validateForm.value, this.userId).subscribe(response => {
        if (response?.status === 200) {
          this.message.info('编辑成功');
        } else {
          this.message.error('编辑失败');
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
