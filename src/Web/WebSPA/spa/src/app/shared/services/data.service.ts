import { Injectable } from "@angular/core";
import { Http, Response, RequestOptionsArgs, RequestMethod, Headers } from "@angular/http";

import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { SecurityService } from "./security.service";
import { Guid } from "../../../guid";

@Injectable()
export class DataService {
    constructor(private http: Http, private securityService: SecurityService) { }

    get(url: string, params?: any): Observable<Response> {
        let options: RequestOptionsArgs = {};

        if (this.securityService) {
            options.headers = new Headers();
            options.headers.append('Authorization', 'Bearer ' + this.securityService.GetToken());
        }

        return this.http.get(url, options).catch(this.handleError);
    }

    postWithId(url: string, data: any, params?: any): Observable<Response> {
        return this.doPost(url, data, true, params);
    }

    post(url: string, data: any, params?: any): Observable<Response> {
        return this.doPost(url, data, false, params);
    }

    private doPost(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
        let options: RequestOptionsArgs = {};
        options.headers = new Headers();

        if (this.securityService) {
            options.headers.append('Authorization', 'Bearer ' + this.securityService.GetToken());
        }
        if (needId) {
            let guid = Guid.newGuid();
            options.headers.append('x-request-id', guid);
        }

        return this.http.post(url, data, options).catch(this.handleError);
    }

    delete(url: string, params?: any) {
        let options: RequestOptionsArgs = {};

        if (this.securityService) {
            options.headers = new Headers();
            options.headers.append('Authorization', 'Bearer ' + this.securityService.GetToken());
        }

        console.log('data.service deleting');

        this.http.delete(url, options).subscribe(res => console.log(res));
    }

    private handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'server error');
    }
}