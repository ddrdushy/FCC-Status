/*jshint undef:false, strict:false*/ // Note: to avoid having to write QUnit.module, etc
require([
    'util/getBrownies'
], function (gBot) {
    module('util.getBrownies');

    test('existing user name', function () {
        equal(gBot.getPoints('kgashok'), 310, 'kgashok');
    });
    
    test('length-zero user name', function () {
        equal(gBot.getPoints(''), 0, '');
    });

});
