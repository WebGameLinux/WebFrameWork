
const rollup = require( 'rollup' );
const babel = require('rollup-plugin-babel');

rollup.rollup({
    entry: './app.v1.js',
    plugins: [ babel() ]
}).then( function ( bundle ) {
    bundle.write({
        format: 'umd',
       // moduleName: 'app', //umd或iife模式下，若入口文件含 export，必须加上该属性
        dest: './app.bundle.js'
    });
});