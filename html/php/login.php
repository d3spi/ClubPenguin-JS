<?php
$conn = new PDO('mysql:host=localhost;dbname=clubpenguin', 'root', 'root');

$version = @$_POST['Version'];
$username = @$_POST['Username'];
$password = @$_POST['Password'];
$action = @$_POST['Action'];

function checkUser($username){
  global $conn;
  $stmt = $conn->prepare('SELECT COUNT(*) from users WHERE username = :username LIMIT 1');
  $stmt->bindParam(':username', $username);
  $stmt->execute();
  if($stmt->fetchColumn()) return true;
  return false;
}

function generateUser($username, $password){
  global $conn;
  $stmt = $conn->prepare('SELECT * from users WHERE username = :username AND password = :password');
  $stmt->bindParam(':username', $username);
  $stmt->bindParam(':password', $password);
  $stmt->execute();
  if($row = $stmt->fetch()){
    $crumbs = array(
      $row['id'], //id
      $username,
      $row['color'],//color
      $row['head'],//head
      $row['face'],//face
      $row['neck'],//neck
      $row['body'],//body
      $row['hand'],//hand
      $row['feet'],//feet
      $row['photo'],//photo
      $row['flag'],//flag
      0,//x
      0,//y
      1,//frame
      1//isMember
    );
    $str = 'crumb=%s&k1=%s&ks=0&c=%d&s=0&jd=101010&ed=0&bd=0&h=0&b=0&w=100|2|1,';
    return sprintf($str, implode($crumbs, '|'), generateKey($password), $row['coins']);
  } else {
    return false;
  }
}

function generateKey($pass){
  $hash = md5($pass);
  $hash = substr($hash, 0, 16);
  $hash = strrev($hash);
  $hash .= 'angrygardensalad';
  return md5($hash);
}

function sendError($error){
  die('&e=' . $error);
}

if(!checkUser($username)){
  sendError(100);
}

$userStr = generateUser($username, $password);

if($userStr !== false){
  die($userStr);
} else {
  sendError(101);
}


/*
e = error
crumb = player crumbs
k1 = loginkey
k2 = smartkey
k3 = crumbkey
c = coins
s = safe mode
jd = join date
ed = expiry date
bd = banned date
h = parent hint
b = banned number
td = today date
w = worlds
m = alerts
*/
?>