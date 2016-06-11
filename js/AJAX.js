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

    getDataUser: function (p, id, priglashenie) {
        jQuery.ajax({
            url: p.urlUser,
            async: true,
            crossDomain: true,
            data: { uid: id, priglasil: priglashenie},
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                data = JSON.parse(data);
                p.level = parseInt(data.level);
                p.money = parseInt(data.money);
                p.days = parseInt(data.days);
                p.timesDays = parseInt(data.times);
                createText();
            },
        });
    },

    saveData: function (p) {
        jQuery.ajax({
            url: p.urlSave,
            async: true,
            crossDomain: true,
            data: { id: p.uid, level: p.level, money: p.money, days: p.days},
            type: "POST",
            success: function (data, textStatus, jqXHR) {
                
            },
        });
    },
    
    saveTimes: function (p) {
        jQuery.ajax({
            url: p.urlSaveTimes,
            async: true,
            crossDomain: true,
            data: { id: p.uid, times: p.timesDays, days: p.days},
            type: "POST",
            success: function (data, textStatus, jqXHR) {
            	
            },
        });
    },
    
    getDataFriends: function (uid, foto) {
        jQuery.ajax({
            url: 'https://game-vk.tk/getDataFriends.php',
            async: true,
            crossDomain: true,
            data: { id: uid},
            type: "POST",
            success: function (data, textStatus, jqXHR) {
            	data = JSON.parse(data);
            	var html = $('#carousel').html();
				$('#carousel').html('<li class="current-img" data-preview="'+foto+'"><a href="#" class="tip" title="Уровень '+data.level+'; Монет '+data.money+'"><img src="'+foto+'"/></a></li>' + html);
            },
        });
    },
}

