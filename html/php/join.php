<?php
$conn = new PDO('mysql:host=localhost;dbname=clubpenguin', 'root', 'root');
/*
700 = user taken
710 = 5 accounts on email
600 = custom ban message
*/
$userData = [];
$userData['username'] = @$_POST['Username'];
$userData['password'] = @$_POST['Password'];
$userData['email'] = @$_POST['Email'];
$userData['safeMode'] = @$_POST['IsSafeMode'];
$userData['color'] = @$_POST['Colour'];
$userData['ageGroup'] = @$_POST['AgeGroup'];

if($_SERVER['HTTP_REFERER'] !== 'http://localhost/media/join/join13.swf'){
  error(600, '100 years -- referrer invalid');
}

if(!is_numeric($userData['safeMode']) || !is_numeric($userData['color']) || !is_numeric($userData['ageGroup'])){
  error(600, '100 years');
}

if(strlen($userData['username']) < 3 || strlen($userData['username']) > 14){
  error(600, 'Username must be less than 3 characters, but more than 14 characters in length.');
}

if(!checkUser($userData['username'])){
  if(insertUser($userData)){
    error(0);
  } else {
    error(600, 'Nice try');
  }
} else {
  error(700);
}

function error($number, $message = false){
  $message ? die('&e=' . $number . '&em=' . $message) : die('&e=' . $number);
}

function insertUser($userData){
  global $conn;
  $stmt = $conn->prepare('INSERT INTO users (id, username, password, email, registerIP, safeMode, ageGroup, color) VALUES (null, :username, :password, :email, :address, :safeMode, :ageGroup, :color)');
  foreach($userData as $key => &$val){
    $stmt->bindParam(':' . $key, $val);
  }
  try {
    $stmt->bindParam(':address', $_SERVER['REMOTE_ADDR']);
    $stmt->execute();
    return true;
  } catch(PDOException $ex){
    return false;
  }
}

function checkUser($username){
  global $conn;
  $stmt = $conn->prepare('SELECT COUNT(*) from users WHERE username = :username LIMIT 1');
  $stmt->bindParam(':username', $username);
  $stmt->execute();
  if($stmt->fetchColumn()) return true;
  return false;
}
?>