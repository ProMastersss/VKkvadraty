<?php
// Запрос данных о пользователе
$host     = "localhost";/*Имя сервера*/
$user     = "u1233_main";/*Имя пользователя*/
$password = "7paQDdB2";/*Пароль пользователя*/
$db       = "u1233_main";/*Имя базы данных*/

$link     = mysql_connect($host, $user, $password); /*Подключение к серверу*/
mysql_select_db($db); /*Подключение к базе данных на сервере*/

// Получаем данные пользователя
$res      = mysql_query("SELECT `money`, `level` FROM `users` WHERE `id` = ".$_POST['id']);
$row      = mysql_fetch_assoc($res);
if($row)
echo json_encode($row);
else
echo "Ошибка получения данных друга";
?>