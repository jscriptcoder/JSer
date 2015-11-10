/// <reference path="jser/jser.d.ts" />

import JSer from './jser/jser';
import APITest from './api/api-test';

let api = new APITest();

let jser1 = new JSer(<HTMLElement>document.querySelector('#jser1'), api, {
    promptSymbol: 'jser1>'
});

let jser2 = new JSer(<HTMLElement>document.querySelector('#jser2'), api, {
    backgroundColor: 'white',
    fontColor: 'black',
    promptSymbol: 'jser2>',
    active: false
});

let jser3 = new JSer(<HTMLElement>document.querySelector('#jser3'), api, {
    backgroundColor: 'darkblue',
    fontColor: 'lightgreen',
    promptSymbol: 'jser3>',
    active: false
});