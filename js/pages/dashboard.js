//------------- dashboard.js -------------//
$(document).ready(function() {

	// //------------- Circular progrress bar (Knobs) -------------//
    $(function () {
        $(".greenCircle").knob({
            'min':0,
            'max':100,
            'readOnly': true,
            'width': 80,
            'height': 80,
            'fgColor': '#9FC569',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        })
        $(".redCircle").knob({
            'min':0,
            'max':100,
            'readOnly': true,
            'width': 80,
            'height': 80,
            'fgColor': '#ED7A53',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        })
        $(".spoolCircle").knob({
            'min':0,
            'max':100,
            'readOnly': true,
            'width': 80,
            'height': 80,
            'fgColor': '#ED7A53',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        })
        $(".blueCircle").knob({
            'min':0,
            'max':100,
            'readOnly': true,
            'width': 80,
            'height': 80,
            'fgColor': '#88BBC8',
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true
        })
    });

    //generate random number for charts
    randNum = function(){
        //return Math.floor(Math.random()*101);
        return (Math.floor( Math.random()* (1+40-20) ) ) + 20;
    }

    var chartColours = ['#88bbc8', '#ed7a53', '#9FC569', '#bbdce3', '#9a3b1b', '#5a8022', '#2c7282'];

    //------------- Animated progress bars -------------//
    //animate bar only when reach the bottom of screen
    $('.animated-bar .progress-bar').waypoint(function(direction) {
        $(this).progressbar({display_text: 'fill'});
    }, { offset: 'bottom-in-view' });

    //------------- Autosize Text area -------------//
    $('.elastic').autosize();

    //------------- Add sortable function to todo widget -------------//
    $(function() {
        $( "#today, #tomorrow" ).sortable({
            connectWith: ".todo-list",
            placeholder: 'placeholder',  
            forcePlaceholderSize: true, 
        }).disableSelection();
    });


    //------------- VCERTO API Handler -------------//


	
});

