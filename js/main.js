import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { generateCardsUi, exportCard } from "./cards.js";

let cards = exportCard();

const card_group = new THREE.Group();
class card_properties {
  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  changeColor(color) {
    this.cube.material.color.set(color);
  }

  initCard() {
    let x = 0;
    let y = 0;
    let z = 0;
    let not_visible = [1, 3, 6, 9, 17, 22, 33, 36, 38];
    if (!not_visible.includes(this.position)) {
      if (
        (this.position > 10 && this.position < 20) ||
        (this.position > 30 && this.position < 40)
      ) {
        x = 0.1;
        y = 0.05;
        z = 0.2;
      } else {
        x = 0.2;
        y = 0.05;
        z = 0.1;
      }
    }

    if (not_visible.includes(this.position)) {
      this.color = "black";
    }
    // x = 0.2;
    // y = 0.05;
    // z = 0.1;
    const geometry = new THREE.BoxGeometry(x, y, z);
    // console.log(this.color);
    const color = new THREE.Color(this.color);
    const material = new THREE.MeshBasicMaterial({ color: color });
    this.cube = new THREE.Mesh(geometry, material);
    card_group.add(this.cube);
    if (this.position < 10) {
      this.cube.name = "card_" + (this.position + 1);
    }
    if (this.position > 10) {
      this.cube.name = "card_" + this.position;
    }

    if (this.position < 10) {
      let x = 0.25 * -(this.position - 4);
      // console.log(x);
      this.cube.position.x = x;
      this.cube.position.y = 0;
      this.cube.position.z = 0.25 * 6;
    }
    if (this.position > 10 && this.position < 20) {
      let modulo = this.position % 10;
      let z = 0.25 * (modulo - 5);
      // console.log(x);
      this.cube.position.x = -1.5;
      this.cube.position.y = 0;
      this.cube.position.z = -z;
    }
    if (this.position > 20 && this.position < 30) {
      let modulo = this.position % 10;
      let x = 0.25 * -(modulo - 5);
      // console.log(-x);
      this.cube.position.x = -x;
      this.cube.position.y = 0;
      this.cube.position.z = 0.25 * -6;
    }
    if (this.position > 30 && this.position < 40) {
      let modulo = this.position % 10;
      let z = 0.25 * (modulo - 5);
      // console.log(x);
      this.cube.position.x = 1.5;
      this.cube.position.y = 0;
      this.cube.position.z = z;
    }
    scene.add(this.cube);
  }
}
let cards_properties_list = [];
for (let index = 0; index < 40; index++) {
  cards_properties_list.push(new card_properties(index, "white"));
}

class Player {
  constructor(name, position, money, color, colorVanilla) {
    this.name = name;
    this.position = position;
    this.money = money;
    this.color = color;
    this.colorVanilla = colorVanilla;
    this.double = false;
    this.double_count = 0;
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
      update_player_money();
    }
  }
}
const players = [];

const scene = new THREE.Scene();
var w = window.innerWidth / 1.5;
var h = window.innerHeight / 1.5;
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
cards_properties_list.forEach((card) => {
  card.initCard();
});
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(w, h);
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
cube.name = "board";
scene.add(cube);

camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;

const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

window.addEventListener("resize", resize, false);
function resize() {
  w = window.innerWidth / 1.5;
  h = window.innerHeight / 1.5;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
var raycaster = new THREE.Raycaster();
renderer.domElement.addEventListener("click", click);

var mouse = new THREE.Vector2();

function click(event) {
  var rect = renderer.domElement.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  mouse.x = (x / w) * 2 - 1;
  mouse.y = -(y / h) * 2 + 1;
  // console.log(mouse);

  raycaster.setFromCamera(mouse, camera);

  var intersections = raycaster.intersectObjects(scene.children);
  if (intersections.length > 0) {
    intersections.forEach((intersection) => {
      if (intersection.object.name.includes("card")) {
        console.log(intersection.object.name);
        let card_index = intersection.object.name.split("_")[1];
        card_index = Number(card_index);
        console.log(card_index);
        cards.map((card) => {
          if (card.position == card_index) {
            generateCardsUi(card, "info");
            //event listener for close button
            document
              .getElementById("closeCard")
              .addEventListener("click", () => {
                closeCard();
              });
          }
        });
      }
    });
  }
}

const controls = new OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

document.getElementById("start_game").addEventListener("click", () => {
  startGame();
});
let display_player_form = false;
document.getElementById("Add_Player_view").addEventListener("click", () => {
  let players_list = document.querySelector("#players_form>ul");
  players_list.innerHTML = "";
  players.forEach((player) => {
    console.log(player.colorVanilla);
    players_list.innerHTML += `<li><span style="color:${player.colorVanilla}">▬</span> ${player.name}</li>`;
  });
  display_player_form = !display_player_form;
  if (display_player_form) {
    document.getElementById("players_form").style.display = "flex";
  } else {
    document.getElementById("players_form").style.display = "none";
  }
});
document.getElementById("add_player").addEventListener("click", () => {
  add_player();
});

function add_player() {
  let player_name = document.getElementById("player_name").value;
  if (player_name == "") {
    alert("Please enter a name");
    return;
  }
  let player_color = document.getElementById("player_color").value;
  players.push(
    new Player(
      player_name,
      0,
      1500,
      new THREE.Color(player_color),
      player_color
    )
  );
  document.getElementById("player_name").value = "";
  document.getElementById("player_name").focus();
  document.getElementById("players_form").style.display = "none";
  display_player_form = false;
  if (players.length >= 2) {
    document.getElementById("start_game").style.display = "block";
  } else {
    document.getElementById("start_game").style.display = "none";
  }
}

function update_player_money() {
  document.getElementById("players_stats").innerHTML = "";
  players.forEach((player) => {
    document.getElementById(
      "players_stats"
    ).innerHTML += `<p>${player.name}: ${player.money} $</p>`;
  });
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
  document.getElementById("players_stats").style.display = "block";
  update_player_money();
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
    document.getElementById(
      "dice"
    ).innerHTML = `Dice: ${random} + ${random2} = ${random + random2}`;
    if (random == random2) {
      players[current_player].double = true;
      players[current_player].double_count++;
    }
    for (let i = 0; i < random + random2; i++) {
      players[current_player].addPosition();
      players[current_player].cube.position.y = 0.16;
      await sleep(1000);
    }
    cards.map((card) => {
      if (card.position == players[current_player].position) {
        console.table(card);
        if (card.owner === undefined) {
          generateCardsUi(card, "buy");
        } else {
          generateCardsUi(card, "rent");
        }
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
  if (
    players[current_player].double != true ||
    players[current_player].double_count == 3
  ) {
    if (current_player != players.length - 1) {
      current_player += 1;
    } else {
      current_player = 0;
    }
  }
  finish_round = true;
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
  if (player.position > 0 && player.position < 10) {
    cards_properties_list[player.position - 1].changeColor(player.color);
  } else if (player.position > 10 && player.position < 40) {
    cards_properties_list[player.position].changeColor(player.color);
  }
  update_player_money();
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
  update_player_money();
}
