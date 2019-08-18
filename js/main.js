'use strict';

const errorsObj = {
    emptyFields: 'Заполните, пожалуйста, поле',
    invalidEmail: 'Email необходимо ввести в формате (пример): example@domain.com (без пробелов)',
    tooManySymbols: 'Ограничение на длину текста в символах: 255',
};

const regExps = {
    emailRegExp: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i
};

let pageYOffset, pageYOffsetCurrent = window.pageYOffset;
let scrollCounter = 3;
let ajaxScrollInProgress = false;
console.log(`Scroll counter value (initial): ${scrollCounter}`); // test


const hideError = () => {
    if ( $('.msg-error').length > 1 ) {
        $('.msg-error').each(function(i, el) {
            if (i !== 0) {
                $(this).remove();
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
            const content = $.parseJSON(data);

            if (content.length > 0) {
                $.each(content, function(indx, post) {
                    $('.posts-wrapper').find('.col-md-8').html(`
                        <div class='card'>
                            <div class='card-body'>
                                <h5 class='card-title'>${post.Name}</h5>
                                <h6 class='card-subtitle text-muted'>${post.TimeStamp}</h6>
                                <p class='card-text'>${post.Message}</p>
                                <p class='card-text text-muted'>Email: <a href='mailto:${post.Email}'>${post.Email}</a></p>
                                <p class='card-text text-muted'>${post.ID}</p>
                            </div>
                        </div>
                    `);
                });
            }
        },
        error: function() {
            alert('No posts...');
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
    let emptyFieldsCounter = 0;
    let validity = false;

    const checkEmptyFields = () => {
        form.find('input, textarea').each(function() {
            if ( $(this).val().length === 0 ) {
                $(this).after(`<p class="error-msg text-danger">${errorsObj.emptyFields}</p>`);
                ++emptyFieldsCounter;
            }
        });

        hideError();
        return emptyFieldsCounter;
    };

    if ( checkEmptyFields() > 0 ) {
        validity = false;
        return false;
    } else if ( $('#email').val().search(regExps.emailRegExp) == -1 ) {
        $('#email').after(`<p class="error-msg text-danger">${errorsObj.invalidEmail}</p>`);
        hideError();
        validity = false;
        return false;
    } else {
        validity = true;
    }

    if ( validity === true ) {
        const postData = form.serialize() + '&action=add_post';

        $.ajax({
            method: 'POST',
            url: 'php/app.php',
            data: postData,
            success: function(data) {
                const responseRaw = $.parseJSON(data);
                const response = responseRaw.response_success;
                form.trigger('reset');
                setTimeout(function() {
                    alert(response);
                }, 1000);
                getInitPosts(); // shows just added post
                scrollCounter = 3; // sets initial value again
            },
            error: function(jqxhr, status, errMsg) {
                console.log(`Статус: ${status}. Ошибка: ${errMsg}`);
                alert('Ваше сообщение не отправлено. Попробуйте позже.');
            }
        });
    }
});


// output by scroll
$(window).on('scroll', function() {
    pageYOffsetCurrent = window.pageYOffset;
    const winHeight = $(window).height();

    if ( pageYOffsetCurrent > winHeight ) {
        $(".scrollup").fadeIn();
    } else {
        $(".scrollup").fadeOut();
    }

    if ( pageYOffsetCurrent > pageYOffset && !ajaxScrollInProgress ) {
        console.log('Scroll direction: to bottom');

        $.ajax({
            method: 'POST',
            url: 'php/app.php',
            data: {
                action: 'scroll',
                scroll_counter: scrollCounter
            },
            beforeSend: function() {
                ajaxScrollInProgress = true;
            },
            success: function(data) {
<<<<<<< HEAD
                const responseRaw = $.parseJSON(data);
                const content = responseRaw.content;
                const currentPostId = responseRaw.current_id;
                if ( currentPostId + 3 === scrollCounter ) {
                    $('.posts-wrapper').find('.col-md-8 .card:last-child').after(content);
                }
=======
                const content = $.parseJSON(data);

                if (content.length > 0) {
                    $.each(content, function(indx, post) {
                        $('.posts-wrapper').find('.col-md-8 .card:last-child').after(`
                        <div class='card'>
                            <div class='card-body'>
                                <h5 class='card-title'>${post.Name}</h5>
                                <h6 class='card-subtitle text-muted'>${post.TimeStamp}</h6>
                                <p class='card-text'>${post.Message}</p>
                                <p class='card-text text-muted'>Email: <a href='mailto:${post.Email}'>${post.Email}</a></p>
                                <p class='card-text text-muted'>${post.ID}</p>
                            </div>
                        </div>
                        `);
                    });
                }

                ajaxScrollInProgress = false;
>>>>>>> t20190814
                scrollCounter += 3;
                console.log(`Scroll counter after increment: ${scrollCounter}`); // test
                ajaxScrollInProgress = false;
            },
            error: function() {
                alert('End of posts');
            }
        });
    }

    pageYOffset = pageYOffsetCurrent;
});


$(".scrollup").click(function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
});


$(window).on('load', function() {
    getInitPosts();
});
