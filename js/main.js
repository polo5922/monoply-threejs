import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { generateCardsUi, exportCard } from "./cards.js";

let cards = exportCard();

class Player {
  constructor(name, position, money, color) {
    this.name = name;
    this.position = position;
    this.money = money;
    this.color = color;
  }

  initPlayer() {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: this.color });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.x = 0.25 * 5;
    this.cube.position.y = 0.16;
    this.cube.position.z = 0.25 * 5;
    scene.add(this.cube);
  }

  async addPosition() {
    if (this.position < 10) {
      for (let i = 0; i < 25; i++) {
        this.cube.position.x -= 0.01;
        await sleep(20);
      }
    }
    if (this.position == 9) {
      this.cube.position.z = this.cube.position.z + 0.18;
      this.cube.position.x = this.cube.position.x - 0.18;
    }
    if (this.position == 10) {
      this.cube.position.z = this.cube.position.z - 0.18;
      this.cube.position.x = this.cube.position.x + 0.18;
    }
    if (this.position >= 10 && this.position < 20) {
      for (let i = 0; i < 25; i++) {
        this.cube.position.z -= 0.01;
        await sleep(20);
      }
    }
    if (this.position >= 20 && this.position < 30) {
      for (let i = 0; i < 25; i++) {
        this.cube.position.x += 0.01;
        await sleep(20);
      }
    }
    if (this.position >= 30 && this.position < 40) {
      for (let i = 0; i < 25; i++) {
        this.cube.position.z += 0.01;
        await sleep(20);
      }
    }
    this.position += 1;
    if (this.position >= 40) {
      this.money += 200;
      this.position = 0;
    }
  }
}
const players = [];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
document.getElementById("board").appendChild(renderer.domElement);

const texture_wood = new THREE.TextureLoader().load("textures/wood.jpg");
const texture_board = new THREE.TextureLoader().load(
  "textures/monopoly_top.jpg"
);

const material_wood = new THREE.MeshBasicMaterial({
  map: texture_wood,
  side: THREE.DoubleSide,
});
const material_board = new THREE.MeshBasicMaterial({
  map: texture_board,
  side: THREE.DoubleSide,
});

const geometry = new THREE.BoxGeometry(1 * 3, 0.08 * 3, 1 * 3);
const cube = new THREE.Mesh(geometry, [
  material_wood,
  material_wood,
  material_board,
  material_wood,
  material_wood,
  material_wood,
]);
scene.add(cube);

camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;

const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

const controls = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

document.getElementById("start_game").addEventListener("click", () => {
  startGame();
});

document.getElementById("Add_Player").addEventListener("click", () => {
  add_player();
});

function add_player() {
  let player_name = document.getElementById("player_name").value;
  let player_color = document.getElementById("player_color").value;
  players.push(new Player(player_name, 0, 1500, new THREE.Color(player_color)));
  document.getElementById("player_name").value = "";
  document.getElementById("player_color").value = "";
  document.getElementById("player_name").focus();
  if (players.length >= 2) {
    document.getElementById("start_game").style.display = "block";
  } else {
    document.getElementById("start_game").style.display = "none";
  }
}

var current_player;
function startGame() {
  current_player = 0;
  document.getElementById(
    "current_player"
  ).innerHTML = `Current Player: ${players[current_player].name}`;
  document.getElementById("start_game").style.display = "none";
  document.getElementById("roll_dice").style.display = "block";
  document.getElementById("players_form").style.display = "none";
  document.getElementById("Add_Player").style.display = "none";
  players.forEach((player) => {
    player.initPlayer();
  });
}

animate();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let finish_round = true;
document.getElementById("roll_dice").addEventListener("click", async () => {
  if (finish_round) {
    finish_round = false;
    let random = Math.floor(Math.random() * 6) + 1;
    let random2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice").innerHTML = `Dice: ${random} + ${random2}`;
    for (let i = 0; i < random + random2; i++) {
      players[current_player].addPosition();
      players[current_player].cube.position.y = 0.16;
      await sleep(1000);
    }
    cards.map((card) => {
      if (card.position == players[current_player].position) {
        console.table(card);
        generateCardsUi(card, current_player);
        try {
          if (card.owner != null) {
            document.getElementById("payRent").addEventListener("click", () => {
              console.log(card);
              payRent(card, players[current_player]);
              closeCard();
            });
          } else {
            //event listener for buy button
            document.getElementById("buyCard").addEventListener("click", () => {
              console.log(card);
              buyCard(card, players[current_player]);
              closeCard();
            });

            //event listener for close button
            document
              .getElementById("closeCard")
              .addEventListener("click", () => {
                closeCard();
              });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
    players.forEach((element) => {
      if (
        element.position == players[current_player].position &&
        element != players[current_player]
      ) {
        players[current_player].cube.position.y += 0.1;
      }
    });
    document.getElementById("finish_turn").style.display = "block";
    // console.log(players.length, current_player);
  }
});

document.getElementById("finish_turn").addEventListener("click", () => {
  finishTurn();
});
function finishTurn() {
  finish_round = true;
  if (current_player != players.length - 1) {
    current_player += 1;
  } else {
    current_player = 0;
  }
  document.getElementById("finish_turn").style.display = "none";
  document.getElementById("dice").innerHTML = "";
  document.getElementById(
    "current_player"
  ).innerHTML = `Current Player: ${players[current_player].name}`;
}

function closeCard() {
  document.querySelector(".card").style.display = "none";
}

function buyCard(card, player) {
  if (player.money >= card.price) {
    player.money -= card.price;
    card.owner = current_player;
  }
  console.table(card);
}

function payRent(card, player) {
  if (player.money >= card.rent) {
    player.money -= card.rent;
    players[card.owner].money += card.rent;
  }
  players.forEach((element) => {
    console.log(element.name, element.money);
  });
}
