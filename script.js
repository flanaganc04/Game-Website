// Example of how you might load games dynamically
document.addEventListener('DOMContentLoaded', () => {
    const gameList = document.getElementById('game-list');
    const games = [
        { name: ' Game 1 ', url: 'game1.html' },
        { name: ' Maze Game ', url: 'game2.html' },
        {name: ' Unity FPS ', url: 'https://play.unity.com/en/games/6c829705-eff4-4b95-9be3-0e46a7c61d5f/webgl-builds'}
    ];
    games.forEach(game => {
        const link = document.createElement('a');
        link.href = game.url;
        link.textContent = game.name;
        link.className = "indexMain"
        gameList.appendChild(link);
    });
    
});
