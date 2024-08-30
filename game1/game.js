// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Square properties
const square = {
    x: canvas.width / 2 - 25,
    y: canvas.height / 2 - 25,
    size: 50,
    color: 'blue',
    speed: 5
};

// Handle keyboard input
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Update game logic
function update() {
    if (keys['ArrowUp']) square.y -= square.speed;
    if (keys['ArrowDown']) square.y += square.speed;
    if (keys['ArrowLeft']) square.x -= square.speed;
    if (keys['ArrowRight']) square.x += square.speed;

    // Boundary checks
    if (square.x < 0) square.x = 0;
    if (square.y < 0) square.y = 0;
    if (square.x + square.size > canvas.width) square.x = canvas.width - square.size;
    if (square.y + square.size > canvas.height) square.y = canvas.height - square.size;
}

// Render the game
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.size, square.size);
}

// Game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Handle canvas clicks
canvas.addEventListener('click', () => {
    square.color = square.color === 'blue' ? 'red' : 'blue';
});

// Start the game loop
gameLoop();
