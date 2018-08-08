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
    let alertBoxDom = <HTMLDivElement>document.querySelector("#message");
    let messageTextDom = <HTMLSpanElement>document.querySelector("#messagetext");
    let alertMessageClose = <HTMLButtonElement>document.querySelector("#messageClose");
    if (alertBoxDom && messageTextDom && alertMessageClose) {

        alertBoxDom.classList.remove('d-none');
        alertBoxDom.classList.add(messageType);
        messageTextDom.innerText = messageText;

        Observable.fromEvent(alertMessageClose, 'click').subscribe((data) => {
            alertBoxDom.classList.add('d-none');
        });
    }
}

/**
 * 
 * @param messageType enum message type
 * @param messageText display message text
 * @param timeOut set timeout number in seconds.
 */
export function CreateTimerAlert(messageType: MessageType, messageText: string, timeOut: number) {
    let timedAlertBoxDom = <HTMLDivElement>document.querySelector("#timedMessage");
    let timedMessageTextDom = <HTMLSpanElement>document.querySelector("#timedMessagetext");
    if (timedAlertBoxDom && timedMessageTextDom) {
        timedAlertBoxDom.classList.remove('d-none');
        timedAlertBoxDom.classList.add(messageType);
        timedMessageTextDom.innerHTML = messageText;
        setTimeout(() => {
            timedAlertBoxDom.classList.add('d-none');
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
    return image;
}

