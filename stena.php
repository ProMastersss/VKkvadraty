<?php
$src            = imagecreatefromjpeg('assets/Level'.$_POST['level'].'/success.jpg');
$main_img       = imagecreatefrompng('img/ramkaPolya.png');
$location_x     = 80;
$location_y     = 64;
$offset_src_x   = 0;
$offset_src_y   = 0;
$src_width      = 1280;
$src_height     = 1024;
$no_transparent = 100;

imagecopymerge($main_img, $src, $location_x, $location_y, $offset_src_x, $offset_src_y, $src_width, $src_height, $no_transparent);
imageSaveAlpha($main_img, true);

$max_width   = 576;
$max_height  = 461;

//создаем дескриптор для уменьшенного изображения
$dst         = imagecreatetruecolor($max_width, $max_height);

//устанавливаем прозрачность
setTransparency($dst, $main_img);

//изменяем размер
ImageCopyResampled($dst, $main_img, 0, 0, 0, 0, $max_width, $max_height, 1440, 1152);

header('Content-Type: image/png');
//сохраняем уменьшенное изображение в файл
ImagePNG($dst, "stena.png");

//закрываем дескрипторы исходного и уменьшенного изображений
ImageDestroy($src);
ImageDestroy($dst);

//Загрузка в вк

$upload_url=$_POST['data'];
$lala = dirname(__FILE__)."/stena.png";
$cfile = curl_file_create($lala,'image/png','test_name.png');
$post_params['photo'] = $cfile;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $upload_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data'));
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_params);
$response = curl_exec($ch);
curl_close($ch);
echo($response);
unlink('stena.png');

function setTransparency($new_image, $image_source)
{
	$transparencyIndex = imagecolortransparent($image_source);
	$transparencyColor = array('red'  => 255,'green'=> 255,'blue' => 255);

	if($transparencyIndex >= 0)
	$transparencyColor = imagecolorsforindex($image_source, $transparencyIndex);

	$transparencyIndex = imagecolorallocate($new_image, $transparencyColor['red'], $transparencyColor['green'], $transparencyColor['blue']);
	imagefill($new_image, 0, 0, $transparencyIndex);
	imagecolortransparent($new_image, $transparencyIndex);
}
?>