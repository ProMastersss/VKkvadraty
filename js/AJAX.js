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

    getDataUser: function (player, id) {
        jQuery.ajax({
            url: player.urlUser,
            async: true,
            crossDomain: true,
            data: { uid: id },
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                data = JSON.parse(data);
                player.level = data.level;
                player.money = data.money;
                player.days = data.days;
                player.timesDays = data.times;
            },
        });
    },

    saveData: function (player) {
        jQuery.ajax({
            url: player.urlSave,
            async: true,
            crossDomain: true,
            data: { id: player.id, money: player.money, days: player.days, times: player.timesDays},
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
            },
        });
    },
}

