import './polyfill/polyfill';
import { Container } from './container';
import { Renderer } from './canvas';
Container.bind();
new Renderer();
