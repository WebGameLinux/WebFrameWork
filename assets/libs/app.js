/**
 * Created by hewei on 2017-04-12.
 */
// polyfill
;(function () {
    // polyfill for MDN
    if(typeof Object.defineProperties!=='function') {
        function defineProperties(obj, properties) {
            function convertToDescriptor(desc) {
                function hasProperty(obj, prop) {
                    return Object.prototype.hasOwnProperty.call(obj, prop);
                }

                function isCallable(v) {
                    // 如果除函数以外,还有其他类型的值也可以被调用,则可以修改下面的语句
                    return typeof v === "function";
                }

                if (typeof desc !== "object" || desc === null)
                    throw new TypeError("不是正规的对象");

                var d = {};
                if (hasProperty(desc, "enumerable"))
                    d.enumerable = !!desc.enumerable;
                if (hasProperty(desc, "configurable"))
                    d.configurable = !!desc.configurable;
                if (hasProperty(desc, "value"))
                    d.value = desc.value;
                if (hasProperty(desc, "writable"))
                    d.writable = !!desc.writable;
                if (hasProperty(desc, "get")) {
                    var g = desc.get;
                    if (!isCallable(g) && g !== "undefined")
                        throw new TypeError("bad get");
                    d.get = g;
                }
                if (hasProperty(desc, "set")) {
                    var s = desc.set;
                    if (!isCallable(s) && s !== "undefined")
                        throw new TypeError("bad set");
                    d.set = s;
                }

                if (("get" in d || "set" in d) && ("value" in d || "writable" in d))
                    throw new TypeError("identity-confused descriptor");

                return d;
            }

            if (typeof obj !== "object" || obj === null)
                throw new TypeError("不是正规的对象");

            properties = Object(properties);
            var keys = Object.keys(properties);
            var descs = [];
            for (var i = 0; i < keys.length; i++)
                descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);
            for (var i = 0; i < descs.length; i++)
                Object.defineProperty(obj, descs[i][0], descs[i][1]);

            return obj;
        }
        Object.defineProperties = defineProperties;
    }
    if (typeof Object.assign != 'function') {
        Object.assign = function(target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }
})();
//App constructor
+(function (win) {
    'use strict';
    if(!win){
        console && console.error('env error : window Object not exists!');
        return -1;
    }
    function  App($root) {
        var TOP = this;
        this.root = $root || 0;
        this.version = '0.0.1';
        this.____ = {console:log,$eventRoot:[]};
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
        instance:function ($name,$obj) {
            var _ = null;
            if(!this.__heap.__instance){
                    this.__heap.__instance = {};
            }
            _ = this.__heap.__instance;
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
                if($keys && typeof $value === 'undefined'){
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
                if($keys && typeof $value === 'object' && $value === null){
                    if(_[$keys]){
                       delete  _[$keys];
                    }
                    return true;
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
            if(this.__heap['__instance']){
                if(this.__heap['__instance'][$key]){
                    delete this.__heap['__instance'][$key];
                }
            }
            return true;
        }
    };
    win['__App'] =App;
})(window||null);

//App builtin api
+(function ($) {
    if(typeof $ !=='function'){
        console && console.error('env error : framework runtime Object not exists!');
        return -1;
    }
    // event add
    $.prototype = Object.assign($.prototype,{
        emitter:function ($eventName,$type,$args) {
            var $e = this.____.$eventRoot;

        },
        on:function ($eventObject,$define) {
            var $e = this.____.$eventRoot;
            if(!($eventObject && $define)){
                this.__func('console')('param error at function Event on','error');
                return false;
            }
            if(!$e['Types']){
                $e['Types'] = [];
                $e['Types']['event'] = {
                    type:'event',
                    args:['name','type','args'],
                    up:true,
                    down:true,
                    left:true,
                    right:true,
                    index : 0
                };
            }
            if(!$e['Container']){
                $e['Container'] = [];
                this.bind(this);
            }
            return this.bind(this.__eventCreator($eventObject,$define));
        },
        bind:function ($obj,$EventType,$define) {
            var t = {
                eventName:'$e',eventType:1/*$e['Types']['event']*/,$defines:[
                    {
                        default: function  () {
                            var len = $obj['Types']['event'].eventType.args.length;
                            console && console.log(len);
                            ++this.eventState;
                        }
                    }
                ],
                pine:[],
                eventState : 0,
                sender:this,
                listener:this
            };


        },
        rm :function ($eventName,$defineName,$type) {
            var $e = this.____.$eventRoot['Container'] || null,flag =false;
            if($e){
                var len = $e instanceof  Array && $e.length;
                if(len>0){
                    var arr ='';
                    for( arr in $e){
                        if($type && $e[$type]){
                            arr = $type;
                        }
                        if(!($e[arr] instanceof Array)){
                            continue ;
                        }
                        for(var i=0,l = $e[arr].length;i<l;i++){
                            if($e[arr][i].eventName === $eventName){
                                $e[arr].splice(i,1);
                                flag = flag || ($type && $type === arr );
                            }
                        }
                        if(flag){
                            break;
                        }
                    }
                }
                return true;
            }
            this.__func('console')('event root object not exists!','warn');
            return false;
        },
        __eventCreator:function ($eventObjInfo,$define) {
            if($eventObjInfo && $define){

            }
            return {};
        },
        addEventType:function ($eventType,$args) {
            var $e = this.____.$eventRoot;
        },
        __EventList :function ($eventType) {

        },
    });
})(__App);
//App builtin api and exports App
+(function ($,wind) {
    if(typeof $ !=='function' || !wind){
        console && console.error('env error : framework runtime Object not exists or env Window Object not exists!');
        return -1;
    }
    // module system add
    $.prototype = Object.assign($.prototype,
    {
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
        __use:function ($modules,$task,$timeout) {
            if(!$timeout){
                $timeout = this.config('module_require_timeout') || 400;
            }
            if($modules && $task && typeof $task === 'function'){
                var count = $modules instanceof Array ? $modules.length :1,rets = [];
                if(typeof $modules === 'string'){
                    rets = this.queryModule($modules);
                    if(rets==-1){

                    }else{
                        $task(rets) && this.emitter(this.$name($task.name,'task'),'task_run_success');
                    }
                }
                if($modules instanceof Array){

                }
                count = rets = null;
            }

        },
        __insert :function ($name,$define) {
            var ret = this.__heap[$name] ? ( this.__func('console')($name +' name is exists! ','error') && -1 ):this.__heap[$name] = this.__stack.push(typeof $define === 'function'? $define(this):$define ) && this.__stack.length-1;
            this.emitter($name,'module_install');
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

    });
    wind['$App'] =new $(wind);
    console && console.log('framework init ok ! runtime is ready!');
})(__App,window);
// man like setting alias
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
    $.config('path',{
        jq:'https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js'
    });
    $.alias([
        [
            '$menu',function ($args) {
                    console && console.log($args);
            }
        ],
        [
            '$helper',function ($args) {
                  console && console.log($args);
            }
        ]]);
    console && console.log('user model running with framework !');
})($App);