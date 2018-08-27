import { Container } from '../container';
import { CreateAlertMessage, MessageType } from '../utils';
import { IGoogleFolder, IGoogleDoc, IGoogleFileCopy } from '../models';
export class GoogleDrive {
    constructor() { }
    createDriveFolder(folderName: string) {
        return Container.IoC().googleDriveService.createGoogleFolder(folderName).subscribe((result: IGoogleFolder) => {
            CreateAlertMessage(MessageType.success, `Folder Created successfully with id ${result.id} and name ${result.name}`);
        });
    }
    copyDriveFile(folderId: string, file: IGoogleDoc, folderName: string) {
        return Container.IoC().googleDriveService.createGoogleFileCopy(folderId, file).subscribe((result: IGoogleFileCopy) => {
            CreateAlertMessage(MessageType.success, `File has been copied to the folder ${folderName}`);
        });
    }
}