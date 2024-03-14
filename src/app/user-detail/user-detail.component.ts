import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RandomUser } from '../user-list/user-list.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { API_BASE_URL } from '../constants';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzGridModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  url = `${API_BASE_URL}/api/users`
  user : RandomUser | undefined

  constructor(private route: ActivatedRoute) {
    const userId = parseInt(this.route.snapshot.params['id'], 10);
    this.getUserDetail(userId).then(user => {
      this.user = user;
    });
  }

  async getUserDetail(id: number): Promise<RandomUser | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

}
