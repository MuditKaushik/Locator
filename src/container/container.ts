import { MemberDataAccess, ImageDataAccess, ServerConfiguration, GoogleDriveDataAccess } from '../dataAccess';
import { MemberService, ImageService, ServerConfigService, GoogleDriveService } from '../services';

export let Container = (function () {
    let _memberDataAccess: MemberDataAccess = {} as MemberDataAccess;
    let _imagedataAccess: ImageDataAccess = {} as ImageDataAccess;
    let _serverConfigDataAccess: ServerConfiguration = {} as ServerConfiguration;
    let _googleDriveDataAccess: GoogleDriveDataAccess = {} as GoogleDriveDataAccess;

    let _memberService: MemberService = {} as MemberService;
    let _imageService: ImageService = {} as ImageService;
    let _serverConfigService: ServerConfigService = {} as ServerConfigService;
    let _googleDriveService: GoogleDriveService = {} as GoogleDriveService;


    let bindDependencies = function (): void {
        _memberDataAccess = new MemberDataAccess();
        _imagedataAccess = new ImageDataAccess();
        _serverConfigDataAccess = new ServerConfiguration();
        _googleDriveDataAccess = new GoogleDriveDataAccess();
        _memberService = new MemberService();
        _imageService = new ImageService();
        _serverConfigService = new ServerConfigService();
        _googleDriveService = new GoogleDriveService();
    };

    let getDependencies = function () {
        return {
            memberDataAccess: _memberDataAccess,
            imageDataAccess: _imagedataAccess,
            serverConfigDataAccess: _serverConfigDataAccess,
            googleDriveDataAccess: _googleDriveDataAccess,
            memberService: _memberService,
            imageService: _imageService,
            serverConfigService: _serverConfigService,
            googleDriveService: _googleDriveService
        };
    };

    return {
        bind: bindDependencies,
        IoC: getDependencies
    };
})();