<?php
// Запрос данных о пользователе
$host          = "localhost";/*Имя сервера*/
$user          = "u1233_main";/*Имя пользователя*/
$password      = "7paQDdB2";/*Пароль пользователя*/
$db            = "u1233_main";/*Имя базы данных*/

$link          = mysql_connect($host, $user, $password); /*Подключение к серверу*/
mysql_select_db($db); /*Подключение к базе данных на сервере*/

$res           = mysql_query("SELECT `id`, `level`, `money` FROM `users` ORDER BY `level` DESC, `money` DESC");
$k             = 1; //Счетчик позиций
$user_position = 0;
while(($row = mysql_fetch_assoc($res)) && $k <= 50)
{
	if($row['id'] == 31254554/*$_POST['id']*/)
		$user_position = $k;
	$mas[$k]['id'] = $row['id'];
	$mas[$k]['level'] = $row['level'];
	$mas[$k]['money'] = $row['money'];
	$k++;
}
$mas[$k]['position'] = $user_position;
echo json_encode($mas);
?>