const canvas = document.querySelector(".gameCanva");
const ctx = canvas.getContext("2d");
const startmenu = document.querySelector(".menugame");
const startBtn = document.querySelector("#btn-start");

// configuracoes gerais
const boxSize = 30;
const canvasSize = 600;
const bgCanvas = "#e8f5e9";
const snakeHead = "#686868";
const snakeBody = "#000000";
const appleColor = "#e41e0f"
let snake =[];
let apple ={};
let direction = ""; // esquerda, direita, cima, baixo
let gameInterval; //flag

function initGame(){
    // faz o menu sumir
    startmenu.style.display = "none";
    // coloca a tela de jogo
    canvas.style.display = "block";
    //BOTTOM = PARA BAIXO;
    snake = [
        {
            x:  9 * boxSize,
            y:  9* boxSize
        }
    ]

    direction = "RIGHT"; //PARA DIREITA
    //desenhar a maça na tela 
    drawApple();
    //se aconteceu o jogo anteriormente
    if(gameInterval){
        //delete os dados da seçao
        clearInterval(gameInterval);

    // setInterval(funcao,tempo_para_chamar_funcao(em ms))
    }

    gameInterval = setInterval(drawGame, 130)
}

function drawApple(){
    apple = {
        // math.floor(1.5) = 1
        x: Math.floor(
            Math.random()* ( canvasSize / boxSize )) *boxSize,

        y: Math.floor(
        Math.random()* ( canvasSize / boxSize)
    ) *boxSize

    }
}
// keydown = pressionar tecla para baixo
// EventLinster = "Secretário de Eventos"
// Se uma tecla for pressionada, ele nos avisa
document.addEventListener("keydown",
    (event) => {    
        let key = event.keyCode;

        // 37= esquerda, 38 = cima, 39 = direita, 40 = baixo
        const arrayKeys = [37, 38, 39, 40];
        if(arrayKeys.includes(key)){
        event.preventDefault();
    }
        if(key === 38 && direction != "DOWN"){
        direction = "UP"
        }else if(key === 37 && direction != "RIGHT"){
            direction = "LEFT";
        }else if(key === 39 && direction != "LEFT"){
            direction = "RIGHT";
        }else if(key === 40 && direction != "UP"){
            direction ="DOWN";
        }
    }

)
function drawGame() {

    ctx.fillStyle = bgCanvas;
    ctx.fillRect(0,0,canvasSize, canvasSize);

    let tamanho_cobra = snake.length; 
    for (let i = 0; i< tamanho_cobra; i++){

        ctx.fillStyle = (i===0) ? snakeHead : snakeBody;
        ctx.strokeRect(snake[i].x, snake[i].y,boxSize,boxSize);

        ctx.fillStyle = bgCanvas;
        ctx.strokeRect(0, 0, boxSize, boxSize)
    }

        ctx.fillStyle = appleColor;

        ctx.beginPath();
        ctx.arc(apple.x + boxSize / 2, apple.y + boxSize / 2, boxSize/2.2, 0, Math.PI * 2);

        ctx.fill(); 
        
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction == "LEFT") snakeX -= boxSize;
        if (direction == "UP") snakeY -= boxSize;
        if (direction == "RIGHT") snakeX += boxSize;
        if (direction == "DOWN") snakeY += boxSize;

        if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || checkCollision(snakeX, snakeY, snake)){
            clearInterval(gameInterval);
            alert("Fim de Jogo! A cobra comeu " + (snake.length - 1) + "maçãs.");
            startmenu.style.display = "block";
            canvas.style.display = "none";
            return;
        }

        if (snakeX === apple.x && snakeY === apple.y){
            drawApple();
        } else {
            snake.pop();
        }
        let newHead = { x: snakeX, y: snakeY };
        snake.unshift(newHead);
}
 

function checkCollision(headX, headY, array) {
    for (let i = 0; i < array.length; i++){
        if (headX == array[i].x && headY == array[i].y){
            return true;
        }
    }
    return false;
}

startBtn.addEventListener("click", initGame);

