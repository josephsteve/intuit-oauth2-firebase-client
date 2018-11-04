import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IntuitApiService {
  public access_token: string;
  constructor(private http: HttpClient) {}

  public getAuthUri() {
    return this.http.get('https://us-central1-intuit-oauth2-api.cloudfunctions.net/api/authUri');
  }

  public getCompanyInfo() {
    const url = '';
    return this.http.get('https://us-central1-intuit-oauth2-api.cloudfunctions.net/api/getCompanyInfo');
  }

  public getCustomer(customerId) {
    return this.http.get(`https://us-central1-intuit-oauth2-api.cloudfunctions.net/api/getCustomer?id=${customerId}`);
  }

  public retrieveToken() {
    return this.http.get('https://us-central1-intuit-oauth2-api.cloudfunctions.net/api/retrieveToken');
  }

  public getToken(): Observable<string> {
    return new Observable<string>(observer => {
      this.http.get('https://us-central1-intuit-oauth2-api.cloudfunctions.net/api/retrieveToken')
        .subscribe((response: Token) => {
          console.log('token', '=>', response);
          if (response && response.access_token) {
            this.access_token = response.access_token;
            observer.next(this.access_token);
          } else {
            observer.error('Token is empty. You need to connect to QBO first!');
          }
        }, error => {
          observer.error(error);
        });
    });
  }
}

interface Token {
  expires_in: number;
  x_refresh_token_expires_in: number;
  refresh_token: string;
  access_token: string;
  token_type: string;
}
