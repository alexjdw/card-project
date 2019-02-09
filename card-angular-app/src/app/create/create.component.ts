import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
// import { NgFlashMessageService } from 'ng-flash-messages';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;

class CardTemplateCustomInput {
    top: number = 0;
    left: number = 0;

    constructor(
        public type: string,
        public options?: object) { }
}

class CardTemplate {
    custom_inputs: CardTemplateCustomInput[];
    creator: string;
    template_name: string;
    category: string;
    bg_image: HTMLImageElement;
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
    latestUploadedImg: HTMLImageElement;
    backgroundOptions: HTMLImageElement[];
    form: any;

    // For drag events
    topdelta: number = 0;
    leftdelta: number = 0;

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
                template_name: '',
                innerform: {
                    bannertext: '',
                    imageurl: '',
                    textareadesc: '',
                }
            }
            this.backgroundOptions = [];
            // this.uploadedImages = [];
            this.latestUploadedImg = new Image();
            this.latestUploadedImg.src = '/assets/img/example-image.svg';
        }

    tabChange(event) {
        this.selectedTab = event.tab.textLabel;
    }

    setTemplateBackground(img) {
        if (img.height > MAX_HEIGHT) {
            let ratio = (1000 / img.height);
            img.height = img.height * ratio;
            img.width = img.width * ratio;
        }
        if (img.width > MAX_WIDTH) {
            let ratio = (1000 / img.width);
            img.height = img.height * ratio;
            img.width = img.width * ratio;
        }
        this.template.bg_image = img;
    }

    addField() {
        if (this.selectedTab === "Banner Text Field") {
            this.template.custom_inputs.push(new CardTemplateCustomInput('banner', {content: this.form.innerform.bannerText}));
        } else if (this.selectedTab === "Personal Message Field") {
            this.template.custom_inputs.push(new CardTemplateCustomInput('textarea'));
        } else if (this.selectedTab === "Signature Field") {
            this.template.custom_inputs.push(new CardTemplateCustomInput('signature'));
        } else if (this.selectedTab === "Photo") {
            var img = this.latestUploadedImg;
            if (img.height > MAX_HEIGHT / 2.5) {
                let ratio = ((MAX_HEIGHT / 2.5) / img.height);
                img.height = img.height * ratio;
                img.width = img.width * ratio;
                }
            if (img.width > MAX_WIDTH / 2.5) {
                let ratio = ((MAX_WIDTH / 2.5) / img.width);
                img.height = img.height * ratio;
                img.width = img.width * ratio;
            }
            this.template.custom_inputs.push(
                new CardTemplateCustomInput('image', {img: img})
                );
        }
    }

    uploadFileOnChange(event, target) {
        var file = event.target.files[0];
        var uploadData = new FormData();
        uploadData.append('file', file, file.name);

        this._httpService.uploadTemplateFile(uploadData).subscribe((response) => {
            var img = new Image();
            img.src = response['filename'];
            
            if (target == 'template') {
                this.latestUploadedImg = img;
            } else if (target == 'bg') {
                this.backgroundOptions.push(img);
            }
        });
    }

    onMove(event: CdkDragMove, index: number) {
        // Please leave this here
        this.leftdelta += event.event['movementX'];
        this.topdelta += event.event['movementY'];
    }

    onDrop(event: CdkDragEnd, index: number) {
        // Move the objects
        this.template.custom_inputs[index].left += this.leftdelta;
        this.template.custom_inputs[index].top += this.topdelta;

        // Correct for dropping out of bounds.
        if (this.template.custom_inputs[index].left >= 1132) {
            this.template.custom_inputs[index].left = 1132;
        } else if (this.template.custom_inputs[index].left < 0) {
            this.template.custom_inputs[index].left = 0;
        }

        if (this.template.custom_inputs[index].top < 0) {
            this.template.custom_inputs[index].top = 0;
        } else if (this.template.custom_inputs[index].top >= 900) {
            this.template.custom_inputs[index].top = 900;
        }

        // Reset trackers of the change in pixels.
        this.leftdelta = 0;
        this.topdelta = 0;
    }

    saveTemplate() {
        var data = {}
        data['custom_inputs'] = [];
        data['bg_image_url'] = this.template.bg_image.src;
        data['height'] = this.template.bg_image.height;
        data['width'] = this.template.bg_image.width;
        data['description'] = this.form.description;
        data['creator'] = this.form.username;
        data['template_name'] = this.form.template_name;

        for (let inp of this.template.custom_inputs) {
            var cust_input_data = {
                type: inp.type,
                top: inp.top,
                left: inp.left,
            };
            if (inp.type == 'image') {
                cust_input_data['options'] = { 
                    height: inp.options['img']['height'],
                    width: inp.options['img']['width'],
                    src: inp.options['img']['src']
                }
            }
            if (inp.type == 'banner') {
                cust_input_data['options'] = inp.options;
            }

            data['custom_inputs'].push(cust_input_data);
        }
        console.log(data);
        console.log("Creating/subscribing...");
        this._httpService.createTemplate(data).subscribe(result => {
            console.log(result);
        });
    }
}
