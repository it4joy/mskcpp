'use strict';

const errorsObj = {
    emptyFields: 'Заполните, пожалуйста, поле',
    invalidEmail: 'Email необходимо ввести в формате (пример): example@domain.com (без пробелов)',
};

const regExps = {
    emailRegExp: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i
};


const hideError = () => {
    setTimeout(function() {
        $('.error-msg').fadeOut();
    }, 4000);
};


$('.btn-post').on('click', function() {
    const form = $(this).parents('.form');

    form.find('input, textarea').each(function() {
        if ( $(this).val().length === 0 ) {
            $(this).after(`<p class="error-msg text-danger">${errorsObj.emptyFields}</p>`);
        }
    });

    if ( $('#email').val().search(regExps.emailRegExp) == -1 ) {
        $('#email').after(`<p class="error-msg text-danger">${errorsObj.invalidEmail}</p>`);
    }

    hideError();
});
