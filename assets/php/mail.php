<?php
$mail = 'deni.ecybernetics@gmail.com';

if( (isset($_POST['nameCustomer'])&& $_POST['nameCustomer'] != '')&&
    (isset($_POST['phone'])&&$_POST['phone']!="")){
        $to = $mail;
        $message = '<html>
                        <head>
                            <title>Передзвоніть мені</title>
                        </head>
                        <body>
                            <p>Наш клієнт, на сайті, відправиви форму зворотного зв`язку</p>
                            <p>Ім`я клієнта: '.$_POST['nameCustomer'].'</p>
                            <p>Телефон: '.$_POST['phone'].'</p>
                            <p>Будь ласка, зв`яжіться з ним.</p>
                        </body>
                    </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: Imperia HR\r\n";
        $result = mail($mail, 'Передзвоніть мені ihr.com.ua', $message, $headers);
}
?>