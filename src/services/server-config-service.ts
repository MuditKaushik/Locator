import { Container } from '../container';
import { IGoogleConfig } from '../models';

export class ServerConfigService {
    constructor() { }
    getGoogleDriveService() {
        return Container.IoC().serverConfigDataAccess
            .getGoogleConfig().map((data: IGoogleConfig) => {
                return data;
            });
    }
}