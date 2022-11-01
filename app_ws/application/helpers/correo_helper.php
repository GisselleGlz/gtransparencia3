<?php

function correo($correo)
{
    $CI = &get_instance();
    $CI->load->database();
    require APPPATH . '/third_party/PHPMailer/Exception.php';
    require APPPATH . '/third_party/PHPMailer/PHPMailer.php';
    require APPPATH . '/third_party/PHPMailer/SMTP.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer(true); // Passing `true` enables exceptions
    try {
        $pass =  $correo['password2'];
        //$folio = $datos['folio'];
        $correo = $correo['correo'];
        //$curso = $datos->curso;
        include 'plantilla_correo.php';
        //Server settings
        // $mail->SMTPDebug = 2; // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'nld.gob.mx'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'casasdelacultura@nld.gob.mx';
        $mail->Password = 'NwBKZ-Y1noj$yzgv'; // SMTP password
        $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465; // TCP port to connect to

        //Recipients
        $mail->setFrom('declaracionpatrimonial@nld.gob.mx', utf8_decode('Sistema de Declaración Patrimonial '));
        $mail->addAddress($correo); // Add a recipient

        //Content        
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = utf8_decode('REGISTRO ÉXITOSO')  ;
        $plantilla = utf8_decode($plantilla);
        $mail->AllowEmpty = true;
        $mail->addEmbeddedImage('./assets/acceso.png', 'acceso', 'acceso.png');
        $mail->addEmbeddedImage('./assets/inicio.png', 'inicio', 'inicio.png');
       // $mail->Body = '<img alt="Registro Exitoso" src="cid:acceso">';
        $mail->Body = utf8_decode('
        <img alt="Registro Exitoso" src="cid:inicio">
        <h2 align="center"> SISTEMA DE DECLARACIÓN PATRIMONIAL </h2> <br> 
        <h3 align="center" style="color: gray;"> CUENTA REGISTRADA </h3> <br> <hr><br> 
             <div align="center">   <img alt="Registro Exitoso" src="cid:acceso"> <br>')  . utf8_decode('<b>Correo:  </b> ') . $correo . '<br> ' . utf8_decode('<b>Contraseña:  </b>') . $pass . '<br><br>  </div> <hr>';
        $mail->AltBody = '';

        $mail->send();
        // echo 'Message has been sent';
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
    }

}
