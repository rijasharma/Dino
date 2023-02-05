console.log("hello");

document.addEventListener("DOMContentLoaded", () => {

    const game = document.querySelector(".game");
    const dino = document.querySelector(".dino");
    const sky = document.querySelector(".sky");

    let dinoLeft = 50;
    let dinoBottom = 0;
    let move = 150;
    let gravity = 4;
    let games = false;
    let score = 0;

    // STARTING THE GAME.......>>>>>>>>

    function start() {
        if (dinoBottom > 0) {
            dinoBottom -= gravity;
        }
        dino.style.left = dinoLeft + "px";
        dino.style.bottom = dinoBottom + "px";
    }

    let dinoTimerId = setInterval(start, 30);

    function control(e) {
        if (dinoBottom <= 0) {
            if (e.keyCode === 32) {
                dinojump();
            }
        }

    }

    function dinojump() {
        dinoBottom += move;
        dino.style.bottom = dinoBottom + "px";

    }


    document.addEventListener("keyup", control);


    // CLOUD CREATION.........>>>>>>>>>>

    function createcloud() {
        let cloudLeft = Math.random() * 50 + 840;
        let cloudTop = Math.random() * 50 + 80;

        const cloud = document.createElement("div")
        cloud.classList.add("cloud");
        cloud.style.left = cloudLeft + "px";
        cloud.style.top = cloudTop + "px";

        sky.appendChild(cloud);

        function cloudmove() {
            cloudLeft -= 2;
            cloud.style.left = cloudLeft + "px";
            cloud.style.top = cloudTop + "px";

            if (cloudLeft === -60) {
                sky.removeChild(cloud);
            }

            if (games) {
                clearInterval(cloudTimerId);
            }
        }

        let cloudTimerId = setInterval(cloudmove, 20);
        if (!games) setTimeout(createcloud, 7000);
    }

    createcloud()


    //  BARRIER CREATION.......>>>>>>>>>

    function createBarrier() {

        let boxLeft = 600;
        let boxBottom = Math.random() * 50 + 30;
        const barrier = document.createElement("div");
        if (!games) barrier.classList.add("box");
        barrier.style.left = boxLeft + "px";
        barrier.style.bottom = boxBottom + "px";
        game.appendChild(barrier);

        function barriermove() {
            boxLeft -= 2;
            barrier.style.left = boxLeft + "px";
            barrier.style.bottom = boxBottom + "px";

            if (boxLeft === -60) {

                game.removeChild(barrier);
            }
            if ((boxLeft < 80 && boxLeft > 50) && (dinoBottom < boxBottom - 6)) {
                clearInterval(barrierTimerId);
                gameover()
            }
            if (boxLeft < 23 && boxLeft > 20 && !games) {
                score++;
                document.getElementById("score").innerHTML = score;
                console.log(score);
            }
        }

        let barrierTimerId = setInterval(barriermove, 20);
        if (!games) setTimeout(createBarrier, Math.floor(Math.random() * 3000 + 1000));
    }

    createBarrier();


    //  GAME-OVER CONDITION

    function gameover() {
        clearInterval(dinoTimerId);

        console.log("gameover");
        document.removeEventListener("keyup", control);
        games = true;
        overButton()
    }

    // GAME-OVER BUTTON

    function overButton() {
        const button = document.createElement("div");
        const header = document.createElement("h1");
        button.classList.add("game-over");
        header.classList.add("header");
        button.innerHTML = "RESTART";
        header.innerHTML = "GAME-OVER";
        button.style.backgroundColor = "red";
        game.appendChild(button);
        game.appendChild(header);
        button.addEventListener("click", () => {
            window.location.reload();
        }, 1000);
    }

});