import { Observable } from '@reactivex/rxjs';
import { HttpCall } from './util';
export class RemoteServices {
    get http() {
        return {
            call: new HttpCall(),
            baseUrl: "http://localhost:5000/api"
        };
    }
    getMembers() {
        let apiUrl = `${this.http.baseUrl}/individual/members`;
        Observable.fromPromise(this.http.call.makeHttpGetCall(apiUrl))
            .subscribe((result) => {
                console.log('data', result.value);
            });
    }
}