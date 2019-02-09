import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
// import { NgFlashMessageService } from 'ng-flash-messages';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class BirthdayComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  showEditFormBool = false;
  listOfCards: any;

  constructor(private _httpService: HttpService,
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
  // b_getAllCards(){
  //   var observable = this._httpService.getAllCards();
  //   observable.subscribe(data =>{
  //     console.log(data);
  //     this.listOfCards = data;
  //   })
//   // }
//   onClickTemplate(){
//     this.showEditFormBool = true;
//     // this._router.navigate(['/cards']);
//   }
//   receivedFromCustomize(event){
//     if(event === true){
//       this.showEditFormBool = false;
//     }
//   }

}
