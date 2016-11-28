var dir = '',prevdir = '';
var prevx,prevy;
var tx=0, ty=0;
var btx,bty;
var canvas, ctx;
var score = 0;
var myTimer;
var canvasHeight = 504;
var canvasWidth = 504;
var foodCount=0;
var bigFoodScore = 50;
var bigFoodEnabled = 0;
var stripSize;
/* Caution 
 * =======
 * pixelSize is not what you think:
 * the entire screen is divided into grids of pixelSize and the snake doesnt move out of the grid lines
 * Also the food is always aligned to grid size
 */
var pixelSize = 14;

var snake = { head: { x: 0, y: 0 }, keyPoints: [], sLength: 3 };

/*    
    function fetch() {
        clearInterval(myTimer);
        for (var i = 0; i < snake.keyPoints.length; i++) {
            drawFood(snake.keyPoints[i].x, snake.keyPoints[i].y, 'red', 12);
        }
    }

    function restart() {
        myTimer = setInterval(updatePos, 100);
    }

    function makeLine(pt1, pt2) {
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.stroke();
        ctx.closePath();
    }
*/
function initialize() {
    canvas = document.getElementById("myCanvas");
    canvas.width = $("#home").innerWidth() - $("#home").innerWidth()%pixelSize;
    canvas.height = 0.85*$("#home").innerHeight();
    canvas.height -= canvas.height%pixelSize;
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
}

function drawPresentFood() {
    drawFood(tx, ty, 'red', 5);
    if(foodCount==5 || bigFoodEnabled){
        // The big food 
        if(foodCount==5){
            var newTimer = setInterval(decreaseScore,100);
            foodCount = 0;
            bigFoodEnabled = 1;
            do{
                btx = Math.floor(Math.random() * (canvasWidth-42));
                bty = Math.floor(Math.random() * (canvasHeight-42));
                btx -= btx%pixelSize;
                bty -= bty%pixelSize;
                var p = ctx.getImageData(btx,bty,1,1);
            }while(p[0]===0 && p[1]!==128 && p[2]===0);
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
    if($(".banner").css("visibility")!="visible")
        $(".banner").css("visibility","visible");
    $("#timeLeft").css("width",val+"px");
}
function clearTimeLeft(){
    $(".banner").css("visibility","hidden");
}
function resetTargets() {
    tx = Math.floor(Math.random() * (canvasWidth-pixelSize));
    ty = Math.floor(Math.random() * (canvasHeight-pixelSize));
    var p = ctx.getImageData(tx,ty,1,1);
    
    //This was coz sometimes we get food on top of a snake 
    if(p[0]==0 && p[1]==128 && p[2]==0)
        resetTargets();
    
    tx -= tx%pixelSize;
    ty -= ty%pixelSize;
    //tx+=14;
    //ty+=14; 
}

function updatePos() {
    prevx = snake.head.x;
    prevy = snake.head.y;
    switch (dir) {
        case 'up':
            snake.head.y -= pixelSize;
            break;
        case 'down':
            snake.head.y += pixelSize;
            break;
        case 'right':
            snake.head.x += pixelSize;
            break;
        case 'left':
            snake.head.x -= pixelSize;
            break;
    }
    //In case it cuts the boundary
    if(snake.head.x > canvasWidth){
        addKeyPoint();
        snake.head.x -= canvasWidth+pixelSize;
        addKeyPoint();
    }
    else if(snake.head.x < 0){
        addKeyPoint();
        snake.head.x += canvasWidth+pixelSize;
        addKeyPoint();
    }
    if(snake.head.y > canvasHeight){
        addKeyPoint();
        snake.head.y -= canvasHeight+pixelSize;
        addKeyPoint();
    }
    else if(snake.head.y < 0){
        addKeyPoint();
        snake.head.y += canvasHeight+pixelSize;
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBody();
        drawPresentFood();
    }
    if(Math.abs(snake.head.x - btx) < 15 && Math.abs(snake.head.y - bty) < 15){
        score+=bigFoodScore;
        bigFoodScore=0;
        bigFoodEnabled=0;
        snake.sLength++;
        updateScore();
    }
}


function drawBody() {
    // delta was the key :)
    // 
    var delta;
    var drawnLength = 1;
    if (snake.keyPoints[0] != undefined) {
        var presentPoint = { x: snake.head.x, y: snake.head.y }
        for (var i = 0; i < snake.keyPoints.length && drawnLength < snake.sLength; i++) {
            /*
             * Render to left if present point,
             * py==ky and px > kx
             */
            if (presentPoint.x > snake.keyPoints[i].x && presentPoint.y == snake.keyPoints[i].y) {
                delta = presentPoint.x - snake.keyPoints[i].x ;
                for (var j = 0; j < delta && delta < canvasWidth-1 && drawnLength <= snake.sLength; j += 7) {
                    drawFood(presentPoint.x - j, presentPoint.y, 'green', 5);
                    drawnLength++;
                }
            }
            if (presentPoint.x < snake.keyPoints[i].x && presentPoint.y == snake.keyPoints[i].y) {
                delta = snake.keyPoints[i].x - presentPoint.x ;
                for (var j = 0; j < delta && delta < canvasWidth-1 && drawnLength <= snake.sLength; j += 7) {
                    drawFood(presentPoint.x + j, presentPoint.y, 'green', 5);
                    drawnLength++;
                }
            }
            if (presentPoint.y > snake.keyPoints[i].y && presentPoint.x == snake.keyPoints[i].x) {
                delta = presentPoint.y - snake.keyPoints[i].y ;
                for (var j = 0; j < delta && delta < canvasHeight-1 && drawnLength <= snake.sLength; j += 7) {
                    drawFood(presentPoint.x, presentPoint.y - j, 'green', 5);
                    drawnLength++;
                }
            }
            if (presentPoint.y < snake.keyPoints[i].y && presentPoint.x == snake.keyPoints[i].x) {
                delta = snake.keyPoints[i].y - presentPoint.y ;
                for (var j = 0; j < delta && delta < canvasHeight-1 && drawnLength <= snake.sLength; j += 7) {
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
/*
 * The keyPoints keep track of the bendings of the body
 */ 
function addKeyPoint() {
    var newKeyPoint = { x: snake.head.x, y: snake.head.y };
    snake.keyPoints.unshift(newKeyPoint);
}

/*
 * Sad but isHeadHit still has error when it comes to border crossing:
 * Hope it will get fixed soon :)
 *   ((
 *   (.)
 *   /|\
 *   / \
 * I Hope tin-tin will save me :*
 */

function isHeadHit() {
    var target={x:0,y:0};
    switch(dir){
        case 'right':
            target.x = (snake.head.x+pixelSize)%canvasWidth;
            
            //target.x = snake.head.x+pixelSize;
            target.y = snake.head.y;
            break;
        case 'left':
            target.x = snake.head.x-pixelSize;
            target.y = snake.head.y;
            if(snake.head.x == 0){
                target.x = canvasWidth-pixelSize;
            }
            break;
        case 'up':
            target.x = snake.head.x;
            target.y = snake.head.y-pixelSize;
            if(snake.head.y == 0)
                target.y = canvasHeight-pixelSize;
            break;
        case 'down':
            target.x = snake.head.x;
            target.y = (snake.head.y+pixelSize)%canvasHeight;
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
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    setTimeout(drawBody,500);
}


$(document).ready(function() {
    initialize();
    resetTargets();
    // Kick off!!    
    myTimer = setInterval(updatePos, 50);

    //The event handlers
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

