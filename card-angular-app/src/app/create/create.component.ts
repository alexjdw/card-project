import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
// import { NgFlashMessageService } from 'ng-flash-messages';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';


class CardTemplateCustomInput {
    size: number = 3;
    font: string;
    classes: [string];

    constructor(
        public type: string,
        public options?: object) {
            console.log(this.type);
         }
}

class CardTemplate {
    custom_inputs: CardTemplateCustomInput[];
    user_name: string;
    card_name: string;
    category: string;
    bg_image: string;
    constructor() {
        this.custom_inputs = [];
     }
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateComponent implements OnInit {
    template: CardTemplate;
    selectedTab: string = "Banner Text Field";
    latestUploadedImgUrl: string = '/assets/img/example-image.svg';
    uploadedImageUrls: string[] = [''];
    form: any;

    constructor(
        private _httpService: HttpService,
        // private ngFlashMessageService: NgFlashMessageService,
        private _route: ActivatedRoute,
        private _router: Router,
        // private _formBuilder: FormBuilder
        ) { }

        ngOnInit() {
            this.template = new CardTemplate();
            this.form = {
                username: '',
                description: '',
                background_image: '',
                category: '',
                innerform: {
                    bannertext: '>:3',
                    imageurl: '>:3',
                    textareadesc: '>:3',
                }
            }
        }

    tabChange(event) {
        console.log(event);
        this.selectedTab = event.tab.textLabel;
    }

    addField() {
        console.log(this.form);
        if (this.selectedTab === "Banner Text Field") {
            this.template.custom_inputs.push(new CardTemplateCustomInput('banner', {content: this.form.innerform.bannerText}));
        } else if (this.selectedTab === "Personal Message Field") {
            this.template.custom_inputs.push(new CardTemplateCustomInput('textarea'));
        } else if (this.selectedTab === "Signature Field") {
            this.template.custom_inputs.push(new CardTemplateCustomInput('signature'));
        } else if (this.selectedTab === "Photo") {
            this.template.custom_inputs.push(
                new CardTemplateCustomInput('image', {url: this.latestUploadedImgUrl})
                );
        }
    }

    uploadFileOnChange(event) {
        var file = event.target.files[0];
        var uploadData = new FormData();
        uploadData.append('file', file, file.name);

        this._httpService.uploadTemplateFile(uploadData).subscribe((response) => {
            this.uploadedImageUrls.push(response['filename']);
            this.latestUploadedImgUrl = response['filename'];
        });
    }

    onMove(event: CdkDragMove) {
        // Please leave this here
        // this.x += event.delta.x;
        // this.y += event.delta.y;
    }

    onDrop(event: CdkDragEnd) {
        // Please leave this here
    }
}
