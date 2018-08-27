import { ajax, Deferred } from 'jquery';
import { Loader } from './loader';
import { ICustomHeader } from '../models';
export class HttpService {
    private _customHeader: any = {};
    constructor(customHeader: ICustomHeader = {}) {
        this._customHeader = {
            "Content-Type": customHeader.ContentType || "application/json",
            Accept: customHeader.Accept || "application/json",
            Authorization: customHeader.Authorization || ""
        };
    }
    Delete(url: string): JQueryDeferred<any> {
        let deferred = Deferred();
        ajax({
            url: url,
            method: "Delete",
            headers: this._customHeader,
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
            headers: this._customHeader,
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
            headers: this._customHeader,
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
            headers: this._customHeader,
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