import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  public getCustomer() {
    const url = 'https://sandbox-quickbooks.api.intuit.com/v3/company/193514815890974/customer/2';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`
    });
    const httpOptions = {
      headers: headers
    };
    console.log('httpOptions', '=>', httpOptions);
    return this.http.get(url, httpOptions);
  }

  public retrieveToken() {
    return this.http.get('https://us-central1-intuit-oauth2-api.cloudfunctions.net/api/retrieveToken');
  }

  public getToken() {
    this.http.get('https://us-central1-intuit-oauth2-api.cloudfunctions.net/api/retrieveToken')
      .subscribe((response: Token) => {
        console.log('token', '=>', response);
        this.access_token = response.access_token;
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
