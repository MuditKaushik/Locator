import 'jquery';
import 'popper.js';
import 'bootstrap';
import '../scss/locator.scss';
import 'babel-polyfill';
import { CanvasLoader } from './canvas';
let canvas = new CanvasLoader();
canvas.readyCanvas().getMembers();