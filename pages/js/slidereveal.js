! function(a) {
    var b, c = [];
    var index=0;
    var iBool=true;
    a.fn.slideReveal = function(d, e) {
        var f = this,
            g = this.css("padding-left");
        g = +g.substring(0, g.length - 2);
        var h = this.css("padding-left");
        h = +h.substring(0, h.length - 2);
        var i, j;
        if (void 0 !== d && "string" == typeof d) {
            var k = this.data("setting-index");
            if (i = c[k], j = i.width + g + h + "px", "show" === d) return (void 0 === e || e) && i.show(this, b), this.css(i.position, "0px"), i.push && ("left" === i.position ? a("body").css("left", j) : a("body").css("left", "-" + j)), this.data("slide-reveal", !0), (void 0 === e || e) && setTimeout(function() {
                i.shown(f, b)
            }, i.speed), f;
            if ("hide" === d) return (void 0 === e || e) && i.hide(this, b), i.push && a("body").css("left", "0px"), this.css(i.position, "-" + j), this.data("slide-reveal", !1), (void 0 === e || e) && setTimeout(function() {
                i.hidden(f, b)
            }, i.speed), f
        } else {
            i = {
                width: 300,
                push: !0,
                position: "left",
                speed: 350,
                trigger: void 0,
                autoEscape: !0,
                show: function() {},
                shown: function() {},
                hidden: function() {},
                hide: function() {},
                top: 0
            }, 
            i = a.extend(i, d), c.push(i), 
            this.data("setting-index", c.length - 1), 
            j = i.width + g + h + "px";
            var l = "all ease-in-out " + i.speed + "ms";
            this.css({
                position: "fixed",
                width: i.width,
                transition: l,
                height: "100%",
                zIndex: 1,
                top: i.top
            }).css(i.position, "-" + j), 
            this.data("slide-reveal", !1), 
            i.push && a("body").css({
                position: "relative",
                "overflow-x": "hidden",
                transition: l,
                left: "0px"
            }), 
            i.trigger && i.trigger.length > 0 && i.trigger.click(function() {
                b = a(this), f.slideReveal(f.data("slide-reveal") ? "hide" : "show");
                if(iBool){
                    $('.menu').fadeOut(300);
                    // $('.menu').css('display','none');
                    iBool=!iBool;
                    $('.close').fadeIn(400);
                    // $('.close').css('display','block');
                }else{
                    $('.close').fadeOut(300);
                    // $('.close').css('display','none');
                    iBool=!iBool;
                    $('.menu').fadeIn(400);
                    // $('.menu').css('display','block');
                }
            })
        }
        return this;
    }
}(jQuery);