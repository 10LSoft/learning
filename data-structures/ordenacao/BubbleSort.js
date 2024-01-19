/**
 * O Bubble Sorte é um algoritmo simples, mas muito eficiente para o
 * entendimento de alguns conceitos básicos.
 *
 * Basicamente ele ordena um array por meio de dois loops aninhados (o que
 * certamente não é uma boa prática para coleções longas), mas permite que
 * possamos entender mais facilmente como algoritmos podem ser úteis em nosso
 * dia a dia.
 *
 * Vamos ver uma implementação:
 * */

class BubbleSort {
  constructor () {
    this.arr = null
    this.len = 0
  }

  setArray (arr) {
    this.arr = arr
    this.len = arr.length - 1
  }

  getArray () {
    return this.arr
  }

  sorting () {
    for (let i = 0; i <= this.len; i++) {
      for (let j = 0; j <= this.len; j++) {
        if (this.arr[j] > this.arr[i]) {
          let temp = this.arr[i]
          this.arr[i] = this.arr[j]
          this.arr[j] = temp
        }
      }
    }
  }
}

const bubble = new BubbleSort()
bubble.setArray([9,8,7,6,5])

console.log('Original:\t', bubble.getArray())
bubble.sorting()

console.log('Sorted:\t\t', bubble.getArray())
