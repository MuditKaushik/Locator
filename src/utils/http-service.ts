import { ajax, Deferred } from 'jquery';
import { Loader } from './loader';

export class HttpService {
    private _customContentType: string;
    constructor(contentType: string = "application/json") {
        this._customContentType = contentType;
    }
    Delete(url: string): JQueryDeferred<any> {
        let deferred = Deferred();
        ajax({
            url: url,
            method: "Delete",
            headers: { "Content-Type": `${this._customContentType}`, Accept: "application/json" },
            contentType: "application/json",
            beforeSend: () => { Loader(true); },
            success: (data) => {
                Loader(false);
                deferred.resolve(data);
            },
            error: (err) => {
                Loader(false);
                deferred.reject(err);
            },
        });
        return deferred;
    }
    Get(url: string): JQueryDeferred<any> {
        let deferred = Deferred();
        ajax({
            url: url,
            method: "GET",
            type: 'json',
            headers: { "Content-Type": `${this._customContentType}`, Accept: "application/json" },
            contentType: "application/json",
            beforeSend: () => { Loader(true); },
            success: (data) => {
                Loader(false);
                deferred.resolve(data);
            },
            error: (err) => {
                Loader(false);
                deferred.reject(err);
            },
        });
        return deferred;
    }
    Post(url: string, body: any): JQueryDeferred<any> {
        let deferred = Deferred();
        ajax({
            url: url,
            method: "POST",
            headers: { "Content-Type": `${this._customContentType}`, Accept: "application/json" },
            contentType: "application/json",
            data: body || {},
            beforeSend: () => { Loader(true) },
            success: (data) => {
                Loader(false);
                deferred.resolve(data);
            },
            error: (err) => {
                Loader(false);
                deferred.reject(err);
            },
        });
        return deferred;
    }
    Put(url: string, body: any): JQueryDeferred<any> {
        let deferred = Deferred();
        ajax({
            url: url,
            method: "PUT",
            headers: { "Content-Type": `${this._customContentType}`, Accept: "application/json" },
            contentType: "application/json",
            data: body || {},
            beforeSend: () => { Loader(true); },
            success: (data) => {
                Loader(false);
                deferred.resolve(data);
            },
            error: (err) => {
                Loader(false);
                deferred.reject(err);
            },
        });
        return deferred;
    }
}