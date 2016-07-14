<?php
$ch = curl_init();
$url = "https://api.vk.com/method/addAppEvent?user_id=31254554&activity_id=1&value=5&client_secret=VYCmlu85eDMQNIrT069M&access_token=".$_POST['token'];
curl_setopt($ch, CURLOPT_URL, $url);
curl_exec($ch);
curl_close($ch);
echo $_POST['token'];
?>