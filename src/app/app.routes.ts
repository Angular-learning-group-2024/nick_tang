import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EditDetailComponent } from './edit-detail/edit-detail.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent, 
        // loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
    },
    {
        path: '',
        component: LoginComponent, 
        // loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
    },
    {
        path: 'admin',
        component: AdminComponent, 
        canActivate: [authGuard],
        // loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
        children: [
            {
                path: '',
                component: UserListComponent
            },
            {
                path: 'user-list',
                component: UserListComponent
            },
            {
                path: 'user-detail/:id',
                component: UserDetailComponent
            },
            {
                path: 'edit-detail/:id',
                component: EditDetailComponent
            },
            {
                path: 'add-user',
                component: AddUserComponent
            },
        ]
    }


];
