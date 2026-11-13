// src/game/main.js
import kaplay from "kaplay";
import startSceneImg from "../assets/start_scene.png";
import endSceneImg from "../assets/q26.png";
import { QUESTIONS } from "./questions.js";
import * as fns from "./functions.js";

export function initGame(container, onComplete = () => {}) {
  if (!container) throw new Error("Container element not provided");
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Scale down proportionally for mobile
  const scaleFactor = isMobile ? 0.6 : 1;
  const gameWidth = 800 * scaleFactor;  // 480 on mobile
  const gameHeight = 600 * scaleFactor; // 360 on mobile

  const game = kaplay({ 
    root: container, 
    width: gameWidth, 
    height: gameHeight,
    stretch: false,
  });

  // Make mobile detection available to other functions
  game.isMobile = isMobile;
  game.scaleFactor = scaleFactor;

//   const game = kaplay({ root: container, width: 800, height: 600,stretch: false });

  // Load sprites
  game.loadSprite("start_scene", startSceneImg);
  game.loadSprite("end_scene", endSceneImg);

  // Global state
  let gameState = { currentQuestion:1, score:0, totalQuestions:QUESTIONS.length, isTransitioning:false };

  // ---------------- MENU ----------------
  game.scene("menu", ()=>{
    // --- BACKGROUND ---
game.add([
    game.sprite("start_scene"),
    game.pos(0, 0),
    game.scale(game.width() / 1024),
    game.fixed()
]);


// --- START BUTTON ---
const btnWidth = 200;
const btnHeight = 50;
const btnX = game.width()/2 - btnWidth/2;
const btnY = game.height()/2 + 50;

game.add([
  game.rect(btnWidth, btnHeight),
  game.pos(btnX, btnY),
  game.color(0, 150, 0),
  game.outline(2, game.color(0,200,0)),
  game.area({ cursor: "pointer" }), // ← must be here
  "startButton",
  game.fixed() // keep on top
]);

game.add([
  game.text("Start Game", {size:24}),
  game.pos(game.width()/2, btnY + btnHeight/2),
  game.anchor("center"),
  game.color(255,255,255),
  game.fixed()
]);
// game.add([
//     game.rect(200, 50),
//     game.pos(game.width() / 2 - 100, game.height() / 2 + 50),
//     game.color(0, 150, 0),
//     game.outline(2, game.color(0, 200, 0)),
//     game.area(),
//     "startButton"
// ]);

// game.add([
//     game.text("Start Game", { size: 24, font: "sans-serif" }),
//     game.pos(game.width() / 2, game.height() / 2 + 75),
//     game.anchor("center"),
//     game.color(255, 255, 255),
//     game.fixed()
// ]);

// --- HOW TO PLAY BUTTON ---
game.add([
    game.rect(200, 50),
    game.pos(game.width() / 2 - 100, game.height() / 2 + 120),
    game.color(0, 100, 200),
    game.outline(2, game.color(0, 150, 255)),
    game.area(),
    "howToButton"
]);

game.add([
    game.text("How to Play", { size: 24, font: "sans-serif" }),
    game.pos(game.width() / 2, game.height() / 2 + 145),
    game.anchor("center"),
    game.color(255, 255, 255),
    game.fixed()
]);

// --- INSTRUCTION TEXT ---
game.add([
    game.text("Use WASD or Arrow Keys to move your character to the correct answer!", {
        size: 16,
        font: "sans-serif"
    }),
    game.pos(game.width() / 2, game.height() / 2 + 200),
    game.anchor("center"),
    game.color(0, 0, 0),
    game.fixed()
]);

// --- BUTTON LOGIC ---

game.onClick("startButton", () => {
  console.log("Button clicked!"); // test first
  gameState.currentQuestion = 1;
  gameState.score = 0;
  game.go("game");
});
// game.onClick("startButton", () => {
//     gameState.currentQuestion = 1;
//     gameState.score = 0;
//     game.go("game");
// });

game.onClick("howToButton", () => {
    alert(
        "How to Play:\n\n" +
        "1. Use WASD or Arrow Keys to move your character\n" +
        "2. Walk to the answer option you think is correct\n" +
        "3. Your character will automatically select the answer when you touch it\n" +
        "4. Learn about earthquake safety through 25 different scenarios!\n\n" +
        "Good luck and stay safe!"
    );
});

  });

  // ---------------- GAME ----------------
  fns.loadAssets(game);
  game.scene("game", ()=>{
    // fns.addPlayer(game);
    fns.loadQuestion(game, gameState.currentQuestion, gameState);
  });

  // ---------------- END ----------------
// In your main.js or endScene.js
game.scene("end", () => {
    onComplete({ score: gameState.score, total: gameState.totalQuestions });

    // Background sprite
    game.add([
        game.sprite("end_scene"),
        game.pos(0, 0),
        game.scale(game.width() / 1920),
        game.fixed(),
    ]);

    // Score text
    game.add([
        game.text(`You scored ${gameState.score} out of ${gameState.totalQuestions}`, {
            size: 32,
            font: "sans-serif"
        }),
        game.pos(game.width() / 2, game.height() / 2 - 75),
        game.anchor("center"),
        game.color(0, 0, 0),
        game.fixed()
    ]);

    // Message text
    const percentage = Math.round((gameState.score / gameState.totalQuestions) * 100);
    let message = "";
    if (percentage >= 90) {
        message = "Excellent! You're an earthquake safety expert!";
    } else if (percentage >= 70) {
        message = "Great job! You know how to stay safe during earthquakes!";
    } else if (percentage >= 50) {
        message = "Good work! Keep learning about earthquake safety!";
    } else {
        message = "Keep practicing! Earthquake safety is important!";
    }

    game.add([
        game.text(message, {
            size: 24,
            font: "sans-serif"
        }),
        game.pos(game.width() / 2, game.height() / 2 - 25),
        game.anchor("center"),
        game.color(0,0,0),
        game.fixed()
    ]);

    // --- PLAY AGAIN BUTTON ---
    game.add([
        game.rect(200, 50),
        game.pos(game.width() / 2 - 100, game.height() / 2 + 50),
        game.color(0, 150, 0),
        game.outline(2, game.color(0, 200, 0)),
        game.area(),
        "replayButton"
    ]);

    game.add([
        game.text("Play Again", {
            size: 24,
            font: "sans-serif"
        }),
        game.pos(game.width() / 2, game.height() / 2 + 75),
        game.anchor("center"),
        game.color(255, 255, 255),
        game.fixed()
    ]);

    // --- MAIN MENU BUTTON ---
    game.add([
        game.rect(200, 50),
        game.pos(game.width() / 2 - 100, game.height() / 2 + 120),
        game.color(100, 100, 100),
        game.outline(2, game.color(150, 150, 150)),
        game.area(),
        "menuButton"
    ]);

    game.add([
        game.text("Main Menu", {
            size: 24,
            font: "sans-serif"
        }),
        game.pos(game.width() / 2, game.height() / 2 + 145),
        game.anchor("center"),
        game.color(255, 255, 255),
        game.fixed()
    ]);

    // --- BUTTON LOGIC ---
    game.onClick("replayButton", () => {
        gameState.currentQuestion = 1;
        gameState.score = 0;
        game.go("game");
    });

    game.onClick("menuButton", () => {
        game.go("menu");
    });
});


  // Load assets
//   fns.loadAssets(game);
  game.go("menu");

  return { destroy: () => { game.quit(); container.replaceChildren(); } };
}
