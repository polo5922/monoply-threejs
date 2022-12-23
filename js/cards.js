export function exportCard() {
  let cards = [
    {
      color: "brown",
      name: "Boulevard de Belleville",
      price: 60,
      rent: 2,
      house: 10,
      hotel: 50,
      house_price: 50,
      hotel_price: 50,
      mortgage: 30,
      position: 1,
    },
    {
      color: "brown",
      name: "Rue Lecourbe",
      price: 60,
      rent: 4,
      house: 20,
      hotel: 100,
      house_price: 50,
      hotel_price: 50,
      mortgage: 30,
      position: 3,
    },
    {
      type: "gare",
      color: "darkgrey",
      name: "Gare Montparnasse",
      price: 200,
      rent: 25,
      mortgage: 100,
      position: 5,
    },
    {
      color: "lightblue",
      name: "Rue de Vaugirard",
      price: 100,
      rent: 6,
      house: 30,
      hotel: 150,
      house_price: 50,
      hotel_price: 50,
      mortgage: 50,
      position: 6,
    },
    {
      color: "lightblue",
      name: "Rue de Courcelles",
      price: 100,
      rent: 6,
      house: 30,
      hotel: 150,
      house_price: 50,
      hotel_price: 50,
      mortgage: 50,
      position: 8,
    },
    {
      color: "lightblue",
      name: "Avenue de la République",
      price: 120,
      rent: 8,
      house: 40,
      hotel: 200,
      house_price: 50,
      hotel_price: 50,
      mortgage: 60,
      position: 9,
    },
    {
      color: "pink",
      name: "Boulevard de la Villette",
      price: 140,
      rent: 10,
      house: 50,
      hotel: 250,
      house_price: 100,
      hotel_price: 100,
      mortgage: 70,
      position: 11,
    },
    {
      color: "pink",
      name: "Avenue de Neuilly",
      price: 140,
      rent: 10,
      house: 50,
      hotel: 250,
      house_price: 100,
      hotel_price: 100,
      mortgage: 70,
      position: 13,
    },
    {
      color: "pink",
      name: "Rue de Paradis",
      price: 160,
      rent: 12,
      house: 60,
      hotel: 300,
      house_price: 100,
      hotel_price: 100,
      mortgage: 80,
      position: 14,
    },
    {
      type: "gare",
      color: "darkgrey",
      name: "Gare de Lyon",
      price: 200,
      rent: 25,
      mortgage: 100,
      position: 15,
    },
    {
      color: "orange",
      name: "Avenue Mozart",
      price: 180,
      rent: 14,
      house: 70,
      hotel: 350,
      house_price: 100,
      hotel_price: 100,
      mortgage: 90,
      position: 16,
    },
    {
      color: "orange",
      name: "Boulevard Saint-Michel",
      price: 180,
      rent: 14,
      house: 70,
      hotel: 350,
      house_price: 100,
      hotel_price: 100,
      mortgage: 90,
      position: 18,
    },
    {
      color: "orange",
      name: "Place Pigalle",
      price: 200,
      rent: 16,
      house: 80,
      hotel: 400,
      house_price: 100,
      hotel_price: 100,
      mortgage: 100,
      position: 19,
    },
    {
      color: "red",
      name: "Avenue Matignon",
      price: 220,
      rent: 18,
      house: 90,
      hotel: 450,
      house_price: 150,
      hotel_price: 150,
      mortgage: 110,
      position: 21,
    },
    {
      color: "red",
      name: "Boulevard Malesherbes",
      price: 220,
      rent: 18,
      house: 90,
      hotel: 450,
      house_price: 150,
      hotel_price: 150,
      mortgage: 110,
      position: 23,
    },
    {
      color: "red",
      name: "Avenue Henri-Martin",
      price: 240,
      rent: 20,
      house: 100,
      hotel: 500,
      house_price: 150,
      hotel_price: 150,
      mortgage: 120,
      position: 24,
    },
    {
      type: "gare",
      color: "darkgrey",
      name: "Gare du Nord",
      price: 200,
      rent: 25,
      mortgage: 100,
      position: 25,
    },
    {
      color: "yellow",
      name: "Faubourg Saint-Honoré",
      price: 260,
      rent: 22,
      house: 110,
      hotel: 550,
      house_price: 150,
      hotel_price: 150,
      mortgage: 130,
      position: 26,
    },
    {
      color: "yellow",
      name: "Place de la Bourse",
      price: 260,
      rent: 22,
      house: 110,
      hotel: 550,
      house_price: 150,
      hotel_price: 150,
      mortgage: 130,
      position: 27,
    },
    {
      color: "yellow",
      name: "Rue la Fayette",
      price: 280,
      rent: 24,
      house: 120,
      hotel: 600,
      house_price: 150,
      hotel_price: 150,
      mortgage: 140,
      position: 29,
    },
    {
      color: "green",
      name: "Avenue de Breteuil",
      price: 300,
      rent: 26,
      house: 130,
      hotel: 650,
      house_price: 200,
      hotel_price: 200,
      mortgage: 150,
      position: 31,
    },
    {
      color: "green",
      name: "Avenue Foch",
      price: 300,
      rent: 26,
      house: 130,
      hotel: 650,
      house_price: 200,
      hotel_price: 200,
      mortgage: 150,
      position: 32,
    },
    {
      color: "green",
      name: "Boulevard des Capucines",
      price: 320,
      rent: 28,
      house: 150,
      hotel: 700,
      house_price: 200,
      hotel_price: 200,
      mortgage: 160,
      position: 34,
    },
    {
      type: "gare",
      color: "darkgrey",
      name: "Gare Saint-Lazare",
      price: 200,
      rent: 25,
      mortgage: 100,
      position: 35,
    },
    {
      color: "blue",
      name: "Avenue des Champs-Élysées",
      price: 350,
      rent: 35,
      house: 175,
      hotel: 750,
      house_price: 200,
      hotel_price: 200,
      mortgage: 175,
      position: 37,
    },
    {
      color: "blue",
      name: "Rue de la Paix",
      price: 400,
      rent: 50,
      house: 200,
      hotel: 900,
      house_price: 200,
      hotel_price: 200,
      mortgage: 200,
      position: 39,
    },
  ];
  return cards;
}

export function generateCardsUi(card, type) {
  console.log("card generate", card.position);
  document.querySelector(".card__content").style.backgroundColor = card.color;
  document.querySelector(".card__title").innerHTML = card.name;
  let cardInfoSelector = document.querySelector(".card__info");
  cardInfoSelector.innerHTML = "";
  if (card.type !== "gare" && card.type !== "compagnie") {
    cardInfoSelector.innerHTML += `<p>Price: ${card.price}</p>`;
    cardInfoSelector.innerHTML += `<p>Rent: ${card.rent}</p>`;
    cardInfoSelector.innerHTML += `<p>House: ${card.house}</p>`;
    cardInfoSelector.innerHTML += `<p>Hotel: ${card.hotel}</p>`;
    cardInfoSelector.innerHTML += `<p>House Price: ${card.house_price}</p>`;
    cardInfoSelector.innerHTML += `<p>Hotel Price: ${card.hotel_price}</p>`;
    cardInfoSelector.innerHTML += `<p>hypotheque: ${card.mortgage}</p>`;
  }
  if (card.type === "gare") {
    cardInfoSelector.innerHTML += `<p>Price: ${card.price}</p>`;
    cardInfoSelector.innerHTML += `<p>Rent: ${card.rent}</p>`;
    cardInfoSelector.innerHTML += `<p>hypotheque: ${card.mortgage}</p>`;
  }
  console.log(card.owner);
  document.querySelector(".button__card").innerHTML = ``;
  if (type == "rent") {
    document.querySelector(
      ".button__card"
    ).innerHTML += `<button class="button__card--close" id="payRent">Pay rent</button>`;
  }
  if (type == "buy") {
    document.querySelector(
      ".button__card"
    ).innerHTML += `<button class="button__card--close" id="closeCard">Close</button>`;
    document.querySelector(".button__card").innerHTML +=
      '<button class="button__card--close" id="buyCard">Buy</button>';
  }
  if (type == "info") {
    document.querySelector(
      ".button__card"
    ).innerHTML += `<button class="button__card--close" id="closeCard">Close</button>`;
  }
  document.querySelector(".card").style.display = "flex";
}
