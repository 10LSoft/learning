/* 
  * O flyweight é um padrão que visa eliminar a redundância do estado 
  * intrínseco, externalizando-o(em uma classe que é o flyweight). Tendo em
  * vista principalmente a tentativa de poupar RAM.
  * 
  * Para exemplificar, suponhamos um jogo, onde há muitas árvores. As árvores
  * têm tipos específicos, mas que são redundantes. Então para externalizar o
  * estado intrínseco da árvore(parte compartilhada) teremos:
  * 
  * Classe flyweight -> O tipo em sí da árvore, com suas características.
  * Flyweight factory -> Este irá gerenciar se criaremos um tipo novo, ou
  * usaremos um tipo já existente.
  * 
  * Context -> Classe que contém a parte extríncica(atributos não
  * compartilhados) e uma referência ao tipo da árvore.
*/

class Tree {
  constructor(coordX, coordY, type) {
    this.coordX = coordX;
    this.coordY = coordY;
    this.type = type;
  }
}

class TreeType {
  constructor(name, color, texture) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }
}

class TreeFactory {
  constructor() {
    this.treeTypes = [];
  }

  getTreeType(treeName, treeColor = null, treeTexture = null) {
    let existingType = this.treeTypes.find(type => type.name === treeName);

    if (!existingType) {
      try {
        const newTreeType = new TreeType(treeName, treeColor, treeTexture);
        this.treeTypes.push(newTreeType);
        return newTreeType;
      } catch (error) {
        throw error;
      }
    }

    return existingType;
  }
}

const factory = new TreeFactory();

const taigaType = factory.getTreeType('Taiga', 'grey', 'textura taiga');

const tree = new Tree(1, 1, taigaType);

console.log(tree);
