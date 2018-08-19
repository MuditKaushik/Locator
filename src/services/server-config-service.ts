import { Container } from '../container';
import { IGoogleConfigModel } from '../models';

export class ServerConfigService {
    constructor() { }
    getGoogleDriveService() {
        return Container.IoC().serverConfigDataAccess
            .getGoogleConfig().map((data: IGoogleConfigModel) => {
                return data;
            });
    }
}