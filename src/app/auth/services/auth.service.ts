import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  public sendTokenUrlToRobot(token: string) {
    const url = `${API_URL}/robot/execute`;
    const payload = { url: token };

    return this.http.post<{ success: boolean; output: string }>(url, payload);
  }
}
