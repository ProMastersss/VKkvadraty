<?php
// Запрос данных о пользователе
$host     = "localhost";/*Имя сервера*/
$user     = "u1233_main";/*Имя пользователя*/
$password = "7paQDdB2";/*Пароль пользователя*/
$db       = "u1233_main";/*Имя базы данных*/

$link     = mysql_connect($host, $user, $password); /*Подключение к серверу*/
mysql_select_db($db); /*Подключение к базе данных на сервере*/
$id       = $_POST['priglasil'];

// Получаем данные пользователя
$res      = mysql_query(" SELECT * FROM `users` WHERE `id` = ".$_POST['uid']);
$row      = mysql_fetch_assoc($res);
if($row)
{
	echo json_encode($row);
	$p   = 0;
	$res = mysql_query("UPDATE `users` SET `priglashenie`= '$p' WHERE `id`=".$_POST['uid']);
}
else
{
	// Проверяем приглашение
	if($id != $_POST['uid']){
		$resurs = mysql_query(" SELECT `priglashenie` FROM `users` WHERE `id` = ".$_POST['priglasil']);
		$row = mysql_fetch_assoc($resurs);
		if($row){
			$row = (int)$row['priglashenie'] + 1;
			mysql_query("UPDATE `users` SET `priglashenie`='$row' WHERE `id`='$id'");
		}
	}
	$times        = 0;
	$days         = 0;
	$level        = 1;
	$priglashenie = 0;
	$ids           = $_POST['uid'];
	$money        = 1500;
	$res          = mysql_query("INSERT INTO `users` (id, level, money, days, times, priglashenie) VALUES ('$ids', '$level', '$money', '$days', '$times', '$priglashenie')");
	$row1['id'] = $ids;
	$row1['days'] = $days;
	$row1['level'] = $level;
	$row1['money'] = $money;
	$row1['times'] = $times;
	$row1['priglashenie'] = $priglashenie;
	echo json_encode($row1);
}

?>