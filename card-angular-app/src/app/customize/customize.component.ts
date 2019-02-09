import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { NgFlashMessageService } from 'ng-flash-messages';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
// import { EventEmitter } from 'events';

@Component({
    selector: 'app-customize',
    templateUrl: './customize.component.html',
    styleUrls: ['./customize.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
    }]
})
export class CustomizeComponent implements OnInit {
    creator: string;
    card_data: any;
    form_data: FormGroup;
    constructor(
        private _httpService: HttpService,
        // private ngFlashMessageService: NgFlashMessageService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.card_data = {};
        // test id: '5c5a6408406cce302cff92a0'
        this._httpService.getTemplate(this._route.snapshot.params['id']).subscribe(data => {
            for (let item of data['custom_inputs']) {
                item['value'] = '';
            }
            this.card_data = data;
            console.log(data);
        });
    }

    saveCard(event) {
        console.log(event);
        // if (!this.creator) {
        //     this.promptForCreator();
        //     return;
        // }
        var user_values: string[] = [];
        for (let item of this.card_data.custom_inputs) {
            console.log(item);
            if (item.value) {
                user_values.push(item.value);
            }
        }
        var card = {
            creator: this.creator || 'Left Blank',
            template: this.card_data._id,
            sent: false,
            form_data: user_values,
            recipient_emails: []
        }
        console.log(card);
        this._httpService.createCard(card).subscribe(data => {
            console.log(data);
        });
    }

    promptForCreator() {
        console.log("#TODO")
    }
}
// CardSchema = new mongoose.Schema({
//    creator: {
//        type: String,
//        required: true
//    },
//    template: {
//        type: mongoose.Schema.Types.ObjectId,
//        required: true
//    },
//    sent: {
//        type: Boolean,
//        default: false
//    },
//    form_data: {
//        type: Object,
//        required: true
//    },
//    recipient_emails: {
//        type: [String]
//    }
// });

