import { MessageType, CreateAlertMessage, CreateIFrame } from '../utils';
import { Observable } from '@reactivex/rxjs';
import { Container } from '../container';
import { IGoogleConfig, IGoogleAuth, IGoogleFileData, IGoogleFileComments, IGoogleFolder, IGoogleFileCopy } from '../models';
import { GoogleDrive } from './drive';
export class DriveFilePicker {
    private _gapi: any = {};
    constructor() {
        this._gapi = (<any>window).gapi;
        if (!this._gapi) {
            CreateAlertMessage(MessageType.info, 'Could not find Google apis script or object in you app.');
        } else {
            this.bindClickEventsWithButtons();

        }
    }
    private getFileComments() {
        let fileId: string = <string>localStorage.getItem("fileId");
        Container.IoC().googleDriveService.getGoogleDriveFileCommentsByFileId(fileId)
            .subscribe((result: IGoogleFileComments) => {
                result.comments.filter(comment => comment.quotedFileContent).forEach((validcomment) => {
                    CreateAlertMessage(MessageType.success, `
                    file author is ${validcomment.author.displayName} <br/>
                    ${(validcomment.author.emailAddress) ? `author email is ${validcomment.author.emailAddress}` : ''}
                    comment id is ${validcomment.id} <br/> 
                    comment is ${validcomment.htmlContent} <br/>
                    commented phrase is ${validcomment.quotedFileContent.value}`);
                });
            });
    }
    private loadGoogleAccount(): void {
        this._gapi.load('auth', { 'callback': this.authorizeGoogleAccount.bind(this) });
        this._gapi.load('picker');
    }
    private authorizeGoogleAccount(): void {
        Container.IoC().serverConfigService.getGoogleDriveService()
            .subscribe((googleConfig: IGoogleConfig) => {
                this._gapi.auth.authorize({
                    'client_id': googleConfig.client_id,
                    'scope': googleConfig.scope,
                    'immediate': true
                }, this.authorizationHandler);
            });
    }
    private authorizationHandler(authResult: IGoogleAuth) {
        if (authResult && !authResult.error) {
            let google = (<any>window).google;
            localStorage.setItem("googleToken", authResult.access_token);
            let picker = new google.picker.PickerBuilder()
                .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                .setOAuthToken(authResult.access_token)
                .setOrigin(`${window.location.protocol}//${window.location.host}`)
                .setRelayUrl(`${window.location.protocol}//${window.location.host}`)
                .addView(new google.picker.DocsUploadView())
                .addView(new google.picker.View(google.picker.ViewId.DOCS))
                .setCallback((fileData: IGoogleFileData) => {
                    if (fileData.action === google.picker.Action.PICKED) {
                        // let googleEditDoc = <HTMLDivElement>document.querySelector('#googleEditDoc');
                        // googleEditDoc.childNodes.forEach((child) => {
                        //     googleEditDoc.removeChild(child);
                        // });
                        // googleEditDoc.appendChild(CreateIFrame(doc.url));
                        Container.IoC().googleDriveService.createGoogleFolder('Assignment').subscribe((result: IGoogleFolder) => {
                            CreateAlertMessage(MessageType.success, `Folder Created successfully with id ${result.id} and name ${result.name}`);
                            fileData.docs.forEach((doc) => {
                                localStorage.setItem("fileId", doc.id);
                                Container.IoC().googleDriveService.createGoogleFileCopy(result.id, doc).subscribe((result: IGoogleFileCopy) => {
                                    CreateAlertMessage(MessageType.success, `File has been copied to the folder ${result.name}`);
                                });
                            });
                        });
                    }
                }).build();
            picker.setVisible(true);
        }
    }
    private bindClickEventsWithButtons(): void {
        Observable.fromEvent(<HTMLButtonElement>document.querySelector('#gdrive'), 'click')
            .subscribe((button) => {
                this.loadGoogleAccount();
            });
        Observable.fromEvent(<HTMLButtonElement>document.querySelector('#gcomment'), 'click').subscribe((button) => {
            this.getFileComments();
        });
    }
}