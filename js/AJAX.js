/**
 * Created by Сергей on 14.03.2016.
 */
var progressBar, progressBarFon;
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
                var text = game.add.text(32, 32, '0%', { fill: '#ffffff' });
                game.load.onLoadStart.add(loadStart, this);
                game.load.onFileComplete.add(fileComplete, this);
                game.load.onLoadComplete.add(loadComplete, this);

                var progressBar = game.add.sprite(game.world.centerX, game.world.centerY, 'loading');
                progressBarFon = game.add.sprite(300, 600, 'fonLoad');
                game.world.moveDown(progressBarFon)
                progressBar.position.set(300, 600);
                game.load.setPreloadSprite(progressBar);

                //Загружаем изображения
                loadImage();

                // Функция вызывается перед стартом загрузки
                function loadStart() {

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

                    // Задержка перед перемешиванием
                    setTimeout(player.peremeshka, 3000);

                    progressBar.visible = false;
                    progressBarFon.visible = false;
                }
            },
        });
    },
}

