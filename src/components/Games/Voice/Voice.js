import React, { useEffect } from 'react'
import "./Voice.css"

export default function Voice() {

    useEffect(() => {
        window.addEventListener('load', startGame())
    }, [])

    var objects = [
        {
            name : "AYI",
            imageSrc : "/voice/images/bear.png",
            soundSrc : "/voice/sounds/bear.mp3"
        },
        {
            name : "KUŞ",
            imageSrc : "/voice/images/bird.png",
            soundSrc : "/voice/sounds/bird.mp3"
        },
        {
            name : "İNEK",
            imageSrc : "/voice/images/cow.png",
            soundSrc : "/voice/sounds/cow.mp3"
        },
        {
            name : "KÖPEK",
            imageSrc : "/voice/images/dog.png",
            soundSrc : "/voice/sounds/dog.mp3"
        },
        {
            name : "YUNUS",
            imageSrc : "/voice/images/dolphin.png",
            soundSrc : "/voice/sounds/dolphin.mp3"
        },
        {
            name : "FİL",
            imageSrc : "/voice/images/elephant.png",
            soundSrc : "/voice/sounds/elephant.mp3"
        },
        {
            name : "AT",
            imageSrc : "/voice/images/horse.png",
            soundSrc : "/voice/sounds/horse.mp3"
        },
        {
            name : "ASLAN",
            imageSrc : "/voice/images/lion.png",
            soundSrc : "/voice/sounds/lion.mp3"
        },
        {
            name : "MAYMUN",
            imageSrc : "/voice/images/monkey.png",
            soundSrc : "/voice/sounds/monkey.mp3"
        },
        {
            name : "HOROZ",
            imageSrc : "/voice/images/rooster.png",
            soundSrc : "/voice/sounds/rooster.mp3"
        },
        {
            name : "KOYUN",
            imageSrc : "/voice/images/sheep.png",
            soundSrc : "/voice/sounds/sheep.mp3"
        },
        {
            name : "KURT",
            imageSrc : "/voice/images/wolf.png",
            soundSrc : "/voice/sounds/wolf.mp3"
        }
    ]
    var i = 0;
    var gameSound;
    var showObject;
    var correctAnswerIndex;
    var squares = [];
    var clicked = [];
    var howImagesShow = [];

    function startGame(){
        gameArea.start();          
    };

    var gameArea = {
        canvas : document.createElement("canvas"),
        start : function(){
            this.canvas.width = 1300;   //1510
            this.canvas.height = 680;   //700
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.div);
            assignImages();
            showMainPage(false);
            this.mainPageButtonInterval = setInterval(mainPageClick,50);

            window.addEventListener('mousedown', function (e) {  //Bu kısım canvas üzerindeki kontrolörler için
                gameArea.x = e.pageX;
                gameArea.y = e.pageY;
            });
            window.addEventListener('touchstart', function (e) {
                gameArea.x = e.pageX;
                gameArea.y = e.pageY;
            });
            squares = [
                {
                    myleft : gameArea.canvas.width/2 - 250,
                    myright : gameArea.canvas.width/2,
                    mytop : gameArea.canvas.height/2 - 250,
                    mybottom : gameArea.canvas.height/2
                },
                {
                    myleft : gameArea.canvas.width/2 + 20,
                    myright : gameArea.canvas.width/2 + 270,
                    mytop : gameArea.canvas.height/2 - 250,
                    mybottom : gameArea.canvas.height/2
                },
                {
                    myleft : gameArea.canvas.width/2 - 250,
                    myright : gameArea.canvas.width/2,
                    mytop : gameArea.canvas.height/2 + 20,
                    mybottom : gameArea.canvas.height/2 + 270
                },
                {
                    myleft : gameArea.canvas.width/2 + 20,
                    myright : gameArea.canvas.width/2 + 270,
                    mytop : gameArea.canvas.height/2 + 20,
                    mybottom : gameArea.canvas.height/2 + 270
                }
            ];
        },
        stopMainPageButtonInterval(){
            clearInterval(this.mainPageButtonInterval);
        },
        startFirstInterval(){
            this.interval = setInterval(updateObject,5000);
        },
        clear : function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop : function(){
            clearInterval(this.interval);
        },  
        questionScreenShow : function(){
            correctAnswerIndex = Math.floor(Math.random() * 4);
            gameSound = new sound(objects[howImagesShow[correctAnswerIndex]].soundSrc);
            gameSound.play();
            console.log("Soru Ekranı");
            console.log(objects[howImagesShow[correctAnswerIndex]].soundSrc)
            for(let j=0; j<4; j++){
                if(j==0)
                    questionObject(objects[howImagesShow[j]].imageSrc, gameArea.canvas.width/2 - 260, gameArea.canvas.height/2 - 260);
                else if(j==1)
                    questionObject(objects[howImagesShow[j]].imageSrc, gameArea.canvas.width/2 + 10, gameArea.canvas.height/2 - 260);
                else if(j==2)
                    questionObject(objects[howImagesShow[j]].imageSrc, gameArea.canvas.width/2 - 260, gameArea.canvas.height/2 + 10);
                else if(j==3)
                    questionObject(objects[howImagesShow[j]].imageSrc, gameArea.canvas.width/2 + 10, gameArea.canvas.height/2 + 10);
            }
            this.startSecondInterval();
            this.timeout = setTimeout(() => {
                this.stopSecondInterval();
                gameArea.clear();
                gameSound.stop();
            }, 20000);
        },
        startSecondInterval : function (){
                gameArea.x = null;
                gameArea.x = null;
            this.secondInterval = setInterval(frame, 20);
        },
        stopSecondInterval : function(){
            clearInterval(this.secondInterval);
        }
    };
    //Rastgele gelecek resimlerin belirlenmesi
    function assignImages(){
        var firstImageIndex = Math.floor(Math.random() * 12);
        howImagesShow[0]=firstImageIndex;
        do{
            var secondImageIndex = Math.floor(Math.random() * 12);
        }while(secondImageIndex == firstImageIndex)
        howImagesShow[1]=secondImageIndex;
        do{
            var thirdImageIndex= Math.floor(Math.random() * 12);
        }while(thirdImageIndex == firstImageIndex || thirdImageIndex == secondImageIndex)
        howImagesShow[2]=thirdImageIndex;
        do{
            var fourthImageIndex = Math.floor(Math.random() * 12);
        }while(fourthImageIndex == firstImageIndex || fourthImageIndex == secondImageIndex || fourthImageIndex == thirdImageIndex)
        howImagesShow[3]=fourthImageIndex;
    }
       
    function showMainPage(click){
        let ctx = gameArea.context;
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 1;
        var grd = ctx.createLinearGradient(gameArea.canvas.width/2 + 450, 0, 200, 0);
        if(click){
            grd.addColorStop(0, "#234A82");
            grd.addColorStop(0.45, "#B7C4D6");
            grd.addColorStop(1, "#234A82");
            ctx.fillStyle = grd;
        }
        else{
            grd.addColorStop(0, "#0047AB");
            grd.addColorStop(0.45, "#CCDAEE");
            grd.addColorStop(1, "#0047AB");
            ctx.fillStyle = grd;
        }
        this.beginPath();
        this.moveTo(x+r, y);
        this.arcTo(x+w, y,   x+w, y+h, r);
        this.arcTo(x+w, y+h, x,   y+h, r);
        this.arcTo(x,   y+h, x,   y,   r);
        this.arcTo(x,   y,   x+w, y,   r);
        this.closePath();
        this.fill();
        return this;
        }
        if(click)
            ctx.roundRect(gameArea.canvas.width/2 - 245, gameArea.canvas.height/2 - 122, 490, 244, 100).stroke();
        else
            ctx.roundRect(gameArea.canvas.width/2 - 250, gameArea.canvas.height/2 - 125, 500, 250, 100).stroke();
        ctx.font = "100px Bahnschrift";   //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
        ctx.fillStyle = "#282B2F";
        ctx.textAlign = "center";
        ctx.fillText("BAŞLA", gameArea.canvas.width/2, gameArea.canvas.height/2 + 30);

    }
    function mainPageClick(){
        this.clicked = function() {
            var myleft = gameArea.canvas.width/2 - 140;
            var myright = gameArea.canvas.width/2 + 160;
            var mytop = gameArea.canvas.height/2 - 90;
            var mybottom = gameArea.canvas.height/2 +110;
            var clicked = true;
            if ((mybottom < gameArea.y) || (mytop > gameArea.y) || (myright < gameArea.x) || (myleft > gameArea.x)) {
            clicked = false;
            };
        return clicked;
        };
        if (gameArea.x && gameArea.y) {
            if (this.clicked()) {
                console.log("Tıklandı");
                gameArea.clear();
                showMainPage(true);
                gameArea.stopMainPageButtonInterval();
                intro();
                gameArea.startFirstInterval();
            };
        };
    };

    function intro(){
        var number = 3;
        let introInterval = setInterval(drawNumber, 1000);
        function drawNumber(){
            let ctx = gameArea.context;
            gameArea.clear();
            ctx.font = "100px Bahnschrift";   //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
            ctx.fillStyle = "#282B2F";
            ctx.textAlign = "center";
            ctx.fillText(number, gameArea.canvas.width/2, gameArea.canvas.height/2 + 30);
            number --;
            if(number === -1)
                clearInterval(introInterval);
        };
    };

    function frame(){
        let click = function() {     //Kontrolörlere tıkladığında değişiklik yapmasını sağlayan.
            for(let j=0;j<4;j++){
                clicked[j] = true;
                if ((squares[j].mybottom < gameArea.y) || (squares[j].mytop > gameArea.y) || (squares[j].myright < gameArea.x) || (squares[j].myleft > gameArea.x)) {
                clicked[j] = false;
                };
            };
        return;
        };

        if (gameArea.x && gameArea.y) { //Butonlar tıklandıysa değişiklik yapmak için.
            click();
            for(let j=0;j<4;j++){
                if (clicked[j]) {
                    console.log("Tıklandı");
                    let ctx = gameArea.context;
                    if(j == correctAnswerIndex){
                        ctx.strokeStyle = "green";
                        ctx.lineWidth = 3;
                        ctx.strokeRect(squares[j].myleft - 10, squares[j].mytop - 10, 250, 250);
                    }
                    else{
                        ctx.strokeStyle = "red";
                        ctx.lineWidth = 3;
                        ctx.strokeRect(squares[j].myleft - 10, squares[j].mytop - 10, 250, 250);
                    }
                    gameArea.stopSecondInterval();
                    gameSound.stop();
                    setTimeout(() => {
                        gameArea.clear();
                    }, 3000);
                };
            };
        };
    };

    function updateObject(){
        if(i==4){
            showObject.stopMusic();
            gameArea.clear();
            i++;
            gameArea.questionScreenShow();
        }
        else if(i==5){
            gameArea.stop();
        }
        else
        {
            if(i!=0)
                showObject.stopMusic();
            gameArea.clear();

            showObject = new object(objects[howImagesShow[i]].name, objects[howImagesShow[i]].imageSrc, objects[howImagesShow[i]].soundSrc);
            showObject.show();
            //showObject.playMusic();
            i++;
        }
    };

    function questionObject(imgSrc, x, y){
        var img1 = new Image();
        img1.src = imgSrc;
        img1.onload = function() {
            gameArea.context.drawImage(img1, x, y, 250, 250);
            gameArea.context.strokeStyle = "black";
            gameArea.context.strokeRect(x, y, 250, 250);
        };
    };

    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "none");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        this.sound.preload = "auto";
        this.sound.autoplay = true;
        document.body.appendChild(this.sound);
        //this.sound.play();
        this.play = function(){
            this.sound.play();
        };
        this.stop = function(){
            this.sound.pause();
        };   
    };

    function object(name, imageSrc, soundSrc) {
        var img = new Image();
        this.show = function(){
            this.gameSound = new sound(soundSrc);
            img.src = imageSrc;
            img.style.border = "thick, solid, #000000";
            img.onload = function() {
                gameArea.context.drawImage(img, gameArea.canvas.width/2 - img.width/2, gameArea.canvas.height/2 - 100- img.height/2);
                //gameArea.context.strokeRect(277, 90, 300, 300);
            };
            // timeout = setTimeout(() => {
            //     this.gameSound.play();
            // }, 50);
            this.gameSound.play();

            gameArea.context.font = "70px Bahnschrift";   //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
            gameArea.context.fillStyle = "black";
            gameArea.context.textAlign = "center";
            gameArea.context.fillText(name, gameArea.canvas.width/2, gameArea.canvas.height/2 + 250);
        };
        this.stopMusic = function(){
            this.gameSound.stop();
        };
        this.playMusic = function(){
            this.gameSound.play();
        };
    };

    return (
        <div>
            
        </div>
    )
}