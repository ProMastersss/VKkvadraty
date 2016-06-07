<?php
// Сохранитьуровень после прохождения его
$host="localhost";/*Имя сервера*/
$user="u1233_main";/*Имя пользователя*/
$password="7paQDdB2";/*Пароль пользователя*/
$db="u1233_main";/*Имя базы данных*/

$link = mysql_connect($host, $user, $password); /*Подключение к серверу*/
mysql_select_db($db); /*Подключение к базе данных на сервере*/
$times = $_POST['times'];
$id = $_POST['id'];
if(mysql_query("UPDATE `users` SET `times` = '$times',  WHERE `id`='$id'", $link))
	echo true;
else echo false;
?>