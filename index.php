<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Московская коллегия адвокатов - Центр правовой поддержки (тестовое задание)</title>

        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link href="css/main.css" rel="stylesheet" type="text/css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript" defer></script>
        <script src="js/main.js" type="text/javascript" defer></script>
        <script src="https://use.fontawesome.com/445721fe4f.js" async></script>
    </head>

    <body>
        <div class="app-wrapper">
            <noscript>
                <p>Пожалуйста, включите поддержку JavaScript в Вашем браузере!</p>
            </noscript>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <h2 class="text-center">Гостевая книга</h2>
                        <p class="text-center">Оставьте свое сообщение в форме ниже</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <form id="form-post" class="form">
                            <div class="form-group">
                                <label for="name">Имя и фамилия</label>
                                <input type="text" id="name" class="form-control" name="name" placeholder="Введите имя и фамилию" autofocus>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="text" id="email" class="form-control" name="email" placeholder="Введите email">
                            </div>
                            <div class="form-group">
                                <label for="message">Сообщение</label>
                                <textarea id="message" class="form-control textarea" rows="5" name="message"></textarea>
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-primary btn-post"><i class="fa fa-paper-plane"></i> Отправить</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="posts-wrapper">
                    <div class="row">
                        <div class="col-md-8 offset-md-2">
                            <!-- for right output of initial posts -->
                            <div class='card service-plug'></div>
                        </div>
                    </div>
                </div>
            </div>

            <a href="#" class="scrollup">
                <i class="fa fa-chevron-up"></i>
            </a>
        </div>
    </body>
</html>
