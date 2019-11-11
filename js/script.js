
$(document).ready(function () {

    $(".menu-icon").on("click", function () {

        if ($(".bottom-close").hasClass("clicked")) {
            $(".bottom-close").toggleClass("clicked");
            setTimeout(function () {
                $(".top-close").toggleClass("clicked");
            }, 250);

        }
        else {
            $(".bottom-bar").toggleClass("clicked");
            setTimeout(function () {
                $(".top-bar").toggleClass("clicked");
            }, 250);
        }
        setTimeout(function () {
            $(".menu-icon a:first-child").toggleClass("d-none");
            $(".menu-icon a:first-child").toggleClass("d-visible");
            $(".menu-icon a:last-child").toggleClass("d-none");
            $(".menu-icon a:last-child").toggleClass("d-visible");
            setTimeout(function () {
                $('.navbar-collapse').toggleClass('open');
                $(".menu-icon a.d-visible span:first-child").toggleClass("clicked");
                setTimeout(function () {
                    $(".menu-icon a.d-visible span:last-child").toggleClass("clicked");
                    $('#firstLink').toggleClass('slide');
                    setTimeout(function () {
                        $('#secondLink').toggleClass('slide');
                        setTimeout(function () {
                            $('#thirdLink').toggleClass('slide');
                            setTimeout(function () {
                                $('#forthLink').toggleClass('slide');
                            }, 250);
                            setTimeout(function () {
                                $('.navbar-collapse .logo-button').toggleClass('slide');
                            }, 250);
                            setTimeout(function () {
                                $('.logo-button + ul .nav-link').toggleClass('slide');
                            }, 250);
                            setTimeout(function () {
                                $('.navbar-collapse .info').toggleClass('slide');
                            }, 250);
                        }, 250);
                    }, 250);

                }, 250);

            }, 250);
        }, 600);
    });
});