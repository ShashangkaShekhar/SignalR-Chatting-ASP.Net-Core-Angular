import { Inject, Injectable, Component } from '@angular/core';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
    providers: [Http]
})

@Injectable()

export class DataService {
    public apiHost: string = "http://localhost:63742/";
    constructor(
        private _http: Http, 
        @Inject(DOCUMENT) private document: any) {}

    //Get
    get(_getUrl: string): Observable<any[]> {
        var getUrl = this.apiHost + _getUrl;
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this._http.get(getUrl, options)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    //GetByID
    getbyid(id: string, _getByIdUrl: string): Observable<any> {
        var getByIdUrl = this.apiHost + _getByIdUrl + '?id=' + id;
        return this._http.get(getByIdUrl)
            .pipe(map(res => <any>res.json()))
            .pipe(catchError(this.handleError));
    }

    //Post
    save(model: any, _saveUrl: string): Observable<any> {
        var saveUrl = this.apiHost + _saveUrl;
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(model);
        return this._http.post(saveUrl, body, options)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    //PostFormData
    saveForm(model: any, _saveUrl: string): Observable<any> {
        var saveUrl = this.apiHost + _saveUrl;
        return this._http.post(saveUrl, model)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }
    //Delete
    delete(model: any, _deleteByIdUrl: string): Observable<any> {
        var deleteByIdUrl = this.apiHost + _deleteByIdUrl + '?param=' + JSON.stringify(model)
        return this._http.delete(deleteByIdUrl)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }
}