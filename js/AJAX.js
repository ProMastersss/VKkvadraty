/**
 * Created by Сергей on 14.03.2016.
 */
var AJAX = {
    getKoordinaty: function (player) {
        jQuery.ajax({
            url: player.urlLoadLevel,
            async: true,
            crossDomain: true,
            data: {level: player.level},
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                player.koordinaty = JSON.parse(data);
                player.kolKvadratov = player.koordinaty[player.koordinaty.length - 1] - 1;

                // Инициализация функций загрузки
                var text = game.add.text(32, 32, 'Click to start load', { fill: '#ffffff' });
                game.load.onLoadStart.add(loadStart, this);
                game.load.onFileComplete.add(fileComplete, this);
                game.load.onLoadComplete.add(loadComplete, this);

                //Загружаем изображения
                loadImage();

                // Функция вызывается перед стартом загрузки
                function loadStart() {

                    text.setText("Loading ...");

                }

                // Функция выполняется во время загрузки и показывает процент
                function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
                    text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
                }

                // Функция вызывается после окончания загрузки
                function loadComplete() {
                    text.setText("Load Complete");
                    // Отображаем на поле загруженные изображения
                    addImage();

                    // Убираем фон после загрузки поля игры
                    $('#load').fadeOut(1500);

                    // Задержка перед перемешиванием
                    setTimeout(player.peremeshka, 3000);
                }
            },
        });
    },
}

