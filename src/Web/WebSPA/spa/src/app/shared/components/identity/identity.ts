import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { IIdentity } from "../../models/identity.model";
import { SecurityService } from "../../services/security.service";

@Component({
    selector: "esh-identity",
    templateUrl: "./identity.html",
    styleUrls: ['./identity.scss']
})
export class IdentityComponent implements OnInit {
    authenticated = false;
    private subscription: Subscription;
    private userName: string = "";

    constructor(private service: SecurityService) { }

    ngOnInit(): void {
        this.subscription = this.service.authenticationChallenge$.subscribe(res => {
            this.authenticated = res;
            this.userName = this.service.UserData.email;
        });

        if (window.location.hash) {
            this.service.AuthorizedCallback();
        }

        console.log('identity component, checking authorized: ' + this.service.IsAuthorized);
        this.authenticated = this.service.IsAuthorized;

        if (this.authenticated) {
            if (this.service.UserData)
                this.userName = this.service.UserData.email;
        }
    }

    logoutClicked(event: any) {
        event.preventDefault();
        console.log('Logout clicked');
        this.logout();
    }

    login() {
        this.service.Authorize();
    }

    logout() {
        this.service.Logoff();
    }
}