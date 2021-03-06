import { Container } from '../container';
import { CreateMemberList } from '../utils'
import { IMemberModel } from '../models';
export class MemberService {
    constructor() { }
    getMembers() {
        Container.IoC().memberDataAccess.getMembers().subscribe((members: Array<IMemberModel>) => {
            CreateMemberList('member-list', members);
        });
    }
}