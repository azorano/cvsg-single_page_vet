<?php
$name    = stripslashes(trim($_POST['name']));
$email   = stripslashes(trim($_POST['email']));
$tele    = stripslashes(trim($_POST['tele']));
$date    = stripslashes(trim($_POST['date']));
$message = stripslashes(trim($_POST['message']));
$nameRegexTest = "/^[[:upper:][:lower:][:space:]áÁéÉíÍóÓúÚêÊâÂãÃôÔõÕçÇ]{3,255}$/";
$teleRegexTest = "/^[0-9+]{13}$/";
$messageRegexTest = "/^[[:alnum:][:punct:][:upper:][:lower:][:space:]áÁéÉíÍóÓúÚêÊâÂãÃôÔçÇ]{1,500}$/";
header('Content-Type: application/json');

if ($name === '' && $email === '' && $tele === '' && $date === '' && $message === ''){
print json_encode(array('message' => 'Preencha o formulário.', 'code' => 0));
exit();
}

if ($name === '') {
print json_encode(array('message' => 'Introduza o seu nome.', 'code' => 0));
exit();
} else {
if (!preg_match($nameRegexTest, $name)) {
print json_encode(array('message' => 'Digite um nome com 3 ou mais caracteres e sem números.', 'code' => 0));
exit();
}
}

if ($email === ''){
print json_encode(array('message' => 'Introduza o seu endereço de email.', 'code' => 0));
exit();
} else {
if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
print json_encode(array('message' => 'O formato do email não é válido.', 'code' => 0));
exit();
}
}

if ($tele === ''){
print json_encode(array('message' => 'Introduza o seu contacto telefónico.', 'code' => 0));
exit();
} else {
if (!preg_match($teleRegexTest, $tele)) {
print json_encode(array('message' => 'O formato do telefone não é válido. Terá de conter 9 dígitos.', 'code' => 0));
exit();
}
}

if ($date === ''){
print json_encode(array('message' => 'Por favor escolha a melhor data para si.', 'code' => 0));
exit();
}

if ($message === ''){
print json_encode(array('message' => 'Qual o motivo da consulta?', 'code' => 0));
exit();
} else {
if (!preg_match($messageRegexTest, $message)) {
print json_encode(array('message' => 'Utilizou caracteres inválidos no texto. Por favor confirme.', 'code' => 0));
exit();
}
}

$newname = filter_var( $name, FILTER_SANITIZE_STRING );
$newemail = filter_var( $email, FILTER_SANITIZE_EMAIL );
$newtele = filter_var( $tele, FILTER_SANITIZE_STRING );
//$newsubject = filter_var( $subject, FILTER_SANITIZE_STRING );
$newdate = filter_var( $date, FILTER_SANITIZE_STRING );
$newmessage = filter_var( $message, FILTER_SANITIZE_STRING );

$content = "<b>Nome:</b> $newname  <br>". PHP_EOL ."<b>Email:</b> $newemail <br>". PHP_EOL ."<b>Telefone:</b> $newtele <br>". PHP_EOL ." ". PHP_EOL ."<b>Data: $newdate</b> <br>" . PHP_EOL ."<br>----------<br><b>Assunto:</b> Marcação da Consulta<br>". PHP_EOL ."<b>Motivo da Consulta:</b><br> $newmessage";

include_once('msg_consulta.php');

require("../../vendor/phpmailer/phpmailer/src/Exception.php");
require("../../vendor/phpmailer/phpmailer/src/PHPMailer.php");
require("../../vendor/phpmailer/phpmailer/src/SMTP.php");

$mailUserCopy = new PHPMailer\PHPMailer\PHPMailer();
$mailAdminCopy = new PHPMailer\PHPMailer\PHPMailer();

include_once('user_copy_consulta.php');

/* - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - -  - - - - - - - - - - - - */

include_once('admin_copy_consulta.php');

$mailUserCopy->Send();
$mailAdminCopy->Send(); 

if( !$mailUserCopy->Send() ) { 
    echo "Mailer Error: " . $mailUserCopy->ErrorInfo . ' | admin: ' . $mailAdminCopy->ErrorInfo;
    print json_encode(array('message' => 'Ocorreu um erro!', 'code' => 0));
    exit();
} else {
    print json_encode(array('message' => 'Enviado com sucesso!', 'code' => 1));
    exit();
}
?>