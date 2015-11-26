import JSer from './jser/jser';
import APITest from './api/api-test';

let jser1 = new JSer(<HTMLElement>document.querySelector('#jser1'), new APITest(), {
    promptSymbol: 'jser1>'
});

let jser2 = new JSer(<HTMLElement>document.querySelector('#jser2'), new APITest(), {
    backgroundColor: 'white',
    fontColor: 'black',
    promptSymbol: 'jser2>',
    active: false
});

/*
let jser3 = new JSer(<HTMLElement>document.querySelector('#jser3'), new APITest(), {
    backgroundColor: 'darkblue',
    fontColor: 'lightgreen',
    promptSymbol: 'jser3>',
    active: false
});
*/