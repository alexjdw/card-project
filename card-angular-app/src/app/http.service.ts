import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    constructor(private _http: HttpClient) { }

    getTemplate(template_id) {
        return this._http.get('/api/templates/' + template_id);
    }
    createTemplate(form_data) {
        console.log("Creating...");
        return this._http.post('/api/templates', form_data);
    }
    uploadTemplateFile(file) {
        return this._http.post('/file/upload', file);
    }

    createCard(card) {
        return this._http.post('/api/cards', card);
    }

    createUser(user) {
        return this._http.post('/api/users', user)
    }
}