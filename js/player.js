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
    this.initGameKvadraty = function(){
        for(var i = 0; i<this.kolKvadratov*2; i++)
            this.gameKvadraty[i] = this.koordinaty[i];
        var j = 0, kolPeremesheniy = getRandomInt(5, 10);
        while(j<kolPeremesheniy){
            for(var n = 0; n < this.kolKvadratov*2; n+=2){
                var p = getRandomInt(0, (this.kolKvadratov)-1) * 2;
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

    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.peremeshka = function(){
        var i = 0;
        player.groupKv.forEach(function(child){
            game.add.tween(child).to({x: parseInt(player.gameKvadraty[i]), y: parseInt(player.gameKvadraty[i+1])}, 100, 'Linear', true, 0);
            game.add.tween(child).to({width: player.widHeiKvadratov[i], height: player.widHeiKvadratov[i+1]}, 100, 'Linear', true, 0);
            i+=2;
        }, this);
    }
}

//Загружает изображения в память
function loadImage(){
    for(var i = 1; i<=player.kolKvadratov; i++) {
        game.load.image("kv" + i, player.pathLevel + "image" + i + ".png");
    }
    game.load.image("razmetka", player.pathLevel + "razmetka.png");
    game.load.image("success", player.pathLevel + "success.jpg");

    game.load.start();
}

//Добавляет изображения на поле
function addImage(){ /*????????? ДОБАВИТЬ ГРУППУ для квадратов ?????????????*/
    player.groupKv = game.add.group();
    playGroup = game.add.group();
    playGroup.position.set(260, 200);
    playGroup.add(game.add.sprite(0, 0, "razmetka"));
    //game.world.moveDown();
    for(var i = 0; i<player.kolKvadratov; i++) {
        var kv = game.add.sprite(player.koordinaty[i*2], player.koordinaty[i*2+1], "kv" + (i+1));
        game.world.moveDown(kv);
        kv.inputEnabled = true; // Включаем обработку нажатий
        kv.events.onInputDown.add(selectedSquares); // Добавляем обработчик нажатий
        player.groupKv.add(kv);
        player.widHeiKvadratov[i*2] = kv.width;
        player.widHeiKvadratov[i*2+1] = kv.height;
    }
    playGroup.add(player.groupKv);
    playGroup.add(game.add.sprite(-80, -65, "ramka"));
    // Рандомим квадраты по полю
    player.initGameKvadraty();
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

                // Перемещаю на передний план два выбранных квадрата
                player.groupKv.bringToTop(player.selectKvadratov[0]);
                player.groupKv.bringToTop(player.selectKvadratov[1]);

                player.peremestitMestami(player.selectKvadratov[0].x, player.selectKvadratov[0].y, player.selectKvadratov[1].x, player.selectKvadratov[1].y);

                // Меняем местами квадраты
                var x1 = player.selectKvadratov[0].x, y1 = player.selectKvadratov[0].y;
                var w1 = player.selectKvadratov[0].width, h1 = player.selectKvadratov[0].height;

                game.add.tween(player.selectKvadratov[0]).to({x: parseInt(player.selectKvadratov[1].x), y: parseInt(player.selectKvadratov[1].y)}, 300, 'Linear', true, 0);
                game.add.tween(player.selectKvadratov[0]).to({width: parseInt(player.selectKvadratov[1].width), height: parseInt(player.selectKvadratov[1].height)}, 300, 'Linear', true, 0);

                game.add.tween(player.selectKvadratov[1]).to({x: parseInt(x1), y: parseInt(y1)}, 300, 'Linear', true, 0);
                game.add.tween(player.selectKvadratov[1]).to({width: parseInt(w1), height: parseInt(h1)}, 300, 'Linear', true, 0);

                player.selectKvadratov[0].alpha = 1;
                player.selectKvadratov[1].alpha = 1;
                player.selectKvadratov[0] = 0;
                player.selectKvadratov[1] = 0;

                // Проверка на собранную картинку
                if(player.proverka()){
                    game.add.sprite(0, 0, "success");
                    player.groupKv.destroy();
                    $('#dialog').dialog('open');
                }
            }
        }
    }
}