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
    if (typeof Object.assign !== 'function') {
        Object.assign = function(target) {
            'use strict';
            if (target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== null) {
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
        instance:function ($name,$obj,$hash) {
            var _ = null;
            $hash = arguments[2] || -1;
            if(!this.__heap.__instance){
                    this.__heap.__instance = {};
            }
            _ = this.__heap.__instance;
            if($name &&  $obj){
                if($obj.auto || $obj.task ) {
                    delete $obj.auto || delete $obj.task;
                }
                if($obj.instance){
                    return ;
                }else{
                    if($obj instanceof  Array) {
                        for (var i = 0, len = $obj.length; i < len; i++) {
                            if (!($obj[i].instance)) {
                                $obj[i].instance = new Date().valueOf();
                            }
                        }
                    }
                    $obj.instance = new Date().valueOf();
                }
                if(_[$name]){
                    if($hash===-1){
                        return this.__func('console')($name+' instance is exists','error');
                    }
                    if(!(_[$name] instanceof  Array)){
                        _[$name] = [_[$name]];
                    }
                    if($obj instanceof  Array){
                        i=null;len =null;
                        _[$name] = _[$name].push.apply(_[$name],$obj);
                    }else{
                        _[$name].push($obj);
                    }
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
            console.log($eventName,$type);
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

        }
    });
})(__App);
//App builtin api and exports App
+(function ($,wind) {
    if(typeof $ !=='function' || !wind){
        console && console.error('env error : framework runtime Object not exists or env Window Object not exists!');
        return -1;
    }
    // module system add
    $.prototype = Object.assign($.prototype, {
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
                    if(rets===-1){

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
            var _len = this.__stack.length,
                ret = this.__heap[$name] ? ( this.__func('console')($name +' name is exists! ','error') && -1 ):this.__heap[$name] = this.__stack.push(typeof $define === 'function'? $define(this,$name):$define )&&this.__stack.length-1;
            if(_len===ret){
                ret = _len+1;
                this.emitter($name,'module_install');
                this.__auto($name,$define);
            }
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
                var flag = (typeof $define === 'function') && $define(this,$name);

                if(flag && !$define.instance ){
                  //  console.log($name,$define);
                    if(flag.prototype.task){
                        this.instance($name,(new flag()).task());
                    }
                    if($define && ($define.task || $define.prototype.task)){
                        this.instance($name,$define.task());
                    }
                }
            }
        },
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
        }

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
             }],
        [
            '$dom', $App.root.$ || $App.root.jQuery || $App.__func('console')('jquery is not install!','error')
        ],
        [
            '$',$App.root.$ || $App.root.jQuery || $App.__func('console')('jquery is not install!','error')
        ]
    ]);
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
                str = JSON.stringify(obj);   //系列化对象
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
    $.module('carousel', function($scope,$name){

        function Carousel($config){

            this.conf =Object.assign(arguments[0]||{},{
                'container':'.Carousel-container-box',
                'scroll-controller':'.Carousel-Controller',
                'scroll-tips':'.Carousel-item-tips',
                'list-container':'.Carousel-items-group-toggle',
                'items':'.Carousel-item',
                'active':'.active',
                'mode':'scrollTo',
                'start':0,
                'long':-1,
                'tick':4000
            });


            this.$name = $name;
            this.$root = $scope;
            if(!this.$root.$dom){
                console && console.error && console.error(this.name + 'module can not find frame work $dom !');
                return -3;
            }
            this.$dom = this.$root.$dom;
            this.$ = this.$dom;
            this.$scope =null;
            this.__store ={prev:0,now:0,next:0,list:[]};
            this.timer = function ($key,$value) {

            };
            return this;
        }

        Carousel.prototype = {
            constructor :Carousel,
            config:function ($key,$value) {
                if($key && $value!==undefined ){
                    if(this.__store[$key]!==undefined){
                        if($key==='now'||$key==='prev'||$key==='next'){
                            $value = ($value<0?null:$value) ;
                            $value = ($value >= this.__store.list.length ? null : $value)<0? null : $value;
                        }
                        if($key==='list'&&$value===null){
                            this.__store[$key].splice(0,this.__store[$key].length);
                        }
                        else {
                            console.log($key,$value);
                            this.__store[$key] = $value;
                        }
                    }else{
                        this.conf[$key] = $value;
                    }
                }
                if($key && typeof  $key === 'object'){
                   for( var arr in $key){
                       this.config(arr,$key[arr]);
                       // console.log('back config',arr,$key[arr]);
                   }
                }
                if($key && typeof $key==='string' && $value===undefined){
                    if(this.__store[$key]!==undefined){
                     return   this.__store[$key];
                    }else if(this.conf[$key]!==undefined) {
                        return this.conf[$key];
                    }
                    return undefined;
                }
                return true;
            },
            scanner:function ($conf) {
                if(!$conf){
                    $conf = this.conf ;
                    if(!$conf){
                        console && console.warn && console.warn(this.name + 'module scanner failed ! config error !');
                        return -1;
                    }
                }
                if(!($conf.hasOwnProperty('container')&&$conf.hasOwnProperty('list-container'))){
                    console && console.warn && console.warn(this.name + 'module config params undefined!!');
                    return -2;
                }
                var scope = this.$dom($conf.container);
                return scope || -1;
            },
            stop:function () {
                if(this.config('runner')){
                    clearInterval(this.config('runner'));
                }
            },
            start:function () {
                if(!this.$scope){
                    this.$scope = this.scanner();
                   if(this.$scope){
                      this.$scope = this.$scope.length ? false : this.$scope;
                      if(!this.$scope){
                          console && console.error && console.error('$scope too mush failed to match!');
                          return -5;
                      }
                   }else{
                       console && console.error && console.error('$scope init failed');
                       return -4;
                   }
                }
                if(!(this.__store.list instanceof  Array)){
                    console && console.error && console.error('list-container modify prototype constructor !!');
                    return -7;
                }
                if(this.conf['list-container']){
                    //console.log(this.$dom(this.$scope).children(this.conf['list-container']));
                    this.config('listBox',this.$dom(this.$scope).find(this.conf['list-container']));
                }else{
                    console && console.error && console.error('list-container element undefined !!');
                    return -6;
                }
                this.list();
                return this.$run();
            },
            media:function () {

            },
            prev:function () {
               return this.next(this.config('now'),this.config('prev'));
            },
            next:function ($des,$to) {
               // console.log(this,this.counter);
                if(!this.counter()){
                    return this.stop();
                }
                if(this.config('now') === this.config('next')){
                    this.sort();
                }
                var mode = this.config('mode'),
                    now = $des || this.config('now') ,
                    next = $to || this.config('next'),
                    len  =this.config('list').length;
                if(typeof now  === 'number' || typeof next === 'number'){
                    if(typeof now=== 'number' && ($des<0 && this.config('now')>0 && now === $des|| $des>=len && this.config('now')<len && now === $des)){
                        now = this.config('now');
                    }
                    if( typeof next === 'number' && ($to<0&&this.config('next')>0 && next === $to||$to>=len && this.config('next')<len && next === $to )){
                        next = this.config('next');
                    }
                }
                else if(typeof now === 'object' || typeof next === 'object'){
                    var list = this.config('list');
                    for(var i=0;i<len;i++){
                        if(list[i]===now){
                            now = this.$dom(list[i]).data('index');
                        }
                        if(list[i]===next){
                            next = this.$dom(list[i]).data('index');
                        }
                    }
                    list = null;
                }else{
                    console && console.error && console.error('TypeError: param errors !');
                    return -5;
                }
                if(typeof this[mode] === 'function'){
                  //  console.log('next',now,next,this.config('now'),this.config('next'));
                    if(this[mode](now,next)){
                        len = now = mode = next = null;
                        return ;
                    }else{
                        console && console.error && console.error(this.name+' runner failed to scroll !');
                    }
                }
                console && console.error && console.error(this.name+' run mode not exists!');
                return null;
            },
            scrollTo:function ($des,$to) {
                var _ = this.config('list'),des , to,active = this.config('active').replace('.','') ;
                if(typeof $des === 'number' && typeof $to === 'number'){
                    des = _[$des];
                    to = _[$to];
                }
                if(!(des && to)){
                    console && console.error && console.error('scrollTo params  error!');
                }
                if(des !== to){
                    this.$(to).addClass(active);
                    this.$(to).css({left:0,Opacity:1});
                    this.$(des).animate({left:"-100%",Opacity:0},2000);
                    this.tips($des,$to);
                    this.$(des).removeClass(active);
                    this.$(to).css({left:"100%",Opacity:0});
                    this.$(to).animate({left:0,Opacity:1},1050);
                    active = _ = des = to = null;
                    this.sort();
                }
                /*{
                   var t = this.animation('dom',{}).and('',{}).then('',{}).action();

                   t.stop();
                   t.continue();
                   t.killed();
                   t.add();
                   this.animate.addMode();
                   this.animation().on();

                   new (this.module('animation'));

                }*/

                return true;
            },
            jumpTo:function ($des,$to) {
                var _ = this.config('list');

                _ = null;
                return true;
            },
            $bind:function () {

                return true;
            },
            reset:function () {

            },
            task:function () {
                console.log('auto run carousel');
                var scope = this.scanner(),ret=[];
                if(scope && scope.length >1){
                    for(var i=0,len=scope.length;i<len;i++){

                        var _ =new Carousel();
                            _.$scope = scope[i];
                            _.start();

                            ret.push(_);
                    }
                    _ = null;
                }else{
                    ret = null;
                    return scope;
                }
                scope = null;
                return  ret;
            },
            $run:function () {
                // media
              return  this.config('runner',setInterval(this.next.bind(this),this.config('tick')||150)) && this.$bind();
            },
            list:function () {
                var now = -1;
                if(this.__store.list){
                    if(typeof this.__store.list.length &&this.__store.list.length === 0){
                           this.__store.list = this.$dom(this.config('items'),this.config('listBox'));
                    }
                    for(var i =0,len = this.__store.list.length;i<len;i++){
                        var _ = this.$dom(this.__store.list[i]);
                           _.data('index',i);
                        /*   console.log('active',_.hasClass(this.config('active')));*/
                    }
                }
               if(this.__store.list.length === 0){
                    console && console.error && console.error('list-container is empty no match any elements !!');
                    _ = i = len = now = null;
                    return -8;
                }
                this.sort();
                _ = i = len = now = null;
            },
            /**
             * 统计 滚动时限
             * @return  boolean
             * **/
            counter:function () {
                return true;
            },
            tips:function ($des,$to) {

                return true;
            },
            sort:function () {
                var i= prev = now = next = 0 ,_ = this.config('list'),len = _.length,active = this.config('active').replace('.','');
                for(;i<len;i++){
                   if(this.$dom(_[i]).hasClass(active)){
                        now = i;
                   }
                }
                prev = now -1 < 0 ?len-1:now -1;
                next = now +1 >len-1 ? 0 :now +1;
               // console.log(prev,now,next);
                this.config({
                    prev:prev,
                    now:now,
                    next:next
                });
                _ = i = len = prev = now = next = null;
            },
            /**
             * 定时调优 器
             * @return  boolean
             * **/
            ticker:function () {

            },
            /**
             * 添加新的 滚动模式
             * @param $name : String [模式名称]
             * @param $define : Function [模式定义函数]
             * @return mixin | boolean
             * **/
            addMode:function ($name,$define) {
                if($name && $define ){
                    if(typeof $name==='string' && $name!==''){
                      return typeof $define === 'function'?this[$name] = $define:false;
                    }
                }
                return null;
            },
            destroy:function () {
               this.$bind(null);
               this.conf['listBox'] = null;
               this.conf['runner']= null;
               this.$scope = null;
               this.reset();
               this.stop();
               delete this;
            }
        };
        return Carousel;
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
            task:function () {

                return this;
            },
            destroy:function () {

            }
        };
        return Nav;
    });
    console && console.log('nav module install framework ok !');
})($App);
// real time data
+(function ($) {

    if(!$ || typeof $ !== 'object' || !$.hasOwnProperty('root')){
        console && console.error('framework Object ( $App )is not exists !');
        return -2;
    }
    $.module('realTimeData', function($scope,$name){

        function RealTimeData($config){

            this.conf =  {

            };
            this.tick = 5;
            this.__start = 0;
            this.__end = -1;
            this.$name = $name;
            this.$root = $scope;
            this.$scope = function(){return this.scanner(this.conf);};
            this.__store ={prev:null,now:0,next:this.now+1,list:[]};
            this.timer = function ($key,$value) {

            };
            return this;
        }

        RealTimeData.prototype = {
            constructor :RealTimeData,
            config:function () {

            },
            scanner:function () {

            },
            stop:function () {

            },
            start:function () {

            },
            media:function () {

            },
            reset:function () {

            },
            task:function () {
                console.log('auto run carousel');
                return  this;
            },
            destroy:function () {

            }
        };
        return RealTimeData;
    });
    console && console.log('RealTimeData module install framework ok !');
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
    $.alias(
        [
        ['$menu',function ($args) {
                $.__func('console')($args);
        }],
        ['$helper',function ($args) {
            $.__func('console')($args);
        }]
    ]);

    console && console.log('user model running with framework !');
})($App);