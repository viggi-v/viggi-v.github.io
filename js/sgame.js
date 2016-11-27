var dir = '';
var prevdir = '';
var prevx;
var prevy;
var tx, ty;
var canvas, ctx;
var score = 0;
var myTimer;
var canvasHeight = 504;
var canvasWidth = 504;
var foodCount=0;
var bigFoodScore = 50;
var bigFoodEnabled = 0;
var btx,bty;
var stripSize;

var snake = { head: { x: 0, y: 0 }, keyPoints: [], sLength: 3 };

function fetch() {
    clearInterval(myTimer);
    for (var i = 0; i < snake.keyPoints.length; i++) {
        drawFood(snake.keyPoints[i].x, snake.keyPoints[i].y, 'red', 12);
    }
}

function restart() {
    myTimer = setInterval(updatePos, 100);

}

function initialize() {
    canvas = document.getElementById("myCanvas");
    canvas.width = $("#home").innerWidth();
    canvas.height = 0.85*$("#home").innerHeight();
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    ctx = canvas.getContext("2d");
    stripSize = $("#timeStrip").innerWidth();
}
function updateScore(){
    var scoreStr = '';
    while(scoreStr.length < 5-score.toString().length)
        scoreStr+='0';
    scoreStr+=score.toString();
    document.getElementById("scoreBoard").innerHTML = scoreStr;

}
function drawFood(x, y, col, size) {
    if (size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.closePath();
    } 
    /*
    else {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.strokeStyle = col;
        ctx.stroke();
        ctx.closePath();

    }*/
}

function drawPresentFood() {
    drawFood(tx, ty, 'red', 5);
    if(foodCount==5 || bigFoodEnabled){
        // The big food 
        if(foodCount==5){
            var newTimer = setInterval(decreaseScore,100);
            foodCount = 0;
            bigFoodEnabled = 1;
            btx = Math.floor(Math.random() * (canvasWidth-42));
            bty = Math.floor(Math.random() * (canvasHeight-42));
            btx -= btx%14;
            bty -= bty%14;
            bigFoodScore = 50;
        }

        drawFood(btx,bty,'red',15);
       
        function decreaseScore(){
            if(bigFoodScore>0){
                bigFoodScore-=1;
                renderTimeLeft();
            }
            else{
                bigFoodEnabled = 0;
                clearInterval(newTimer);
                clearTimeLeft();
            }

        }
    }
}
function renderTimeLeft(){
    var val = stripSize*(bigFoodScore/50);
    $("#timeLeft").css("width",val+"px");
}

function resetTargets() {
    tx = Math.floor(Math.random() * (canvasWidth-14));
    ty = Math.floor(Math.random() * (canvasHeight-14));
    tx -= tx%14;
    ty -= ty%14;
    tx+=14;
    tx+=14;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBody();
    drawPresentFood();
}

function updatePos() {
    prevx = snake.head.x;
    prevy = snake.head.y;
    switch (dir) {
        case 'up':
            snake.head.y -= 14;
            break;
        case 'down':
            snake.head.y += 14;
            break;
        case 'right':
            snake.head.x += 14;
            break;
        case 'left':
            snake.head.x -= 14;
            break;
    }
    //In case it cuts the boundary
    if(snake.head.x > canvasWidth){
        addKeyPoint();
        snake.head.x -= canvasWidth;
        addKeyPoint();
    }
    else if(snake.head.x < 0){
        addKeyPoint();
        snake.head.x += canvasWidth;
        addKeyPoint();
    }
    if(snake.head.y > canvasHeight){
        addKeyPoint();
        snake.head.y -= canvasHeight;
        addKeyPoint();
    }
    else if(snake.head.y < 0){
        addKeyPoint();
        snake.head.y += canvasHeight;
        addKeyPoint();
    }
    
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBody();
    drawPresentFood();
    isHeadHit();


    if (Math.abs(snake.head.x - tx) < 7 && Math.abs(snake.head.y - ty) < 7) {
        score++;
        updateScore();
        snake.sLength++;
        foodCount++;
        resetTargets();
    }
    if(Math.abs(snake.head.x - btx) < 15 && Math.abs(snake.head.y - bty) < 15){
        score+=bigFoodScore;
        bigFoodScore=0;
        bigFoodEnabled=0;
        snake.sLength++;
        updateScore();
    }
}
$(document).ready(function() {
    initialize();
    resetTargets();
    myTimer = setInterval(updatePos, 50);

    Mousetrap.bind('up', function() {
        if (dir != 'down') {
            if (dir != 'up')
                addKeyPoint();
            dir = 'up';
        }
    });
    Mousetrap.bind('down', function() {
        if (dir != 'up') {
            if (dir != 'down')
                addKeyPoint();
            dir = 'down';
        }
    });
    Mousetrap.bind('right', function() {
        if (dir != 'left') {
            if (dir != 'right')
                addKeyPoint();
            dir = 'right';
        }
    });
    Mousetrap.bind('left', function() {
        if (dir != 'right') {
            if (dir != 'left')
                addKeyPoint();
            dir = 'left';
        }
    });
    Mousetrap.bind('space', function() {
        if (dir != '') {
            prevdir = dir;
            dir = '';
        } else {
            dir = prevdir;
        }
    });
});


function drawBody() {
    var drawnLength = 1;
    if (snake.keyPoints[0] != undefined) {
        var presentPoint = { x: snake.head.x, y: snake.head.y }
        for (var i = 0; i < snake.keyPoints.length && drawnLength < snake.sLength; i++) {
            /*
             * Render to left if present point,
             * py==ky and px > kx
             */
            if (presentPoint.x > snake.keyPoints[i].x && presentPoint.y == snake.keyPoints[i].y) {
                for (var j = 0; j < presentPoint.x - snake.keyPoints[i].x && drawnLength <= snake.sLength; j += 7) {
                    drawFood(presentPoint.x - j, presentPoint.y, 'green', 5);
                    drawnLength++;
                }
            }
            if (presentPoint.x < snake.keyPoints[i].x && presentPoint.y == snake.keyPoints[i].y) {
                for (var j = 0; j < -presentPoint.x + snake.keyPoints[i].x && drawnLength <= snake.sLength; j += 7) {
                    drawFood(presentPoint.x + j, presentPoint.y, 'green', 5);
                    drawnLength++;
                }
            }
            if (presentPoint.y > snake.keyPoints[i].y && presentPoint.x == snake.keyPoints[i].x) {
                for (var j = 0; j < presentPoint.y - snake.keyPoints[i].y && drawnLength <= snake.sLength; j += 7) {
                    drawFood(presentPoint.x, presentPoint.y - j, 'green', 5);
                    drawnLength++;
                }
            }
            if (presentPoint.y < snake.keyPoints[i].y && presentPoint.x == snake.keyPoints[i].x) {
                for (var j = 0; j < -presentPoint.y + snake.keyPoints[i].y && drawnLength <= snake.sLength; j += 7) {
                    drawFood(presentPoint.x, presentPoint.y + j, 'green', 5);
                    drawnLength++;
                }
            }

            presentPoint.x = snake.keyPoints[i].x;
            presentPoint.y = snake.keyPoints[i].y;
        }
        //Lets clear the remaining keyPoints :)
        snake.keyPoints.splice(i,snake.keyPoints.length);
    }
    
}

function addKeyPoint() {
    var newKeyPoint = { x: snake.head.x, y: snake.head.y };
    snake.keyPoints.unshift(newKeyPoint);
}


function isHeadHit() {
    var target={x:0,y:0};
    switch(dir){
        case 'right':
            target.x = snake.head.x+14;
            target.y = snake.head.y;
            break;
        case 'left':
            target.x = snake.head.x-14;
            target.y = snake.head.y;
            break;
        case 'up':
            target.x = snake.head.x;
            target.y = snake.head.y-14;
            break;
        case 'down':
            target.x = snake.head.x;
            target.y = snake.head.y+14;
            break;
    }
    var p = ctx.getImageData(target.x,target.y,1,1).data;
    if(p[0]==0 && p[1]==128 && p[2]==0)
        gameOver();

}

function gameOver() {
    clearInterval(myTimer);
    setInterval(blink,1000);
}
function blink(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);s   
    setTimeout(drawBody,500);
}

function makeLine(pt1, pt2) {
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.stroke();
    ctx.closePath();
}
