import { Observable } from '@reactivex/rxjs';
import { errorHandler, HttpService } from '../utils';

export class ImageDataAccess {
    constructor() { }
    getImageToRender(): Observable<HTMLImageElement> {
        let imagePath = './public/floor.jpg';
        return Observable.fromPromise(new HttpService().Get(imagePath)).map((image) => {
            return image;
        }).catch(errorHandler);
    }

}