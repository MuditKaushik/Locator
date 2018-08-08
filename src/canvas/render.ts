import { MessageType, CreateAlertMessage, CreateTimerAlert, GetFloorImage } from '../utils';
import { Container } from '../container';

export class Renderer {
    constructor() {
        Container.IoC().memberService.getMembers();
        this.renderCanvas();
    }
    private renderCanvas() {
        let canvas = <HTMLCanvasElement>document.querySelector("#canvasMap");
        let canvasCtx = canvas.getContext('2d');
        if (canvas && canvasCtx) {
            CreateTimerAlert(MessageType.success, "Canvas found and rendering.", 2000);
            canvasCtx.drawImage(GetFloorImage(), 280, 280, 280, 280, 280, 280, 280, 280);
        } else {
            CreateAlertMessage(MessageType.danger, "Unable to create canvas.");
        }
    }
}