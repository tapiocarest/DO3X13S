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


    //------------- Charts API Handler -------------//
    var charts = {};
    charts.sparkline_height = function() {
        var window_height = $(window).height();
        var window_width = $(window).width();

        if (window_width > 960) {
            if (window_height > 900) {
                height = 75;
            } else if(window_height > 800) {
                height = 60;
            } else if(window_height > 700) {
                height = 50;
            } else if(window_height > 600) {
                height = 30;
            } else {
                height = 40;
            }
        } else {
            height = 40;
        }

        return height;
    };
    charts.sparkline_width = function() {
        var window_width = $(window).width();

        if (window_width > 1900) {
            width = 400;
        } else if(window_width > 1500) {
            width = 300;
        } else if(window_width > 1200) {
            width = 200;
        } else if(window_width > 975) {
            width = 125;
        } else {
            width = 300;
        }

        return width;
    };

    charts.cpu = {
        total : function(data) {
            //Lines chart without points
            if ($('.cpu-chart').length) {
                $(function () {
                    //some data
                    var d1 = data;

                    if (d1) {
                        if (d1[d1.length-1][1] >= 0) {
                            $("#cpu-statistics").find("h4 span").text("CPU Statistics");
                        } else {
                            $("#cpu-statistics").find("h4 span").text("CPU Statistics (loading data ...)");
                        }
                    }

                    // var d1 = [[1, 3+randNum()], [2, 6+randNum()], [3, 9+randNum()], [4, 12+randNum()],[5, 15+randNum()],[6, 18+randNum()],[7, 21+randNum()],[8, 15+randNum()],[9, 18+randNum()],[10, 21+randNum()],[11, 24+randNum()],[12, 27+randNum()],[13, 30+randNum()],[14, 33+randNum()],[15, 24+randNum()],[16, 27+randNum()],[17, 30+randNum()],[18, 33+randNum()],[19, 36+randNum()],[20, 39+randNum()],[21, 42+randNum()],[22, 45+randNum()],[23, 36+randNum()],[24, 39+randNum()],[25, 42+randNum()],[26, 45+randNum()],[27,38+randNum()],[28, 51+randNum()],[29, 55+randNum()], [30, 60+randNum()]];
                    // var d2 = [[1, randNum()-5], [2, randNum()-4], [3, randNum()-4], [4, randNum()],[5, 4+randNum()],[6, 4+randNum()],[7, 5+randNum()],[8, 5+randNum()],[9, 6+randNum()],[10, 6+randNum()],[11, 6+randNum()],[12, 2+randNum()],[13, 3+randNum()],[14, 4+randNum()],[15, 4+randNum()],[16, 4+randNum()],[17, 5+randNum()],[18, 5+randNum()],[19, 2+randNum()],[20, 2+randNum()],[21, 3+randNum()],[22, 3+randNum()],[23, 3+randNum()],[24, 2+randNum()],[25, 4+randNum()],[26, 4+randNum()],[27,5+randNum()],[28, 2+randNum()],[29, 2+randNum()], [30, 3+randNum()]];

                    //define placeholder class
                    var placeholder = $(".cpu-chart");
                    //graph options
                    var options = {
                            grid: {
                                show: true,
                                aboveData: true,
                                color: "#3f3f3f" ,
                                labelMargin: 5,
                                axisMargin: 0, 
                                borderWidth: 0,
                                borderColor:null,
                                minBorderMargin: 5 ,
                                clickable: true, 
                                hoverable: true,
                                autoHighlight: true,
                                mouseActiveRadius: 20
                            },
                            series: {
                                grow: {active:false},
                                lines: {
                                    show: true,
                                    fill: true,
                                    lineWidth: 2,
                                    steps: false
                                    },
                                points: {show:false}
                            },
                            legend: { position: "se" },
                            yaxis: { min: 0 },
                            xaxis: {ticks:11, tickDecimals: 0},
                            colors: chartColours,
                            shadowSize:1,
                            tooltip: true, //activate tooltip
                            tooltipOpts: {
                                content: "%s : %y.0",
                                shifts: {
                                    x: -30,
                                    y: -50
                                }
                            }
                        };
                        $.plot(placeholder, [
                            {
                                label: "CPU",
                                data: d1,
                                lines: {fillColor: "#f2f7f9"},
                                points: {fillColor: "#88bbc8"}
                            },
                            // {
                            //     label: "LCPU",
                            //     data: d2,
                            //     lines: {fillColor: "#fff8f2"},
                            //     points: {fillColor: "#ed7a53"}
                            // }
                        ], options);

                });
            }//end if
        }
        ,ifa : function(data) {
            var width = charts.sparkline_width();
            var height = charts.sparkline_height();
            var name = ".sparkLineCpu1";
            if ($(name).length && height > 0) {
                $(name).sparkline(data, {
                    width: width,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
                    height: height,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
                    lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
                    fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
                    spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
                    maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
                    minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
                    spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
                    lineWidth: 2//In pixels (default: 1) - Integer
                });
            }
            if (data) {
                if (data[data.length-1] >= 0) {
                    $(name).next("span.number").text(data[data.length-1]);
                } else {
                    $(name).next("span.number").text("loading ...");
                }
            }
        }
        ,iip : function(data) {
            var width = charts.sparkline_width();
            var height = charts.sparkline_height();
            var name = ".sparkLineCpu2";
            if ($(name).length && height > 0) {
                $(name).sparkline(data, {
                    width: width,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
                    height: height,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
                    lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
                    fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
                    spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
                    maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
                    minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
                    spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
                    lineWidth: 2//In pixels (default: 1) - Integer
                });
            }
            if (data) {
                if (data[data.length-1] >= 0) {
                    $(name).next("span.number").text(data[data.length-1]);
                } else {
                    $(name).next("span.number").text("loading ...");
                }
            }
        }
        ,cp : function(data) {
            var width = charts.sparkline_width();
            var height = charts.sparkline_height();
            var name = ".sparkLineCpu3";
            if ($(name).length && height > 0) {
                $(name).sparkline(data, {
                    width: width,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
                    height: height,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
                    lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
                    fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
                    spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
                    maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
                    minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
                    spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
                    lineWidth: 2//In pixels (default: 1) - Integer
                });
            }
            if (data) {
                if (data[data.length-1] >= 0) {
                    $(name).next("span.number").text(data[data.length-1]);
                } else {
                    $(name).next("span.number").text("loading ...");
                }
            }
        }
    };

    charts.lcpu  = {
        total : function(data) {
            //Lines chart without points
            if ($('.lcpu-chart').length) {
                $(function () {
                    //some data
                    var d1 = data;

                    if (d1) {
                        if (d1[d1.length-1][1] >= 0) {
                            $("#lcpu-statistics").find("h4 span").text("LCPU Statistics");
                        } else {
                            $("#lcpu-statistics").find("h4 span").text("LCPU Statistics (loading data ...)");
                        }
                    }

                    // var d1 = [[1, 3+randNum()], [2, 6+randNum()], [3, 9+randNum()], [4, 12+randNum()],[5, 15+randNum()],[6, 18+randNum()],[7, 21+randNum()],[8, 15+randNum()],[9, 18+randNum()],[10, 21+randNum()],[11, 24+randNum()],[12, 27+randNum()],[13, 30+randNum()],[14, 33+randNum()],[15, 24+randNum()],[16, 27+randNum()],[17, 30+randNum()],[18, 33+randNum()],[19, 36+randNum()],[20, 39+randNum()],[21, 42+randNum()],[22, 45+randNum()],[23, 36+randNum()],[24, 39+randNum()],[25, 42+randNum()],[26, 45+randNum()],[27,38+randNum()],[28, 51+randNum()],[29, 55+randNum()], [30, 60+randNum()]];
                    // var d2 = [[1, randNum()-5], [2, randNum()-4], [3, randNum()-4], [4, randNum()],[5, 4+randNum()],[6, 4+randNum()],[7, 5+randNum()],[8, 5+randNum()],[9, 6+randNum()],[10, 6+randNum()],[11, 6+randNum()],[12, 2+randNum()],[13, 3+randNum()],[14, 4+randNum()],[15, 4+randNum()],[16, 4+randNum()],[17, 5+randNum()],[18, 5+randNum()],[19, 2+randNum()],[20, 2+randNum()],[21, 3+randNum()],[22, 3+randNum()],[23, 3+randNum()],[24, 2+randNum()],[25, 4+randNum()],[26, 4+randNum()],[27,5+randNum()],[28, 2+randNum()],[29, 2+randNum()], [30, 3+randNum()]];
                    //define placeholder class
                    var placeholder = $(".lcpu-chart");
                    //graph options
                    var options = {
                            grid: {
                                show: true,
                                aboveData: true,
                                color: "#3f3f3f" ,
                                labelMargin: 5,
                                axisMargin: 0, 
                                borderWidth: 0,
                                borderColor:null,
                                minBorderMargin: 5 ,
                                clickable: true, 
                                hoverable: true,
                                autoHighlight: true,
                                mouseActiveRadius: 20
                            },
                            series: {
                                grow: {active:false},
                                lines: {
                                    show: true,
                                    fill: true,
                                    lineWidth: 2,
                                    steps: false
                                    },
                                points: {show:false}
                            },
                            legend: { position: "se" },
                            yaxis: { min: 0 },
                            xaxis: {ticks:11, tickDecimals: 0},
                            colors: chartColours,
                            shadowSize:1,
                            tooltip: true, //activate tooltip
                            tooltipOpts: {
                                content: "%s : %y.0",
                                shifts: {
                                    x: -30,
                                    y: -50
                                }
                            }
                        }
                        $.plot(placeholder, [
                            {
                                label: "LCPU",
                                data: d1,
                                lines: {fillColor: "#f2f7f9"},
                                points: {fillColor: "#88bbc8"}
                            }
                            // ,{
                            //     label: "LCPU",
                            //     data: d2,
                            //     lines: {fillColor: "#fff8f2"},
                            //     points: {fillColor: "#ed7a53"}
                            // }

                        ], options);
                });
            }//end if
        }
        ,ifa : function(data) {
            var width = charts.sparkline_width();
            var height = charts.sparkline_height();
            var name = ".sparkLineLCpu1";
            if ($(name).length && height > 0) {
                $(name).sparkline(data, {
                    width: width,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
                    height: height,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
                    lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
                    fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
                    spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
                    maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
                    minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
                    spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
                    lineWidth: 2//In pixels (default: 1) - Integer
                });
            }
            if (data) {
                if (data[data.length-1] >= 0) {
                    $(name).next("span.number").text(data[data.length-1]);
                } else {
                    $(name).next("span.number").text("loading ...");
                }
            }
        }
        ,iip : function(data) {
            var width = charts.sparkline_width();
            var height = charts.sparkline_height();
            var name = ".sparkLineLCpu2";
            if ($(name).length && height > 0) {
                $(name).sparkline(data, {
                    width: width,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
                    height: height,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
                    lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
                    fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
                    spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
                    maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
                    minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
                    spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
                    lineWidth: 2//In pixels (default: 1) - Integer
                });
            }
            if (data) {
                if (data[data.length-1] >= 0) {
                    $(name).next("span.number").text(data[data.length-1]);
                } else {
                    $(name).next("span.number").text("loading ...");
                }
            }
        }
        ,cp : function(data) {
            var width = charts.sparkline_width();
            var height = charts.sparkline_height();
            var name = ".sparkLineLCpu3";
            if ($(name).length && height > 0) {
                $(name).sparkline(data, {
                    width: width,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
                    height: height,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
                    lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
                    fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
                    spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
                    maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
                    minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
                    spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
                    lineWidth: 2//In pixels (default: 1) - Integer
                });
            }
            if (data) {
                if (data[data.length-1] >= 0) {
                    $(name).next("span.number").text(data[data.length-1]);
                } else {
                    $(name).next("span.number").text("loading ...");
                }
            }
        }
    };

    $('body').data("charts", charts);

});

