import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
// import { NgFlashMessageService } from 'ng-flash-messages';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AppComponent implements OnInit{
  // panelOpenState = false;
  title = 'card-angular-app';
  email = new FormControl('', [Validators.required, Validators.email]);
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _httpService: HttpService,
    // private ngFlashMessageService: NgFlashMessageService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder) { }

    ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
    }

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
