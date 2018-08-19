import {
    MessageType,
    CreateAlertMessage,
    CreateTimerAlert,
    GetFloorImage,
    CreateCanvas
} from '../utils';
import { Container } from '../container';

export class Renderer {
    constructor() {
        this.getCanvasContent();
    }
    private renderCanvas(image: HTMLImageElement, canvas: HTMLCanvasElement): void {
        let canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) {
            canvas.remove();
            CreateAlertMessage(MessageType.danger, "Unable to create canvas.");
            return;
        }
        canvasCtx.drawImage(image, 0, 0, canvas.width, canvas.height);
        Container.IoC().memberService.getMembers();
    }
    private getCanvasContent(): void {
        let content = document.querySelector('#canvas_content');
        let canvas = CreateCanvas();
        let image = GetFloorImage();
        if (content && image && canvas) {
            CreateTimerAlert(MessageType.success, "Canvas found and rendering.", 2000);
            content.appendChild(canvas);
            image.onload = () => {
                this.renderCanvas(image, canvas);
            };
        } else {
            canvas.remove();
            CreateAlertMessage(MessageType.danger, "Unable to create canvas.");
        }
        return;
    }
}