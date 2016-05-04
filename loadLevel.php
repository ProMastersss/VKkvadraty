<?php
	header("Access-Control-Allow-Origin: *");
	
	$f = fopen("assets/Level1/Level1.txt", "r");
	$str = ""; 
	$str = fgets($f);
    fclose($f);
    
    //Разделяем координаты
    $mas = explode(",", $str);
    
    //Считаем колличество файлов изображений
	$path = 'assets/Level1'; // название папки
	$dir = opendir ($path); // открываем директорию
	$i = 0; // создаём переменную для цикла
	while (false !== ($file = readdir($dir))) {
	// ниже указываем расширение файла. Вместо jpg выбираете нужный
	      if (strpos($file, '.png',1) ) {
	      $i++;
	  }
	}
	
    $mas[count($mas)-1] = $i;
    echo json_encode($mas);
?>