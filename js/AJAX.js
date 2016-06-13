/**
* Created by Сергей on 14.03.2016.
*/
var AJAX =
{
	getKoordinaty: function (player)
	{
		jQuery.ajax(
			{
				url: player.urlLoadLevel,
				async: true,
				crossDomain: true,
				data:
				{
					level: player.level
				},
				type: "POST",
				success: function (data, textStatus, jqXHR)
				{
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

	getDataUser: function (p, id, priglashenie)
	{
		jQuery.ajax(
			{
				url: p.urlUser,
				async: true,
				crossDomain: true,
				data:
				{
					uid: id, priglasil: priglashenie
				},
				type: "POST",
				success: function (data, textStatus, jqXHR)
				{
					data = JSON.parse(data);
					p.level = parseInt(data.level);
					p.money = parseInt(data.money);
					p.days = parseInt(data.days);
					p.timesDays = parseInt(data.times);
					createText();
				},
			});
	},

	saveData: function (p)
	{
		jQuery.ajax(
			{
				url: p.urlSave,
				async: true,
				crossDomain: true,
				data:
				{
					id: p.uid, level: p.level, money: p.money, days: p.days
				},
				type: "POST",
				success: function (data, textStatus, jqXHR)
				{

				},
			});
	},

	saveTimes: function (p)
	{
		jQuery.ajax(
			{
				url: p.urlSaveTimes,
				async: true,
				crossDomain: true,
				data:
				{
					id: p.uid, times: p.timesDays, days: p.days
				},
				type: "POST",
				success: function (data, textStatus, jqXHR)
				{

				},
			});
	},

	getDataFriends: function (uid, foto)
	{
		jQuery.ajax(
			{
				url: 'https://game-vk.tk/getDataFriends.php',
				async: true,
				crossDomain: true,
				data:
				{
					id: uid
				},
				type: "POST",
				success: function (data, textStatus, jqXHR)
				{
					data = JSON.parse(data);
					var html = $('#carousel').html();
					$('#carousel').html('<li class="current-img" data-preview="'+foto+'"><a href="#" class="tip" title="Уровень '+data.level+'; Монет '+data.money+'"><img src="'+foto+'"/></a></li>' + html);
				},
			});
	},

	getReyting: function (textGroup, textLoading, textGroupFIO)
	{
		jQuery.ajax(
			{
				url: 'https://game-vk.tk/reyting.php',
				async: true,
				crossDomain: true,
				data:
				{
					id: player.uid
				},
				type: "POST",
				success: function (data, textStatus, jqXHR)
				{
					data = JSON.parse(data);
					var ids = "";
					var p = 0;
					forEach(data, function(key, value){console.log(value); if(value.id) {ids += value.id + ", "; p++;}});

					ids = ids.substr(0, ids.length - 2);
					VK.api("users.get",
						{
							user_ids: ids, fields: "photo_100"
						}, function(data)
						{
							textGroup.visibleStroki = 0;
							
							var loader = new Phaser.Loader(game);
							loader.onLoadStart.add(function()
								{
									console.log("Тут");
									for (var i = 0; i < p; i++)
									{
										game.load.image("img" + i, data.response[i]['photo_100']);
									}
									loader.start();
								}, this);

							game.load.onLoadComplete.add(function()
								{
									console.log("Тут");
									for (var i = 0; i < p; i++)
									{
										textGroupFIO.add(game.add.text(150, 100 * i, "50.Бобриков А.", { font: "bold 70px EtoMoiFont", fill: "#000" }));
										textGroupFIO.add(game.add.sprite(-150, 100 * i, "img" + i));
										textGroup.add(game.add.text(700, 100 * i, "Уровень 1000\nМонет 100000", { font: "bold 40px EtoMoiFont", fill: "#000" }));
										if (i > 7)
										{
											textGroup.children[i].visible = false;
											textGroupFIO.children[i].visible = false;
										}
									}
									textGroup.position.set(350, 350);
									textGroupFIO.position.set(350, 350);
									reitingGroup.add(textGroup);
									reitingGroup.add(textGroupFIO);

									// Результат игрока
									reitingGroup.add(game.add.text(350, 1150, "Текст игрока", { font: "bold 80px EtoMoiFont", fill: "#f00" }));

									textLoading.destroy();
								}, this);
						});
				},
			});
	},
}

function forEach(data, callback)
{
	for(var key in data)
	{
		if(data.hasOwnProperty(key))
		{
			callback(key, data[key]);
		}
	}
}

