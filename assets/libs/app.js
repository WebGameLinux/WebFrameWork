/**
 * create by hewei
 * **/
;(function (win,$) {
    'use strict';
    if(win===-1 || $ ===-1){
        throw  Error('env runtime error');
    }
    function App (){
        this.name = "App";
    }
    App.prototype.$= win.jQuery || win.$ || $ || -1;
    App.prototype.___ = {};
    App.prototype.debug = function () {
        var _ = win.console || -1;
        if(_===-1){
            throw Error('no support console');
        }
        return _.log(arguments.call.apply(arguments,[]));
    };
    App.prototype.Component = function ($name,$define) {
        if(typeof this.___.Components === 'undefined'){
            this.___.Components = {};
        }
         if(typeof $name !=='undefined' && typeof $define ==='function' ){
                if(typeof this.___.Components[$name]!=='undefined'){
                    return  false;
                }
                return this.___.Components[$name] = $define ;
         }
         if(typeof $name !=='undefined' && typeof $define ==='undefined' ){
             if(typeof this.___.Components[$name] === 'undefined'||typeof this.___.Components[$name] !=='function'){
                return  false;
              }
            return this.___.Components[$name](this) ;
         }
         return this.___.Components;
    };
    App.prototype.module = function ($name,$define) {

        if( typeof this.___.modules === 'undefined' ){
             this.___.modules = {};
        }
        if( typeof this.___.modules[$name] === 'undefined' && typeof $define !== 'undefined' && $define !== null){
            this.___.modules[$name] = $define ;
         //   console.log($name,this.___.modules[$name]);
            return true;
        }
        if( typeof this.___.modules[$name] !== 'undefined' && typeof $define !== 'undefined' && $define === null ){
            delete  this.___.modules[$name] ;
         //   console.log($name,this.___.modules[$name]);
            return true;
        }
        if( typeof this.___.modules[$name] !== 'undefined' && typeof $define === 'undefined'){
            return  this.___.modules[$name] ;
        }
        console.error('params error!');
    };
    App.prototype.extend = function ($new,$old) {
        if($new && $old){

        }
    };
    App.prototype.container = function ($name,$obj) {
         if(!this[$name]){
           return  this[$name] = $obj;
         }
         if( this[$name] && !(this[$name] instanceof Array)){
             this[$name]=[this[$name]];
            return this[$name].push($obj);
         }
        if( this[$name] && (this[$name] instanceof Array)){
          return  this[$name].push($obj);
        }
    };

    win.$App = new App();
})(window || -1,jQuery || -1);

+(function (App) {
    if(App === undefined ){
        throw  Error('App not exists!');
    }
    App.Component('event',function(){
            function Event() {
                this.name = 'event';
            }


          Event.prototype._M_V_P_  = {
                types:[
                    'click',
                    'touch'
                ],
                instances:{}
            };

        Event.prototype.on = function($eveName,$handler,$evenTarget){
                var ret  = false;
                if( typeof $evenTarget ==='object'&& $evenTarget !== undefined && typeof $evenTarget.emit === 'undefined'){
                    return  this.add($evenTarget,$eveName,$handler);
                }
                if(typeof this._M_V_P_ === 'undefined'){
                    this._M_V_P_ = {};
                }
                if(typeof this._M_V_P_.instances === 'undefined'){
                    this._M_V_P_.instances = {};
                }
                if(typeof this._M_V_P_.instances[$eveName] === 'undefined' && typeof $handler === 'function'){
                         this._M_V_P_.instances[$eveName] = {};
                         this._M_V_P_.instances[$eveName].Target = $evenTarget || $handler.eventTarget || this ;
                         this._M_V_P_.instances[$eveName].handlers = [$handler.bind(this._M_V_P_.instances[$eveName].Target)];
                         this._M_V_P_.instances[$eveName].status = 0 ;
                         this._M_V_P_.instances[$eveName].counter = 0 ;

                    ret  = true;
                }
                if(!ret && typeof this._M_V_P_.instances[$eveName] !== 'undefined' && typeof $handler === 'function'){
                    if( this._M_V_P_.instances[$eveName].status > -2 ){
                        this._M_V_P_.instances[$eveName].handlers.push($handler.bind(this._M_V_P_.instances[$eveName].Target));
                    }
                    if(this._M_V_P_.instances[$eveName].status === 1){
                        this.emit($eveName,$evenTarget);
                    }
                    ret  =true;
                }
                return ret;
            };
        Event.prototype.emit = function ($eventName,$args) {
                if(typeof $args === 'undefined'){
                    $args = {};
                }
                if(typeof $args !== 'object'){
                    $args = {args:$args}
                }

                if($eventName && typeof this._M_V_P_.instances[$eventName] !=='undefined'){
                    if(this._M_V_P_.instances[$eventName].status<0){
                        return ;
                    }
                    this._M_V_P_.instances[$eventName].status = 1;
                    for(var i=0,len = this._M_V_P_.instances[$eventName].handlers.length;i<len;i++){
                        if(this._M_V_P_.instances[$eventName].status === 1 && typeof this._M_V_P_.instances[$eventName].handlers[i] === 'function'){
                            $args.self =  this._M_V_P_.instances[$eventName].handlers[i];
                            this._M_V_P_.instances[$eventName].handlers[i].Target = this;

                            this._M_V_P_.instances[$eventName].handlers[i](this._M_V_P_.instances[$eventName],$args);
                        }
                    }
                    this._M_V_P_.instances[$eventName].counter ++;
                }else{
                    console.warn( 'event : '+$eventName+" isn't exists!!");
                }
                this._M_V_P_.instances[$eventName].status = 0;
                //console.log($eventName,$args);
            };
        Event.prototype.off  = function ($eventName) {
                if(typeof this._M_V_P_.instances[$eventName] !=='undefined'){
                    this._M_V_P_.instances[$eventName].status = -1;
                  return true;
                }
                return false;
            };
        Event.prototype.active =function ($eventName) {
                if(typeof this._M_V_P_.instances[$eventName] !=='undefined'){
                    this._M_V_P_.instances[$eventName].status = 0;
                    return true;
                }
                return false;
            };
        Event.prototype.ready = function ($eventName,$callback) {
                if(typeof this._M_V_P_.instances[$eventName] !=='undefined' && this._M_V_P_.instances[$eventName].status >=0 ){
                    if(this._M_V_P_.instances[$eventName].counter>0 && typeof $callback === 'function'){
                        $callback();
                        return true;
                    }
                }
                return false;
            };
        Event.prototype.$event  =function($fnObj){
                 if(typeof $fnObj !=='undefined'){
                         for(var i in this.constructor.prototype ){
                             if(i!=='event'){
                                 if(typeof $fnObj[i] ==='undefined' && typeof $fnObj.constructor.prototype[i] ==='undefined') {
                                     $fnObj.constructor.prototype[i] = this.constructor.prototype[i];
                                 }
                             }
                         }
                         i = null;
                 }
            };
        Event.prototype.add  = function ($target,$eventName,$handler) {
                 var ret = false;
                 if(typeof $target === 'object' && $target !== undefined && $target!==null){
                    if(typeof $target.on === 'undefined'){
                        $target.on =  this.on.bind($target)  ;
                    }
                    if(typeof $target.emit === 'undefined'){
                        $target.emit = this.emit.bind($target);
                    }
                    if(typeof $target.rme === 'undefined'){
                        $target.rme = this.rm.bind($target);
                    }
                    if(typeof $target.ready === 'undefined'){
                         $target.ready = this.ready.bind($target);
                    }
                    if(typeof $eventName === 'string' && typeof $handler === 'function'){
                         $handler.eventTarget = $target;
                         this.on($eventName,$handler);
                         $target.on($eventName,$handler);
                         ret = true;
                    }
                 }
                 return ret;
            };
        Event.prototype.tag = function ($eventName,$Target,$args,$can) {
                if($can === undefined){
                    $can = true;
                }
                if($args === undefined){
                    $args = {target:this};
                }
                if(this._M_V_P_.instances[$eventName]){
                    if(this._M_V_P_.instances[$eventName].Target === $Target){
                            if(this._M_V_P_.instances[$eventName].status>0 || $can){

                                for(var i = 0, len = this._M_V_P_.instances[$eventName].handlers.length;i<len;i++){
                                    this._M_V_P_.instances[$eventName].handlers[i].Target = this ;
                                    this._M_V_P_.instances[$eventName].handlers[i]({self:this._M_V_P_.instances[$eventName].handlers[i],target:$Target,args:$args});
                              }
                              this._M_V_P_.instances[$eventName].counter ++;
                            }
                    }
                }
            };
        Event.prototype.alias = function ($oldName,$newName) {
                   if(typeof this._M_V_P_.instances[$oldName] === 'object' && $newName!=='' && typeof $newName ==='string'){
                       this._M_V_P_.instances[$newName] = this._M_V_P_.instances[$oldName];
                     return true;
                   }
                   return false;
            };
        Event.prototype.exists = function ($name) {

                if(typeof this._M_V_P_.instances[$name] === 'object' && this._M_V_P_.instances[$name]!==undefined){

                    return true;
                }
                return false;
            };
        Event.prototype.rm  =function ($name,$tag) {
                    if(this.exists($name)){
                        if($tag!==''&&typeof $tag ==='string'&&  this._M_V_P_.instances[$name] instanceof  Array){
                            for(var i = 0, len = this._M_V_P_.instances[$name].length;i<len;){
                                if(typeof this._M_V_P_.instances[$name][i][$tag]!=='undefined'){
                                    this._M_V_P_.instances[$name].splice(i,1);
                                    len = this._M_V_P_.instances[$name].length;
                                  continue;
                                }
                                i++;
                            }
                        }else{
                           delete this._M_V_P_.instances[$name];
                           return true;
                        }
                    }
            };

            return Event;
    });
    var _ = new (App.Component('event'))();
        _.$event(Object);
        _.$event(App);
    App.module("$Event",_);
        _ = null;
})($App);
// add components
+(function (App) {
    if(App === -1){
        throw  Error('App not exists!');
    }
    App.Component('carousel',function($obj){

        function Carousel() {

        }
        Carousel.prototype.next = function () {

        };
        Carousel.prototype.prev = function () {

        };
        Carousel.prototype.stop = function () {

        };
        Carousel.prototype.play = function () {

        };

        return Carousel;
    });
    App.Component('realTimeData',function(){

            function RealTimeData() {

            }

            RealTimeData.prototype.$http = App.$.ajax || -1;

            RealTimeData.prototype.getData = function () {

            };
            RealTimeData.prototype.setView =function () {

            };
            RealTimeData.prototype.defaultData =function () {

            };

            return RealTimeData;
    });
})($App);
//
+(function (App) {
    if(App === -1){
        throw  Error('App not exists!');
    }
    var carousels = App.Component('carousel');
    carousels.init = function($config){

    };
    var realTime = App.Component('realTimeData');
    realTime.init = function(){

    };
})($App);

+(function (App) {
    App.Component('Toast',function ($scope) {

        function Toast($config) {
            this.$scope = $scope || -1;
            this.name = 'Toast';
            this.version = '1.0.0';
            this.config($config);
            this.create();
        }
        Toast.prototype.$   = $scope.$ || -1;
        Toast.prototype.messages = '';
        Toast.prototype.config = function ($configs) {
            if($configs===undefined){
                $configs = {};
            }

            if(typeof $configs === 'object' && $configs!==null){
                this.template($configs.tpl);
                this.msg($configs.msg);
                this.style($configs.styles);
                this.container($configs.element);
                this.position($configs.position);
                this.fn = {};
                this.fn.showCallback = typeof $configs.showback ==='function'? $configs.showback : -1;
                this.fn.hideCallback = typeof $configs.hideback ==='function'? $configs.hideback :  -1;
            }
            this.conf = $configs;
            return this;
        };
        Toast.prototype.create = function () {
            if(!(document && document.createElement )){
                throw Error('error document not exists!');
            }
            this.node = document.createElement('div');
            this.node.setAttribute('class','ui-toast');
            var tpl = this.template();
            if(typeof tpl==='string'&&tpl!=="<div class='ui-toast'>{{msg}}</div>"&&tpl!==''){
                tpl.replace('{{msg}}',this.msg());
                this.node.innerHTML = tpl;
            }else{
                this.node.innerHTML = this.msg();
            }
            tpl = null;
            this.$(this.node).css({opacity:0});
            return this.node;
        };
        Toast.prototype.template =function ($html) {
             if(!this.tpl){
                 this.tpl = "<div class='ui-toast'>{{msg}}</div>";
             }
             if(!$html){
                 return this.tpl;
             }
             if(typeof $html === 'string' && $html !==''){
                 return this.tpl = $html;
             }
        };
        Toast.prototype.container = function ($el) {
            if(this.context === undefined || this.context === ''){
                this.context = this.$ !== -1? this.$('body')[0]:(document && document.body)? document.body: -1;
            }
            if(this.context === -1){
                throw  Error('toast context error!');
            }
            if($el === undefined){
                return this.context;
            }
            if(typeof $el === 'string' && $el!==''){
                var _ = this.$($el)[0];
                if(_ === undefined){
                    throw  Error('toast set context error! you selector is not exists!');
                }
                this.context = _ ;
                _ = null;
            }
            if(typeof $el === 'object' && $el.nodeType === 1){
                this.context = $el;
            }
            return this.context;
        };
        Toast.prototype.style =function ($key,$value) {
            if(!this._styles){
                this._styles = {
                    'min-width':'',
                    'width':'',
                    'min-height':'',
                    'height':'',
                    'classes':''
                };
            }
            if($key === undefined && $value === undefined){
                return null;
            }
            if( typeof $key === 'string' && typeof $value === 'string' && $key !==''  && $value !== ''){
                this._styles[$key] = $value;
            }
            if(typeof $key === 'object' && $key !==null && $value === undefined){
                for(var arr in $key){
                    this.style(arr,$key[arr]);
                }
                arr = null;
            }
            if(typeof $key === 'string' && $value ===undefined){
                return this._styles[$key];
            }
            return this;
        };
        Toast.prototype.msg =function ($msg) {
            if($msg===undefined){
                return this.messages;
            }
            this.messages = $msg || '';
            return this;
        };
        Toast.prototype.show =function ($callback) {
            this.$(this.container()).append(this.node);
            this.$(this.node).animate({opacity:1},300);
            if(this.fn && typeof this.fn.showCallback === 'function'){
                this.fn.showCallback(this);
            }
            if(typeof $callback === 'function'){
                  $callback(this);
            }
            return this;
        };
        Toast.prototype.hide =function ($config,$callback) {
            if($config === undefined){
                $config = {delay:1000};
            }
            setTimeout(function(that){
                that.self.$(that.node).animate({opacity:0},1500);
                that.self.$(that.node).remove();
                if(that.$callback instanceof Array){
                    for(var i =0 ,len=that.$callback.length;i<len;i++){
                        if(typeof that.$callback[i] === 'function'){
                            that.$callback[i](that);
                        }
                    }
                }
            },$config.delay ||4000,{self:this,node:this.node,$callback:[this.fn.hideCallback,$callback]});
            return this;
        };
        Toast.prototype.destroy =function () {
            for(var i in this){
                 delete this[i] ;
            }
            i = null;
        };
        Toast.prototype.position =function ($config) {

            return this;
        };
        return Toast;
    });
})($App);

+(function (App) {
    var texts = ['.password','.username'];

    if(typeof Clipboard === 'function'){
        for(var i=0,len=texts.length;i<len;i++){
           App.container('clipBtn'+i,new Clipboard(App.$(texts[i])[0]));
           App['clipBtn'+i].on('success',function (e) {
               e.clearSelection();
               new (App.Component('Toast'))({tpl:'',msg:'复制成功',element:e.trigger}).show().hide({delay:500}).destroy();
           });
           App['clipBtn'+i].on('error',function (e) {
               console.error('clipText failed!!');
               e.clearSelection();
           });
        }
    }


    texts = null;

})($App);

