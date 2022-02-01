import React, { useEffect } from 'react'
import "./Math.css"

export default function Mathx() {

    useEffect(() => {
        window.addEventListener('load', startGame())
    }, [])

    var question;
            var time = 10020;
            var score = 0;
            var questions = [];
            var whichQuestion = 0;
            var cards = [ 
                { number: 0, isItCorrect: false, mybottom: 420, mytop: 250, myright: 150, myleft: 30},
                { number: 0, isItCorrect: false, mybottom: 420, mytop: 250, myright: 280, myleft: 160 },
                { number: 0, isItCorrect: false, mybottom: 420, mytop: 250, myright: 410, myleft: 290 },
                { number: 0, isItCorrect: false, mybottom: 420, mytop: 250, myright: 540, myleft: 420 }
            ]
            // var cards = [ 
            //     { number: 0, isItCorrect: false, mybottom: 320, mytop: 200, myright: 80, myleft: 10},
            //     { number: 0, isItCorrect: false, mybottom: 320, mytop: 200, myright: 160, myleft: 90 },
            //     { number: 0, isItCorrect: false, mybottom: 320, mytop: 200, myright: 240, myleft: 170 },
            //     { number: 0, isItCorrect: false, mybottom: 320, mytop: 200, myright: 320, myleft: 250 }
            // ]
            var buttons = [];
            var operation;
            var questionAnsers = [];
            function startGame(){
                gameArea.start();
            }

            var gameArea = {
                canvas : document.createElement("canvas"),
                start : function(){
                    this.canvas.width = 1000;
                    this.canvas.height = 500;
                    this.context = this.canvas.getContext("2d");
                    document.body.insertBefore(this.canvas, document.body.div);
                    showMainPage();
                    //let mainPageInterval = setInterval(mainPageClick, 50);
                    this.startMainPageInterval();
                    //this.createQuestion();

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
                },
                startMainPageInterval : function(){
                    this.mainPageInterval = setInterval(mainPageClick, 50);
                },
                stopMainPageInterval : function(){
                    clearInterval(this.mainPageInterval);
                },
                createQuestion : function(paramOperation){                
                    this.clear();
                    this.x = null;
                    this.y = null;
                    showScore(whichQuestion);
                    whichQuestion++;
                    console.log("whichQuestion: ", whichQuestion);
                    if(whichQuestion !== 11){
                        operation = paramOperation;
                        questions[whichQuestion] = new question(paramOperation);
                        questions[whichQuestion].show();
                        console.log("question[",whichQuestion,"]: ",question[whichQuestion]);
                        time = 10020;
                        this.interval = setInterval(frame, 20);
                    }
                    else{
                        let ctx = gameArea.context;
                        ctx.font = "60px Bahnschrift";  //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
                        ctx.fillStyle = "#326BBB";
                        ctx.textAlign = "center";
                        var endText = "10 SORUDA " + score + " DOĞRU CEVAP VERDİN";
                        whichQuestion = 0;
                        score = 0;
                        setTimeout(() => {
                            this.clear();
                            ctx.fillText(endText, gameArea.canvas.width/2, gameArea.canvas.height/2);
                        }, 1000);
                        setTimeout(() => {
                            this.clear();
                            this.x = null;
                            this.y = null;
                            showMainPage();
                            this.startMainPageInterval();
                        }, 5000);
                    }
                }
            };
            //Köşesi yuvarlak dikdörtgenlerin çizilmesini sağlayan fonksiyon
            CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
                if (w < 2 * r) r = w / 2;
                if (h < 2 * r) r = h / 2;
                this.beginPath();
                this.moveTo(x+r, y);
                this.arcTo(x+w, y,   x+w, y+h, r);
                this.arcTo(x+w, y+h, x,   y+h, r);
                this.arcTo(x,   y+h, x,   y,   r);
                this.arcTo(x,   y,   x+w, y,   r);
                this.closePath();
                this.fill();
                return this;
                };
            //Oyunun giriş sayfasının yüklendiği ve butonların koordinatlarının belirlendiği fonksiyon
            function showMainPage(){
                buttons = [
                    {
                        operation: "addition",
                        mybottom: gameArea.canvas.height/2 - 10,
                        mytop: gameArea.canvas.height/2 - 210,
                        myright: gameArea.canvas.width/2 - 10,
                        myleft: gameArea.canvas.width/2 - 410
                    },
                    {
                        operation: "multiplication",
                        mybottom: gameArea.canvas.height/2 + 210,
                        mytop: gameArea.canvas.height/2 + 10,
                        myright: gameArea.canvas.width/2 - 10,
                        myleft: gameArea.canvas.width/2 - 410
                    },
                    {
                        operation: "subtraction",
                        mybottom: gameArea.canvas.height/2 - 10,
                        mytop: gameArea.canvas.height/2 - 210,
                        myright: gameArea.canvas.width/2 + 410,
                        myleft: gameArea.canvas.width/2 + 10
                    },
                    {
                        operation: "division",
                        mybottom: gameArea.canvas.height/2 + 210,
                        mytop: gameArea.canvas.height/2 + 10,
                        myright: gameArea.canvas.width/2 + 410,
                        myleft: gameArea.canvas.width/2 + 10
                    },
                ];
                let ctx = gameArea.context;
                
                var grd = ctx.createLinearGradient(gameArea.canvas.width/2 - 410, 0, gameArea.canvas.width/2 - 10, 0);
                grd.addColorStop(0, "#326BBB");
                grd.addColorStop(0.45, "#6F97CF");
                grd.addColorStop(1, "#326BBB");
                ctx.fillStyle = grd;

                ctx.roundRect(gameArea.canvas.width/2 - 410, gameArea.canvas.height/2 - 210, 400, 200, 50).stroke();
                ctx.roundRect(gameArea.canvas.width/2 - 410, gameArea.canvas.height/2 + 10, 400, 200, 50).stroke();

                var grd = ctx.createLinearGradient(gameArea.canvas.width/2 + 10, 0, gameArea.canvas.width/2 + 410, 0);
                grd.addColorStop(0, "#326BBB");
                grd.addColorStop(0.45, "#6F97CF");  //CCDAEE
                grd.addColorStop(1, "#326BBB");
                ctx.fillStyle = grd;

                ctx.roundRect(gameArea.canvas.width/2 + 10, gameArea.canvas.height/2 - 210, 400, 200, 50).stroke();
                ctx.roundRect(gameArea.canvas.width/2 + 10, gameArea.canvas.height/2 + 10, 400, 200, 50).stroke();
                
                ctx.font = "80px Bahnschrift";   //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
                ctx.fillStyle = "#282B2F";
                ctx.textAlign = "center";
                ctx.fillText("TOPLAMA", gameArea.canvas.width/2 - 210, gameArea.canvas.height/2 - 85);
                ctx.fillText("ÇARPMA", gameArea.canvas.width/2 - 210, gameArea.canvas.height/2 + 135);
                ctx.fillText("ÇIKARMA", gameArea.canvas.width/2 + 210, gameArea.canvas.height/2 - 85);
                ctx.fillText("BÖLME", gameArea.canvas.width/2 + 210, gameArea.canvas.height/2 + 135);
            };
            //Giriş sayfasındaki işlem seçiminin tıklanıp tıklanmadığını kontrol eden ve seçilen işleme yönlendirildiği fonksiyon
            function mainPageClick(){
                var clicked = [];
                let click = function() {
                    for(let i=0;i<4;i++){
                        clicked[i] = true;
                        if ((buttons[i].mybottom+10 < gameArea.y) || (buttons[i].mytop+10 > gameArea.y) || (buttons[i].myright+10 < gameArea.x) || (buttons[i].myleft+10 > gameArea.x)) {
                            clicked[i] = false;
                        }
                    }
                    return;
                }
                if (gameArea.x && gameArea.y) {
                    click();
                    for(let j=0;j<4;j++){
                        if(clicked[j]){
                            gameArea.context.clearRect(buttons[j].myleft-1, buttons[j].mytop-1, 402, 202);
                            clickedButton(buttons[j].operation);
                            gameArea.stopMainPageInterval();
                            // gameArea.x = null;
                            // gameArea.y = null;
                            var o = buttons[j].operation;
                            setTimeout(() => {
                                gameArea.createQuestion(o);
                            }, 1000);
                            console.log("click");
                        };
                    };
                };
            };
            //Giriş sayfasındaki işlem tıklandıktan sonra tıklama efektinin gerçekleştirildiği fonksiyon
            function clickedButton(paramOperation){
                let ctx = gameArea.context;
                ctx.font = "80px Bahnschrift";   //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
                ctx.fillStyle = "#282B2F";
                ctx.textAlign = "center";
                if(paramOperation == "addition" || paramOperation == "multiplication"){
                    var grd = ctx.createLinearGradient(gameArea.canvas.width/2 - 410, 0, gameArea.canvas.width/2 - 10, 0);
                    grd.addColorStop(0, "#8BABD8");
                    grd.addColorStop(0.45, "#6F97CF");
                    grd.addColorStop(1, "#8BABD8");
                    ctx.fillStyle = grd;
                    if(paramOperation == "addition"){
                        ctx.roundRect(gameArea.canvas.width/2 - 405, gameArea.canvas.height/2 - 205, 390, 190, 50).stroke();
                        ctx.fillStyle = "#282B2F";
                        ctx.fillText("TOPLAMA", gameArea.canvas.width/2 - 210, gameArea.canvas.height/2 - 85);
                    }
                    else{
                        ctx.roundRect(gameArea.canvas.width/2 - 405, gameArea.canvas.height/2 + 15, 390, 190, 50).stroke();
                        ctx.fillStyle = "#282B2F";
                        ctx.fillText("ÇARPMA", gameArea.canvas.width/2 - 210, gameArea.canvas.height/2 + 135);
                    }
                }
                else{
                    var grd = ctx.createLinearGradient(gameArea.canvas.width/2 + 10, 0, gameArea.canvas.width/2 + 410, 0);
                    grd.addColorStop(0, "#8BABD8");
                    grd.addColorStop(0.45, "#6F97CF");  //CCDAEE
                    grd.addColorStop(1, "#8BABD8");
                    ctx.fillStyle = grd;
                    if(paramOperation == "subtraction"){
                        ctx.roundRect(gameArea.canvas.width/2 + 15, gameArea.canvas.height/2 - 205, 390, 190, 50).stroke();
                        ctx.fillStyle = "#282B2F";
                        ctx.fillText("ÇIKARMA", gameArea.canvas.width/2 + 210, gameArea.canvas.height/2 - 85);
                    }
                    else{
                        ctx.roundRect(gameArea.canvas.width/2 + 15, gameArea.canvas.height/2 + 15, 390, 190, 50).stroke();
                        ctx.fillStyle = "#282B2F";
                        ctx.fillText("BÖLME", gameArea.canvas.width/2 + 210, gameArea.canvas.height/2 + 135);
                    }
                }
            };
            //Soru sorulduktan sonraki tıklamaların kontrol edildiği fonksiyon
            function frame(){
                time -= 20;
                if(time % 1000 == 0)
                    showTime(time / 1000);
                if(time == -20){
                    setTimeout(() => {
                        gameArea.createQuestion(operation);
                    }, 1000);
                    console.log("timeout");
                    gameArea.stop();
                };
                var clicked = [];
                let click = function() {
                    for(let i=0;i<4;i++){
                        clicked[i] = true;
                        if ((cards[i].mybottom+10 < gameArea.y) || (cards[i].mytop+10 > gameArea.y) || (cards[i].myright+10 < gameArea.x) || (cards[i].myleft+10 > gameArea.x)) {
                            clicked[i] = false;
                        }
                    }
                    return;
                }
                if (gameArea.x && gameArea.y) {
                    click();
                    for(let j=0;j<4;j++){
                        if(clicked[j]){
                            console.log(j,".Tıklandı");
                            drawCard(cards[j].isItCorrect, cards[j].number, cards[j].myleft, cards[j].mytop);
                            if(cards[j].isItCorrect)
                                score++;
                            setTimeout(() => {
                                gameArea.createQuestion(operation);
                            }, 1000);
                            console.log("click");
                            gameArea.stop();
                        };
                    };
                };
            };
            //Skoru yazdıran fonksiyon
            function showScore(currentQuestion){
                let ctx = gameArea.context;
                ctx.clearRect(920, 310, 60, 50);

                ctx.beginPath();
                ctx.lineWidth = "7";
                // ctx.strokeStyle = "red";
                ctx.rect(650, 230, 200, 150);
                ctx.stroke();

                ctx.font = "45px Consolas";  //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
                ctx.fillStyle = "#656C90";
                ctx.textAlign = "center";
                ctx.fillText("SKOR", 750, 275);
                ctx.font = "70px Consolas";  //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
                ctx.fillStyle = "red";
                var text = score.toString() + "/" + currentQuestion;
                ctx.fillText(text, 750, 345);
            }
            //Kalan zamanı yazdıran fonksiyon
            function showTime(time){
                let ctx = gameArea.context;
                ctx.clearRect(575, 20, 350, 165);

                ctx.beginPath();
                ctx.lineWidth = "7";
                ///ctx.strokeStyle = "red";
                ctx.rect(580, 25, 340, 155);
                ctx.stroke();

                ctx.font = "45px Bahnschrift";  //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
                ctx.fillStyle = "#656C90";
                ctx.textAlign = "center";
                ctx.fillText("KALAN SÜRE", 750, 75);
                ctx.font = "70px Bahnschrift";  //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
                ctx.fillStyle = "red";
                ctx.fillText(time, 750, 150);
            };
            //Cevap kartlarını yazdıran fonksiyon
            function drawCard(state, number, x, y){
                let ctx = gameArea.context;
                var grd = ctx.createRadialGradient(x+60, y+80, 5, x+60, y+80, 150);
                if(state==true){
                    grd.addColorStop(0, "#D9D9DC");
                    grd.addColorStop(1, "#107634");
                }
                else if(state==false){
                    grd.addColorStop(0, "#D9D9DC");
                    grd.addColorStop(1, "#FF1313");
                }
                else{
                    grd.addColorStop(0, "#D9D9DC");
                    grd.addColorStop(1, "#7179A1");
                }
                ctx.fillStyle = grd;
                ctx.fillRect(x, y, 120, 180);
                drawNumber(number, x+60, y+115);
            };
            //Rakamları yazdıran fonksiyon
            function drawNumber(number, x, y){
                let ctx = gameArea.context;
                ctx.font = "80px Bahnschrift";  //Rockwell    Consolas    papyrus   Bahnschrift     Ink Free 
                ctx.fillStyle = "#656C90";
                ctx.textAlign = "center";
                ctx.fillText(number, x, y);
            };
            //Sorunun oluşturulduğu fonksiyon. İşlem türüne göre rakamlar random oluşturulur ve ekrana cevaplarla birlikte yazdırılır.
            function question(paramOperation){
                let ctx = gameArea.context;
                if(paramOperation == "addition"){
                    //Soru belirleniyor.
                    var firstNumber = Math.ceil(Math.random() * 24);
                    var secondNumber = Math.ceil(Math.random() * (25-firstNumber));
                    //Doğru cevap ve geriye kalan rastgele cevaplar, rastgele sırada belirleniyor.
                    var correctAnswerIndex = Math.floor(Math.random() * 4);
                    var firstAnswer = firstNumber + secondNumber;
                    cards[correctAnswerIndex].number =  firstAnswer;
                    cards[correctAnswerIndex].isItCorrect = true;
                    do{
                        var secondAnswer = Math.ceil(Math.random() * 25);
                        var firstWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(secondAnswer == firstAnswer || firstWrongAnswerIndex == correctAnswerIndex);
                    cards[firstWrongAnswerIndex].number = secondAnswer;
                    cards[firstWrongAnswerIndex].isItCorrect = false;
                    do{
                        var thirdAnswer = Math.ceil(Math.random() * 25);
                        var secondWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(thirdAnswer == secondAnswer || thirdAnswer == firstAnswer || secondWrongAnswerIndex == firstWrongAnswerIndex || secondWrongAnswerIndex == correctAnswerIndex);
                    cards[secondWrongAnswerIndex].number = thirdAnswer;
                    cards[secondWrongAnswerIndex].isItCorrect = false;
                    do{
                        var fourthAnswer = Math.ceil(Math.random() * 25);
                        var thirdWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(fourthAnswer == thirdAnswer || fourthAnswer == secondAnswer || fourthAnswer == firstAnswer || thirdWrongAnswerIndex == secondWrongAnswerIndex || thirdWrongAnswerIndex == firstWrongAnswerIndex || thirdWrongAnswerIndex == correctAnswerIndex);
                    cards[thirdWrongAnswerIndex].number = fourthAnswer;
                    cards[thirdWrongAnswerIndex].isItCorrect = false;
                    for(let i = 0;i<4;i++){
                        console.log("cards",i,cards[i]);
                    }
                }
                else if(paramOperation == "multiplication"){
                    var firstNumber = Math.ceil(Math.random() * 5);
                    var secondNumber = Math.ceil(Math.random() * 5);
                    var correctAnswerIndex = Math.floor(Math.random() * 4);
                    var firstAnswer = firstNumber * secondNumber;
                    cards[correctAnswerIndex].number =  firstAnswer;
                    cards[correctAnswerIndex].isItCorrect = true;
                    do{
                        var secondAnswer = Math.ceil(Math.random() * 25);
                        var firstWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(secondAnswer == firstAnswer || firstWrongAnswerIndex == correctAnswerIndex);
                    cards[firstWrongAnswerIndex].number = secondAnswer;
                    cards[firstWrongAnswerIndex].isItCorrect = false;
                    do{
                        var thirdAnswer = Math.ceil(Math.random() * 25);
                        var secondWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(thirdAnswer == secondAnswer || thirdAnswer == firstAnswer || secondWrongAnswerIndex == firstWrongAnswerIndex || secondWrongAnswerIndex == correctAnswerIndex);
                    cards[secondWrongAnswerIndex].number = thirdAnswer;
                    cards[secondWrongAnswerIndex].isItCorrect = false;
                    do{
                        var fourthAnswer = Math.ceil(Math.random() * 25);
                        var thirdWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(fourthAnswer == thirdAnswer || fourthAnswer == secondAnswer || fourthAnswer == firstAnswer || thirdWrongAnswerIndex == secondWrongAnswerIndex || thirdWrongAnswerIndex == firstWrongAnswerIndex || thirdWrongAnswerIndex == correctAnswerIndex);
                    cards[thirdWrongAnswerIndex].number = fourthAnswer;
                    cards[thirdWrongAnswerIndex].isItCorrect = false;
                    for(let i = 0;i<4;i++){
                        console.log("cards",i,cards[i]);
                    }
                }
                else if(paramOperation == "subtraction"){
                    var firstNumber = Math.ceil(Math.random() * 25);
                    do{
                        var secondNumber = Math.ceil(Math.random() * (firstNumber - 1));
                    }while(secondNumber >= firstNumber)
                    var correctAnswerIndex = Math.floor(Math.random() * 4);
                    var firstAnswer = firstNumber - secondNumber;
                    cards[correctAnswerIndex].number =  firstAnswer;
                    cards[correctAnswerIndex].isItCorrect = true;
                    do{
                        var secondAnswer = Math.ceil(Math.random() * 25);
                        var firstWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(secondAnswer == firstAnswer || firstWrongAnswerIndex == correctAnswerIndex);
                    cards[firstWrongAnswerIndex].number = secondAnswer;
                    cards[firstWrongAnswerIndex].isItCorrect = false;
                    do{
                        var thirdAnswer = Math.ceil(Math.random() * 25);
                        var secondWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(thirdAnswer == secondAnswer || thirdAnswer == firstAnswer || secondWrongAnswerIndex == firstWrongAnswerIndex || secondWrongAnswerIndex == correctAnswerIndex);
                    cards[secondWrongAnswerIndex].number = thirdAnswer;
                    cards[secondWrongAnswerIndex].isItCorrect = false;
                    do{
                        var fourthAnswer = Math.ceil(Math.random() * 25);
                        var thirdWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(fourthAnswer == thirdAnswer || fourthAnswer == secondAnswer || fourthAnswer == firstAnswer || thirdWrongAnswerIndex == secondWrongAnswerIndex || thirdWrongAnswerIndex == firstWrongAnswerIndex || thirdWrongAnswerIndex == correctAnswerIndex);
                    cards[thirdWrongAnswerIndex].number = fourthAnswer;
                    cards[thirdWrongAnswerIndex].isItCorrect = false;
                    for(let i = 0;i<4;i++){
                        console.log("cards",i,cards[i]);
                    }
                }
                else if(paramOperation == "division"){
                    do{
                    var firstNumber = Math.ceil(Math.random() * 25);
                    }while(firstNumber == 1)
                    console.log("firstNumber: ", firstNumber);
                    var primeFactors = [];
                        for(let i=1;i<=25;i++){
                            if(firstNumber % i == 0)
                                primeFactors.push(i);
                        }
                    console.log("Asal Çarpanlar: ", primeFactors);
                    do{
                        var secondNumber = primeFactors[Math.floor(Math.random() * primeFactors.length)];
                        console.log("secondNumber: ", secondNumber);
                    }while(secondNumber > firstNumber)
                    var correctAnswerIndex = Math.floor(Math.random() * 4);
                    var firstAnswer = firstNumber / secondNumber;
                    cards[correctAnswerIndex].number =  firstAnswer;
                    cards[correctAnswerIndex].isItCorrect = true;
                    do{
                        var secondAnswer = Math.ceil(Math.random() * 25);
                        var firstWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(secondAnswer == firstAnswer || firstWrongAnswerIndex == correctAnswerIndex);
                    cards[firstWrongAnswerIndex].number = secondAnswer;
                    cards[firstWrongAnswerIndex].isItCorrect = false;
                    do{
                        var thirdAnswer = Math.ceil(Math.random() * 25);
                        var secondWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(thirdAnswer == secondAnswer || thirdAnswer == firstAnswer || secondWrongAnswerIndex == firstWrongAnswerIndex || secondWrongAnswerIndex == correctAnswerIndex);
                    cards[secondWrongAnswerIndex].number = thirdAnswer;
                    cards[secondWrongAnswerIndex].isItCorrect = false;
                    do{
                        var fourthAnswer = Math.ceil(Math.random() * 25);
                        var thirdWrongAnswerIndex = Math.floor(Math.random() * 4);
                    }while(fourthAnswer == thirdAnswer || fourthAnswer == secondAnswer || fourthAnswer == firstAnswer || thirdWrongAnswerIndex == secondWrongAnswerIndex || thirdWrongAnswerIndex == firstWrongAnswerIndex || thirdWrongAnswerIndex == correctAnswerIndex);
                    cards[thirdWrongAnswerIndex].number = fourthAnswer;
                    cards[thirdWrongAnswerIndex].isItCorrect = false;
                    for(let i = 0;i<4;i++){
                        console.log("cards",i,cards[i]);
                    }
                }
                else{}
                this.show = function(){
                    ctx.lineWidth = "2";
                    ctx.beginPath();
                    ctx.setLineDash([4]);
                    ctx.moveTo(380, 70);
                    ctx.lineTo(460, 70);
                    ctx.lineTo(460, 175);
                    ctx.lineTo(380, 175);
                    ctx.lineTo(380, 70);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    drawNumber(firstNumber, 140, 150);
                    if(paramOperation == "addition")
                        drawNumber("+", 210, 150);
                    if(paramOperation == "multiplication")
                        drawNumber("x", 210, 150);
                    if(paramOperation == "subtraction")
                        drawNumber("-", 210, 150);
                    if(paramOperation == "division")
                        drawNumber("/", 210, 150);
                    drawNumber(secondNumber, 280, 150);
                    drawNumber("=", 350, 150);
                    drawNumber("?", 420, 150);

                    drawCard("normal",cards[0].number, cards[0].myleft, cards[0].mytop);
                    drawCard("normal",cards[1].number, cards[1].myleft, cards[1].mytop);
                    drawCard("normal",cards[2].number, cards[2].myleft, cards[2].mytop);
                    drawCard("normal",cards[3].number, cards[3].myleft, cards[3].mytop);
                };
            };

    return (
        <div>
        </div>
    )
}