(function($) {
    var opts = {};
    $.fn.fixedTableHeader = function(options) {
        //user defined options

        // debugger;
        if (options === "refresh") {
            $.fn.fixedTableHeader.remove(this);
            $.fn.fixedTableHeader.reCreate(this);
            $(this).trigger("whileRefresh");

        }
        if (options === "destroy") {
            console.log(opts);
            $.fn.fixedTableHeader.remove(this, opts);

            $(this).trigger("whileDestroy");

        } else {
            $.fn.fixedTableHeader.remove(this);
            if (typeof options == "object") {
                opts = $.extend({}, $.fn.fixedTableHeader.defaults, options);
            }


            var element = opts.container || document;
            element = (opts.container == element) ? "." + element : document;
            $(element).css({
                "position": "relative"
            });
            return this.each(function() {
                //this referenceopts
                var _this = $(this);
                //calling setter and getter
                $.fn.fixedTableHeader.widthSetter(_this, $.fn.fixedTableHeader.widthGetter(_this, opts), opts);

                //$(_this).trigger("whileRender");
                //scrolliing function
                $.fn.fixedTableHeader.whileScroll(_this, opts);

                $(window).on("refresh", function() {
                    $.fn.fixedTableHeader.remove(this);
                    $.fn.fixedTableHeader.reCreate(this);
                })


            });

        }
    }
    $.fn.fixedTableHeader.defaults = {
        fixedClass: "fixedHeader1",
        container: "",
        headerCell: "thcell",
        tdCell: "tdcell",
        headerBackground: "",
        headerClass: "#fff",
        bufferTop: "0"
    }

    $.fn.fixedTableHeader.whileScroll = function(_this, OPTIONS) {
        //container
        var element = OPTIONS.container || document;

        element = (OPTIONS.container == element) ? "." + element : document;

        $(element).on("scroll", function() {

            var SCROLL_TOP = $(this).scrollTop();
            var SCROLL_LEFT = $(this).scrollLeft();

            $(_this).trigger("whileScroll");

            if (element == document) {
                if (_this.offset().top < (SCROLL_TOP)) {
                    $("." + OPTIONS.fixedClass).css({
                        "position": "fixed",
                        "margin-top": "0",
                        "visibility": "visible",
                        "margin-left": -SCROLL_LEFT + "px",
                        "top": OPTIONS.bufferTop + "px"
                    });



                } else {

                    $("." + OPTIONS.fixedClass).css({
                        "visibility": "hidden",
                        "margin-top": "1px"
                    });


                }

            } else {
                $("." + OPTIONS.fixedClass).css({
                    "position": "absolute",
                    "margin-top": SCROLL_TOP,
                    "visibility": "visible",
                    "z-index": 1

                });

            }





        });



    }

    $.fn.fixedTableHeader.widthGetter = function(ele) {
        var width_array = [];

        $("tbody tr:first-child td", ele)
            .each(function(index) {
                width_array[index] = $(this).outerWidth();

            })
        return width_array;

    }
    $.fn.fixedTableHeader.widthSetter = function(ele, arr, OPTIONS) {
        $("thead th", ele)
            .each(function(index) {
                $(this).append($("<div class='" + OPTIONS.headerCell + "'></div>")
                    .css({})
                    .outerWidth(arr[index]));

            });




        $.fn.fixedTableHeader.widthSetterTd(ele, arr, OPTIONS);





    };
    $.fn.fixedTableHeader.widthSetterTd = function(ele, arr, OPTIONS) {
        $("tbody tr:first-child td", ele)
            .each(function(index) {

                $(this).append($("<div class='" + OPTIONS.tdCell + "'></div>")
                    .width(arr[index]));
            });

        $.fn.fixedTableHeader.fixedHeader(ele, OPTIONS);
    };

    $.fn.fixedTableHeader.fixedHeader = function(ele, OPTIONS) {
        ele.before("<div class='" + OPTIONS.fixedClass + "'><table></table></div>");
        $("." + OPTIONS.fixedClass + " table").attr("class", ele.attr("class"))
            .append($("thead", ele).clone());

        $("." + OPTIONS.fixedClass).css({
            "position": "absolute"
        });
        $("thead", $("." + OPTIONS.fixedClass)).css({
            "margin-left": "-1px",
            "background": OPTIONS.headerBackground
        }).attr("class", OPTIONS.headerClass);


    };

    $.fn.fixedTableHeader.remove = function(ele, OPTIONS) {

        $(ele).prev().remove();


    };
    $.fn.fixedTableHeader.reCreate = function(ele) {
        $(ele).fixedTableHeader();

    };



}(jQuery));