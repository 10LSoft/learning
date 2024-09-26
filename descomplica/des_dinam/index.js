import readline from "readline";

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let chosenDrink = "";

prompt.question("Escolha uma bebida: ", (drink) => {
  /**
   * Aqui eu resolvi parsear a digitação de modo que o valor
   * inserido desconsidere acentos e upper cases. No final devolvo
   * o valor conforme digitado pelo usuário (em lowercase).
   */
  const lowerCaseDrink = drink
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  switch (lowerCaseDrink) {
    case "cafe":
    case "leite":
    case "cha":
      chosenDrink = lowerCaseDrink;
      break;
    default:
      console.log("A escolha deve estar entre café, leite ou chá");
  }

  if (chosenDrink) {
    const value = { cafe: 4.3, leite: 2.1, cha: 4.45 }[chosenDrink];

    console.log(
      value
        ? `O valor do ${drink.toLowerCase()} foi de R$ ${value.toFixed(2)}!`
        : "Não foi possível definir um valor",
    );
  }

  prompt.close();
});
