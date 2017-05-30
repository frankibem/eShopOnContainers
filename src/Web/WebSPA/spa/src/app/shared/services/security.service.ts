import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfigurationService } from "./configuration.service";
import { StorageService } from "./storage.service";

@Injectable()
export class SecurityService {
    private actionUrl: string;
    private headers: Headers;
    private authenticationSource = new Subject<boolean>();
    authenticationChallenge$ = this.authenticationSource.asObservable();
    private authorityUrl = "";

    constructor(private http: Http, private router: Router, private route: ActivatedRoute,
        private configurationService: ConfigurationService, private storageService: StorageService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

        this.configurationService.settingsLoaded$.subscribe(x => {
            this.authorityUrl = this.configurationService.serverSettings.identityUrl;
            this.storageService.store("IdentityUrl", this.authorityUrl);
        });

        if (this.storageService.retrieve("IsAuthorized") !== '') {
            this.IsAuthorized = this.storageService.retrieve('IsAuthorized');
            this.authenticationSource.next(true);
            this.UserData = this.storageService.retrieve('userData');
        }
    }

    public IsAuthorized: boolean;
    public UserData: any;

    public GetToken(): any {
        return this.storageService.retrieve('authorizationData');
    }

    public ResetAuthorizationData() {
        this.storageService.store('authorizationData', '');
        this.storageService.store('authorizationDataIdToken', '');
        this.IsAuthorized = false;
        this.storageService.store('IsAuthorized', false);
    }

    public SetAuthorizationData(token: any, id_token: any) {
        if (this.storageService.retrieve('authorizationData') !== '') {
            this.storageService.store('authorizationData', '');
        }

        this.storageService.store('authorizationData', token);
        this.storageService.store('authorizationDataIdToken', id_token);
        this.IsAuthorized = true;
        this.storageService.store("IsAuthorized", true);

        this.getUserData()
            .subscribe(data => {
                this.UserData = data;
                this.storageService.store('userData', data);

                // emit observable
                this.authenticationSource.next(true);
                window.location.href = location.origin;
            }, error => this.HandleError(error),
            () => {
                console.log(this.UserData);
            });
    }

    public Authorize() {
        this.ResetAuthorizationData();

        let authorizationUrl = `${this.authorityUrl}/connect/authorize`;
        let client_id = 'js';
        let redirect_uri = location.origin + '/';
        let response_type = 'id_token token';
        let scope = 'openid profile orders basket';
        let nonce = 'N' + Math.random() + '' + Date.now();
        let state = Date.now() + '' + Math.random();

        this.storageService.store('authStateControl', state);
        this.storageService.store('authNonce', nonce);

        let url =
            authorizationUrl + '?' +
            'response_type=' + encodeURI(response_type) + '&' +
            'client_id=' + encodeURI(client_id) + '&' +
            'redirect_uri=' + encodeURI(redirect_uri) + '&' +
            'scope=' + encodeURI(scope) + '&' +
            'nonce=' + encodeURI(nonce) + '&' +
            'state=' + encodeURI(state);
        window.location.href = url;
    }

    public AuthorizeCallback() {
        this.ResetAuthorizationData();

        let hash = window.location.hash.substr(1);
        let result = hash.split('&').reduce(function (prev: string, item: string) {
            let parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});

        console.log(result);

        let token = '';
        let id_token = '';
        let authResponseIsValid = false;

        if (!result.error) {
            if (result.state !== this.storageService.retrieve('authStateControl')) {
                console.log('AuthorizationCallback incorrect state');
            } else {
                token = result.access_token;
                id_token = result.id_token;

                let dataIdToken = this.getDataFromToken(id_token);
                console.log(dataIdToken);

                // validate nonce
                if (dataIdToken.nonce !== this.storageService.retrieve('authNonce')) {
                    console.log('AuthorizedCallback incorrect nonce');
                } else {
                    this.storageService.store('authNonce', '');
                    this.storageService.store('authStateControl', '');

                    authResponseIsValid = true;
                    console.log('AuthorizedCallback state and nonce validated, returning access token');
                }
            }
        }

        if (authResponseIsValid) {
            this.SetAuthorizationData(token, id_token);
        }
    }

    public Logoff() {
        let authorizationUrl = this.authorityUrl + "/connect/endsession";
        let id_token_hint = this.storageService.retrieve('authorizationDataIdToken');
        let post_logout_redirect_uri = location.origin + "/";

        let url =
            authorizationUrl + '?' +
            "id_token_hint=" + encodeURI(id_token_hint) + '&' +
            'post_logout_redirect_uri=' + encodeURI(post_logout_redirect_uri);

        this.ResetAuthorizationData();

        // emit observable
        this.authenticationSource.next(false);
        window.location.href = url;
    }

    private HandleError(error: any) {
        console.log(error);
        if (error.status == 403) {
            this.router.navigate(['/Forbidden']);
        }
        else if (error.status == 401) {
            this.router.navigate(['/Unauthorized']);
        }
    }

    private urlBase64Decode(str: string) {
        let output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    private getDataFromToken(token: string): any {
        let data = {};
        if (typeof token !== 'undefined') {
            let encoded = token.split('.')[1];
            data = JSON.parse(this.urlBase64Decode(encoded));
        }

        return data;
    }

    private getUserData(): Observable<string[]> {
        this.setHeaders();
        if (this.authorityUrl === '') {
            this.authorityUrl = this.storageService.retrieve('IdentityUrl');
        }

        return this.http.get(this.authorityUrl + '/connect/userinfo', {
            headers: this.headers,
            body: ''
        }).map(res => res.json());
    }

    private setHeaders() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');

        let token = this.GetToken();
        if (token !== '') {
            this.headers.append('Authorization', 'Bearer ' + token);
        }
    }
}