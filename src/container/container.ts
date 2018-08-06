import { MemberDataAccess } from '../dataAccess';
import { MemberService } from '../services';
import { HttpService } from '../utils';

export let Container = (function () {
    let _memberDataAccess: MemberDataAccess = {} as MemberDataAccess;
    let _httpService: HttpService = {} as HttpService;
    let _memberService: MemberService = {} as MemberService;

    let bindDependencies = function (): void {
        _memberDataAccess = new MemberDataAccess();
        _httpService = new HttpService();
        _memberService = new MemberService();
    };

    let getDependencies = function () {
        return {
            memberDataAccess: _memberDataAccess,
            memberService: _memberService,
            http: _httpService
        };
    };

    return {
        bind: bindDependencies,
        IoC: getDependencies
    };
})();