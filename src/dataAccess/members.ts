import { Container } from '../container';
import { IMemberModel } from '../models'
import { Observable } from '@reactivex/rxjs';
import { errorHandler } from '../utils';

export class MemberDataAccess {
    constructor() { }
    getMembers(): Observable<Array<IMemberModel>> {
        return Observable.fromPromise(Container.IoC().http.Get('https://services.odata.org/v4/TripPinServiceRW/People'))
            .map((members: any) => {
                return members.value as Array<IMemberModel>;
            }).catch(errorHandler);
    }
}