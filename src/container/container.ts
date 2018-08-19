import { MemberDataAccess, ImageDataAccess, ServerConfiguration } from '../dataAccess';
import { MemberService, ImageService, ServerConfigService } from '../services';
import { HttpService } from '../utils';

export let Container = (function () {
    let _httpService: HttpService = {} as HttpService;

    let _memberDataAccess: MemberDataAccess = {} as MemberDataAccess;
    let _imagedataAccess: ImageDataAccess = {} as ImageDataAccess;
    let _serverConfigDataAccess: ServerConfiguration = {} as ServerConfiguration;

    let _memberService: MemberService = {} as MemberService;
    let _imageService: ImageService = {} as ImageService;
    let _serverConfigService: ServerConfigService = {} as ServerConfigService;

    let bindDependencies = function (): void {
        _httpService = new HttpService();
        _memberDataAccess = new MemberDataAccess();
        _imagedataAccess = new ImageDataAccess();
        _serverConfigDataAccess = new ServerConfiguration();
        _memberService = new MemberService();
        _imageService = new ImageService();
        _serverConfigService = new ServerConfigService();
    };

    let getDependencies = function () {
        return {
            http: _httpService,
            memberDataAccess: _memberDataAccess,
            imageDataAccess: _imagedataAccess,
            serverConfigDataAccess: _serverConfigDataAccess,
            memberService: _memberService,
            imageService: _imageService,
            serverConfigService: _serverConfigService
        };
    };

    return {
        bind: bindDependencies,
        IoC: getDependencies
    };
})();