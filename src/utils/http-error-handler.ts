import { Observable } from '@reactivex/rxjs';
import { CreateTimerAlert, MessageType } from '../utils';

export function errorHandler(err: any) {
    if (err instanceof Error) {
        CreateTimerAlert(MessageType.danger, err.message, 2000);
        return Observable.throw(err.message);
    }
    CreateTimerAlert(MessageType.danger, 'Unable to process. Try again later!!!!', 2000);
    return Observable.throw(err);
}