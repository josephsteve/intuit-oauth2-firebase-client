import { Component } from '@angular/core';
import { WindowRef } from './windowref';
import { IntuitApiService } from './intuit-api.service';
import { Customer } from './intuit.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WindowRef, IntuitApiService]
})
export class AppComponent {
  private nativeWindow: any;
  public error: string;
  public token: string;
  public customer_json: any;
  public customerId: string;
  public formCustomer: FormGroup;

  constructor(private winRef: WindowRef, private intuit: IntuitApiService, private fb: FormBuilder) {
    this.nativeWindow = this.winRef.getNativeWindow();
    this.formCustomer = this.fb.group({
      CompanyName: '',
      DisplayName: '',
      GivenName: '',
      FamilyName: '',
      Line1: '',
      City: '',
      CountrySubDivisionCode: '',
      PostalCode: '',
      PrimaryPhone: '',
      PrimaryEmailAddr: ''
    });
  }

  public onConnectQBOClicked() {
    this.intuit.getAuthUri()
      .subscribe((respUri: { authUri: string }) => {
        console.log(respUri);
        this.nativeWindow.open(respUri.authUri);
      });
    this.error = null; this.token = null;
  }

  public getCustomer() {
    if (this.customerId) {
      this.intuit.getCustomer(this.customerId)
        .subscribe((response: { Customer: Customer, time: string }) => {
          this.customer_json = response.Customer;
          this.formCustomer.patchValue({
            CompanyName: response.Customer.CompanyName,
            DisplayName: response.Customer.DisplayName,
            GivenName: response.Customer.GivenName,
            FamilyName: response.Customer.FamilyName,
            Line1: response.Customer.BillAddr ? response.Customer.BillAddr.Line1 : '',
            City: response.Customer.BillAddr ? response.Customer.BillAddr.City : '',
            CountrySubDivisionCode: response.Customer.BillAddr ?
              response.Customer.BillAddr.CountrySubDivisionCode : '',
            PostalCode: response.Customer.BillAddr ? response.Customer.BillAddr.PostalCode : '',
            PrimaryPhone: response.Customer.PrimaryPhone ? response.Customer.PrimaryPhone.FreeFormNumber : '',
            PrimaryEmailAddr: response.Customer.PrimaryEmailAddr ? response.Customer.PrimaryEmailAddr.Address : ''
          });
          this.error = null; this.token = null;
        }, error => {
          this.formCustomer.reset();
          this.error = 'Customer not found';
        });
    } else {
      this.error = 'You need to fill customer ID';
    }
  }

  public getToken() {
    this.intuit.getToken()
      .subscribe(resp => {
        this.token = resp; this.error = null;
      }, error => this.error = error);
  }
}
