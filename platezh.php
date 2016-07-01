<?php
$host="localhost";/*Имя сервера*/
$user="u1233_main";/*Имя пользователя*/
$password="7paQDdB2";/*Пароль пользователя*/
$db="u1233_main";/*Имя базы данных*/

$link = mysql_connect($host, $user, $password); /*Подключение к серверу*/
mysql_select_db($db); /*Подключение к базе данных на сервере*/
$order_id = $_POST['order_id'];
$id = $_POST['uid'];
$money = $_POST['money'];

switch($order_id){
	case '1000monet': $money = $money + 1000; break;
	case '2000monet': $money = $money + 2000; break;
	case '5000monet': $money = $money + 5000; break;
	case '10000monet': $money = $money + 10000; break;
	case '50000monet': $money = $money + 50000; break;
}

if(mysql_query("UPDATE `users` SET `money`='$money' WHERE `id`='$id'"))
	echo $money;
?>