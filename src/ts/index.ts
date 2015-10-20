/// <reference path="jser/jser.d.ts" />

import JSer from 'jser/jser';
import JScriptCoder from 'api/jscriptcoder';

let el = <HTMLElement>document.querySelector('#jser');
let api = new JScriptCoder();
let config = <JSerConfig>{}

let jser = new JSer(el, api, config);