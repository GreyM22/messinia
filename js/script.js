//rellax effect for img

var rellax = new Rellax(".rellax", {
    center: true
});

/****************************************************************/
$(document).ready(function () {
    //implementing the schedule

    var restSchedule = [
        {
            start: 13,
            close: 23,
            notOpen: false
        },
        {
            start: 13,
            close: 23,
            notOpen: false
        },
        {
            start: 13,
            close: 23,
            notOpen: false
        },
        {
            start: 13,
            close: 23,
            notOpen: false
        },
        {
            start: 13,
            close: 23,
            notOpen: false
        },
        {
            start: 13,
            close: 23,
            notOpen: false
        },
        {
            start: 13,
            close: 23,
            notOpen: false
        }
    ];

    var today = new Date();

    if (restSchedule[today.getDay()].notOpen) {
        $(".schedule").text("Today is not open");
    } else if (restSchedule[today.getDay()].start > today.getHours()) {
        $(".schedule").text(
            "Opens today at " + restSchedule[today.getDay()].start + ":00"
        );
    } else if (restSchedule[today.getDay()].close > today.getHours()) {
        $(".schedule").text(
            "OPEN TODAY UNTIL " + restSchedule[today.getDay()].close + ":00"
        );
    } else if (restSchedule[today.getDay()].close <= today.getHours()) {
        $(".schedule").text(
            "Closed at " + restSchedule[today.getDay()].close + ":00"
        );
    }

    /************************************************************/

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

    function getFormDataString(formEl) {
        var formData = new FormData(formEl),
            data = [];

        for (var keyValue of formData) {
            data.push(
                encodeURIComponent(keyValue[0]) + "=" + encodeURIComponent(keyValue[1])
            );
        }

        return data.join("&");
    }

    var formEmail = document.getElementById("reserve-form");

    // Override the submit event
    formEmail.addEventListener("submit", function (e) {
        e.preventDefault();

        let request = new XMLHttpRequest();

        request.addEventListener("load", function () {
            if (request.status === 302) {
                // CloudCannon redirects on success
            }
        });

        // Validation of the reservation form

        let date = $("#date").val();
        let month = date.split("/")[0];
        let day = date.split("/")[1];
        let time = $("#time").val();

        let currentDate = new Date();

        if (parseInt(month) > parseInt(currentDate.getMonth()) + 1) {
            request.open(formEmail.method, formEmail.action);
            request.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            request.send(getFormDataString(formEmail));
            $("footer .sms-form").text("Reservation made successfully");
            $(" footer form").trigger("reset");
            $("footer").animate({ scrollTop: 0 }, "slow");
        } else if (
            parseInt(month) == parseInt(currentDate.getMonth() + 1) &&
            parseInt(day) >= parseInt(currentDate.getDate())
        ) {
            if (parseInt(day) > parseInt(currentDate.getDate())) {
                request.open(formEmail.method, formEmail.action);
                request.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded"
                );
                request.send(getFormDataString(formEmail));
                $("footer form ").trigger("reset");
                $("footer").animate({ scrollTop: 0 }, "slow");
                $("footer .sms-form").text("Reservation made successfully");
            } else if (
                parseInt(day) == parseInt(currentDate.getDate()) &&
                parseInt(time.split(":")[0]) >= parseInt(currentDate.getHours()) + 2 &&
                parseInt(time.split(":")[1]) >= parseInt(currentDate.getMinutes())
            ) {
                request.open(formEmail.method, formEmail.action);
                request.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded"
                );
                request.send(getFormDataString(formEmail));
                $("footer form ").trigger("reset");
                $("footer").animate({ scrollTop: 0 }, "slow");
                $("footer .sms-form").text("Reservation made successfully");
            } else {
                $("footer .sms-form").text("*Pleas book two hours in advance");
                $("footer").animate({ scrollTop: 0 }, "slow");
            }
        } else {
            $("footer .sms-form").text(
                "*You can not reserve a table in the past. Please change your reservation date."
            );
            $("footer").animate({ scrollTop: 0 }, "slow");
        }
    });
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
var date = document.getElementById("date");

function checkValue(str, max) {
    if (str.charAt(0) !== "0" || str == "00") {
        var num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) num = 1;
        str =
            num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
                ? "0" + num
                : num.toString();
    }
    return str;
}

date.addEventListener("input", function (e) {
    this.type = "text";
    var input = this.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split("/").map(function (v) {
        return v.replace(/\D/g, "");
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    if (values[1]) values[1] = checkValue(values[1], 31);
    var output = values.map(function (v, i) {
        return v.length == 2 && i < 1 ? v + " / " : v;
    });
    this.value = output.join("").substr(0, 14);
});

/* to format the time input */
var time = document.getElementById("time");

time.addEventListener("input", function (e) {
    this.type = "text";
    var input = this.value;
    if (/\D\:$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split(":").map(function (v) {
        return v.replace(/\D/g, "");
    });
    if (values[0]) values[0] = checkValue(values[0], 23);
    if (values[1]) values[1] = checkValue(values[1], 60);
    var output = values.map(function (v, i) {
        return v.length == 2 && i < 1 ? v + " : " : v;
    });
    this.value = output.join("").substr(0, 14);
});

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

// (function ($) {
//     "use strict";
//     function detectElementScrollbarY(element) {
//         return element.scrollHeight > element.offsetHeight;
//     }
//     function throttle(func, ms) {
//         var isThrottled = false;
//         var savedArgs;
//         var savedThis;
//         function wrapper() {
//             if (isThrottled) {
//                 savedArgs = arguments;
//                 savedThis = this;
//                 return;
//             }
//             func.apply(this, arguments);
//             isThrottled = true;
//             setTimeout(function () {
//                 isThrottled = false;
//                 if (savedArgs) {
//                     wrapper.apply(savedThis, savedArgs);
//                     savedArgs = savedThis = null;
//                 }
//             }, ms);
//         }
//         return wrapper;
//     }
//     var detectBrowser = {
//         isOpera:
//             (!!window.opr && !!opr.addons) ||
//             !!window.opera ||
//             navigator.userAgent.indexOf(" OPR/") >= 0,
//         isFirefox: typeof InstallTrigger !== "undefined",
//         isSafari:
//             /Safari/.test(navigator.userAgent) &&
//             /Apple Computer/.test(navigator.vendor),
//         isIE: false || !!document.documentMode,
//         isEdge:
//             !function () {
//                 this.isIE;
//             } && !!window.StyleMedia,
//         isChrome: !!window.chrome && !!window.chrome.webstore,
//         isBlink:
//             (function () {
//                 this.isChrome;
//             } ||
//                 function () {
//                     this.isOpera;
//                 }) &&
//             !!window.CSS
//     };
//     var detectMobile = {
//         isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//             navigator.userAgent
//         )
//     };
//     svg4everybody();
//     $(".animsition").animsition({
//         inClass: "fade-in",
//         outClass: "fade-out",
//         inDuration: 500,
//         outDuration: 500,
//         linkElement: 'a:not([target="_blank"]):not([href^="#"])',
//         loading: true,
//         loadingParentElement: "body",
//         loadingClass: "animsition-loading2",
//         loadingInner:
//             '<div class="spinner">\n        <div class="double-bounce1"></div>\n      <div class="double-bounce2"></div>\n      </div>',
//         timeout: false,
//         timeoutCountdown: 5000,
//         onLoadEvent: true,
//         browser: ["animation-duration", "-webkit-animation-duration"],
//         overlay: false,
//         overlayClass: "animsition-overlay-slide",
//         overlayParentElement: "body",
//         transition: function transition(url) {
//             window.location.href = url;
//         }
//     });
//     (function () {
//         var bodyWrapper = document.querySelector(".zoom-image-head");
//         var body = document.querySelector(".zoom-image-head__body");
//         var bg = document.querySelector(".zoom-image-head__bg");
//         var bg2 = document.querySelector(".zoom-image-head__bg2");
//         var content = document.querySelector(".zoom-image-head__content");
//         var contentSubtitle = document.querySelector(".zoom-image-head__subtitle");
//         var contentTitle = document.querySelector(".zoom-image-head__title");
//         var contentText = document.querySelector(".zoom-image-head__text");
//         var contentIcon = document.querySelector(".zoom-image-head__icon");
//         var counterBlock = document.querySelector(".js-demo-title");
//         var counterTitle = document.querySelector(".js-demo-description");
//         var counterText = document.querySelector(".js-demo-content");
//         if (body && !detectMobile.isMobile) {
//             var checkPosition = function checkPosition() {
//                 var scroll = $(window).scrollTop();
//                 var height = bodyWrapper.offsetHeight;
//                 var opacity = (1 - scroll / height) * 2;
//                 opacity = opacity > 1 ? 1 : opacity;
//                 var contentOpacity = (1 - scroll / height) * 1.5;
//                 contentOpacity = contentOpacity > 1 ? 1 : contentOpacity;
//                 var scale = 1 + (scroll / height) * 0.5;
//                 var bgX = "".concat((scroll / height) * -15, "%");
//                 var bgY = "".concat((scroll / height) * -12, "%");
//                 var bg2X = "".concat((scroll / height) * 4, "%");
//                 var bg2Y = "".concat((scroll / height) * 15, "%");
//                 tl2
//                     .set(bg, { opacity: opacity, scale: scale, x: bgX, y: bgY })
//                     .set(bg2, { opacity: opacity, scale: scale, x: bg2X, y: bg2Y })
//                     .set(content, {
//                         opacity: contentOpacity,
//                         y: "".concat((scroll / height) * -15, "%")
//                     });
//                 if (scroll > height) {
//                     tl2.set(body, { display: "none" });
//                 } else {
//                     tl2.set(body, { display: "" });
//                 }
//                 if (scroll > height && !contentIsVisible) {
//                     tl2
//                         .to(counterBlock, 0.5, { x: 0, opacity: 1 })
//                         .to(counterTitle, 0.5, { y: 0, opacity: 1 })
//                         .to(counterText, 0.5, { y: 0, opacity: 1 });
//                     contentIsVisible = true;
//                 }
//             };
//             var tl = new TimelineLite({
//                 onComplete: function onComplete() {
//                     checkPosition();
//                     $(window).scroll(function () {
//                         checkPosition();
//                     });
//                 }
//             });
//             tl.set(bg, { opacity: 0, scale: 1.5, x: "-15%", y: "-12%" })
//                 .set(bg2, { opacity: 0, scale: 1.5, x: "4%", y: "15%" })
//                 .set([contentSubtitle, contentTitle, contentText, contentIcon], {
//                     opacity: 0,
//                     y: 30
//                 })
//                 .call(
//                     function () {
//                         document.querySelector("html").scrollTop = 0;
//                     },
//                     null,
//                     null,
//                     "+=1"
//                 )
//                 .to(bg, 1.5, { opacity: 1, scale: 1, x: "0%", y: "0%" })
//                 .to(bg2, 1.5, { opacity: 1, scale: 1, x: "0%", y: "0%" }, "-=1.5")
//                 .staggerTo(
//                     [contentSubtitle, contentTitle, contentText, contentIcon],
//                     1,
//                     { opacity: 1, y: 0 },
//                     0.2,
//                     "-=.6"
//                 );
//             body.style.position = "fixed";
//             var contentIsVisible = false;
//             var tl2 = new TimelineLite();
//             tl2
//                 .set(counterBlock, { x: -100, opacity: 0 })
//                 .set(counterTitle, { y: 20, opacity: 0 })
//                 .set(counterText, { y: 20, opacity: 0 });
//         }
//     })();
// })(jQuery);
