import { IMemberModel } from "../models";
import { Observable } from '@reactivex/rxjs';
import { MessageType } from './message-type';

/**
 * Create select option dynamicaly for members.
 * @param elementId as string without hash('#').
 * @param membersList array of members.
 */
export function CreateMemberList(elementId: string, membersList: Array<IMemberModel>) {
    let dropdown = document.querySelector(`#${elementId}`);
    if (dropdown) {
        for (let member of membersList) {
            let option = document.createElement('option');
            option.value = member.UserName;
            option.text = `${member.FirstName} ${member.LastName} (${member.UserName})`;
            dropdown.appendChild(option);
        }
        BindFindEvent();
    }
    return;
}
/**
 * Bind event with find click button.
 */
export function BindFindEvent() {
    let findButton = document.querySelector("#find");
    if (findButton) {
        Observable.fromEvent(findButton, 'click').subscribe((data) => {
            let selectDropdown = <HTMLSelectElement>document.querySelector(`#member-list`);
            if (selectDropdown) {
                alert(selectDropdown.value);
            }
        });
    }
    return;
}

/**
 * this method create alert message with following arguments.
 * @param messageType Enum message type.
 * @param messageText Display message text.
 */
export function CreateAlertMessage(messageType: MessageType, messageText: string) {
    let alertBoxDom = CreateAlertMessageDom(messageType, messageText, true);
    let content = document.querySelector('#canvas_content');
    if (alertBoxDom.alertMessageDiv && alertBoxDom.alertDismissibleButton && content) {
        content.appendChild(alertBoxDom.alertMessageDiv);
        Observable.fromEvent(alertBoxDom.alertDismissibleButton, 'click').subscribe((data) => {
            alertBoxDom.alertMessageDiv.remove();
        });
    }
    return;
}

/**
 * 
 * @param messageType enum message type
 * @param messageText display message text
 * @param timeOut set timeout number in seconds.
 */
export function CreateTimerAlert(messageType: MessageType, messageText: string, timeOut: number) {
    let timedAlertBoxDom = CreateAlertMessageDom(messageType, messageText, false);
    let content = document.querySelector('#canvas_content');
    if (timedAlertBoxDom.alertMessageDiv && content) {
        content.appendChild(timedAlertBoxDom.alertMessageDiv);
        setTimeout(() => {
            timedAlertBoxDom.alertMessageDiv.remove();
        }, timeOut);
    }
    return;
}

/**
 * method return floor image to canvas.
 */
export function GetFloorImage(): HTMLImageElement {
    let image = document.createElement("img");
    image.src = "./public/floor.jpg";
    image.id = "floor-img";
    return image;
}

/**
 * Hide image render in index with image id without hash.
 * @param imageId 
 */
export function HideImage(imageId: string) {
    let image = document.querySelector(`#${imageId}`);
    if (image) {
        image.classList.add('d-none');
    }
    return;
}

export function CreateCanvas(): HTMLCanvasElement {
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = 850;
    canvas.height = 800;
    canvas.id = 'canvasMap';
    canvas.classList.add('canvasMap');
    return canvas;
}

export function CreateIFrame(url: string): HTMLIFrameElement {
    let iframe = <HTMLIFrameElement>document.createElement('iframe');
    iframe.setAttribute('src', url);
    // iframe.width = '80%';
    iframe.classList.add('iframe_google');
    return iframe;
}

/**
 * 
 * @param messageType message type enum
 * @param message display message
 * @param isDismissible is display message dismissible (is auto closable or not).
 */
function CreateAlertMessageDom(messageType: MessageType, message: string, isDismissible: boolean): { alertMessageDiv: HTMLDivElement, alertDismissibleButton?: HTMLButtonElement } {
    let alertMessageDiv: HTMLDivElement = document.createElement('div');
    let alertMessageText: HTMLSpanElement = document.createElement('span');
    let alertDismissibleButton: HTMLButtonElement | undefined = undefined;
    let alertMessageClasses: string[] = ['alert', messageType];

    alertMessageText.innerHTML = message;
    alertMessageDiv.appendChild(alertMessageText);

    if (isDismissible) {
        let buttonCloseSpanText: HTMLSpanElement = document.createElement('span');
        buttonCloseSpanText.setAttribute('aria-hidden', 'true');
        buttonCloseSpanText.innerHTML = '&times;';

        alertDismissibleButton = document.createElement('button');
        alertDismissibleButton.setAttribute('type', 'button');
        alertDismissibleButton.setAttribute('data-dismiss', 'alert');
        alertDismissibleButton.setAttribute('aria-label', 'Close');
        alertDismissibleButton.classList.add('close');
        alertDismissibleButton.appendChild(buttonCloseSpanText);

        alertMessageClasses.push(...['alert-dismissible', 'fade', 'show']);
        alertMessageDiv.appendChild(alertDismissibleButton);
    }
    alertMessageDiv.classList.add(...alertMessageClasses);
    return { alertMessageDiv: alertMessageDiv, alertDismissibleButton };
}

