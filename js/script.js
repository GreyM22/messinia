
$(document).ready(function () {

    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {        // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            if ($(this).attr('href') == '#reservation') {
                $('html, body').animate({
                    scrollTop: document.body.scrollHeight
                }, 800, function () {

                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                });
            } else {
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function () {

                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                });
            }
        } // End if
    });

    /**************************************************/

    // Animation for the toggle navigation bar
    $(".menu-icon, .navbar-collapse a.nav-link").on("click", function () {

        let arr = ['firstLink', 'secondLink', 'thirdLink', 'forthLink'];
        let buttonId = $(this).attr('id');
        $('header').toggleClass('position-fixed');
        if (jQuery.inArray(buttonId, arr) !== -1) { $('.navbar-collapse').toggleClass('open'); }
        if ($(".bottom-close").hasClass("clicked")) {
            $(".bottom-close").toggleClass("clicked");
            setTimeout(function () {
                $(".top-close").toggleClass("clicked");
            }, 125);

        }
        else {
            $(".bottom-bar").toggleClass("clicked");
            setTimeout(function () {
                $(".top-bar").toggleClass("clicked");
            }, 125);
        }
        setTimeout(function () {
            $(".menu-icon a:first-child").toggleClass("d-none");
            $(".menu-icon a:first-child").toggleClass("d-visible");
            $(".menu-icon a:last-child").toggleClass("d-none");
            $(".menu-icon a:last-child").toggleClass("d-visible");
            setTimeout(function () {
                let id = $(this).attr('id');
                let exp = jQuery.inArray($(this).attr('id'), arr);
                if (jQuery.inArray(buttonId, arr) == -1) { $('.navbar-collapse').toggleClass('open'); }
                $('.navbar-collapse .bg-img').toggleClass('open');
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
                            }, 125);
                            setTimeout(function () {
                                $('.navbar-collapse .logo-button').toggleClass('slide');
                            }, 125);
                            setTimeout(function () {
                                $('.logo-button + ul .nav-link').toggleClass('slide');
                            }, 125);
                            setTimeout(function () {
                                $('.navbar-collapse .info').toggleClass('slide');
                            }, 125);
                        }, 125);
                    }, 125);

                }, 125);

            }, 125);
        }, 300);
    });

    /************************************************************/

    // Validation of the reservation form
    $('footer form').submit(function () {

        let date = $("#date").val();
        let month = date.split("/")[0];
        let day = date.split("/")[1];
        let time = $('#time').val();

        let currentDate = new Date();

        if (parseInt(month) > parseInt(currentDate.getMonth())) {
            $('footer .sms-form').text('Reservation made successfully')
            $(' footer form').trigger("reset");
        }
        else if (parseInt(month) == parseInt(currentDate.getMonth()) && parseInt(day) >= parseInt(currentDate.getDate())) {
            if (parseInt(time.split(':')[0]) >= (parseInt(currentDate.getHours()) + 2) && parseInt(time.split(':')[1]) >= parseInt(currentDate.getMinutes())) {
                $('footer .sms-form').text('Reservation made successfully')
                $(' footer form').trigger("reset");
            }
            else {
                $('footer .sms-form').text('*Pleas book two hours in advance');
                $("footer").animate({ scrollTop: 0 }, "slow");
            }
        }
        else {
            $('footer .sms-form').text('*You can not reserve a table in the past. Please change your reservation date.');
            $("footer").animate({ scrollTop: 0 }, "slow");
        }

    });

    /************************************************************/

    /* resert the form on reload of the page  */
    window.addEventListener("beforeunload", function (event) {
        $('#email-form').trigger("reset");

        $('.booking .form-container form').trigger("reset");
    });

    // Fetch the form element


    function getFormDataString(formEl) {
        var formData = new FormData(formEl),
            data = [];

        for (var keyValue of formData) {
            data.push(encodeURIComponent(keyValue[0]) + "=" + encodeURIComponent(keyValue[1]));
        }

        return data.join("&");
    }

    var formReservation = document.getElementById("reservation-form");

    // Override the submit event
    formReservation.addEventListener("submit", function (e) {
        e.preventDefault();


        let request = new XMLHttpRequest();

        request.addEventListener("load", function () {
            if (request.status === 302) { // CloudCannon redirects on success
            }
        });

        request.open(formReservation.method, formReservation.action);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(getFormDataString(formReservation));
    });
});

/* Fromating the date in the booking form  */
var date = document.getElementById('date');

function checkValue(str, max) {
    if (str.charAt(0) !== '0' || str == '00') {
        var num = parseInt(str);
        if (isNaN(num) || num <= 0 || num > max) num = 1;
        str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
    };
    return str;
};

date.addEventListener('input', function (e) {
    this.type = 'text';
    var input = this.value;
    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split('/').map(function (v) {
        return v.replace(/\D/g, '')
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    if (values[1]) values[1] = checkValue(values[1], 31);
    var output = values.map(function (v, i) {
        return v.length == 2 && i < 1 ? v + ' / ' : v;
    });
    this.value = output.join('').substr(0, 14);
});

/* to format the time input */
var time = document.getElementById('time');

time.addEventListener('input', function (e) {
    this.type = 'text';
    var input = this.value;
    if (/\D\:$/.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split(':').map(function (v) {
        return v.replace(/\D/g, '')
    });
    if (values[0]) values[0] = checkValue(values[0], 23);
    if (values[1]) values[1] = checkValue(values[1], 60);
    var output = values.map(function (v, i) {
        return v.length == 2 && i < 1 ? v + ' : ' : v;
    });
    this.value = output.join('').substr(0, 14);
});
