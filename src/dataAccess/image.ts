import { Container } from '../container';
import { Observable } from '@reactivex/rxjs';
import { errorHandler } from '../utils';

export class ImageDataAccess {
    constructor() { }
    getImageToRender(): Observable<HTMLImageElement> {
        let imagePath = './public/floor.jpg';
        return Observable.fromPromise(Container.IoC().http.Get(imagePath)).map((image) => {
            return image;
        }).catch(errorHandler);
    }

}