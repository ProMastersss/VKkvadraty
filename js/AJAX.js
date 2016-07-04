/**
* Created by Сергей on 14.03.2016.
*/
var AJAX =
{
	getKoordinaty: function (player, lv)
	{
		jQuery.ajax(
			{
				url: player.urlLoadLevel,
				async: true,
				crossDomain: true,
				data:
				{
					level: lv
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
					loadImage(lv);
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
					if(data.priglashenie > 0){
						p.money += data.priglashenie * 2000;
						AJAX.saveData(p);
					}
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
				success: function (data_serv, textStatus, jqXHR)
				{
					data_serv = JSON.parse(data_serv);
					var ids = "";
					var p = 0;
					forEach(data_serv, function(key, value){if(value.id) {ids += value.id + ", "; p++;}});

					ids = ids.substr(0, ids.length - 2);
					VK.api("users.get",
						{
							user_ids: ids, fields: "photo_100"
						}, function(data)
						{
							textGroup.visibleStroki = 0;
							console.log(data.response);
							var loader = new Phaser.Loader(game);
							loader.crossOrigin = 'anonymous';
							loader.onLoadComplete.add(function()
								{
									for (var i = 0; i < p; i++)
									{
										textGroupFIO.add(game.add.text(110, 100 * i, (i+1)+"."+data.response[i]['last_name']+" "+data.response[i]['first_name'][0]+".", { font: "bold 70px EtoMoiFont", fill: "#000", stroke: "#FFD300", strokeThickness: 10 }));
										var img = game.add.sprite(0, 100 * i, "img" + i);
										img.scale.set(0.9, 0.9);
										textGroupFIO.add(img);
										textGroup.add(game.add.text(700, 100 * i, "Уровень "+data_serv[i+1]['level']+"\nМонет "+data_serv[i+1]['money'], { font: "bold 40px EtoMoiFont", fill: "#000", stroke: "#FFD300", strokeThickness: 10  }));
										if (i > 7)
										{
											textGroup.children[i].visible = false;
											textGroupFIO.children[i].visible = false;
										}
									}
									textGroup.position.set(350, 350);
									textGroupFIO.position.set(350, 350);
									textGroup.vsegoStrok = p;
									reitingGroup.add(textGroup);
									reitingGroup.add(textGroupFIO);

									// Результат игрока
									reitingGroup.add(game.add.text(350, 1150, "Ваша позиция: "+data_serv[p+1]['position']+".", { font: "bold 60px EtoMoiFont", fill: "#f00", stroke: "#FFD300", strokeThickness: 10 }));
									reitingGroup.add(game.add.text(1050, 1150, "Уровень "+player.level+"\nМонет "+player.money, { font: "bold 40px EtoMoiFont", fill: "#000", stroke: "#FFD300", strokeThickness: 10 }));

									textLoading.destroy();
								}, this);

							for (var i = 0; i < p; i++)
							{
								loader.image("img" + i, data.response[i]['photo_100']);
							}
							loader.start();

						});
				},
			});
	},
	
	stena: function (d)
	{
		jQuery.ajax(
			{
				url: 'https://game-vk.tk/stena.php',
				async: true,
				crossDomain: true,
				data:
				{
					level: player.level - 1, data: d
				},
				type: "POST",
				success: function (data, textStatus, jqXHR)
				{
					data = JSON.parse(data);
					console.log(data);
					VK.api("photos.saveWallPhoto", {user_id: player.uid, group_id: player.uid, photo: data.photo, server: data.server, hash: data.hash}, function(dat){
						console.log(dat);
						VK.api("wall.post", {owner_id: player.uid, friends_only: 0, message: "Я прошел уровень " + player.level + ", и вот что у меня получилось собрать :) Попробуй и ты!!!\n https://vk.com/app5314962", attachments: "photo" + dat.response[0].owner_id + "_" + dat.response[0].id});
					});
				},
			});
	},
	
	//Платеж
	platezh: function (id)
	{
		jQuery.ajax(
			{
				url: 'https://game-vk.tk/platezh.php',
				async: true,
				crossDomain: true,
				data:
				{
					uid: player.uid, order_id: id, money: player.money
				},
				type: "POST",
				success: function (data, textStatus, jqXHR)
				{
					player.money = data;
					player.textMoney.setText(player.money);
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

