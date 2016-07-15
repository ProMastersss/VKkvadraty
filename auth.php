<?php
$CLIENT_ID ="5314962";
$CLIENT_SECRET = "VYCmlu85eDMQNIrT069M";

$url = "https://oauth.vk.com/access_token?client_id=".$CLIENT_ID."&client_secret=".$CLIENT_SECRET."&v=5.52&grant_type=client_credentials";

$token = file_get_contents($url);
$data = json_decode($token);

$ch = curl_init();
$url = "https://api.vk.com/method/secure.addAppEvent?user_id=".$_POST['id']."&activity_id=1&value=".$_POST['level']."&client_secret=".$CLIENT_SECRET."&access_token=".$data -> access_token."&v=5.52";
curl_setopt($ch, CURLOPT_URL, $url);
echo curl_exec($ch);
curl_close($ch);
?>