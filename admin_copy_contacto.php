<?php
    $mailAdminCopy->IsSMTP(); // enable SMTP
    $mailAdminCopy->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
    $mailAdminCopy->SMTPAuth = true; // authentication enabled
    $mailAdminCopy->SMTPSecure = "ssl"; // Enable TLS encryption, [ICODE]ssl[/ICODE] also accepted
    $mailAdminCopy->Host = "ssl://smtp.gmail.com";
    $mailAdminCopy->Port = 465;
    $mailAdminCopy->IsHTML(true);
    $mailAdminCopy->Username = "aaa";
    $mailAdminCopy->Password = "aaa";
    $mailAdminCopy->SetFrom("aaa", "APTO");
    $mailAdminCopy->CharSet = "UTF-8";
    $mailAdminCopy->Subject = 'Admin Copy | Formulário de Contacto' . PHP_EOL;
    $mailAdminCopy->Body = $content;
    $mailAdminCopy->AddAddress( "aaa" );
?>