import React, { useEffect } from 'react'
import "./Seven.css"
import image1 from "./images/image1.jfif"
import image2 from "./images/image2.jfif"
import image3 from "./images/image3.jfif"

export default function Seven() {

    useEffect(() => {
        window.addEventListener('load', startGame())
    }, [])

    var differenceCoordinates = [
        [
            { x: 725, y: 405 },
            { x: 1125, y: 445 },
            { x: 385, y: 645 },
            { x: 995, y: 505 },
            { x: 785, y: 585 },
            { x: 425, y: 545 },
            { x: 615, y: 645 }
        ],
        [
            { x: 720, y: 480 },
            { x: 1040, y: 470 },
            { x: 480, y: 650 },
            { x: 1010, y: 550 },
            { x: 740, y: 585 },
            { x: 415, y: 455 },
            { x: 550, y: 460 }
        ],
        [
            { x: 910, y: 440 },
            { x: 1130, y: 455 },
            { x: 620, y: 560 },
            { x: 1090, y: 630 },
            { x: 770, y: 640 },
            { x: 450, y: 605 },
            { x: 680, y: 490 }
        ]
    ]
    var picturesSource = [
        {src: image1},
        {src: image2},
        {src: image3}
    ]
    // var differenceCoordinates = [
    //     { x: 720, y: 480 },
    //     { x: 1040, y: 470 },
    //     { x: 480, y: 650 },
    //     { x: 1010, y: 550 },
    //     { x: 740, y: 585 },
    //     { x: 415, y: 455 },
    //     { x: 550, y: 460 }
    // ]
    // var differenceCoordinates = [
    //     { x: 910, y: 440 },
    //     { x: 1130, y: 455 },
    //     { x: 620, y: 560 },
    //     { x: 1090, y: 630 },
    //     { x: 770, y: 640 },
    //     { x: 450, y: 605 },
    //     { x: 680, y: 490 }
    // ]
    var myleft = [];
    var myright = [];
    var mytop = [];
    var mybottom = [];
    var clicked = [];
    var find = [];
    var showObject;
    var time = 0;
    var pictureNumber;

    function startGame(){
        gameArea.start();
    }

    var gameArea = {
        canvas : document.createElement("canvas"),
        start : function(){
            this.canvas.width = 1510;
            this.canvas.height = 700;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.div);
            pictureNumber = Math.floor(Math.random() * 3);
            //showObject = new object("images/image1.jfif");
            //showObject = new object("images/image2.jfif");
            //showObject = new object("images/image3.jfif");
            showObject = new object(picturesSource[pictureNumber].src);
            showObject.show();
            this.interval = setInterval(frame, 20);

            window.addEventListener('mousedown', function (e) {  //Bu kısım canvas üzerindeki kontrolörler için
                gameArea.x = e.pageX;
                gameArea.y = e.pageY;
            })
            window.addEventListener('touchstart', function (e) {
                gameArea.x = e.pageX;
                gameArea.y = e.pageY;
            })
        },
        clear : function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop : function(){
            clearInterval(this.interval);
        }
    };

    function frame(){
        time += 20;
        if(time % 1000 === 0)
            showTime(time / 1000);
        let click = function() {    //Burada resimdeki tüm doğru cevaplar, tıklandı mı kontrol ediliyor.
            for(let i=0;i<7;i++){
                clicked[i] = true;
                if ((mybottom[i] < gameArea.y) || (mytop[i] > gameArea.y) || (myright[i] < gameArea.x) || (myleft[i] > gameArea.x)) {
                    clicked[i] = false;
                }
            }
            return;
            }
        if (gameArea.x && gameArea.y) { //Eğer tıklanan doğru cevaplar varsa, resimde kırmızı bir çember gösteriliyor.
            click();
            for(let j=0;j<7;j++){
                if(clicked[j]){
                find[j]=true;   //find dizisi tıklananları true olarak değiştiriyor. click dizisinden farkı, click'de tıklanan değer true ve tıklanmayanlar false olmak zorunda.
                console.log(j,".Tıklandı");
                drawCircle(differenceCoordinates[pictureNumber][j].x,differenceCoordinates[pictureNumber][j].y);
                }
            }
            var end = find.every(function (piece) { //Tüm farkları buldu mu sorguluyor.
                if (piece===true) {
                return true;
                }
            })
            if(end){            //Eğer tüm farklar bulunduysa oyunu bitiriyor.
                // var img = new Image();
                // img.src = 'images/winner.png';
                // img.onload = function() {
                setTimeout(() => {
                    gameArea.stop();
                    gameArea.clear();
                    //gameArea.context.drawImage(img, gameArea.canvas.width/2 - img.width/2, gameArea.canvas.height/2 - img.height/2);
                    //ctx.font = "60px Comic Sans MS";
                    //ctx.fillStyle = "red";
                    //ctx.textAlign = "center";
                    //ctx.fillText("TÜM FARKLARI " + Math.floor(time/1000) + " SANİYEDE BİLDİN" , gameArea.canvas.width/2, gameArea.canvas.height/2);
                }, 1000);
                // }
                setTimeout(() => {
                    clearInterval(this.winInterval);
                    gameArea.clear();
                }, 5000);
            }
        }
    }
    //Farkı bulduğunda, bulunduğu yeri belirtmek için etrafına kırmızı bir daire çizen fonksiyon
    function drawCircle(x,y) {
        let ctx = gameArea.context;
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, 2 * Math.PI);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }
    //Geçen zamanı gösteren fonksiyon
    function showTime(time){
        let ctx = gameArea.context;
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.strokeStyle = "#2D3040";
        ctx.lineWidth = 3;
        this.beginPath();
        this.moveTo(x+r, y);
        this.arcTo(x+w, y,   x+w, y+h, r);
        this.arcTo(x+w, y+h, x,   y+h, r);
        this.arcTo(x,   y+h, x,   y,   r);
        this.arcTo(x,   y,   x+w, y,   r);
        this.closePath();
        return this;
        }
        ctx.clearRect(1235,85,210,110);
        ctx.font = "80px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(time, 1340, 170);
        //ctx.strokeRect(1200, 20, 200, 100);
        ctx.roundRect(1240, 90, 200, 100, 40).stroke();
    }

    function object(imageSrc) {
        let ctx = gameArea.context;
        var img = new Image();
        this.show = function(){
            img.src = imageSrc;
            img.onload = function() {
                ctx.drawImage(img, gameArea.canvas.width/2 - 400, gameArea.canvas.height/2 - 310, 800, 660);
                console.log(gameArea.canvas.width/2 - 400, gameArea.canvas.height/2 - 310);
                // for(j=0;j<7;j++)
                //     drawCircle(differenceCoordinates[j].x,differenceCoordinates[j].y);
                //ctx.strokeRect(277, 90, 300, 300);
            }
        }
        for(let i=0;i<7;i++){
            myleft[i] = differenceCoordinates[pictureNumber][i].x - 10;
            myright[i] = differenceCoordinates[pictureNumber][i].x + 30;
            mytop[i] = differenceCoordinates[pictureNumber][i].y - 10;
            mybottom[i] = differenceCoordinates[pictureNumber][i].y + 30;
            find[i] = false;
        }
            ctx.font = "30px Comic Sans MS";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText('AŞAĞIDAKİ RESİMDEKİ 7 FARKI BULUN', 750, 30);

            // ctx.font = "30px Comic Sans MS";
            // ctx.fillStyle = "red";
            // ctx.textAlign = "center";
            // ctx.fillText('GEÇEN ZAMAN', 1338, 70);
    };

    return (
        <div>
            
        </div>
    )
}