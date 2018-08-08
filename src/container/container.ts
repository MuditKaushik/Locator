import { MemberDataAccess, ImageDataAccess } from '../dataAccess';
import { MemberService, ImageService } from '../services';
import { HttpService } from '../utils';

export let Container = (function () {
    let _httpService: HttpService = {} as HttpService;
    let _memberDataAccess: MemberDataAccess = {} as MemberDataAccess;
    let _imagedataAccess: ImageDataAccess = {} as ImageDataAccess;
    let _memberService: MemberService = {} as MemberService;
    let _imageService: ImageService = {} as ImageService;

    let bindDependencies = function (): void {
        _httpService = new HttpService();
        _memberDataAccess = new MemberDataAccess();
        _memberService = new MemberService();
        _imageService = new ImageService();
        _imagedataAccess = new ImageDataAccess();
    };

    let getDependencies = function () {
        return {
            http: _httpService,
            memberDataAccess: _memberDataAccess,
            imageDataAccess: _imagedataAccess,
            memberService: _memberService,
            imageService: _imageService
        };
    };

    return {
        bind: bindDependencies,
        IoC: getDependencies
    };
})();