//rellax effect for img

var rellax = new Rellax(".rellax", {
    center: true
});

/****************************************************************/
$(document).ready(function () {

    // Add smooth scrolling to all links
    $("a").on("click", function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            if ($(this).attr("href") == "#reservation") {
                $("html, body").animate(
                    {
                        scrollTop: document.body.scrollHeight
                    },
                    800,
                    function () {
                        // Add hash (#) to URL when done scrolling (default click behavior)
                        window.location.hash = hash;
                    }
                );
            } else {
                $("html, body").animate(
                    {
                        scrollTop: $(hash).offset().top
                    },
                    800,
                    function () {
                        // Add hash (#) to URL when done scrolling (default click behavior)
                        window.location.hash = hash;
                    }
                );
            }
        } // End if
    });

    /**************************************************/

    // Animation for the toggle navigation bar
    $(".menu-icon, .navbar-collapse a.nav-link").on("click", function () {
        let arr = ["firstLink", "secondLink", "thirdLink", "forthLink"];
        let buttonId = $(this).attr("id");
        if (jQuery.inArray(buttonId, arr) !== -1) {
            $(".navbar-collapse").toggleClass("open");
        }
        if ($(".bottom-close").hasClass("clicked")) {
            $(".bottom-close").toggleClass("clicked");
            setTimeout(function () {
                $(".top-close").toggleClass("clicked");
            }, 125);
            $("header").toggleClass("position-fixed");
        } else {
            $(".bottom-bar").toggleClass("clicked");
            setTimeout(function () {
                $(".top-bar").toggleClass("clicked");
            }, 125);
            setTimeout(function () {
                $("header").toggleClass("position-fixed");
            }, 700);
        }

        setTimeout(function () {
            $(".menu-icon a:first-child").toggleClass("d-none");
            $(".menu-icon a:first-child").toggleClass("d-visible");
            $(".menu-icon a:last-child").toggleClass("d-none");
            $(".menu-icon a:last-child").toggleClass("d-visible");
            setTimeout(function () {
                if (jQuery.inArray(buttonId, arr) == -1) {
                    $(".navbar-collapse").toggleClass("open");
                }
                $(".navbar-collapse .bg-img").toggleClass("open");
                $(".menu-icon a.d-visible span:first-child").toggleClass("clicked");
                setTimeout(function () {
                    $(".menu-icon a.d-visible span:last-child").toggleClass("clicked");
                    $("#firstLink").toggleClass("slide");
                    setTimeout(function () {
                        $("#secondLink").toggleClass("slide");
                        setTimeout(function () {
                            $("#thirdLink").toggleClass("slide");
                            setTimeout(function () {
                                $("#forthLink").toggleClass("slide");
                            }, 125);
                            setTimeout(function () {
                                $(".navbar-collapse .logo-button").toggleClass("slide");
                            }, 125);
                            setTimeout(function () {
                                $(".logo-button + ul .nav-link").toggleClass("slide");
                            }, 125);
                            setTimeout(function () {
                                $(".navbar-collapse .info").toggleClass("slide");
                            }, 125);
                        }, 125);
                    }, 125);
                }, 125);
            }, 125);
        }, 300);
    });

    /************************************************************/

    /* resert the form on reload of the page  */
    window.addEventListener("beforeunload", function (event) {
        $("#email-form").trigger("reset");

        $(".booking .form-container form").trigger("reset");
    });

    // Fetch the form element
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;
    $('#date').attr('min', maxDate);


    let telInput = $("#phone");

    // initialize
    telInput.intlTelInput({
        initialCountry: 'auto',
        preferredCountries: ['us', 'gb', 'br', 'ru', 'cn', 'es', 'it'],
        autoPlaceholder: 'aggressive',
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/js/utils.js",
        geoIpLookup: function (callback) {
            fetch('https://api.ipdata.co/?api-key=a86af3a7a4a375bfa71f9259b5404149d1eabb74adcc275e4faf9dfe',
            $("footer .sms-form").text("Reservation made successfully"),
            $(" footer form").trigger("reset"),
            $("footer").animate({ scrollTop: 0 }, "slow"),
            {
                
            }).then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Failed: ' + response.status)
            }).then(ipjson => {
                callback(ipjson.country_code)
            }).catch(e => {
                callback('us')
            })
        }
    });
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('safari') != -1) {
            document.getElementById('date').type = 'date';
            document.getElementById('time').type = 'time';
        } else {
            if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
                document.getElementById('time').type = 'time';
            }
            else {
                console.log('safari');
            }
        }
    }


    /*********************************************************/

    // slide in animation

    $("h1").waypoint(
        function () {
            $("h1").addClass("show");
        },
        { offset: "85%" }
    );

    $("h3").waypoint(
        function () {
            $("h3").addClass("show");
        },
        { offset: "85%" }
    );

    $("header .container-fluid").waypoint(
        function () {
            $("header .container-fluid").addClass("show");
        },
        { offset: "85%" }
    );

    setInterval(function () {
        $("header .container-fluid").removeClass("show");
    }, 5000);

    setInterval(function () {
        if ($("header .container-fluid").hasClass("show")) return;
        else $("header .container-fluid").addClass("show");
    }, 2000);

    $(".down-header .content").waypoint(
        function () {
            $(".down-header .content").addClass("show");
        },
        { offset: "85%" }
    );

    $("section.second-down-header .container .row > div:last-child").waypoint(
        function () {
            $("section.second-down-header .container .row > div:last-child").addClass(
                "show"
            );
        },
        { offset: "85%" }
    );

    $("section.second-down-header .container .row > div:first-child").waypoint(
        function () {
            $(
                "section.second-down-header .container .row > div:first-child"
            ).addClass("show");
        },
        { offset: "85%" }
    );

    $(".description .img-left").waypoint(
        function () {
            $(".description .img-left").addClass("show");
        },
        { offset: "85%" }
    );

    $(".description .row > div:last-child").waypoint(
        function () {
            $(".description .row > div:last-child").addClass("show");
        },
        { offset: "85%" }
    );

    $("#carouselReview").waypoint(
        function () {
            $("#carouselReview").addClass("show");
        },
        { offset: "85%" }
    );

    $(".social-net-feed > *").waypoint(
        function () {
            $(".social-net-feed > *").addClass("show");
        },
        { offset: "85%" }
    );

    /*************************************************************/

    // to get the size of the background img
    var getBackgroundImageSize = function (el) {
        var imageUrl = $(el)
            .css("background-image")
            .match(/^url\(["']?(.+?)["']?\)$/);
        var dfd = new $.Deferred();

        if (imageUrl) {
            var image = new Image();
            image.onload = dfd.resolve;
            image.onerror = dfd.reject;
            image.src = imageUrl[1];
        } else {
            dfd.reject();
        }

        return dfd.then(function () {
            return { width: this.width, height: this.height };
        });
    };

    //parallax effect for the bg img
    var lastScroll = 0;

    $(window).scroll(function () {
        let x = $(this).scrollTop();

        let imageSize = $("header").css("background-size");
        let imagePoz = $("header").css("background-position");
        var imageHeight = imageSize.split(" ")[1];
        let yPoz = imagePoz.slice(4);

        if (imageHeight.slice(-1) == "%") {
            imageHeight =
                (parseFloat(imageHeight.slice(0, imageHeight.length - 2)) / 100) *
                Math.max(
                    document.documentElement.clientHeight,
                    window.innerHeight || 0
                );
        } else {
            imageHeight = parseFloat(imageHeight.slice(0, imageHeight.length - 2));
        }

        let z = yPoz.indexOf("px");

        if (yPoz.indexOf("px") !== -1) {
        } else {
            $("header").css(
                "background-position",
                "50%" +
                parseInt(parseInt(x / 20) + imageHeight / 2 / 10) +
                "%" +
                ", 0% " +
                parseInt(-x / 20) +
                "px, center center"
            );
        }
    });
});

/* Fromating the date in the booking form  */
// var date = document.getElementById("date");

// function checkValue(str, max) {
//     if (str.charAt(0) !== "0" || str == "00") {
//         var num = parseInt(str);
//         if (isNaN(num) || num <= 0 || num > max) num = 1;
//         str =
//             num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
//                 ? "0" + num
//                 : num.toString();
//     }
//     return str;
// }

// date.addEventListener("input", function (e) {
//     this.type = "text";
//     var input = this.value;
//     if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
//     var values = input.split("/").map(function (v) {
//         return v.replace(/\D/g, "");
//     });
//     if (values[0]) values[0] = checkValue(values[0], 12);
//     if (values[1]) values[1] = checkValue(values[1], 31);
//     var output = values.map(function (v, i) {
//         return v.length == 2 && i < 1 ? v + " / " : v;
//     });
//     this.value = output.join("").substr(0, 14);
// });

/* to format the time input */
// var time = document.getElementById("time");

// time.addEventListener("input", function (e) {
//     this.type = "text";
//     var input = this.value;
//     if (/\D\:$/.test(input)) input = input.substr(0, input.length - 3);
//     var values = input.split(":").map(function (v) {
//         return v.replace(/\D/g, "");
//     });
//     if (values[0]) values[0] = checkValue(values[0], 23);
//     if (values[1]) values[1] = checkValue(values[1], 60);
//     var output = values.map(function (v, i) {
//         return v.length == 2 && i < 1 ? v + " : " : v;
//     });
//     this.value = output.join("").substr(0, 14);
// });

(function ($) {
    "use strict";
    $(".animsition").animsition({
        inClass: "fade-in",
        outClass: "fade-out",
        inDuration: 500,
        outDuration: 500,
        linkElement: 'a:not([target="_blank"]):not([href^="#"])',
        loading: true,
        loadingParentElement: "body",
        loadingClass: "animsition-loading2",
        loadingInner:
            '<div class="spinner">\n        <div class="double-bounce1"></div>\n      <div class="double-bounce2"></div>\n      </div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ["animation-duration", "-webkit-animation-duration"],
        overlay: false,
        overlayClass: "animsition-overlay-slide",
        overlayParentElement: "body",
        transition: function transition(url) {
            window.location.href = url;
        }
    });
})(jQuery);