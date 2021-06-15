const dino = document.getElementById("dino");

function jump() {
    if (dino.classList != "jump" && event.code === 'Space') {
    dino.classList.add("jump");
    setTimeout(function() {
        dino.classList.remove("jump");
    }, 350);
}
}

let isAlive = setInterval(function() {
    let dinoTop = parseFloat(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseFloat(window.getComputedStyle(cactus).getPropertyValue("left"));
    let difference = dinoTop - 110;
    
    if (cactusLeft < 40 && cactusLeft > 1) {
        if ((cactusLeft > 25) && (difference > 20)) {
            console.log(cactusLeft, difference);
            alert("Game Over!");
        }
        else if ((cactusLeft < 25) && (difference > 2)) {
            console.log(cactusLeft, difference);
            alert("Game Over!");
        }
    }

}, 10);

document.addEventListener("keydown", jump);