<?php
    $mailUserCopy->IsSMTP(); // enable SMTP
    $mailUserCopy->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
    $mailUserCopy->SMTPAuth = true; // authentication enabled
    $mailUserCopy->SMTPSecure = "ssl"; // Enable TLS encryption, [ICODE]ssl[/ICODE] also accepted
    $mailUserCopy->Host = "ssl://smtp.gmail.com";
    $mailUserCopy->Port = 465;
    $mailUserCopy->IsHTML(true);
    $mailUserCopy->Username = "aaa";
    $mailUserCopy->Password = "aaa";
    $mailUserCopy->SetFrom("aaa", "APTO");
    $mailUserCopy->CharSet = "UTF-8";
    $mailUserCopy->Subject = "Cópia Consulta Formulário Online" . PHP_EOL;
    $mailUserCopy->Body = $contentCopy . PHP_EOL;
    $mailUserCopy->AddAddress($newemail);
?>