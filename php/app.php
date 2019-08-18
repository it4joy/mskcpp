<?php

require_once("db.php");


if ( !empty($_POST) ) {
    // initial output
    if ( $_POST["action"] === "init_select" ) {
        $query = "SELECT * FROM Guest_book ORDER BY TimeStamp DESC LIMIT 3";

        if ( $result = mysqli_query($link, $query) ) {
            $articles = array();

            while ( $row = mysqli_fetch_assoc($result) ) {
                $articles[] = $row;
            }

            echo json_encode($articles);
        }
    }


    // output by scroll
    if ( $_POST["action"] === "scroll" ) {
        $scrollCounter = $_POST["scroll_counter"];

        $query = "SELECT * FROM Guest_book ORDER BY TimeStamp DESC LIMIT 3 OFFSET " . $scrollCounter;

        if ( $result = mysqli_query($link, $query) ) {
            $articles = array();
            
            while ( $row = mysqli_fetch_assoc($result) ) {
                $articles[] = $row;
            }

            echo json_encode($articles);
        }
    }


    // adding post
    if ( $_POST["action"] === "add_post" ) {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $message = $_POST["message"];

        $name = mysqli_real_escape_string($link, $name);
        $email = mysqli_real_escape_string($link, $email);
        $message = mysqli_real_escape_string($link, $message);

        $query = "INSERT INTO Guest_book(Name, Email, Message) VALUES('" . $name . "', '" . $email . "', '" . $message . "')";

        if ( mysqli_query($link, $query) ) {
            echo json_encode( array("response_success" => $name . ", Ваше сообщение отправлено!") );
        }
    }
}
