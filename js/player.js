//Игрок
function Player(){
    this.name = "";
    this.famele = "";
    this.level = 1;
    this.selectKvadratov = [0, 0]; // [ID 1 квадрата, ID 2 квадрата]
    this.gameKvadraty = []; // Координаты квадратов на поле
    this.widHeiKvadratov = [];
    this.koordinaty = [];
    this.kolKvadratov = 0;
    this.groupKv = null; // группа игрового поля
    this.urlLoadLevel = 'http://vkkvadraty/loadLevel.php';
    this.pathLevel = "assets/Level" + this.level + "/";
    this.buttonBack = null; // Хранит кнопку "Назад" игрового поля
    this.secondClick = null; // Для двойного нажатия
    this.maxLevel = 1; // Уровень, который открыт
    this.sound = true; // включен звук
    this.music = true; // Включена музыка
    this.initGameKvadraty = function(){
        for(var i = 0; i<this.kolKvadratov*2; i++)
            this.gameKvadraty[i] = this.koordinaty[i];
        var j = 0, kolPeremesheniy = this.getRandomInt(5, 10);
        while(j<kolPeremesheniy){
            for(var n = 0; n < this.kolKvadratov*2; n+=2){
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

    this.peremestitMestami = function(x1, y1, x2, y2){ // Перемещает координаты в массиве gameKvadraty
        var i, j;
        for(i = 0; i<this.kolKvadratov * 2; i+=2){
            if(parseInt(this.gameKvadraty[i]) == x1 && parseInt(this.gameKvadraty[i+1]) == y1)
                break;
        }

        for(j = 0; i<this.kolKvadratov * 2; j+=2){
            if(parseInt(this.gameKvadraty[j]) == x2 && parseInt(this.gameKvadraty[j+1]) == y2){
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
    this.proverka = function(){
        for(var i = 0; i<this.kolKvadratov*2; i++)
            if(this.gameKvadraty[i] != this.koordinaty[i])
                return false;

        return true;
    }

    this.getRandomInt = function(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.peremeshka = function(){
        var i = 0;
        player.groupKv.forEach(function(child){
            game.add.tween(child).to({x: parseInt(player.gameKvadraty[i]), y: parseInt(player.gameKvadraty[i+1])}, 100, 'Linear', true, 0);
            game.add.tween(child).to({width: player.widHeiKvadratov[i], height: player.widHeiKvadratov[i+1]}, 100, 'Linear', true, 0);
            i += 2;
            child.inputEnabled = true; // Включаем обработку нажатий
        }, this);
        //После перемешки отображаем кнопку назад и подсказки
        player.buttonBack.visible = true;
        buttonHelpTime.visible = true;
        buttonHelpMove.visible = true;
        buttonHelpShow.visible = true;

        // Добавляем время
        var timer = game.time.events.loop(Phaser.Timer.SECOND, updateTimer, this);
        playGroup.timer = timer;
        playGroup.timer.timer.start();
        playGroup.timeLevel = 1 * 60;
        playGroup.textTimer = game.add.text(600, -130, "1:00", { font: "bold 60px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10 });
        playGroup.add(playGroup.textTimer);

        // Добавляем прогресс бар для уровня
        playGroup.add(game.add.sprite(-190, 0, "progresLevelFon"));
        playGroup.progres = game.add.sprite(-190, 0, "progresLevel");
        playGroup.progres.crop(new Phaser.Rectangle(0, 0, playGroup.progres.width, 0), true);
        playGroup.add(playGroup.progres);
        playGroup.textProgres = game.add.text(-220, 770, "0%\nЗавершено", { font: "bold 40px EtoMoiFont", fill: "#FFD300", stroke: '#000000', strokeThickness: 10, align: "center" });
        playGroup.add(playGroup.textProgres);
    }
}

//Загружает изображения в память
function loadImage() {
    for(var i = 1; i<=player.kolKvadratov; i++) {
        game.load.image("kv" + i, player.pathLevel + "image" + i + ".png");
    }
    game.load.image("razmetka", player.pathLevel + "razmetka.png");
    game.load.image("success", player.pathLevel + "success.jpg");
    // Загрузка подсказок
    game.load.image("time", "img/help/time2.png");

    //Загрузка прогресс бара для уровня
    game.load.image("progresLevel", "img/progresLevel.png");
    game.load.image("progresLevelFon", "img/progresLevelFon.png");

    game.load.start();
}

//Добавляет изображения на поле
function addImage(){ /*????????? ДОБАВИТЬ ГРУППУ для квадратов ?????????????*/
    player.groupKv = game.add.group();
    playGroup = game.add.group();
    playGroup.position.set(2030, 200);
    playGroup.add(game.add.sprite(0, 0, "razmetka"));
    //game.world.moveDown();
    for(var i = 0; i<player.kolKvadratov; i++) {
        var kv = game.add.sprite(player.koordinaty[i*2], player.koordinaty[i*2+1], "kv" + (i+1));
        game.world.moveDown(kv);
        kv.events.onInputDown.add(selectedSquares); // Добавляем обработчик нажатий
        player.groupKv.add(kv);
        player.widHeiKvadratov[i*2] = kv.width;
        player.widHeiKvadratov[i*2+1] = kv.height;
    }
    playGroup.add(player.groupKv);
    playGroup.add(game.add.sprite(-80, -65, "ramka"));
    player.buttonBack = game.add.button(-210, 900, "back", actionButtonBackPlay, this);
    player.buttonBack.visible = false;
    playGroup.add(player.buttonBack);
    //Загрузка подсказок
    buttonHelpTime = game.add.button(890, -165, "time", actionHelpTime, this);
    buttonHelpTime.visible = false;
    buttonHelpMove = game.add.button(1020, -165, "time", actionHelpMove, this);
    buttonHelpMove.visible = false;
    buttonHelpShow = game.add.button(1150, -165, "time", actionHelpShow, this);
    buttonHelpShow.visible = false;
    playGroup.add(buttonHelpTime);
    playGroup.add(buttonHelpMove);
    playGroup.add(buttonHelpShow);
    
    game.add.tween(playGroup).to({ x: 260 }, 200, 'Linear', true, 0);
    // Рандомим квадраты по полю
    player.initGameKvadraty();
}

// Функция обновления времени уровня
function updateTimer() {
    if (playGroup.timeLevel-- == 0) {
        playGroup.timer.timer.stop();
        $('#dialog').dialog("option", "title", "Неудача");;
        $('#dialog p').text('Время вышло :(');
        $('#dialog').dialog('open');
    } else {
        playGroup.textTimer.text = parseInt(playGroup.timeLevel / 60) + ":";
        playGroup.textTimer.text += playGroup.timeLevel % 60 < 10 ? "0" + playGroup.timeLevel % 60 : playGroup.timeLevel % 60;
    }
}

// Функция обработки нажатия по квадрату
function selectedSquares(th){
    switch(th.alpha) {
        case 0.7:
        {
            th.alpha = 1;
            player.selectKvadratov[0] = 0;
            break;
        }

        case 1:
        {
            if(player.selectKvadratov[0] == 0){
                player.selectKvadratov[0] = th;
                th.alpha = 0.7;
            }else{
                player.selectKvadratov[1] = th;
                th.alpha = 0.7;
                
                moveAnimKvadraty(player.selectKvadratov[0], player.selectKvadratov[1]);

                player.selectKvadratov[0].alpha = 1;
                player.selectKvadratov[1].alpha = 1;
                player.selectKvadratov[0] = 0;
                player.selectKvadratov[1] = 0;
            }
        }
    }
}

function moveAnimKvadraty(kv1, kv2) {
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
    for (var i = 0; i < player.kolKvadratov*2-1; i += 2) {
        if (player.gameKvadraty[i] == player.koordinaty[i] && player.gameKvadraty[i + 1] == player.koordinaty[i + 1])
            totalProgres++;
    }
    playGroup.textProgres.setText(parseInt(totalProgres / player.kolKvadratov * 100) + "%\nЗавершено");
    playGroup.progres.cropRect.setTo(0, 791 - parseInt(791 / player.kolKvadratov * totalProgres), playGroup.progres.width, parseInt(791 / player.kolKvadratov * totalProgres));
    playGroup.progres.y = 791 - parseInt(791 / player.kolKvadratov * totalProgres);
    playGroup.progres.updateCrop();
    //console.log(playGroup.progres.cropRect, playGroup.progres.height);

    // Проверка на собранную картинку
    if (player.proverka()) {
        var win = game.add.audio("win");
        win.play();

        playGroup.add(game.add.sprite(0, 0, "success"));
        player.groupKv.destroy();
        $('#dialog').dialog('open');
        buttonHelpTime.visible = false;
        buttonHelpMove.visible = false;
        buttonHelpShow.visible = false;
        playGroup.timer.timer.stop();
    }
}