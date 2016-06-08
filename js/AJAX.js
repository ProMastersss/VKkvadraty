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

    getDataUser: function (p, id) {
        jQuery.ajax({
            url: p.urlUser,
            async: true,
            crossDomain: true,
            data: { uid: id },
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                data = JSON.parse(data);
                console.log(data);
                p.level = parseInt(data.level);
                p.money = parseInt(data.money);
                p.days = parseInt(data.days);
                p.timesDays = parseInt(data.times);
                createText();
            },
        });
    },

    saveData: function (p) {
    	console.log(p, "Сохранение");
        jQuery.ajax({
            url: p.urlSave,
            async: true,
            crossDomain: true,
            data: { id: p.uid, level: p.level, money: p.money, days: p.days},
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
            },
        });
    },
    
    saveTimes: function (p) {
    	console.log(p, "Сохранение времени");
        jQuery.ajax({
            url: p.urlSaveTimes,
            async: true,
            crossDomain: true,
            data: { id: p.uid, times: p.timesDays, days: p.days},
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
            },
        });
    },
}

