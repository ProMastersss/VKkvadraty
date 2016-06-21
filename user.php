<?php
// Запрос данных о пользователе
$host     = "localhost";/*Имя сервера*/
$user     = "u1233_main";/*Имя пользователя*/
$password = "7paQDdB2";/*Пароль пользователя*/
$db       = "u1233_main";/*Имя базы данных*/

$link     = mysql_connect($host, $user, $password); /*Подключение к серверу*/
mysql_select_db($db); /*Подключение к базе данных на сервере*/

// Проверяем приглашение
if($_POST['priglasil'] != $_POST['uid'])
{
	$resurs = mysql_query(" SELECT `money` FROM `users` WHERE `id` = ".$_POST['priglasil']);
	if($resurs)
	{
		$row = mysql_fetch_assoc($resurs);
		$row = (int)$row['money'] + 2000;
		$id = $_POST['priglasil'];
		mysql_query("UPDATE `users` SET `money`='$row' WHERE `id`='$id'");
	}
}
// Получаем данные пользователя
$res = mysql_query(" SELECT * FROM `users` WHERE `id` = ".$_POST['uid']);
$row = mysql_fetch_assoc($res);
if($row)
echo json_encode($row);
else
{
	$times = 0;
	$days  = 0;
	$level = 1;
	$id    = $_POST['uid'];
	$money = 1500;
	$res   = mysql_query("INSERT INTO `users` (id, level, money, days, times) VALUES ('$id', '$level', '$money', '$days', '$times')");
	$row['id'] = $id;
	$row['days'] = $days;
	$row['level'] = $level;
	$row['money'] = $money;
	$row['times'] = $times;
	echo json_encode($row);
}

?>