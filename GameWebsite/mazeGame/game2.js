const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cellSize = 20; // Size of each cell in the maze
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);

// Maze generation variables
const maze = [];
const stack = [];
const visited = [];

// Player properties
const player = {
    x: cellSize, // Start position (x)
    y: cellSize, // Start position (y)
    size: cellSize,
    color: 'red',
    speed: 5 // Speed of player movement in pixels
};

// Initialize maze with walls
function initMaze() {
    for (let y = 0; y < rows; y++) {
        maze[y] = [];
        for (let x = 0; x < cols; x++) {
            maze[y][x] = 1; // 1 represents a wall
            visited.push([x, y]);
        }
    }
}

// Generate a random maze using Depth-First Search
function generateMaze(cx, cy) {
    maze[cy][cx] = 0; // 0 represents a path
    visited.splice(visited.indexOf([cx, cy]), 1);
    stack.push([cx, cy]);

    while (stack.length > 0) {
        const [x, y] = stack[stack.length - 1];
        const neighbors = getUnvisitedNeighbors(x, y);

        if (neighbors.length > 0) {
            const [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];
            maze[ny][nx] = 0;
            maze[y + (ny - y) / 2][x + (nx - x) / 2] = 0; // Remove wall between cells
            visited.splice(visited.indexOf([nx, ny]), 1);
            stack.push([nx, ny]);
        } else {
            stack.pop();
        }
    }
}

// Get unvisited neighbors
function getUnvisitedNeighbors(x, y) {
    const neighbors = [];
    if (x > 1 && maze[y][x - 2] === 1) neighbors.push([x - 2, y]);
    if (x < cols - 2 && maze[y][x + 2] === 1) neighbors.push([x + 2, y]);
    if (y > 1 && maze[y - 2][x] === 1) neighbors.push([x, y - 2]);
    if (y < rows - 2 && maze[y + 2][x] === 1) neighbors.push([x, y + 2]);
    return neighbors;
}

// Draw the maze
function drawMaze() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            ctx.fillStyle = maze[y][x] === 1 ? 'black' : 'white';
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

// Draw the player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Handle keyboard input
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Debugging: Check key status
function debugKeys() {
    console.log('Keys:', keys);
}

// Check if the player can move to the new position
function canMoveTo(newX, newY) {
    const left = Math.floor(newX / cellSize);
    const right = Math.floor((newX + player.size) / cellSize);
    const top = Math.floor(newY / cellSize);
    const bottom = Math.floor((newY + player.size) / cellSize);

    // Check if the new position is within maze boundaries
    if (top < 0 || bottom >= rows || left < 0 || right >= cols) {
        console.log('Out of bounds');
        return false;
    }

    // Check if the new position is a path (white)
    for (let row = top; row <= bottom; row++) {
        for (let col = left; col <= right; col++) {
            if (maze[row][col] !== 0) { // 0 represents a path
                console.log(`Collision detected at (${col}, ${row})`);
                return false;
            }
        }
    }

    return true;
}

// Update game logic
function update() {
    let newX = player.x;
    let newY = player.y;

    if (keys['ArrowUp']) newY -= player.speed;
    if (keys['ArrowDown']) newY += player.speed;
    if (keys['ArrowLeft']) newX -= player.speed;
    if (keys['ArrowRight']) newX += player.speed;

    // Check boundaries
    if (newX >= 0 && newX < canvas.width - player.size && newY >= 0 && newY < canvas.height - player.size) {
        if (canMoveTo(newX, newY)) {
            player.x = newX;
            player.y = newY;
        }
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawPlayer();
    update();
    debugKeys(); // Debug key presses
    requestAnimationFrame(gameLoop);
}

// Initialize and generate the maze
function setup() {
    initMaze();
    generateMaze(1, 1); // Start generating the maze from (1, 1)
    gameLoop();
}

// Start the game setup
setup();
