<?php
// ���������������� ����� ����������� ���
$host="localhost";/*��� �������*/
$user="u1233_main";/*��� ������������*/
$password="7paQDdB2";/*������ ������������*/
$db="u1233_main";/*��� ���� ������*/

$link = mysql_connect($host, $user, $password); /*����������� � �������*/
mysql_select_db($db); /*����������� � ���� ������ �� �������*/
$times = $_POST['times'];
$id = $_POST['id'];
if(mysql_query("UPDATE `users` SET `times` = '$times',  WHERE `id`='$id'", $link))
	echo true;
else echo false;
?>