// Нажатие по подсказке "Время"
function actionHelpTime()
{
	if(player.money - 500 >= 0)
	{
		if (player.sound)
		{
			var click = game.add.audio("click");
			click.play();
		}

		// Выключаем тикание
		if(playGroup.audioTik)
		playGroup.audioTik.stop();

		playGroup.timeLevel += 300;
		player.money -= 500;
		player.textMoney.setText(player.money);

		// Сохранение данных
		AJAX.saveData(player);
	}
}

// Нажатие по подсказке "Переместить"
function actionHelpMove()
{
	if(player.money - 400 >= 0)
	{
		if (player.sound)
		{
			var click = game.add.audio("click");
			click.play();
		}

		var index = (player.getRandomInt(0, player.kolKvadratov - 1)) * 2;
		while (player.gameKvadraty[index] == player.koordinaty[index] && player.gameKvadraty[index + 1] == player.koordinaty[index + 1])
		{
			index = (player.getRandomInt(0, player.kolKvadratov - 1)) * 2;
		}

		var kv1, kv2;
		player.groupKv.forEach(function (child)
			{
				if (child.x == player.gameKvadraty[index] && child.y == player.gameKvadraty[index + 1])
				kv1 = child;
				if (child.x == player.koordinaty[index] && child.y == player.koordinaty[index + 1])
				kv2 = child;
			}, this, true);

		moveAnimKvadraty(kv1, kv2);

		player.money -= 400;
		player.textMoney.setText(player.money);

		// Сохранение данных
		AJAX.saveData(player);
	}
}

// Нажатие по подсказке "Показать"
function actionHelpShow()
{
	if(player.money - 200 >= 0)
	{
		if (player.sound)
		{
			var click = game.add.audio("click");
			click.play();
		}

		var succes = game.add.sprite(0, 0, "success");
		playGroup.add(succes);
		game.time.events.add(5000, function ()
			{
				succes.visible = false;
				playGroup.removeChild(succes);
			});

		player.money -= 200;
		player.textMoney.setText(player.money);
		// Сохранение данных
		AJAX.saveData(player);
	}
}

// Нажатие по кнопки "FullScreen"
function actionFullScreen()
{
	if (player.sound)
	{
		var click = game.add.audio("click");
		click.play();
	}

	if (buttonFullScreen.fullScreen)
	{
		game.scale.stopFullScreen();
		buttonFullScreen.loadTexture("fullScreen", 0);
	} else
	{
		game.scale.startFullScreen();
		buttonFullScreen.loadTexture("outFullScreen", 0);
	}
	buttonFullScreen.fullScreen = !buttonFullScreen.fullScreen;
}

// Нажатие по кнопки "Магаз"
function actionButtonMagaz()
{
	if (player.sound)
	{
		var click = game.add.audio("click");
		click.play();
	}

	mainDisplayGroup.visible = false;
	game.world.bringToTop(magazGroup);
	magazGroup.position.set(game.world.width / 2, game.world.height / 2);
	magazGroup.alpha = 0;
	magazGroup.visible = true;
	game.add.tween(magazGroup.scale).to({ x: 1, y: 1 }, 500, 'Linear', true, 0);
	game.add.tween(magazGroup).to({ x: 0, y: 0, alpha: 1 }, 500, 'Linear', true, 0);
}

// Кнопка назад из магазина
function actionBackClickMagaz()
{
	if (player.sound)
	{
		var click = game.add.audio("click");
		click.play();
	}

	mainDisplayGroup.visible = true;
	game.add.tween(magazGroup.scale).to({ x: 0, y: 0 }, 500, 'Linear', true, 0);
	game.add.tween(magazGroup).to({ x: game.world.width / 2, y: game.world.height / 2, alpha: 0 }, 500, 'Linear', true, 0);
	game.add.tween(magazGroup).to({ visible: false }, 200, 'Linear', true, 0);
}

// Нажатие по кнопки "Уровни"
function actionButtonLevels()
{
	if (player.sound)
	{
		var click = game.add.audio("click");
		click.play();
	}

	// Анимация перехода
	game.add.tween(mainDisplayGroup).to({ x: -1800 }, 200, 'Linear', true, 0);
	game.add.tween(listLevelsGroup).to({ x: 0 }, 200, 'Linear', true, 0);
	if (game.naFone == 1)
	{
		levelsGroup2.visible = true;
	} else
	{
		levelsGroup.visible = true;
	}
}

// Нажатие по кнопке "Рейтинг"
function actionButtonReiting()
{
	if (player.sound)
	{
		var click = game.add.audio("click");
		click.play();
	}

	// Показать рейтинг игроков
	mainDisplayGroup.visible = false;

	reitingGroup = game.add.group();

	reitingGroup.add(game.add.sprite(0, 0, "dialog"));
	reitingGroup.add(game.add.text(720, 150, "Рейтинг", { font: "bold 120px EtoMoiFont", fill: "#FFD300", stroke: "#000000", strokeThickness: 10 }));

	// Добавление строк в рейтинг
	var textGroup = game.add.group();
	var textGroupFIO = game.add.group();
	var textLoading = game.add.text(650, 630, "Загрузка...", { font: "bold 120px EtoMoiFont", fill: "#FFD300", stroke: "#000000", strokeThickness: 10});
	reitingGroup.add(textLoading);

	// получаем рейтинг
	AJAX.getReyting(textGroup, textLoading, textGroupFIO);

	// Добавляем кнопки вверх вниз
	var upButton = game.add.button(1300, 350, "up", upStrelka, this);
	var downButton = game.add.button(1300, 990, "down", downStrelka, this);
	reitingGroup.add(upButton);
	reitingGroup.add(downButton);

	var backRules = game.add.button(50, 1100, "back", actionBackClickReiting, this, 1, 0, 2, 0);
	reitingGroup.add(backRules);
	reitingGroup.scale.set(0, 0);
	reitingGroup.visible = false;
	game.world.bringToTop(reitingGroup);
	reitingGroup.position.set(game.world.width / 2, game.world.height / 2);
	reitingGroup.alpha = 0;
	reitingGroup.visible = true;
	game.add.tween(reitingGroup.scale).to({ x: 1, y: 1 }, 500, 'Linear', true, 0);
	game.add.tween(reitingGroup).to({ x: 0, y: 0, alpha: 1 }, 500, 'Linear', true, 0);

	function actionBackClickReiting()
	{
		if (player.sound)
		{
			var click = game.add.audio("click");
			click.play();
		}


		game.add.tween(reitingGroup.scale).to({ x: 0, y: 0 }, 500, 'Linear', true, 0);
		game.add.tween(reitingGroup).to({ x: game.world.width / 2, y: game.world.height / 2, alpha: 0 }, 500, 'Linear', true, 0);
		game.add.tween(reitingGroup).to({ visible: false }, 200, 'Linear', true, 0);
		setTimeout(function () { reitingGroup.destroy(), mainDisplayGroup.visible = true; }, 500);
	}

	function upStrelka()
	{
		var kolStrok = 8; // Количество видимых строк

		if (textGroup.visibleStroki > 0)
		{
			textGroup.y += 100;
			textGroup.children[textGroup.visibleStroki - 1].visible = true;
			textGroup.children[textGroup.visibleStroki + kolStrok - 1].visible = false;
			textGroupFIO.y += 100;
			textGroupFIO.children[textGroup.visibleStroki - 1].visible = true;
			textGroupFIO.children[textGroup.visibleStroki + kolStrok - 1].visible = false;
			textGroup.visibleStroki--;
		}
	}

	function downStrelka()
	{
		var kolStrok = 8; // Количество видимых строк

		if (textGroup.visibleStroki + kolStrok - 1 < textGroup.vsegoStrok - 1)
		{
			// < всего - 1
			textGroup.y -= 100;
			textGroup.children[textGroup.visibleStroki].visible = false;
			textGroup.children[textGroup.visibleStroki + kolStrok].visible = true;
			textGroupFIO.y -= 100;
			textGroupFIO.children[textGroup.visibleStroki].visible = false;
			textGroupFIO.children[textGroup.visibleStroki + kolStrok].visible = true;
			textGroup.visibleStroki++;
		}
	}
}

// Нажатие по кнопки "Правила"
function actionButtonRules()
{
	if (player.sound)
	{
		var click = game.add.audio("click");
		click.play();
	}

	mainDisplayGroup.visible = false;
	game.world.bringToTop(rulesGroup);
	rulesGroup.position.set(game.world.width / 2, game.world.height / 2);
	rulesGroup.alpha = 0;
	rulesGroup.visible = true;
	game.add.tween(rulesGroup.scale).to({ x: 1, y: 1 }, 500, 'Linear', true, 0);
	game.add.tween(rulesGroup).to({ x: 0, y: 0, alpha: 1 }, 500, 'Linear', true, 0);
}

// Кнопка "Назад" в группе rulesGroup
function actionBackClickRules()
{
	if (player.sound)
	{
		var click = game.add.audio("click");
		click.play();
	}

	mainDisplayGroup.visible = true;
	game.add.tween(rulesGroup.scale).to({ x: 0, y: 0 }, 500, 'Linear', true, 0);
	game.add.tween(rulesGroup).to({ x: game.world.width / 2, y: game.world.height / 2, alpha: 0 }, 500, 'Linear', true, 0);
	game.add.tween(rulesGroup).to({ visible: false }, 200, 'Linear', true, 0);
}

// Клик по кнопке "Настройи", анимация показа настроек
function actionSettingClick()
{
	if (player.sound)
	{
		var click = game.add.audio("click");
		click.play();
	}

	if (this.hidden)
	{
		game.add.tween(this).to({ y: 0 }, 200, 'Linear', true, 0);
		this.hidden = false;
	} else
	{
		game.add.tween(this).to({ y: 330 }, 200, 'Linear', true, 0);
		this.hidden = true;
	}
}

// Клик по кнопке "Музыки"
function actionMusicClick()
{
	player.music = !player.music;
	// Музыка
	if (player.music)
	{
		muzica.play();
	}else
	{
		muzica.stop();
	}
}

// Клик по кнопке "Звук"
function actionSoundClick()
{
	player.sound = !player.sound;
}

// Клик по кнопке "Назад", вернуть на предыдущий экран
function actionBackClick()
{
	if (player.sound)
	{
		var click = game.add.audio("click");
		click.play();
	}

	// Анимация перехода
	game.add.tween(mainDisplayGroup).to({ x: 0 }, 200, 'Linear', true, 0);
	game.add.tween(listLevelsGroup).to({ x: 1800 }, 200, 'Linear', true, 0);
	if (game.naFone == 1)
	{
		levelsGroup2.visible = false;
	} else
	{
		levelsGroup.visible = false;
	}
}

// Нажатие на оранжевом блоке(уровне), который далее нужно пройти
function upLevels()
{
	if (player.sound)
	{
		var click = game.add.audio("click");
		click.play();
	}

    player.vybranLevel = this.text;
    
	if (!player.secondClick && this.text <= player.level)
	{
		if(player.vybranLevel % 5 == 0) player.naVremya = true;
		else player.naVremya = false;

		player.secondClick = true;

		// Скрываем группу с уровнями
		game.add.tween(listLevelsGroup.scale).to({ x: 0, y: 0 }, 200, 'Linear', true, 0);
		game.add.tween(listLevelsGroup).to({ x: 1800 / 2, y: 1500 / 2 }, 200, 'Linear', true, 0);
		game.add.tween(listLevelsGroup).to({ visible: false }, 200, 'Linear', true, 0);

		//Получаем координаты квдратов с сервера
		AJAX.getKoordinaty(player, this.text);
	}
	setTimeout(function ()
		{
			player.secondClick = false;
		}, 300);
}

// Клик по кнопке со стрелочкой назад, для прокрутки списка назад
function backLevels()
{
	if (game.number - 40 > 0)
	{
		if (player.sound)
		{
			var click = game.add.audio("listat");
			click.play();
		}
		game.number -= 40;
		animaciaLevels(-1200, 1800, 300);
	}
}

// Кнопка "назад" из игрового поля
function actionButtonBackPlay()
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

	levelsGroup.destroy();
	levelsGroup2.destroy();

	initLevelsGroup();

	game.add.tween(playGroup).to({ x: 2030 }, 200, 'Linear', true, 0);
	game.add.tween(listLevelsGroup).to({ visible: true }, 200, 'Linear', true, 0);
	game.add.tween(listLevelsGroup.scale).to({ x: 1, y: 1 }, 200, 'Linear', true, 0);
	game.add.tween(listLevelsGroup).to({ x: 0, y: 0 }, 200, 'Linear', true, 0);
	playGroup.destroy();
	for (var i = 1; i <= player.kolKvadratov; i++)
	{
		game.load.cache.removeImage("kv" + i);
	}
	game.load.cache.removeImage("razmetka");
}

// Клик по кнопке со стрелочкой вперед, для прокрутки списка вперед
function nextLevels()
{

	if (game.number < 1001)
	{
		if (player.sound)
		{
			var click = game.add.audio("listat");
			click.play();
		}
		animaciaLevels(1800, -1200, 300);
	}
}

// Функция инициализации всплывающих окон
function tiptoolShow(group, text, key)
{
	group.add(game.add.sprite(0, 0, key));
	group.add(game.add.text(30, 30, text, { font: "bold 50px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10 }));
	group.visible = true;
}

// Рисуем список уровней
function initLevelsGroup()
{
	levelsGroup = game.add.group(), levelsGroup2 = game.add.group();

	// Загрузка списка уровней
	game.number = parseInt(player.level/20)*20 + 1; // С какого уровня при анимации рисовать на оранжевых квадратах
	game.naFone = 1; // levelsGroup или levelsGroup2 на фоне(на виду)
	loadingListLevels(levelsGroup, 300, 200, game.number);
	loadingListLevels(levelsGroup2, 1800, 200, game.number);
	game.number += 20;

	// Добавляем в основную группу listLevelsGroup
	listLevelsGroup.add(levelsGroup);
	listLevelsGroup.add(levelsGroup2);
}

//Функция скрытия всплывающего окна
function tiptoolHide(group)
{
	group.visible = false;
}

function actionHelpTimeOver()
{
	tiptoolShow(this.groupTipTool, "Добавить время\nСтоимость: 500", "tiptool");
}

function actionHelpTimeOut()
{
	tiptoolHide(this.groupTipTool);
}

function actionHelpMoveOver()
{
	tiptoolShow(this.groupTipTool, "Переместить\nслучайный пазл\nСтоимость: 400", "tiptool");
}

function actionHelpMoveOut()
{
	tiptoolHide(this.groupTipTool);
}

function actionHelpShowOver()
{
	tiptoolShow(this.groupTipTool, "Показать готовую\nкартинку\nСтоимость: 200", "tiptool");
}

function actionHelpShowOut()
{
	tiptoolHide(this.groupTipTool);
}

function actionButtonProgressOver()
{
	tiptoolShow(this.groupTipTool, "Показать\nпрогресс игры\nСтоимость: 1000", "tiptoolProgress");
}

function actionButtonProgressOut()
{
	tiptoolHide(this.groupTipTool);
}

//По нажатию кнопки "Купить" в магазе
function actionButtonKupit()
{
	if (buttonFullScreen.fullScreen){
		actionFullScreen();	
	}
	
	var params =
	{
		type: 'item',
		item: '1000monet'
	};
	VK.callMethod('showOrderBox', params);

	VK.addCallback('onOrderSuccess', function(order_id)
		{
			console.log("Успешный платеж");
		});
	VK.addCallback('onOrderFail', function()
		{
			console.log("Ошибка платежа");
		});
	VK.addCallback('onOrderCancel', function()
		{
			console.log("Платеж отменен");
		});
}