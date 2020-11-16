var count;

const losemsg = document.querySelector("#losemsg");
const loseScreen = document.querySelector(".lose");
const timeHolder = document.querySelector("#timecontainer");
const gameTime = document.querySelector("#gametimecount");
const unameContainer = document.querySelector("#username_container");
const gameCoinCount = document.querySelector("#gamecoincount");
const coin_amount = document.querySelector("#coin_amount_container");

const share_inputs = document.querySelectorAll(".share_input");

const gameImages = document.querySelectorAll(".game_image");

var timerInterval = setInterval(timer, 1000);

gameTime.innerHTML = "00:00:00";
gameCoinCount.innerHTML = "0";

window.onload = function() {
    canv = document.getElementById("canvas");
    canv2 = document.getElementById("canvas2");
    canv3 = document.getElementById("canvas3");

    ctx = canv.getContext("2d");
    ctx2 = canv2.getContext("2d");
    ctx3 = canv3.getContext("2d");

    document.addEventListener("keydown", getKeyCode);
    
    setInterval(game, 10);
    setInterval(checkFail, 50);
    setInterval(checkCoinCollect, 50);
    spawnBot();
    spawnCoin(5);

}


playerx = playery = 10;
gamesc = tilecount = 50;

botx = boty = 0;

player_xv = player_yv = 0;
player_xv = 0;

var dude = [];
var botxArray = [];
var botyArray = [];

var seconds = 0;
var minutes = 0;
var hours = 0;

var coinxArray = [];
var coinyArray = [];
var coinxIndex;
var coinyIndex;

var collectedCoins = [];

var endGameStats = [];

virus_image = new Image();
virus_image.src = "img/virusicon.png";

base_image = new Image();
base_image.src = "img/hand_sanitizer.png";

player_image = new Image();
player_image.src = "img/user.png";

function game() {
    
    playerx += player_xv;
    playery += player_yv;

    if(playerx == 0) {
        playerx = 0;
        player_xv = 0;
    }

    if(playerx > canv.width - gamesc) {
        playerx = canv.width - tilecount;
        player_xv = 0;
    }

    if(playery < 0) {
        playery = 0;
        player_yv = 0;
    }

    if(playery == canv.height - tilecount) {
        playery = canv.height - tilecount;
        player_yv = 0;
    }
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.drawImage(player_image, playerx, playery, gamesc, gamesc);

    //Getting information from function checkFail
    if(checkFail()) {
        collectedCoins = [];
        gameCoinCount.innerHTML = 0;
        player_xv = 0;
        player_yv = 0;
        playerx = 10;
        playery = 10;

        console.log(endGameStats);
        seconds = 0;
        minutes = 0;
        hours = 0;
    }

    if(checkCoinCollect()) {
        spawnCoin(1);
        console.log("Spawn anotha one!");
        console.log(coinxArray.length);
    }
}

function getKeyCode(e) {
    if(e.keyCode == 39) {
        /*Move right*/
        player_xv = 5;
        player_yv = 0;

    } else if(e.keyCode == 37) {
        /*Move left*/
        if(playerx !== 0) {
            player_xv = -5;
            player_yv = 0;
        }

    } else if(e.keyCode == 38) {
        /*Move up*/
        player_yv = -5;
        player_xv = 0;

    } else if(e.keyCode == 40) {
        /*Move down*/
        if(playery !== canv.height - tilecount) {
            player_yv = 5;
            player_xv = 0;
        }
    } else if(e.keyCode == 32) {
        player_xv = 0;
        player_yv = 0;
    }
}

function spawnBot() {
var differenceX2;
var differenceY2;
var difference2;
if(dude.length !== 15) {
    ctx2.fillStyle = "purple";
    for(var i = 0; i < 10; i++) {
        var randomx = Math.floor(Math.random()*700);
        var randomy = Math.floor(Math.random()*700);

        botx = randomx;
        boty = randomy;

        botxArray.push(botx);
        botyArray.push(boty);

        ctx2.drawImage(virus_image, botx, boty, gamesc, gamesc);
        dude.push(1);

    }

}

}

function spawnCoin(count) {
for(var i = 0; i < count; i++) {
    console.log("coin spawned");

    var randomCoinX = Math.floor(Math.random()*700);
    var randomCoinY = Math.floor(Math.random()*700);

    coinxArray.push(randomCoinX);
    coinyArray.push(randomCoinY);

    ctx3.fillStyle = "yellow";
    ctx3.drawImage(base_image, randomCoinX, randomCoinY, tilecount, tilecount);
    console.log(coinxArray);
}
}

function checkCoinCollect() {
for(var i = 0; i < coinxArray.length; i++) {

    if(playerx > coinxArray[i]) {
        differenceXX = playerx - coinxArray[i];
    } else {
        differenceXX = coinxArray[i] - playerx;
    }

    if(playery > coinyArray[i]) {
        differenceYY = playery - coinyArray[i];
    } else {
        differenceYY = coinyArray[i] - playery;
    }

    differencee = differenceXX + differenceYY;
    
    if(differencee < tilecount) {
        //Right here is where we know whether player has collected coin or not
        coinxIndex = coinxArray.indexOf(coinxArray[i]);
        coinyIndex = coinyArray.indexOf(coinyArray[i]);
        ctx3.clearRect(coinxArray[i], coinyArray[i], tilecount, tilecount);

        delete coinxArray[coinxIndex];
        delete coinyArray[coinyIndex];

        collectedCoins.push("coin");
        gameCoinCount.innerHTML = collectedCoins.length;
        return true;

    } else {
        continue;
    }
}
}

var differenceX;
var differenceY;
var difference;

function checkFail() {

for(var i = 0; i < 15; i++) {
    
    //Checking difference between playerx and botx position
    //There are several bots, but only one player. Therefore botx needs to be looped through. Hence "botx[i]".
    if(playerx > botxArray[i]) {
        differenceX = playerx - botxArray[i];
    } else {
        differenceX = botxArray[i] - playerx;
    }

    //Checking difference between playery and boty
    //Same goes for this one
    if(playery > botyArray[i]) {
        differenceY = playery - botyArray[i];
    } else {
        differenceY = botyArray[i] - playery;
    }

    difference = differenceX + differenceY;
    if(difference < tilecount) {
        //Right here is where we know whether player lost or not.
        return true;
    }
}
}

function timer() {
seconds++;

if(seconds == 60) {
    minutes++;
    seconds = 0;
}

if(minutes == 60) {
    hours++;
    minutes = 0;
}

if(minutes.toString().length == 1) {
    minutes = "0" + minutes.toString();
}

if(seconds.toString().length == 1) {
    seconds = "0" + seconds.toString();
}

if(hours.toString().length == 1) {
    hours = "0" + hours.toString();
}

gameTime.innerHTML = hours + ":" + minutes + ":" + seconds;

return hours + ":" + minutes + ":" + seconds;
}
