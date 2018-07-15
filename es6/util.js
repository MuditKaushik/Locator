import { ajax, Deferred } from 'jquery';
import { loader } from './loader';

export class HttpCall extends loader {
    constructor() {
        super();
    }
    makeHttpGetCall(url, body) {
        let deferred = Deferred();
        ajax(url, {
            method: 'GET',
            data: body || {},
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            accepts: "application/json",
            beforeSend: this.showloader(true),
            success: (data) => {
                this.showloader(false);
                deferred.resolve(data);
            },
            error: (err) => {
                this.showloader(false);
                deferred.reject(err);
            }
        });
        return deferred.promise();
    }
    makeHttpPostCall(url, body) {
        let deferred = Deferred();
        ajax(url, {
            method: 'POST',
            data: body || {},
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            accepts: "application/json",
            beforeSend: this.showloader(true),
            success: (data) => {
                this.showloader(false);
                deferred.resolve(data);
            },
            error: (err) => {
                this.showloader(false);
                deferred.reject(err);
            }
        });
        return deferred.promise();
    }
}