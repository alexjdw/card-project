import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    constructor(private _http: HttpClient) { }

    getAllCards(){
        
    }

    getCardTemplate(template_id) {
        return this._http.get('/api/template/' + template_id);
    }
    createTemplate(form_data) {
        return this._http.post('/api/templates/', form_data);
    }
}