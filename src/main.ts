import { Container } from './container';
import { Renderer } from './canvas';
import { DriveFilePicker } from './google';
Container.bind();
new Renderer();
new DriveFilePicker();