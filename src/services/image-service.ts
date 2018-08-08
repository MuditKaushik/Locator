import { Observable } from '@reactivex/rxjs';
import { Container } from '../container';

export class ImageService {
    constructor() { }
    getImage(): Observable<HTMLImageElement> {
        return Container.IoC().imageDataAccess.getImageToRender();
    }
}