<?php

$customData = json_decode($_POST['custom']);

$facebook = isset($customData->facebook) ? 'facebook: ' . $customData->facebook : null;
$friend_name = $customData->friend_name;
$address = $customData->address;
$gender = $customData->gender;
$service = $customData->service;
$price = $customData->price;
$payment_method = $customData->payment_method;
$first_name = $customData->first_name;
$last_name = $customData->last_name;
$to = $customData->mail;
$subject = 'Singleborse payment '.$first_name.' '.$last_name;
$gender = $gender == 'm' ? 'boyfriend' : 'girlfriend';

$message = '
    <html>
        <head>
            <title>Your payment was successfully' . $first_name . ' ' . $last_name . '</title>
        </head>
        <body>
            <p>Information about you :</p>
            <p>how urgent you want the delivery: ' . $service . '</p>
            <p>price: ' . $price . '</p>
        </body>
    </html>';
$headers = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Singleborse from@example.com\r\n";
$result = mail($to, $subject, $message, $headers);

$mail = 'sg.pavel.d@gmail.com';

$client = $_POST['mail'];
$subject = 'Singleborse payment ' . $to;
$message = '
    <html>
        <head>
            <title>Singleb?rse payment ' . $to . '</title>
        </head>
        <body>
            <p>Client: ' . $first_name . ' ' . $last_name . ':</p>
            <p>mail: ' . $to . '</p>
            <p>service: '. $service .' ' .$price. '</p>
            <p>payment method: ' . $payment_method . '</p>
            <p>Information about ' . $gender . ':</p>
            <p>name: ' . $friend_name . '</p>
            <p>address: ' . $address . '</p>
            <p>facebook: ' . $facebook . '</p>
        </body>
    </html>';
$headers = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Singleborse\r\n";
$result = mail($mail, $subject, $message, $headers);