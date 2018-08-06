import './polyfill/polyfill';
import { Container } from './container';
Container.bind();
Container.IoC().memberService.getMembers();
