//main.js
define(function (require, exports, module) {
    var changeText = require('changeText');
    var title = document.getElementById('title');
    title.innerHTML = changeText.init();
})
