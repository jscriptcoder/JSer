import JSer from '../jser/jser';

export default class JScriptCoderAPI {
    
    private __jser__: JSer;
    
    public help() {
        this.__jser__.exec('lsc');
    }
    
}