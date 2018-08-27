import { Observable } from "@reactivex/rxjs";
import { Container } from '../container';
import { IGoogleFileComments, IGoogleFolder, IGoogleDoc, IGoogleFileCopy } from '../models';

export class GoogleDriveService {
    constructor() { }
    getGoogleDriveFileCommentsByFileId(fileid: string): Observable<IGoogleFileComments> {
        return Container.IoC().googleDriveDataAccess.getGoogleFileCommentsByFileId(fileid)
            .map((comments: IGoogleFileComments) => {
                return comments;
            });
    }
    createGoogleFolder(folderName: string): Observable<IGoogleFolder> {
        return Container.IoC().googleDriveDataAccess.createDriveFolder(folderName)
            .map((data) => {
                return data;
            });
    }
    createGoogleFileCopy(folderId: string, file: IGoogleDoc): Observable<IGoogleFileCopy> {
        return Container.IoC().googleDriveDataAccess.createFileCopyInFolder(folderId, file).map((fileCopy:IGoogleFileCopy) => { 
            return fileCopy;
        });
    }

}