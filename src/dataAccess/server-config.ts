import { Observable, Observer } from '@reactivex/rxjs';
import { IGoogleConfig } from '../models';
import * as path from 'path';

export class ServerConfiguration {
    constructor() { }
    getGoogleConfig(): Observable<IGoogleConfig> {
        let googleConfig = <IGoogleConfig>{};
        return Observable.create((observer: Observer<IGoogleConfig>) => {
            googleConfig = <IGoogleConfig>{
                client_id: "969028608416-drq19k0clohdaitldkjrjdfhac85k7av.apps.googleusercontent.com",
                scope: [
                    'https://www.googleapis.com/auth/drive',
                    'https://www.googleapis.com/auth/drive.file'
                ]
            };
            observer.next(googleConfig);
            observer.complete();
        });
    }
}