import { Observable, Observer } from '@reactivex/rxjs';
import { IGoogleConfigModel } from '../models';
export class ServerConfiguration {
    constructor() { }
    getGoogleConfig(): Observable<IGoogleConfigModel> {
        let googleConfig = <IGoogleConfigModel>{};
        return Observable.create((observer: Observer<IGoogleConfigModel>) => {
            googleConfig = <IGoogleConfigModel>{
                client_id: "969028608416-rqkp5hekoigtpl5puj0ufbu2651k3pot.apps.googleusercontent.com",
                scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file']
            };
            observer.next(googleConfig);
            observer.complete();
        });
    }
}