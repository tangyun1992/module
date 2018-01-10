//main.js
define(function (require, exports, module) {
    seajs.use(['main','jquery'],function(main,$) {
    $('#title').after('<button id="show">showText</button>');
    $('#show').on('click',function() {
         main.showText()
    })
});
var changeText = require('changeText');
    var $ = require('jquery');
    var showText = function () {
        $('#title').text(changeText.init());
    }
    exports.showText = showText;

})
