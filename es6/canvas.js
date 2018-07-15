import { RemoteServices } from './remote';
export class CanvasLoader extends RemoteServices {
    constructor() {
        super();
    }
    readyCanvas() {
        let canvas = document.querySelector("canvas").getContext("2d");
        canvas.fillStyle = "#4286f4";
        canvas.fill();
        return this;
    }
}