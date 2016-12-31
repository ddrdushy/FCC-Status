/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
require([
    'util/getBrownies',
    '../lib/jquery'
], function (gBot) {
    module('util.getBrownies');

    test('existing user name', function () {
        QUnit.stop();
        equal(gBot.getPoints('kgashok'), 273, 'kgashok');
        QUnit.start();
    });
     
    test('length-zero user name', function () {
        QUnit.stop();
        equal(gBot.getPoints(''), 0, '');
        QUnit.start();
    });

});
