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
    creator_id: string;
    card_data: any;
    form_data: FormGroup;
    show_modal: boolean = false;
    register_is_loading = false;
    regform: object = {
        email: '',
        password: '',
        confirm: '',
        errors: {}
    };

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

        this.regform['email'] = '';
        this.regform['password'] = '';
        this.regform['confirm'] = '';
        this.regform['errors'] = {};
    }

    saveCard(event) {
        console.log(event);
        if (!this.creator_id) {
            this.promptWithRegform();
            return;
        }
        var user_values: string[] = [];
        for (let item of this.card_data.custom_inputs) {
            console.log(item);
            if (item.value) {
                user_values.push(item.value);
            }
        }
        var card = {
            creator: this.creator_id || 'Left Blank',
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

    promptWithRegform() {
        this.show_modal = true;
    }

    validateUser(event) {
        //Validate
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var emailRegex = new RegExp("^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$");

        this.regform['errors'] = {};
        if (this.regform['password'] != this.regform['confirm']) {
            this.regform['errors']['confirm'] = "The password field should match the confirmation field.";
        }
        if (!strongRegex.test(this.regform['password'])) {
            this.regform['errors']['password'] = "Your password isn't strong enough. Please ensure to add an uppercase character, number, and a special character: !@#$%^*. The minimum length is 8 characters total.";
        }
        if (!emailRegex.test(this.regform['email'])) {
            this.regform['errors']['email'] = "Please enter a valid email.";
        }
    }

    registerUser(event) {
        if (Object.keys(this.regform['errors']).length) {
            // Form still has errors.
            return;
        }
        this._httpService.createUser({
            email: this.regform['email'],
            password: this.regform['password'],
            confirm: this.regform['confirm']
        }).subscribe(user => {
            this.creator_id = user['id'];
        });
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

