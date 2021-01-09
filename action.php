
<?php
echo "peopeod";
use PHPMailer\PHPMailer\PHPMailer;

$name = $email = $message = "";

if (isset($_POST['submit'] {
  $name = test_input($_POST["name"]);
  $email = test_input($_POST["email"]);
  $message = test_input($_POST["message"]);

  require_once "PHPMailer/PHPMailer.php"
  require_once "PHPMailer/SMTP.php"
  require_once "PHPMailer/Exception.php"

  $mail = new PHPMailer();

  $mail->isSMTP();
  $mail->Host = "smtp.gmail.com";
  $mail->SMTPAuth = true;
  $mail->Username = "apithanos2004@gmail.com";
  $mail->Password = "no_password_for_you";
  $mail->Port = 465;
  $mail->SMTPSecure = "ssl";

  $mail->isHTML(true);
  $mail->setFrom($email,$name);
  $mail->addAddress("apithanos2004@gmail.com");
  $mail->Subject = ("$email ");
  $mail->Body = $message;

  if ($mail->send()){
    $status = "success";
    $response = "Email is sent";
  }else{
    $status = "failed";
    $response = "Something is wrong: <br>" . $mail->ErrorInfo;
  }
    echo $status;
    echo $response
  exit(json_encode(array("status"=>$status,"response"=> $response)));


}

?>
