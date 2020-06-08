import { Component } from '@angular/core';
import {SearchService} from "./search/search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booking-app';
  public isTokenGenerated: boolean = false;
  constructor(private searchService: SearchService) {
    this.generateToken();
  }

  // This method is used to generate the request token on initial load
  private generateToken() {
    this.searchService.generateRequestToken().subscribe(tokenResponse => {
      if (tokenResponse.success) {
        this.searchService.requestToken = tokenResponse.request_token;
        this.searchService.tokenExpiry = tokenResponse.expires_at;
        this.isTokenGenerated = true;
        // to authenticate the access to read and write
        window.open(`https://www.themoviedb.org/authenticate/${this.searchService.requestToken}`);
        // create session id
        this.callBackForSessionIdCreation();
      }
    })
  }

  // This callback method is used to generate the session id and it will continue calling the API until authenticated
  private callBackForSessionIdCreation() {
    setTimeout(() => {
      if (!this.searchService.sessionId || this.searchService.sessionId === undefined) {
        this.searchService.generateSessionId().subscribe(sessionIdResponse => {
          if (sessionIdResponse && sessionIdResponse.success) {
            this.searchService.sessionId = sessionIdResponse.session_id;
          } else {
            this.callBackForSessionIdCreation();
          }
        })
      }
    }, 500)
  }
}
