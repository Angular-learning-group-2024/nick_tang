import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzMenuModule, NzSubMenuComponent } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NzLayoutModule, NzGridModule, RouterLink, NzMenuModule,
     NzSubMenuComponent, RouterOutlet, NzButtonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router){}

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

}
