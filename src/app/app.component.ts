import { Component } from '@angular/core';
import { WindowRef } from './windowref';
import { IntuitApiService } from './intuit-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WindowRef, IntuitApiService]
})
export class AppComponent {
  title = 'intuit-oauth2-web';
  private nativeWindow: any;

  constructor(private winRef: WindowRef, private intuit: IntuitApiService) {
    this.nativeWindow = this.winRef.getNativeWindow();
  }

  public onConnectQBOClicked() {
    this.intuit.getAuthUri()
      .subscribe((respUri: { authUri: string }) => {
        console.log(respUri);
        this.nativeWindow.open(respUri.authUri);
      });

  }

  public getCustomer() {
    this.intuit.getCompanyInfo()
      .subscribe(response => {
        console.log(response);
      });
  }

  public getToken() {
    this.intuit.getToken();
  }
}
