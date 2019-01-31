import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
// import { NgFlashMessageService } from 'ng-flash-messages';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    // private ngFlashMessageService: NgFlashMessageService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  }

}
