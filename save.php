<?php
// Сохранитьуровень после прохождения его
$host="indigo.elastictech.org";/*Имя сервера*/
$user="u1233_main";/*Имя пользователя*/
$password="7paQDdB2";/*Пароль пользователя*/
$db="u1233_main";/*Имя базы данных*/

$link = mysql_connect($host, $user, $password); /*Подключение к серверу*/
mysql_select_db($db); /*Подключение к базе данных на сервере*/
echo mysql_query(" UPDATE `users` SET `level`=".$_POST['level'].", `money`=".$_POST['money'].", `days`=".$_POST['days'].", `times`=".$_POST['times']." WHERE `id`=".$_POST['id'],$link);
?>