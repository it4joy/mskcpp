<?php

require_once("db.php");


if ( !empty($_POST) ) {
    // initial output
    if ( $_POST["action"] === "init_select" ) {
        $query = "SELECT * FROM Guest_book ORDER BY TimeStamp DESC LIMIT 3";

        if ( $result = mysqli_query($link, $query) ) {
            while( $row = mysqli_fetch_array($result) ) {
                echo "
                    <div class='card'>
                        <div class='card-body'>
                            <h5 class='card-title'>" . $row["Name"] . "</h5>
                            <h6 class='card-subtitle text-muted'>" . $row["TimeStamp"] . "</h6>
                            <p class='card-text'>" . $row["Message"] . "</p>
                            <p class='card-text text-muted'>Email: <a href='mailto:" . $row["Email"] . "'>" . $row["Email"] . "</a></p>
                            <p class='card-text text-muted'>ID: " . $row["ID"] . "</p>
                        </div>
                    </div>";
            }

            //mysqli_free_result($result);
        }
    }


    // output by scroll
    if ( $_POST["action"] === "scroll" ) {
        $scrollCounter = $_POST["scroll_counter"];

        $query = "SELECT * FROM Guest_book ORDER BY TimeStamp DESC LIMIT 3 OFFSET " . $scrollCounter;

        if ( $result = mysqli_query($link, $query) ) {
<<<<<<< HEAD
            $post = "";
            $id = "";
            global $post;
            global $id;

            while( $row = mysqli_fetch_array($result) ) {
                $post = "
                    <div class='card'>
                        <div class='card-body'>
                            <h5 class='card-title'>" . $row["Name"] . "</h5>
                            <h6 class='card-subtitle text-muted'>" . $row["TimeStamp"] . "</h6>
                            <p class='card-text'>" . $row["Message"] . "</p>
                            <p class='card-text text-muted'>Email: <a href='mailto:" . $row["Email"] . "'>" . $row["Email"] . "</a></p>
                            <p class='card-text text-muted'>ID: " . $row["ID"] . "</p>
                        </div>
                    </div>";

                $id = $row["ID"];
            }

            echo json_encode( array("content" => $post, "current_id" => $id) );
=======
            $articles = array();
            
            while ( $row = mysqli_fetch_assoc($result) ) {
                $articles[] = $row;
            }

            echo json_encode($articles);
>>>>>>> t20190814
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
