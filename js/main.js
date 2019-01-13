enchant(); // おまじない

window.onload = function() {

    // 行の終わりには、;（セミコロン）を付けます。
    var LIMIT_TIME = 10;   // 秒数
    var collect_count = 0;  // 正しくクリックできた数
    var score_parcent = 0;
    var progress = 0;
    var width = 1100;
    var hight = 600;
    var game = new Game(width, hight); // ゲーム本体を準備すると同時に、表示される領域の大きさを設定しています。
    game.fps = 1.5; // frames（フレーム）per（毎）second（秒）：ゲームの進行スピードを設定しています。
    game.preload('./img/apad.png', './img/start.png', './img/end.png'); // pre（前）-load（読み込み）：ゲームに使う素材をあらかじめ読み込んでおきます。

    game.onload = function() { // ゲームの準備が整ったらメインの処理を実行します。

        var createTitleScene = function() {
            var scene = new Scene();
            var start = new Sprite(236, 48);
            collect_count = 0;
            game.frame = 0;
            start.image = game.assets['./img/start.png'];
            start.x = (width / 2) - (236 / 2);
            start.y = hight / 2;
            scene.addChild(start);
            scene.backgroundColor  = '#FFFFFF';
            scene.addEventListener(Event.TOUCH_START, function() {
                game.replaceScene(createGameScene());
            });
            return scene;
        };

        var createGameScene = function() {
            var scene = new Scene();
            var target = new Sprite(100, 100);  // ターゲットというスプライト(操作可能な画像)を準備すると同時に、スプライトの表示される領域の大きさを設定しています。
            target.image = game.assets['./img/apad.png']; // くまにあらかじめロードしておいた画像を適用します。
            var ratio = 0.2;
            target.scale(ratio, ratio);
            target.x = width / 2; // くまの横位置を設定します。
            target.y = hight / 2; // くまの縦位置を設定します。
            var LIMIT_FPS = LIMIT_TIME * game.fps;   // 制限時間になったかどうか
            scene.addChild(target); // ゲームのシーンにターゲットを表示させます。
            scene.backgroundColor  = '#FFFFFF'; // ゲームの動作部分の背景色を設定しています。

            // シーンに「毎フレーム実行イベント」を追加します。
            scene.addEventListener(Event.ENTER_FRAME, function() {
                target.x = Math.random() * (width - (100 * ratio));
                target.y = Math.random() * (hight - (100 * ratio));
                progress = game.frame;
                console.log(progress);
                if (LIMIT_FPS + 1 <= progress) {
                    game.replaceScene(createGameoverScene());
                }
            });
            // シーンに「タッチイベント」を追加します。
            scene.addEventListener(Event.TOUCH_START, function(e) {
                // タッチイベントは、タッチした座標をe.x , e.y として取ることができます。
                // なお、eという変数の名前は自由に変更できます。 例：function(好きな名前) { ?
                if ((e.x <= (target.x + 50)) && (target.x <= e.x)) {
                    if ((e.y <= (target.y + 50)) && (target.y <= e.y)) {
                        collect_count += 1;
                        console.log('命中数' + collect_count);
                    } else {
                        console.log('命中数' + collect_count);
                    }
                }
            });
            return scene;
        };

        var createGameoverScene = function() {
            var scene = new Scene();
            var end = new Sprite(189, 97);
            end.image = game.assets['./img/end.png'];
            end.x = (width / 2) - (189 / 2);
            end.y = hight / 5;
            scene.addChild(end);
            scene.backgroundColor  = '#FFFFFF';
            var label = new Label();
            label.font = "16px monospace";
            label.color = '#000000';
            label.x = width / 2;
            label.y = hight / 2;
            score_parcent = (collect_count / progress ) * 100;
            label.text = "命中率" + score_parcent + "%";
            scene.addChild(label);
            scene.addEventListener(Event.TOUCH_START, function() {
                game.popScene();
                game.replaceScene(createTitleScene());
            });
            return scene;
        };
        game.replaceScene(createTitleScene());
    }
    game.start(); // ゲームをスタートさせます
};