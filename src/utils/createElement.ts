import { IMemberModel } from "../models";
import { Observable } from '@reactivex/rxjs';
import * as $ from 'jquery';
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
        BindFindEvent(elementId);
    }
    return;
}

export function BindFindEvent(selectElement: string) {
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
