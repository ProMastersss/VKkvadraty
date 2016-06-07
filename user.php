<?php
// Запрос данных о пользователе
$host     = "indigo.elastictech.org";/*Имя сервера*/
$user     = "u1233_main";/*Имя пользователя*/
$password = "7paQDdB2";/*Пароль пользователя*/
$db       = "u1233_main";/*Имя базы данных*/

$link     = mysql_connect($host, $user, $password); /*Подключение к серверу*/
mysql_select_db($db); /*Подключение к базе данных на сервере*/
echo mysql_query(" SELECT * FROM `users` ",$link);
?>