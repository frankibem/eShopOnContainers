import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
    private storage: Storage;

    constructor() {
        this.storage = sessionStorage;
    }

    public retrieve(key: string): any {
        let item = this.storage.getItem(key);

        if (item && item !== 'undefined') {
            return JSON.parse(item);
        } else {
            return null;
        }
    }

    public store(key: string, value: any){
        this.storage.setItem(key, JSON.stringify(value));
    }
}