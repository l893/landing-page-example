<?php

  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'PHPMailer/src/Exception.php';
  require 'PHPMailer/src/PHPMailer.php';

  $mail = new PHPMailer(TRUE);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'PHPMailer/language/');
  $mail->IsHTML(true);

  // от кого письмо
  $mail->setFrom('lawyer@l-893.com', 'ЮристЪ');

  // кому отправить
  $mail->addAddress('L_893@mail.ru');

  // тема письма
  $mail->Subject = 'В ответ на Ваш запрос сообщаю следующее:';

  // тело письма
  $body = '<h1>Вопрос от клиента:</h1>';

  if(trim(!empty($_POST['name']))){
  	$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
  }

  if(trim(!empty($_POST['email']))){
  	$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
  }

  if(trim(!empty($_POST['message']))){
  	$body.='<p><strong>Послание:</strong> '.$_POST['message'].'</p>';
  }

  $mail->Body = $body;


  // проверка

  if ($_POST['contact_contact'] != ''){
    exit;
  }

  if ($_POST['code_contact'] != 'NOSPAM'){
    exit;
  }

  // отправка

  if (!$mail->send()) {
    $message = 'Error';
  } else {
    $message = 'Success';
  }

  $responce = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($responce);

?>
