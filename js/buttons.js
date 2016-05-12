// Нажатие по подсказке "Время"
function actionHelpTime() {
    playGroup.timeLevel += 60;
}

// Нажатие по подсказке "Переместить"
function actionHelpMove() {
    var index = (player.getRandomInt(0, player.kolKvadratov - 1)) * 2;
    while (player.gameKvadraty[index] == player.koordinaty[index] && player.gameKvadraty[index + 1] == player.koordinaty[index + 1]) {
        index = (player.getRandomInt(0, player.kolKvadratov - 1)) * 2;
    }

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
    // Показать рейтинг игроков
    mainDisplayGroup.visible = false;
    progressBar.visible = true;
    progressBarFon.visible = true;
    var load = new Phaser.Loader(game);
    load.onLoadStart.add(loadStartReiting, this);
    load.onLoadComplete.add(loadCompleteReiting, this);
    load.start();

    function loadStartReiting() {

    }

    function loadCompleteReiting() {
        progressBar.visible = false;
        progressBarFon.visible = false;
        reitingGroup = game.add.group();
        game.input.mouse.mouseWheelCallback = kolesoMouse;
        reitingGroup.add(game.add.sprite(0, 0, "dialog"));
        reitingGroup.add(game.add.text(720, 150, "Рейтинг", { font: "bold 120px EtoMoiFont", fill: "#FFD300", stroke: "#000000", strokeThickness: 10 }));
        // Добавление строк в рейтинг
        var textGroup = game.add.group();
        textGroup.visibleStroki = 0;
        for (var i = 0; i < 50; i++) {
            textGroup.add(game.add.text(0, 100 * i, "Текст" + i, { font: "bold 80px EtoMoiFont", fill: "#000" }));
            if (i > 7)
                textGroup.children[i].visible = false;
        }
        textGroup.position.set(350, 350);
        reitingGroup.add(textGroup);

        // Результат игрока
        reitingGroup.add(game.add.text(350, 1150, "Текст игрока", { font: "bold 80px EtoMoiFont", fill: "#f00" }));

        var backRules = game.add.button(50, 1100, "back", actionBackClickReiting, this);
        reitingGroup.add(backRules);
        reitingGroup.scale.set(0, 0);
        reitingGroup.visible = false;
        game.world.bringToTop(reitingGroup);
        reitingGroup.position.set(game.world.width / 2, game.world.height / 2);
        reitingGroup.alpha = 0;
        reitingGroup.visible = true;
        game.add.tween(reitingGroup.scale).to({ x: 1, y: 1 }, 500, 'Linear', true, 0);
        game.add.tween(reitingGroup).to({ x: 0, y: 0, alpha: 1 }, 500, 'Linear', true, 0);

        function actionBackClickReiting() {
            mainDisplayGroup.visible = true;
            game.add.tween(reitingGroup.scale).to({ x: 0, y: 0 }, 500, 'Linear', true, 0);
            game.add.tween(reitingGroup).to({ x: game.world.width / 2, y: game.world.height / 2, alpha: 0 }, 500, 'Linear', true, 0);
            game.add.tween(reitingGroup).to({ visible: false }, 200, 'Linear', true, 0);
            setInterval(1000, function () { reitingGroup.destroy() });
        }

        function kolesoMouse(event) {
            var kolStrok = 8; // Количество видимых строк
            switch (game.input.mouse.wheelDelta) {
                case Phaser.Mouse.WHEEL_UP: {
                    if (textGroup.visibleStroki > 0) {
                        textGroup.y += 100;
                        textGroup.children[textGroup.visibleStroki-1].visible = true;
                        textGroup.children[textGroup.visibleStroki + kolStrok - 1].visible = false;
                        textGroup.visibleStroki--;
                    }
                }; break;

                case Phaser.Mouse.WHEEL_DOWN: {
                    if (textGroup.visibleStroki+kolStrok-1 < 49) { // < всего - 1
                        textGroup.y -= 100;
                        textGroup.children[textGroup.visibleStroki].visible = false;
                        textGroup.children[textGroup.visibleStroki + kolStrok].visible = true;
                        textGroup.visibleStroki++;
                    }
                }; break;
            }
        }
    }
}

// Нажатие по кнопки "Уровни"
function actionButtonLevels() {
    // Анимация перехода
    game.add.tween(mainDisplayGroup).to({ x: -1800 }, 200, 'Linear', true, 0);
    game.add.tween(listLevelsGroup).to({ x: 0 }, 200, 'Linear', true, 0);
    if (game.naFone == 1) {
        levelsGroup2.visible = true;
    } else {
        levelsGroup.visible = true;
    }
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
    if (game.naFone == 1) {
        levelsGroup2.visible = false;
    } else {
        levelsGroup.visible = false;
    }
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

