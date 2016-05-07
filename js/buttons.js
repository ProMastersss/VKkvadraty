// Нажатие по подсказке "Время"
function actionHelpTime() {
    console.log("Работает сука");
}

// Нажатие по подсказке "Переместить"
function actionHelpMove() {
    var index = (player.getRandomInt(0, player.kolKvadratov - 1)) * 2;
    while (player.gameKvadraty[index] == player.koordinaty[index] && player.gameKvadraty[index + 1] == player.koordinaty[index + 1]) {
        index = (player.getRandomInt(0, player.kolKvadratov - 1)) * 2;
    }
    //player.peremestitMestami(player.gameKvadraty[index], player.gameKvadraty[index + 1], player.koordinaty[index], player.koordinaty[index+1]);
    var kv1, kv2;
    player.groupKv.forEach(function (child) {
        if (child.x == player.gameKvadraty[index] && child.y == player.gameKvadraty[index + 1])
            kv1 = child;
        if (child.x == player.koordinaty[index] && child.y == player.koordinaty[index + 1])
            kv2 = child;
    }, this, true);
    
    moveAnimKvadraty(kv1, kv2);
}

// Нажатие по подсказке "Показать"
function actionHelpShow() {
    var succes = game.add.sprite(0, 0, "success");
    playGroup.add(succes);
    game.time.events.add(5000, function () {
        succes.visible = false;
        playGroup.removeChild(succes);
    });
}

// Нажатие по кнопки "FullScreen"
function actionFullScreen() {
    if (buttonFullScreen.fullScreen) {
        game.scale.stopFullScreen();
        buttonFullScreen.loadTexture("fullScreen", 0);
    } else {
        game.scale.startFullScreen();
        buttonFullScreen.loadTexture("outFullScreen", 0);
    }
    buttonFullScreen.fullScreen = !buttonFullScreen.fullScreen;
}

// Нажатие по кнопки "Играть"
function actionButtonPlay() {

}

// Нажатие по кнопки "Уровни"
function actionButtonLevels() {
    // Анимация перехода
    game.add.tween(mainDisplayGroup).to({ x: -1800 }, 200, 'Linear', true, 0);
    game.add.tween(listLevelsGroup).to({ x: 0 }, 200, 'Linear', true, 0);
}

// Нажатие по кнопки "Правила"
function actionButtonRules() {
    mainDisplayGroup.visible = false;
    game.world.bringToTop(rulesGroup);
    rulesGroup.position.set(game.world.width / 2, game.world.height / 2);
    rulesGroup.alpha = 0;
    rulesGroup.visible = true;
    game.add.tween(rulesGroup.scale).to({ x: 1, y: 1 }, 500, 'Linear', true, 0);
    game.add.tween(rulesGroup).to({ x: 0, y: 0, alpha: 1 }, 500, 'Linear', true, 0);
}

// Кнопка "Назад" в группе rulesGroup
function actionBackClickRules() {
    mainDisplayGroup.visible = true;
    game.add.tween(rulesGroup.scale).to({ x: 0, y: 0 }, 500, 'Linear', true, 0);
    game.add.tween(rulesGroup).to({ x: game.world.width / 2, y: game.world.height / 2, alpha: 0 }, 500, 'Linear', true, 0);
    game.add.tween(rulesGroup).to({ visible: false }, 200, 'Linear', true, 0);
}

// Клик по кнопке "Настройи", анимация показа настроек
function actionSettingClick() {
    if (this.hidden) {
        game.add.tween(this).to({ y: 0 }, 200, 'Linear', true, 0);
        this.hidden = false;
    } else {
        game.add.tween(this).to({ y: 330 }, 200, 'Linear', true, 0);
        this.hidden = true;
    }
}

// Клик по кнопке "Музыки"
function actionMusicClick() {

}

// Клик по кнопке "Звук"
function actionSoundClick() {

}

// Клик по кнопке "Назад", вернуть на предыдущий экран
function actionBackClick() {
    // Анимация перехода
    game.add.tween(mainDisplayGroup).to({ x: 0 }, 200, 'Linear', true, 0);
    game.add.tween(listLevelsGroup).to({ x: 1800 }, 200, 'Linear', true, 0);
}

// Нажатие на оранжевом блоке(уровне), который далее нужно пройти
function upLevels() {
    if (!player.secondClick) {
        player.secondClick = true;

        // Скрываем группу с уровнями
        game.add.tween(listLevelsGroup.scale).to({ x: 0, y: 0 }, 200, 'Linear', true, 0);
        game.add.tween(listLevelsGroup).to({ x: 1800 / 2, y: 1500 / 2 }, 200, 'Linear', true, 0);
        game.add.tween(listLevelsGroup).to({ visible: false }, 200, 'Linear', true, 0);
        //Получаем координаты квдратов с сервера
        //player.level = parseInt(this.text);
        AJAX.getKoordinaty(player);
    }
    game.time.events.add(300, function () {
        player.secondClick = false;
    });
}   

// Клик по кнопке со стрелочкой назад, для прокрутки списка назад
function backLevels() {
    if (game.number - 40 > 0) {
        game.number -= 40;
        animaciaLevels(-1200, 1800, 300);
    }
}

// Кнопка "назад" из игрового поля
function actionButtonBackPlay() {
    game.add.tween(playGroup).to({ x: 2030 }, 200, 'Linear', true, 0);
    game.add.tween(listLevelsGroup).to({ visible: true }, 200, 'Linear', true, 0);
    game.add.tween(listLevelsGroup.scale).to({ x: 1, y: 1 }, 200, 'Linear', true, 0);
    game.add.tween(listLevelsGroup).to({ x: 0, y: 0 }, 200, 'Linear', true, 0);
    playGroup.destroy();
    for (var i = 1; i <= player.kolKvadratov; i++){
		game.load.cache.removeImage("kv" + i);	
	}
    game.load.cache.removeImage("razmetka");
}

// Клик по кнопке со стрелочкой вперед, для прокрутки списка вперед
function nextLevels() {
    animaciaLevels(1800, -1200, 300);
}

