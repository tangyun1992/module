//main.js
 require.config(
        {
            paths: {
                'jquery': '../requirejs/jquery.js'
            }
        }
    );
    require(['jquery'],function ($) {
             $(document).on('click','#contentBtn',function(){
                $('#messagebox').html('You have access Jquery by using require()');
             });
    });