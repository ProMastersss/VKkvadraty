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

                progressBarFon.visible = true;
                progressBar.visible = true;
                game.world.bringToTop(progressBarFon);
                game.world.bringToTop(progressBar);

                //Загружаем изображения
                loadImage();
            },
        });
    },
}

