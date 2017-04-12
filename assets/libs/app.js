/**
 * Created by hewei on 2017-04-12.
 */

;(function (win) {
    'use strict';
    if(!win){
        console && console.error('env error : window Object not exists!');
        return -1;
    }

    function  App($root) {
        var TOP = this;
        this.root = $root || 0;
        this.version = '0.0.1';
        this.____ = {console:log};
        function log ($msg,$level) {
            if($msg){
                var _ = console || new $Console,_def = TOP.config('console_msg');
                /*if(typeof $msg === 'number'){
                 $msg = $msg
                 }
                 if(typeof $msg === 'string'){

                 }
                 else{

                 }*/
                if($level === '' || !$level || $level === 'log' || $level === 0){
                    return _.log($msg);
                }
                if($level === -1 || $level === 'error'){
                    return _.error($msg);
                }
                if($level === -2 || $level === 'warn'){
                    return _.warn($msg);
                }
                if($level === -3 || $level === 'debug'){
                    return _.debug($msg);
                }
                if($level === 1 || $level === 'tip'){
                    return  (_.tip && _.tip($msg)) || _.log($msg);
                }
            }
            function $Console() {
                this.core = function () {

                };
                this.version = '0.0.1';
            }
            $Console.prototype = {
                constructor : $Console,
                log :function () {

                },
                error:function () {

                },
                warn :function () {

                },
                tip:function () {

                },
                debug :function () {

                }
            };
        }
    }

    App.prototype = {
        constructor :App,
        __stack:[], // func
        __heap:{}, // instance index
        module: function ($module,$define) {
            var len = arguments.length,tmp=[];
            if(len === 1 && typeof $module === 'string'&& $module!==''){
              return this.__get($module);
            }
            if(len === 2 && $module && $define){
                tmp['define'] = typeof $define;
                tmp['name'] = typeof $module;
                tmp['define'] = (tmp['define']==='function' || tmp['define']==='object') ? 1 :((tmp['name']==='function' || tmp['name']==='object')?0:-1);
                tmp['name'] = (tmp['name']==='string' && $module!=='') ? 0 :((tmp['define']==='string' && $define!=='')?1:-1);
                if(tmp['name'] === -1|| tmp['define']=== -1){
                    this.__func('console')('module param error','error'); // test
                    return -3;
                }else{
                  $define = arguments[tmp['define']];
                  $module = arguments[tmp['name']];
                  // console.log($define,$module);
                  return this.__insert($module,$define);
                }
            }
            else{
                console && console.error('params error: undefined params length of '+len );
                return -3;  // error params
            }
        },
        instance:function ($name,$obj) {
            var _ = null;
            if(!this.__heap.instance){
                    this.__heap.instance = {};
            }
            _ = this.__heap.instance;
            if($name &&  $obj){
                if($obj.auto) {
                    delete $obj.auto
                }
                if($obj.instance){
                    return ;
                }else{
                    $obj.instance = new Date().valueOf();
                }
                if(_[$name]){
                    return this.__func('console')($name+' instance is exists','error');
                }
                _[$name] = $obj;
            }else{
                if($name && typeof $name === 'string'){
                    return _[$name] || -1;
                }
                return _;
            }
        },
        proxy:function ($fn,$args,$callback) {

        },
        register:function ($name,$instance) {

        },
        api :function ($fnName,$define) {

        },
        service:function ($name,$service) {

        },
        __exports:function ($name,$define) {

        },
        __require:function ($path) {
            if($path){
                return this.__get($path) || false;
            }
            if(this.config('path')){

            }
            return -1;
        },
        __use:function ($modules) {

        },
        __insert :function ($name,$define) {
           var ret = this.__heap[$name] ? ( this.__func('console')($name +' name is exists! ','error') && -1 ):this.__heap[$name] = this.__stack.push(typeof $define === 'function'? $define(this):$define ) && this.__stack.length-1;
           this.__auto($name,$define);
           return (ret>=0)?1:-1;
        },
        __get:function ($name) {
            var ret = null;
            if($name!=='' && typeof $name === 'string'){
               ret = this.__heap[$name];
               //console.log('get',$name,ret);
               ret === null ? ret = -1 : ret ;
               return  typeof ret === 'number'  ? (this.__stack[ret]? this.__stack[ret] : -1 ):-1;
            }
            console && console.log('want object is not exists in runtime');
            return null;
        },
        __auto:function ($name,$define) {
            if($name && $define){
                var flag = $define && $define.auto;
                if(flag && !$define.instance ){
                    //console.log($name,$define);
                    this.instance($name,$define.auto());
                }
            }
        },
        alias:function ($alias,$des) {
            if($alias && $des){
                if(typeof $alias === 'string' && typeof $des === 'object' ){
                    this[$alias] = $des;
                }
            }
            if($alias && !$des){
               if($alias instanceof  Array){
                   for(var i=0,len = $alias.length;i<len;i++){
                       if(!($alias[i] instanceof Array)){
                           break ;
                       }
                       if( $alias[i].length === 2 ){
                            this[$alias[i][0]] = $alias[i][1];
                       }
                   }
               }
            }
        },
        __func:function ($private_fn,$define) {
            var that = this.____;
            if($private_fn && $define){
                that[$private_fn] ? console.error($private_fn+' function is exists!') : that[$private_fn]=$define;
            }
            if(!$define && $private_fn){
                return that[$private_fn] || function () { return -1;};
            }

        },
        config : function ($keys,$value) {

                if(!this.__stack['config']){
                    this.__stack['config'] = {};
                }
                var _ = this.__stack['config'];
                if($keys && $value){
                    _[$keys] = $value;
                    return true;
                }
                if($keys && !$value){
                   if(typeof $keys === 'object'){
                       for(var k in $keys){
                           this.config(k,$keys[k]);
                       }
                       return true;
                   }
                   if(typeof $keys === 'string'){
                       return _[$keys] || null;
                   }
                }

        },
        clean : function ($key) {

            if(this.__heap[$key]){
               var index = this.__heap[$key];
               if(typeof index === 'number'){
                   delete this.__stack[index];
               }
               delete  this.__heap[$key];
            }
            if(this.__heap['instance']){
                if(this.__heap['instance'][$key]){
                    delete this.__heap['instance'][$key];
                }
            }
            return true;
        }
    };

    win['$App'] =new App(win);
    $App.config('path',{
        jq:'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js'
    });
    console.log(' framework App is Init Ok !');
})(window||null);

// man like setting
+(function ($) {
    if(!$ || typeof $ !== 'object' || !$.hasOwnProperty('root')){
        console && console.error('framework Object ( $App )is not exists !');
        return -2;
    }
   
    $.alias([['use',$.__use],
             ['require',function($path){
                  var ret = $.__require($path);
                  if(ret && typeof ret === 'object'){
                      return ret;
                  }
                  return -1;
             }],
             ['import',function($path){
                var ret =  $.__require($path);
                if(ret && typeof ret === 'function'){
                    return ret;
                }
                return -1;
             }]]);
    console && console.log('alias for man like to use framework ok !');
})($App);


// __func insert
+(function ($) {

    // deep copy object function
    $.__func('cloneObj',function(obj){

            var str, newobj = obj.constructor === Array ? [] : {};
            if(typeof obj !== 'object'){
                return;
            } else if($.root.JSON){
                str = JSON.stringify(obj),   //系列化对象
                newobj = JSON.parse(str); //还原
            } else {
                for(var i in obj){
                    newobj[i] = typeof obj[i] === 'object' ? $.__func('cloneObj')(obj[i]) : obj[i];
                }
            }
            return newobj;
    });


})($App);

// module list

// carousel
+(function ($) {
    if(!$ || typeof $ !== 'object' || !$.hasOwnProperty('root')){
        console && console.error('framework Object ( $App )is not exists !');
        return -2;
    }
    $.module('carousel',{
        init:function () {
            this.tick = 5;
            this.__start = 0;
            this.__end = -1;
            this.__store ={};
            this.timer = function ($key,$value) {

            };
            return this;
        },
        __private:function () {

        },
        run:function () {

        },
        auto:function () {
            console.log('auto run carousel');
          return  this.init();
        },
        destroy:function () {

        }
    });
    console && console.log('carousel module install framework ok !');
})($App);

// nav
+(function ($) {
    if(!$ || typeof $ !== 'object' || !$.hasOwnProperty('root')){
        console && console.error('framework Object ( $App )is not exists !');
        return -2;
    }
    $.module('nav',function ($App) {

        var dependent = $App.import('carousel');

        function Nav() {
            this.name = 'nav';
            this.dep = dependent;
        }
        Nav.prototype = {
            constructor : Nav,
            init:function () {

            },
            __private:function () {

            },
            run:function () {

            },
            auto:function () {

            },
            destroy:function () {

            }
        };
        return Nav;
    });
    console && console.log('nav module install framework ok !');
})($App);

// model list

// user scope
+(function ($) {
    if(!$ || typeof $ !== 'object' || !$.hasOwnProperty('root')){
        console && console.error('framework Object ( $App )is not exists !');
        return -2;
    }
    //$.use(['nav','carousel']);
    //var car = new $.module('carousel');
    console && console.log('user model running with framework !');
})($App);