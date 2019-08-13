'use strict';

const errorsObj = {
    emptyFields: 'Заполните, пожалуйста, поле',
    invalidEmail: 'Email необходимо ввести в формате (пример): example@domain.com (без пробелов)',
    tooManySymbols: 'Ограничение на длину текста в символах: 255',
};

const regExps = {
    emailRegExp: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i
};

let scrollCounter = 1;
let pageYOffset, pageYOffsetCurrent = window.pageYOffset;


const hideError = () => {
    if ( $('.msg-error').length > 1 ) {
        $('.msg-error').each(function(i, el) {
            if (i !== 0) {
                $(this).hide();
            }
        });
    }

    setTimeout(function() {
        $('.error-msg').fadeOut();
    }, 4000);
};


const getInitPosts = () => {
    $.ajax({
        method: 'POST',
        url: 'php/app.php',
        data: {
            action: 'init_select'
        },
        success: function(data) {
            $('.posts-wrapper').find('.col-md-8').html(data);
        },
        error: function() {
            alert('No posts');
        }
    });
};


// adding a post
$('#form-post #message').on('input', function() {
    if ( $(this).val().length > 255 ) {
        const msg = $(this).val();
        const msgCropped = msg.substring(0, 255);
        $(this).val(msgCropped);
        console.log( $(this).val().length ); // test
        $(this).after(`<p class="error-msg text-danger msg-error">${errorsObj.tooManySymbols}</p>`);
        hideError();
        return false;
    }
});

$('.btn-post').on('click', function() {
    const form = $(this).parents('.form');

    form.find('input, textarea').each(function() {
        if ( $(this).val().length === 0 ) {
            $(this).after(`<p class="error-msg text-danger">${errorsObj.emptyFields}</p>`);
        }
    });

    if ( $('#email').val().search(regExps.emailRegExp) == -1 ) {
        $('#email').after(`<p class="error-msg text-danger">${errorsObj.invalidEmail}</p>`);
    } else {
        const postData = form.serialize() + '&action=add_post';

        $.ajax({
            method: 'POST',
            url: 'php/app.php',
            data: postData,
            success: function(data) {
                const responseRaw = $.parseJSON(data);
                const response = responseRaw.response_success;
                alert(response);
                form.trigger('reset');
                getInitPosts(); // shows just added post
                $(window).trigger('scroll'); // test
            },
            error: function(jqxhr, status, errMsg) {
                console.log(`Статус: ${status}. Ошибка: ${errMsg}`);
                alert('Ваше сообщение не отправлено. Попробуйте позже.');
            }
        });
    }

    hideError();
});


$(window).on('load', function() {
    getInitPosts();
});


// output by scroll
$(window).on('scroll', function() {
    pageYOffsetCurrent = window.pageYOffset;

    if ( pageYOffsetCurrent > pageYOffset ) {
        $.ajax({
            method: 'POST',
            url: 'php/app.php',
            data: {
                action: 'scroll',
                scroll_counter: scrollCounter,
            },
            success: function(data) {
                $('.posts-wrapper').find('.col-md-8 .card:last-child').after(data);
            },
            error: function() {
                alert('End of posts');
            }
        });

        $(".scrollup").fadeIn();
    } else {
        $(".scrollup").fadeOut();
    }

    pageYOffset = pageYOffsetCurrent;
    ++scrollCounter;
    console.log(scrollCounter); // test
});


$(".scrollup").click(function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
});
