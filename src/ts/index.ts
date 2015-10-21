/// <reference path="jser/jser.d.ts" />

import JSer from './jser/jser';
import APITest from './api/api-test';

let el = <HTMLElement>document.querySelector('#jser');
let api = new APITest();
let config = <JSerConfig>{}

let jser = new JSer(el, api, config);