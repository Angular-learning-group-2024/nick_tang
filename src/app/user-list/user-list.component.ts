import { NzTableModule } from 'ng-zorro-antd/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, HostListener, Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NzTableQueryParams, NzCustomColumn } from 'ng-zorro-antd/table';
import { NgFor } from '@angular/common';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { RouterLink } from '@angular/router';
import { NzInputGroupComponent, NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { API_BASE_URL } from '../constants';





export interface RandomUser {
  id: number;
  name: string;
  registrationDate: string;
  signature: string
}

interface Page {
  content: RandomUser[],
  totalElements: number
}

@Injectable({ providedIn: 'root' })
export class UserService {
  userUrl = `${API_BASE_URL}/api/users`;

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>,
    filterValue: string
  ): Observable<Page> {
    let params = new HttpParams()
      .append('page', `${pageIndex - 1}`)
      .append('size', `${pageSize}`);
    if (filterValue) {
      params = params.append('name', filterValue);
    }
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http
      .get<Page>(`${this.userUrl}`, { params })
      .pipe(catchError(() => of({ content: [], totalElements: 0 })));
  }

  constructor(private http: HttpClient) { }
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NzTableModule, NgFor, NzDividerComponent, RouterLink, NzInputModule,
    FormsModule, NzGridModule, NzIconModule, NzInputGroupComponent, NzButtonModule,
    NzPopconfirmModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  filterValue = ''
  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  deleteUrl = `${API_BASE_URL}/api/users`;
  scrollConfig = { y: '300px' }; 

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.randomUserService.getUsers(pageIndex, pageSize, sortField, sortOrder, filter, this.filterValue?.trim()).subscribe(data => {
      this.loading = false;
      this.total = data.totalElements;
      this.listOfRandomUser = data.content;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private randomUserService: UserService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
    // this.updateTableScroll();
  }

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.updateTableScroll();
  // }

  // private updateTableScroll(): void {
  //   const otherContentHeight = 240; // 假设页面上其他内容的固定高度总和为200px
  //   const windowHeight = window.innerHeight;
  //   const tableHeight = windowHeight - otherContentHeight;
  //   console.log('windowHeight=', windowHeight)
  //   console.log('tableHeight=', tableHeight)
  //   this.scrollConfig.y = `${tableHeight}px`;
  // }


  onSearch() {
    // if (this.filterValue?.trim() === '') {
    //   this.message.create('warning', `请正确输入搜索用户名`);
    //   return;
    // }
    this.loadDataFromServer(1, 10, '', '', []);
  }

  deleteUser(id: number) {
    this.delete2(id).then(status => {
      if (status == 200) {
        this.message.info('删除成功');
      } else {
        this.message.info('删除失败');
      }
      this.onSearch();
    });
  }

  async delete2(id: number): Promise<number> {
    const data = await fetch(`${this.deleteUrl}/${id}`, {method: 'delete'});
    return await data.status ?? -1;
  }

}
