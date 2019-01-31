import { Component } from '@angular/core';
import { HttpService } from './http.service';
// import { NgFlashMessageService } from 'ng-flash-messages';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // panelOpenState = false;
  title = 'card-angular-app';
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(
    private _httpService: HttpService,
    // private ngFlashMessageService: NgFlashMessageService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  goHome(){
    this._router.navigate(['/cards']);
  }
  goToCreateTemplate(){
    this._router.navigate(['/cards/create']);
  }
  goToCollection(){
    this._router.navigate(['/cards/collection']);
  }
  goToBirthday(){
    this._router.navigate(['/cards/collection/birthday']);
  }
  goToChristmas(){
    this._router.navigate(['/cards/collection/christmas']);
  }
  goToFriendship(){
    this._router.navigate(['/cards/collection/friendship']);
  }
}
