<?php
// Сохранитьуровень после прохождения его
$host="localhost";/*Имя сервера*/
$user="u1233_main";/*Имя пользователя*/
$password="7paQDdB2";/*Пароль пользователя*/
$db="u1233_main";/*Имя базы данных*/

$link = mysql_connect($host, $user, $password); /*Подключение к серверу*/
mysql_select_db($db); /*Подключение к базе данных на сервере*/
$id = $_POST['id'];
$level = $_POST['level'];
$money = $_POST['money'];

if(mysql_query("UPDATE `users` SET `level`='$level', `money`='$money' WHERE `id`='$id'"))
	echo "Сохранены данные";
else echo "Ошибка сохранения данных";
?>