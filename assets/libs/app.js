/**
 * create by hewei
 * **/
;(function (win,$) {
    'use strict';
    if(win===-1 || $===-1){
        throw  Error('env runtime error');
    }
    function App (){
        this.name = "App";
        this.$ = win.jQuery || win.$ || $ ;
    }
    App.prototype.___ = {};
    App.prototype.debug = function () {
        var _ = win.console || -1;
        if(_===-1){
            throw Error('no support console');
        }
        return _.log(arguments.call.apply(arguments,[]));
    };
    App.prototype.Component = function ($name,$define) {
       // console.log($name,$define);
         if(typeof $name !=='undefined' && typeof $define ==='function' ){
             // console.log(2);
                if(typeof this.___[$name]!=='undefined'){
                    return  false;
                }
                return this.___[$name] = $define ;
         }
         if(typeof $name !=='undefined' && typeof $define ==='undefined' ){
             // console.log(3);
             if(typeof this.___[$name] === 'undefined'){
                return  false;
            }
            return this.___[$name] ;
         }
         return this.___;
    };
    App.prototype.module = function ($name,$obj) {
        if( typeof this.___.instacne === 'undefined' ){
             this.___.instance = {};
        }
        if( typeof this.___.instacne[$name] === 'undefined' && typeof $define !== 'undefined'&&&& $define !== null){
            return this.___.instacne[$name] = $obj ;
        }
        if( typeof this.___.instacne[$name] !== 'undefined' && typeof $define !== 'undefined' && $define === null ){
            delete  this.___.instacne[$name] ;
        }
        if( typeof this.___.instacne[$name] !== 'undefined' && typeof $define === 'undefined'){
            return  this.___.instacne[$name] ;
        }
    };

    win.$App = new App();
})(window || -1,jQuery || -1);

+(function (App) {
    if(App === -1){
        throw  Error('App not exists!');
    }
    App.Component('event',function(){

            var that = typeof window === 'object' && this === window ? {} : this;

            that.__proto__._M_V_P_ = App.___.eventlist = {};

            that.on = function($eveName,$handler,$evenTarget){

            };
            that.emit = function ($eventName,$args) {

                console.log(arguments);
            };
            that.proxy = function ($Obj,$fnName,$callback) {
                    if(typeof $Obj === 'object' && typeof $fnName === 'string' && $fnName!==''){
                        var _ = $Obj[$fnName] ,event = this;
                        if( typeof $Obj[$fnName] === 'function' && typeof $callback === 'function' ){

                            $Obj[$fnName] = function () {
                                  try{
                                     _.apply(_,arguments);
                                  }catch(e){

                                      return -1;
                                  }
                                   $callback.apply($callback,arguments);
                              };
                        }

                        if(typeof $Obj[$fnName] === 'function' && typeof $callback === 'undefined'){
                            $Obj[$fnName] = function () {
                                try{
                                    _.apply(_,arguments);
                                }catch(e){

                                    return -1;
                                }
                                if(event.exists('proxy')){
                                    event.emit('proxy',{ target : {parent:$Obj,method:$fnName} , args:arguments.apply([],arguments)} );
                                }
                            };
                        }

                        if(typeof $Obj[$fnName] === 'object'   ){
                            if(typeof $callback === 'function'){
                                // get

                                // set
                            }
                            if(typeof $callback === 'undefined'){
                                // get

                                // set
                            }
                        }
                        _ = null;
                    }
            };
            that.event  =function($fnObj){
                 if(typeof $fnObj !=='undefined'){
                     if(typeof Object.assign === 'function'){
                       $fnObj = Object.assign($fnObj,new this());
                     }
                     else{
                         for(var i in this){
                             $fnObj[i] = $fnObj[i] ? $fnObj[i] : this[i];
                         }
                         i = null;
                     }
                 }
            };
            that.add  = function ($target,$eventName,$handler) {

            };
            that.exists =function ($name) {

            };

            that = null;
    });
    var _ = new (App.Component('event'))();
        _.proxy(App,'Component',function($scope){

        });
        _.on('init',function($scope,$args){

        });
        _.emit('init');
        _.event(Object);
    App.module("ComponentEvent",_);
        _ = null;
})($App);

+(function (App) {
    if(App === -1){
        throw  Error('App not exists!');
    }
    App.Component('carousel',function($obj){

    });

    App.Component('realTimeData',function($obj){

    });
})($App || -1);

+(function (App) {
    if(App === -1){
        throw  Error('App not exists!');
    }
    var carousels = App.Component('carousel');
    carousels.init = function(){

    };
    var realTime = App.Component('realTimeData');
    realTime.init = function(){

    };
})($App);

