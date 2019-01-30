import { Component } from '@angular/core';
import { HttpService } from './http.service';
// import { NgFlashMessageService } from 'ng-flash-messages';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'card-angular-app';
  constructor(
    private _httpService: HttpService,
    // private ngFlashMessageService: NgFlashMessageService,
    private _route: ActivatedRoute,
    private _router: Router)
    {}
}
