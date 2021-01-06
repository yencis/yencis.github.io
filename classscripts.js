$(document).ready(function(){


    var inView = false;

    function isScrolledIntoView(elem)
    {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
    }



    $(window).scroll(function(){

/*
        $(".load-on-scroll").each(function(i){
            if (isScrolledIntoView(this)) {
                if (inView) { return; }
                inView = true;
                $(this).style.opacity
            } else {
                inView = false;
            }

        })
*/

        $(".fade-in-onscroll").each(function(i){
            var objbot= $(this).position().top + $(this).outerHeight();
            var winbot = $(window).scrollTop() + $(window).height();

            if (winbot>objbot){
                $(this).animate({'opacity':'1'},1400);
            }

        })
    })
})


