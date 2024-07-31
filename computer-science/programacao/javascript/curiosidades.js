/*
 * Uma coisa interessante a saber sobre JS é que quando temos um ambiente em
 * que precisamos criar uma classe que faça setups de objetos dela mesma,
 * podemos atribuir um conceito chamado de método de fábrica ou factory method
 * (que é diferente do design pattern factory method).
 *
 * No caso do método fábrica, basta que ele esteja presente na classe e retorne
 * uma instância personalizada desta classe, mas com a característica de ser um
 * static method, pois ao tentar acessar this numa instância, o que será
 * retornado será o objeto e não a classe.
 *
 * Vamos ver um exemplo:
 * */

class CitizenFactory {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  static getRandom() {
    const someNames = ["john", "sally", "will", "gart"];
    const randomName = Math.floor(Math.random() * someNames.length);

    return new this(someNames[randomName], "unknow");
  }
}

const newCitizen = CitizenFactory.getRandom();

console.log(newCitizen);

/*
 * Foi apenas um exemplo para demonstrar que um objeto poderia ser criado sem
 * problemas diretamente por meio do this, como em new this(...)
 * */
