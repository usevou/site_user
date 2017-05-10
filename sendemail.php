<?php
  error_reporting(0);

  function validaemail($email){
    if (!ereg('^([a-zA-Z0-9.-_])*([@])([a-z0-9]).([a-z]{2,3})',$email)){
      return false;
    } else {
      $dominio = explode('@',$email);
      if(!checkdnsrr($dominio[1],'A')){
        return false;
      } else {
        return true;
      }
    }
  }

  $a=array();
  $b=array();

  if ( isset($_POST['q']) ){
    $q = $_POST['q'];
    if ( $q == 'popup' ){
      $nome = $_POST['nome'];
      $email = $_POST['email'];

      if ( !validaemail($email) ){
        $b['res'] = 0;
        $b['erro'] = '* E-mail inválido.';
      } else {
        $headers = "MIME-Version: 1.1\r\n";
        $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
        $headers .= "From: gustavo@usevou.com\r\n"; // remetente
        $headers .= "Return-Path: gustavo@usevou.com\r\n"; // return-path
        $envio = mail("jefferson@usevou.com", "Confirmação de cadastro", "Nome: ".$nome."\nE-mail: ".$email, $headers);

        if($envio){
          $headers = "MIME-Version: 1.1\r\n";
          $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
          $headers .= "From: jefferson@usevou.com\r\n"; // remetente
          $headers .= "Return-Path: jefferson@usevou.com\r\n"; // return-path
          $envio = mail("gustavo@usevou.com", "Confirmação de cadastro", "Nome: ".$nome."\nE-mail: ".$email, $headers);

          if($envio){
            $b['res'] = 1;
          }
        }
      }
      array_push($a,$b);
    } else if ( $q == 'form' ){
      $nome = $_POST['nome'];
      $email = $_POST['email'];
      $assunto = $_POST['assunto'];
      $msg = $_POST['msg'];

      if ( !validaemail($email) ){
        $b['res'] = 0;
        $b['erro'] = '* E-mail inválido.';
      } else {
        $headers = "MIME-Version: 1.1\r\n";
        $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
        $headers .= "From: gustavo@usevou.com\r\n"; // remetente
        $headers .= "Return-Path: gustavo@usevou.com\r\n"; // return-path
        $envio = mail("jefferson@usevou.com", "Formulário do site: ".$assunto, "Nome: ".$nome."\nE-mail: ".$email."\n\n".$msg, $headers);

        if($envio){
          $headers = "MIME-Version: 1.1\r\n";
          $headers .= "Content-type: text/plain; charset=UTF-8\r\n";
          $headers .= "From: jefferson@usevou.com\r\n"; // remetente
          $headers .= "Return-Path: jefferson@usevou.com\r\n"; // return-path
          $envio = mail("gustavo@usevou.com", "Formulário do site: ".$assunto, "Nome: ".$nome."\nE-mail: ".$email."\n\n".$msg, $headers);

          if($envio){
            $b['res'] = 1;
          }
        }
      }
      array_push($a,$b);
    }
  }



  echo json_encode($a);
?>
