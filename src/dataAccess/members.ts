import { IMemberModel, ICustomHeader } from '../models'
import { Observable } from '@reactivex/rxjs';
import { errorHandler, HttpService } from '../utils';

export class MemberDataAccess {
    constructor() { }
    getMembers(): Observable<Array<IMemberModel>> {
        let customHeader: ICustomHeader = {
            Accept: "application/json",
            ContentType: "application/json"
        };
        return Observable.fromPromise(new HttpService(customHeader).Get('https://services.odata.org/v4/TripPinServiceRW/People'))
            .map((members: any) => {
                return members.value as Array<IMemberModel>;
            }).catch(errorHandler);
    }
}