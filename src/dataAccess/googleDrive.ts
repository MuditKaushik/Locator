import { HttpService, MimeTypes } from '../utils';
import { Observable } from '@reactivex/rxjs';
import { ICustomHeader, IGoogleFileComments, IGoogleFolder, IGoogleDoc, IGoogleFileCopy } from '../models';
export class GoogleDriveDataAccess {
    private _googleBaseUrl: string = '';
    constructor() {
        this._googleBaseUrl = 'https://www.googleapis.com/drive/v3/files';
    }
    getGoogleFileCommentsByFileId(fileId: string): Observable<IGoogleFileComments> {
        let customHeader: ICustomHeader = { Authorization: `Bearer ${<string>localStorage.getItem("googleToken")}` };
        let googleCommentUrl = `${this._googleBaseUrl}/${localStorage.getItem('fileId')}/comments?fields=`;
        let commentsFields = `comments(htmlContent,id,quotedFileContent,replies,author(displayName,emailAddress))`;
        return Observable.fromPromise(new HttpService(customHeader).Get(`${googleCommentUrl}${commentsFields}`))
            .map((data: IGoogleFileComments) => {
                return data;
            });
    }

    createDriveFolder(folderName: string): Observable<IGoogleFolder> {
        let customHeader: ICustomHeader = { Authorization: `Bearer ${<string>localStorage.getItem("googleToken")}` };
        let googleFolderUrl: string = 'https://www.googleapis.com/drive/v3/files?fields=id,mimeType,name,ownedByMe,parents,properties&alt=json';
        let folderBody: { name: string, mimeType: string } = {
            name: folderName,
            mimeType: MimeTypes.folder
        };
        return Observable.fromPromise(new HttpService(customHeader).Post(googleFolderUrl, JSON.stringify(folderBody)));
    }

    createFileCopyInFolder(folderId: string, file: IGoogleDoc): Observable<IGoogleFileCopy> {
        let customHeader: ICustomHeader = { Authorization: `Bearer ${<string>localStorage.getItem("googleToken")}` };
        let googleFileCopyToFolder: string = `https://www.googleapis.com/drive/v3/files/${file.id}/copy?fields`;
        let fields: string = 'capabilities(canComment,canDelete,canDownload,canEdit),fileExtension,fullFileExtension,id,name,parents,sharingUser';
        let body: { name: string, parents: string[] } = {
            name: `StudentName-${file.name}`,
            parents: [folderId]
        };
        return Observable.fromPromise(new HttpService(customHeader).Post(`${googleFileCopyToFolder}=${fields}`, JSON.stringify(body)));
    }
}