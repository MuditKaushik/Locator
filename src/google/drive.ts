import { MessageType, CreateAlertMessage } from '../utils';
import { Observable } from '@reactivex/rxjs';
import { Container } from '../container';
import { IGoogleConfigModel } from '../models';
declare const google: any;
export class GoogleDrive {
    private _gapi: any = {};
    constructor() {
        this._gapi = (<any>window).gapi;
        if (!this._gapi) {
            CreateAlertMessage(MessageType.info, 'Could not find Google apis script or object in you app.');
        } else {
            Observable.fromEvent(<HTMLButtonElement>document.querySelector('#gdrive'), 'click')
                .subscribe((button) => {
                    this.loadGoogleAccount();
                });
        }
    }
    loadGoogleAccount(): void {
        this._gapi.load('auth', { 'callback': this.authorizeGoogleAccount.bind(this) });
        this._gapi.load('picker', { 'callback': this.createGoogleDriveFilePicker.bind(this) });
    }
    private authorizeGoogleAccount(): void {
        Container.IoC().serverConfigService.getGoogleDriveService()
            .subscribe((googleConfig: IGoogleConfigModel) => {
                this._gapi.auth.authorize({
                    'client_id': googleConfig.client_id,
                    'scope': googleConfig.scope,
                    'immediate': false
                }, this.authorizationHandler);
            });
    }
    private authorizationHandler(authResult: any) {
        if (authResult && !authResult.error) {
            console.log(authResult.access_token);
            let uploadeView = new google.picker.DocsUploadView();
            let picker = new google.picker.PickerBuilder()
                .enableFeature(google.picker.Feature.NAV_HIDDEN)
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                .setOAuthToken(<string>authResult.access_token)
                .addView(new google.picker.View(google.picker.ViewId.DOCS))
                .addView(uploadeView)
                .setCallback((fileData: any) => { })
                .build();
            picker.setVisible(true);
            // this.createGoogleDriveFilePicker(`${authResult.token_type} ${authResult.access_token}`);
        }
    }
    private createGoogleDriveFilePicker(authToken: string) {
        if (!authToken)
            return;
        let picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setOAuthToken(authToken)
            .addView(new google.picker.View(google.picker.ViewId.DOCS))
            .addView(new google.picker.DocsUploadView())
            .setCallback((fileData: any) => {
                console.log(fileData);
            })
            .build();
        picker.setVisible(true);
    }
}