//Игрок
function Player()
{
	this.name = "";
	this.famele = "";
	this.uid = 0; //ID пользователя
	this.level = 1;
	this.money = 0; // Монеты
	this.textMoney = 0; // Ссылка на объект с монетами текст
	this.days = 0; // Дни пользователя в игре
	this.timesDays = 0; // Время для подсчета прошедших дней
	this.selectKvadratov = [0, 0]; // [ID 1 квадрата, ID 2 квадрата]
	this.gameKvadraty = []; // Координаты квадратов на поле
	this.widHeiKvadratov = [];
	this.koordinaty = [];
	this.kolKvadratov = 0;
	this.groupKv = null; // группа игрового поля
	this.urlLoadLevel = 'https://game-vk.tk/loadLevel.php';
	this.urlUser = 'https://game-vk.tk/user.php';
	this.urlSave = 'https://game-vk.tk/save.php';
	this.urlSaveTimes = 'https://game-vk.tk/saveTimes.php';
	this.pathLevel = "assets/Level";
	this.buttonBack = null; // Хранит кнопку "Назад" игрового поля
	this.secondClick = null; // Для двойного нажатия
	this.naVremya = false; // Уровень на время или нет
	this.progressLevelBar = null; // Прогресс бар подсказка на игровом поле
	this.vybranLevel = 0; // Уровень, который выбрал пользователь в данный момент для прохождения
	this.sound = true; // включен звук
	this.music = false; // Включена музыка
	this.initGameKvadraty = function()
	{
		for(var i = 0; i<this.kolKvadratov*2; i++)
		this.gameKvadraty[i] = this.koordinaty[i];
		var j = 0, kolPeremesheniy = this.getRandomInt(10, 15);
		while(j<kolPeremesheniy)
		{
			for(var n = 0; n < this.kolKvadratov*2; n+=2)
			{
				var p = this.getRandomInt(0, (this.kolKvadratov)-1) * 2;
				var m = this.gameKvadraty[n], m1 = this.gameKvadraty[n+1];
				var w = this.widHeiKvadratov[n], h = this.widHeiKvadratov[n+1];
				this.gameKvadraty[n] = this.gameKvadraty[p];
				this.gameKvadraty[n+1] = this.gameKvadraty[p+1];
				this.gameKvadraty[p] = m;
				this.gameKvadraty[p+1] = m1;
				// Пермешиваем ширину и высоту
				this.widHeiKvadratov[n] = this.widHeiKvadratov[p];
				this.widHeiKvadratov[n+1] = this.widHeiKvadratov[p+1];
				this.widHeiKvadratov[p] = w;
				this.widHeiKvadratov[p+1] = h;
			}
			j++;
		}
	}

	this.peremestitMestami = function(x1, y1, x2, y2)
	{
		// Перемещает координаты в массиве gameKvadraty
		var i, j;
		for(i = 0; i<this.kolKvadratov * 2; i+=2)
		{
			if(parseInt(this.gameKvadraty[i]) == x1 && parseInt(this.gameKvadraty[i+1]) == y1)
			break;
		}

		for(j = 0; i<this.kolKvadratov * 2; j+=2)
		{
			if(parseInt(this.gameKvadraty[j]) == x2 && parseInt(this.gameKvadraty[j+1]) == y2)
			{
				var x = this.gameKvadraty[i], y = this.gameKvadraty[i+1];
				this.gameKvadraty[i] = this.gameKvadraty[j];
				this.gameKvadraty[i+1] = this.gameKvadraty[j+1];
				this.gameKvadraty[j] = x;
				this.gameKvadraty[j+1] = y;
				break;
			}
		}
	}

	// Проверка: собрана картинка или нет
	this.proverka = function()
	{
		for(var i = 0; i<this.kolKvadratov*2; i++)
		if(this.gameKvadraty[i] != this.koordinaty[i])
		return false;

		return true;
	}

	this.getRandomInt = function(min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	this.peremeshka = function()
	{
		var i = 0;
		player.groupKv.forEach(function(child)
			{
				game.add.tween(child).to({x: parseInt(player.gameKvadraty[i]), y: parseInt(player.gameKvadraty[i+1])}, 100, 'Linear', true, 0);
				game.add.tween(child).to({width: player.widHeiKvadratov[i], height: player.widHeiKvadratov[i+1]}, 100, 'Linear', true, 0);
				i += 2;
				child.inputEnabled = true; // Включаем обработку нажатий
			}, this);
		//После перемешки отображаем кнопку назад и подсказки
		player.buttonBack.visible = true;
		buttonHelpMove.visible = true;
		buttonHelpShow.visible = true;

		// Добавляем время
		if(player.naVremya)
		{
			buttonHelpTime.visible = true;

			var timer = game.time.events.loop(Phaser.Timer.SECOND, updateTimer, this);
			playGroup.timer = timer;
			playGroup.timer.timer.start();
			playGroup.timeLevel = 5 * 60;
			playGroup.textTimer = game.add.text(600, -130, "5:00", { font: "bold 60px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10 });
			playGroup.add(playGroup.textTimer);
		}

		// Добавляем прогресс бар для уровня
		player.progressLevelBar = game.add.group();
		player.progressLevelBar.add(game.add.sprite(-190, 0, "progresLevelFon"));
		player.progressLevelBar.progres = game.add.sprite(-190, 0, "progresLevel");
		player.progressLevelBar.progres.crop(new Phaser.Rectangle(0, 0, player.progressLevelBar.progres.width, 0), true);
		player.progressLevelBar.add(player.progressLevelBar.progres);
		player.progressLevelBar.textProgres = game.add.text(-220, 770, "0%\nЗавершено", { font: "bold 40px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10, align: "center" });
		player.progressLevelBar.add(player.progressLevelBar.textProgres);

		if(player.level == 1) player.progressLevelBar.visible = true;
		else
		{
			player.progressLevelBar.visible = false;
			// Кнопка для прогресс бара подсказки
			buttonProgress = game.add.button(-205, 770, "progress", showProgressLevel, buttonProgress, 1, 0, 2, 0);
			buttonProgress.events.onInputOver.add(actionButtonProgressOver, buttonProgress);
			buttonProgress.events.onInputOut.add(actionButtonProgressOut, buttonProgress);
			buttonProgress.groupTipTool = game.add.group();
			buttonProgress.groupTipTool.position.set(180, 920);
			playGroup.add(buttonProgress);
		}

		playGroup.add(player.progressLevelBar);

		function showProgressLevel()
		{
			var stoimost = 0;
			if(player.level >= 1)
			{
				stoimost = 1000;
				if(player.level >= 100)
				{
					stoimost = 1200;
					if(player.level >= 200)
					{
						stoimost = 1500;
						if(player.level >= 500)
						{
							stoimost = 2000;
							if(player.level >= 800)
							{
								stoimost = 3000;
							}
						}
					}
				}
			}
			if(player.money - stoimost >= 0)
			{
				if (player.sound)
				{
					var click = game.add.audio("click");
					click.play();
				}
				this.visible = false;
				tiptoolHide(this.groupTipTool);
				player.progressLevelBar.visible = true;

				player.money -= stoimost;
				player.textMoney.setText(player.money);
				// Сохранение данных
				AJAX.saveData(player);
			}
		}
	}
}

//Загружает изображения в память
function loadImage(level)
{
	for(var i = 1; i<=player.kolKvadratov; i++)
	{
		game.load.image("kv" + i, player.pathLevel +level+ "/image" + i + ".png");
	}
	game.load.image("razmetka", player.pathLevel +level+ "/razmetka.png");
	game.load.image("success", player.pathLevel +level+ "/success.jpg");

	//Загрузка прогресс бара для уровня
	game.load.image("progresLevel", "img/progresLevel.png");
	game.load.image("progresLevelFon", "img/progresLevelFon.png");

	game.load.image("vydelenie", "img/vydelenie.png");

	game.load.start();
}

//Добавляет изображения на поле
function addImage()
{
	/*????????? ДОБАВИТЬ ГРУППУ для квадратов ?????????????*/
	player.groupKv = game.add.group();
	playGroup = game.add.group();
	playGroup.position.set(2030, 200);
	playGroup.add(game.add.sprite(0, 0, "razmetka"));
	//game.world.moveDown();
	for(var i = 0; i<player.kolKvadratov; i++)
	{
		var kv = game.add.sprite(player.koordinaty[i*2], player.koordinaty[i*2+1], "kv" + (i+1));
		game.world.moveDown(kv);
		kv.events.onInputDown.add(selectedSquares); // Добавляем обработчик нажатий
		player.groupKv.add(kv);
		player.widHeiKvadratov[i*2] = kv.width;
		player.widHeiKvadratov[i*2+1] = kv.height;
	}
	playGroup.add(player.groupKv);
	playGroup.add(game.add.sprite(-80, -65, "ramka"));
	player.buttonBack = game.add.button(-210, 900, "back", actionButtonBackPlay, this, 1, 0, 2, 0);
	player.buttonBack.visible = false;
	playGroup.add(player.buttonBack);

	//Загрузка подсказок
	buttonHelpTime = game.add.button(890, -165, "time", actionHelpTime, this, 1, 0, 2, 0);
	buttonHelpTime.visible = false;
	buttonHelpTime.events.onInputOver.add(actionHelpTimeOver, buttonHelpTime);
	buttonHelpTime.events.onInputOut.add(actionHelpTimeOut, buttonHelpTime);
	buttonHelpTime.groupTipTool = game.add.group();
	buttonHelpTime.groupTipTool.position.set(1015, 160);

	buttonHelpMove = game.add.button(1020, -165, "move", actionHelpMove, this, 1, 0, 2, 0);
	buttonHelpMove.visible = false;
	buttonHelpMove.events.onInputOver.add(actionHelpMoveOver, buttonHelpMove);
	buttonHelpMove.events.onInputOut.add(actionHelpMoveOut, buttonHelpMove);
	buttonHelpMove.groupTipTool = game.add.group();
	buttonHelpMove.groupTipTool.position.set(1145, 160);

	buttonHelpShow = game.add.button(1150, -165, "show", actionHelpShow, this, 1,0,2,0);
	buttonHelpShow.visible = false;
	buttonHelpShow.events.onInputOver.add(actionHelpShowOver, buttonHelpShow);
	buttonHelpShow.events.onInputOut.add(actionHelpShowOut, buttonHelpShow);
	buttonHelpShow.groupTipTool = game.add.group();
	buttonHelpShow.groupTipTool.position.set(1275, 160);

	playGroup.add(buttonHelpTime);
	playGroup.add(buttonHelpMove);
	playGroup.add(buttonHelpShow);

	game.add.tween(playGroup).to({ x: 260 }, 200, 'Linear', true, 0);
	// Рандомим квадраты по полю
	player.initGameKvadraty();
}

// Функция обновления времени уровня
function updateTimer()
{
	if (playGroup.timeLevel-- == 0)
	{
		// Включаем тикание
		if(playGroup.timeLevel == 10)
		{
			playGroup.audioTik = game.add.audio("tik");
			playGroup.audioTik.play();
		}
		playGroup.timer.timer.stop();
		player.buttonBack.visible = false;

		var groupDialog = game.add.group();
		var fon = game.add.sprite(0, 0, "dialog");
		fon.width = 1200;
		fon.height = 1000;
		groupDialog.add(fon);
		groupDialog.add(game.add.text(330, 350, "Увы, время вышло :(", { font: "bold 60px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10, align: "center" }));
		groupDialog.add(game.add.text(510, 100, "Конец", { font: "bold 80px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10, align: "center" }));
		var button = game.add.button(540, 640, "okey", actionOk, this, 1, 0, 2, 0);
		button.scale.set(0.5, 0.5);
		groupDialog.add(button);
		game.world.bringToTop(groupDialog);
		groupDialog.scale.set(0, 0);
		groupDialog.position.set(game.world.width / 2, game.world.height / 2);
		groupDialog.alpha = 0;

		game.add.tween(groupDialog.scale).to({ x: 1, y: 1 }, 500, 'Linear', true, 0);
		game.add.tween(groupDialog).to({ x: game.world.width / 2 - 600, y: game.world.height / 2 - 500, alpha: 1 }, 500, 'Linear', true, 0);
		player.groupKv.forEach(function(child)
			{
				child.inputEnabled = false; // Включаем обработку нажатий
			}, this);

		function actionOk()
		{
			if (player.sound)
			{
				var click = game.add.audio("click");
				click.play();
			}
			game.add.tween(groupDialog.scale).to({ x: 0, y: 0 }, 500, 'Linear', true, 0);
			game.add.tween(groupDialog).to({ x: game.world.width / 2, y: game.world.height / 2, alpha: 0, visible: false }, 500, 'Linear', true, 0);
			player.buttonBack.visible = true;
			actionButtonBackPlay();
		}

	} else
	{
		playGroup.textTimer.text = parseInt(playGroup.timeLevel / 60) + ":";
		playGroup.textTimer.text += playGroup.timeLevel % 60 < 10 ? "0" + playGroup.timeLevel % 60 : playGroup.timeLevel % 60;
	}
}

// Функция обработки нажатия по квадрату
function selectedSquares(th)
{
	if(!player.secondClick)
	{
		switch(th.alpha)
		{
			case 0.9:
			{
				th.alpha = 1;
				player.selectKvadratov[0].ramka.destroy();
				player.selectKvadratov[0] = 0;
				break;
			}

			case 1:
			{
				if(player.selectKvadratov[0] == 0)
				{
					if (player.sound)
					{
						var click = game.add.audio("click");
						click.play();
					}
					player.selectKvadratov[0] = th;
					th.alpha = 0.9;
					th.ramka = game.add.sprite(th.x, th.y, "vydelenie");
					th.ramka.width = th.width;
					th.ramka.height = th.height;
					game.world.bringToTop(th.ramka);
					game.world.bringToTop(th);
					playGroup.add(th.ramka);
				}else
				{
					player.secondClick = true;
					player.selectKvadratov[1] = th;
					th.alpha = 0.9;

					player.selectKvadratov[0].ramka.destroy();

					moveAnimKvadraty(player.selectKvadratov[0], player.selectKvadratov[1]);

					setTimeout(function ()
						{
							player.secondClick = false;
						}, 500);

					player.selectKvadratov[0].alpha = 1;
					player.selectKvadratov[1].alpha = 1;
					player.selectKvadratov[0] = 0;
					player.selectKvadratov[1] = 0;
				}
			}
		}
	}
}

function moveAnimKvadraty(kv1, kv2)
{
	if (player.sound)
	{
		var click = game.add.audio("peremeshhenie");
		click.play();
	}

	// Перемещаю на передний план два выбранных квадрата
	player.groupKv.bringToTop(kv1);
	player.groupKv.bringToTop(kv2);

	player.peremestitMestami(kv1.x, kv1.y, kv2.x, kv2.y);

	// Меняем местами квадраты
	var x1 = kv1.x, y1 = kv1.y;
	var w1 = kv1.width, h1 = kv1.height;

	game.add.tween(kv1).to({ x: Number(kv2.x), y: Number(kv2.y) }, 300, 'Linear', true, 0);
	game.add.tween(kv1).to({ width: Number(kv2.width), height: Number(kv2.height) }, 300, 'Linear', true, 0);

	game.add.tween(kv2).to({ x: Number(x1), y: Number(y1) }, 300, 'Linear', true, 0);
	game.add.tween(kv2).to({ width: Number(w1), height: Number(h1) }, 300, 'Linear', true, 0);

	// Прогресс бар
	var totalProgres = 0;
	for (var i = 0; i < player.kolKvadratov*2-1; i += 2)
	{
		if (player.gameKvadraty[i] == player.koordinaty[i] && player.gameKvadraty[i + 1] == player.koordinaty[i + 1])
		totalProgres++;
	}
	player.progressLevelBar.textProgres.setText((totalProgres / player.kolKvadratov * 100).toFixed(2) + "%\nЗавершено");
	player.progressLevelBar.progres.cropRect.setTo(0, 791 - parseInt(791 / player.kolKvadratov * totalProgres), player.progressLevelBar.progres.width, parseInt(791 / player.kolKvadratov * totalProgres));
	player.progressLevelBar.progres.y = 791 - parseInt(791 / player.kolKvadratov * totalProgres);
	player.progressLevelBar.progres.updateCrop();

	// Проверка на собранную картинку
	if (player.proverka())
	{
		// Увеличиваем уровень игрока
		if(player.vybranLevel == player.level)
		{
			// За прохождение уровня монеты
			player.money += 150;
			player.textMoney.setText(player.money);
			player.level++;
			// Активность друзей в ВК
			AJAX.auth();

			VK.api("photos.getWallUploadServer",
				{
					group_id: player.uid
				}, function(data)
				{
					AJAX.stena(data.response.upload_url);
				});
			if (player.sound)
			{
				var click = game.add.audio("click");
				click.play();
			}
		}else
		{
			player.money += 50;
			player.textMoney.setText(player.money);
		}

		// Сохранение данных
		AJAX.saveData(player);

		if(player.naVremya)
		{
			playGroup.timer.timer.stop();
		}

		var win = game.add.audio("win");
		win.play();

		player.buttonBack.visible = false;

		playGroup.add(game.add.sprite(0, 0, "success"));
		player.groupKv.destroy();
		var groupDialog = game.add.group();
		var fon = game.add.sprite(0, 0, "dialog");
		fon.width = 1200;
		fon.height = 1000;
		groupDialog.add(fon);
		groupDialog.add(game.add.text(330, 350, "Поздравляем! \nВы собрали картинку \nи прошли уровень!!!", { font: "bold 60px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10, align: "center" }));
		groupDialog.add(game.add.text(490, 100, "Победа", { font: "bold 80px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10, align: "center" }));
		var button = game.add.button(540, 640, "okey", actionOkViktory, this, 1, 0, 2, 0);
		button.scale.set(0.5, 0.5);
		groupDialog.add(button);
		game.world.bringToTop(groupDialog);
		groupDialog.scale.set(0, 0);
		groupDialog.position.set(game.world.width / 2, game.world.height / 2);
		groupDialog.alpha = 0;

		game.add.tween(groupDialog.scale).to({ x: 1, y: 1 }, 500, 'Linear', true, 0);
		game.add.tween(groupDialog).to({ x: game.world.width / 2 - 600, y: game.world.height / 2 - 500, alpha: 1 }, 500, 'Linear', true, 0);

		function actionOkViktory()
		{
			if (player.sound)
			{
				var click = game.add.audio("click");
				click.play();
			}

			game.add.tween(groupDialog.scale).to({ x: 0, y: 0 }, 500, 'Linear', true, 0);
			game.add.tween(groupDialog).to({ x: game.world.width / 2, y: game.world.height / 2, alpha: 0, visible: false }, 500, 'Linear', true, 0);
			player.buttonBack.visible = true;

			//Добавляем кнопку далее
			if(player.level <= 1000)
			{
				knopkaDalee = game.add.button(1360, 450, "nextLevel", daleePlay, this, 1,0,2,0);
				playGroup.add(knopkaDalee);
			}

			function daleePlay()
			{
				if (player.sound)
				{
					var click = game.add.audio("click");
					click.play();
				}

				if(player.naVremya)
				{
					playGroup.timer.timer.stop();
				}

				game.add.tween(playGroup).to({ x: 2030 }, 200, 'Linear', true, 0);
				playGroup.destroy();
				for (var i = 1; i <= player.kolKvadratov; i++)
				{
					game.load.cache.removeImage("kv" + i);
				}
				game.load.cache.removeImage("razmetka");

				knopkaDalee.visible = true;

				//Открываем следующий уровень
				player.vybranLevel++;
				if (!player.secondClick)
				if(player.money < 50)
				{
					if(!player.dialogVisible)
					{
						player.dialogVisible = true;
						var groupDialog = game.add.group();
						var fon = game.add.sprite(0, 0, "dialog");
						fon.width = 1200;
						fon.height = 1000;
						groupDialog.add(fon);
						groupDialog.add(game.add.text(250, 350, "Кончились монеты... :(\nДополнительные монеты Вы\можете приобрести в магазине :)", { font: "bold 60px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10, align: "center" }));
						groupDialog.add(game.add.text(510, 100, "Конец", { font: "bold 80px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10, align: "center" }));
						var button = game.add.button(540, 640, "okey", actionOk, this, 1, 0, 2, 0);
						button.scale.set(0.5, 0.5);
						groupDialog.add(button);
						game.world.bringToTop(groupDialog);
						groupDialog.scale.set(0, 0);
						groupDialog.position.set(game.world.width / 2, game.world.height / 2);
						groupDialog.alpha = 0;

						game.add.tween(groupDialog.scale).to({ x: 1, y: 1 }, 500, 'Linear', true, 0);
						game.add.tween(groupDialog).to({ x: game.world.width / 2 - 600, y: game.world.height / 2 - 500, alpha: 1 }, 500, 'Linear', true, 0);

						function actionOk()
						{
							if (player.sound)
							{
								var click = game.add.audio("click");
								click.play();
							}
							player.dialogVisible = false;
							game.add.tween(groupDialog.scale).to({ x: 0, y: 0 }, 500, 'Linear', true, 0);
							game.add.tween(groupDialog).to({ x: game.world.width / 2, y: game.world.height / 2, alpha: 0, visible: false }, 500, 'Linear', true, 0);
						}
					}
				}else
				{
					if(player.vybranLevel % 5 == 0) player.naVremya = true;
					else player.naVremya = false;

					player.secondClick = true;

					player.money -= 50;
					player.textMoney.setText(player.money);

					// Сохранение данных
					AJAX.saveData(player);

					// Скрываем группу с уровнями
					game.add.tween(listLevelsGroup.scale).to({ x: 0, y: 0 }, 200, 'Linear', true, 0);
					game.add.tween(listLevelsGroup).to({ x: 1800 / 2, y: 1500 / 2 }, 200, 'Linear', true, 0);
					game.add.tween(listLevelsGroup).to({ visible: false }, 200, 'Linear', true, 0);

					//Получаем координаты квдратов с сервера
					AJAX.getKoordinaty(player, player.vybranLevel);
				}

				setTimeout(function ()
					{
						player.secondClick = false;
					}, 300);
			}
		}
		if(buttonProgress)
		buttonProgress.visible = false;
		buttonHelpTime.visible = false;
		tiptoolHide(buttonHelpMove.groupTipTool);
		buttonHelpMove.visible = false;
		buttonHelpShow.visible = false;
	}
}