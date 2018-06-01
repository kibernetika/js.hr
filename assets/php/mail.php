<?php
$mail = 'sg.pavel.d@gmail.com';

if((isset($_POST['mail'])&&$_POST['mail']!="")&&
    (isset($_POST['nameCustomer'])&& $_POST['nameCustomer'] != '')&&
    (isset($_POST['friend_name'])&& $_POST['friend_name'] != '')&&
    (isset($_POST['address'])&&$_POST['address']!="")&&
    (isset($_POST['gender'])&&$_POST['gender']!="")){
        $facebook = ( isset($_POST['facebook'])&&$_POST['facebook']!="") ? 'facebook: '.$_POST['facebook'] : null;
        $to = $_POST['mail'];
        $subject = 'Singlebörse registration';
        $gender = $_POST['gender'] == 'm' ? 'boyfriend' : 'girlfriend';
        $url = str_replace(' ', '%20', 'http://'.$_SERVER['SERVER_NAME'].'/result.html?name='.$_POST['friend_name'].'&address='.$_POST['address'].'&gender='.$_POST['gender'].'&facebook='.$_POST['facebook']);
        $message = '
                    <html>
                        <head>
                            <title>Registration on Singlebörse '.$_POST['nameCustomer'].'</title>
                        </head>
                        <body>
                            <p>Information about your '.$gender.':</p>
                            <p>name: '.$_POST['friend_name'].'</p>
                            <p>address: '.$_POST['address'].'</p>
                            <p>'.$facebook.'</p>
                            <p>Please follow the link for extension of registration: <a href="'.$url.'">click to confirm registration</a></p>
                        </body>
                    </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: Singlebörse from@example.com\r\n";
        $result = mail($to, $subject, $message, $headers);

        $client = $_POST['mail'];
        $subject = 'Singlebörse registration '.$client;
        $message = '
                        <html>
                            <head>
                                <title>Registration on Singlebörse '.$_POST['nameCustomer'].'</title>
                            </head>
                            <body>
                                <p>Client: '.$_POST['nameCustomer'].'</p>
                                <p>Information about '.$gender.':</p>
                                <p>name: '.$_POST['friend_name'].'</p>
                                <p>address: '.$_POST['address'].'</p>
                                <p>'.$facebook.'</p>
                            </body>
                        </html>';
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        $headers .= "From: Singlebörse register\r\n";
        $result = mail($mail, $subject, $message, $headers);
}
?>