$('.btn-post').on('click', function() {
    const form = $(this).parents('.form');

    if ( $('#email').val().search(regExps.emailRegExp) == -1 ) {
        $('#email').after(`<p class="error-msg text-danger">${errorsObj.invalidEmail}</p>`);
        hideError();
        return;
    } else {
        form.find('input, textarea').each(function() {
            if ( $(this).val().length === 0 ) {
                $(this).after(`<p class="error-msg text-danger">${errorsObj.emptyFields}</p>`);
                hideError();
                return;
            }
        });

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
                scrollCounter = 2; // sets initial value again
            },
            error: function(jqxhr, status, errMsg) {
                console.log(`Статус: ${status}. Ошибка: ${errMsg}`);
                alert('Ваше сообщение не отправлено. Попробуйте позже.');
            }
        });
    }
});