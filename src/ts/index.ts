import JSer from './jser/jser';
import TestAPI from './api/test-api';
import JScriptCoderAPI from './api/jscriptcoder-api';

let jser1 = new JSer(<HTMLElement>document.querySelector('#jser1'), new TestAPI(), {
    promptSymbol: 'jser1>'
});

let jser2 = new JSer(<HTMLElement>document.querySelector('#jser2'), new JScriptCoderAPI(), {
    backgroundColor: 'darkblue',
    fontColor: 'lightgreen',
    promptSymbol: 'jser2>',
    active: false
});