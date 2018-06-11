<?php
$mail = 'deni.ecybernetics@gmail.com';

if( (isset($_POST['fullname'])&& $_POST['fullname'] != '')&&
    (isset($_POST['email'])&&$_POST['email']!="")){
        $to = $mail;
        $message = '<html>
                        <head>
                            <title>Підписка на розсилку</title>
                        </head>
                        <body>
                            <p>Наш клієнт, на сайті, підписався на нашу розсилку</p>
                            <p>Ім`я клієнта: '.$_POST['fullname'].'</p>
                            <p>Електронна пошта: '.$_POST['email'].'</p>
                            <p>Будь ласка, додайте його e-mail у нашу базу розсилок.</p>
                        </body>
                    </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: Imperia HR\r\n";
        $result = mail($mail, 'Підписка на розсилку ihr.com.ua', $message, $headers);
}
?>