<?php
$CLIENT_SECRET = "VYCmlu85eDMQNIrT069M";
$ch = curl_init();
$url = "https://api.vk.com/method/secure.addAppEvent?user_id=31254554&activity_id=1&value=1&client_secret=".$CLIENT_SECRET."&access_token=".$_POST['token']."v=5.52";
curl_setopt($ch, CURLOPT_URL, $url);
echo $_POST['token'];
echo $data = curl_exec($ch);
curl_close($ch);
?>