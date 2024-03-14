import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    // 这应该是实现检查用户是否登录的逻辑
    // 例如，检查有无有效的 JWT token
    return !!localStorage.getItem('token');
  }
}