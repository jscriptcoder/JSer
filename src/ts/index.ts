import JSer from './jser/jser';
import BaseAPI from './api/base-api';
import TestAPI from './api/test-api';
import JScriptCoderAPI from './api/jscriptcoder-api';

let api1 = JSer.mixins(new BaseAPI(), new TestAPI());
let jser1 = new JSer(<HTMLElement>document.querySelector('#jser1'), api1, {
    promptSymbol: 'jser1>'
});

let api2 = new TestAPI();
let jser2 = new JSer(<HTMLElement>document.querySelector('#jser2'), api2, {
    backgroundColor: 'white',
    fontColor: 'black',
    promptSymbol: 'jser2>',
    active: false
});

let api3 = JSer.mixins(new BaseAPI(), new JScriptCoderAPI());
let jser3 = new JSer(<HTMLElement>document.querySelector('#jser3'), api3, {
    backgroundColor: 'darkblue',
    fontColor: 'lightgreen',
    promptSymbol: 'jser3>',
    active: false
});