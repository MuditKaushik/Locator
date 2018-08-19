import { Container } from './container';
import { Renderer } from './canvas';
import { GoogleDrive } from './google';
Container.bind();
new Renderer();
new GoogleDrive();