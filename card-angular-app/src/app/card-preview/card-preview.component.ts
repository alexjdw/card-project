import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {
    @Input() data: any;
    @Input() form: any;
    constructor() { }

    ngOnInit() {
        
    }
}
