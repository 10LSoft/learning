/*
  * O memento é responsável por guardar um estado de algum objeto(originator).
  * Com o caretaker sendo responsável por guardar estes estados. O padrão
  * memento é muito utilizado para fazer undo, ou seja, voltar atrás.
*/

// Originator
class Editor {
  constructor () {
    this.content = ''
  }

  type (text) {
    this.content += text
  }

  save () {
    return new MementoEditor(this.content)
  }

  restore (memento) {
    this.content = memento.getContent()
  }

  getContent () {
    return this.content
  }
}

// Memento
class MementoEditor {
  constructor (content) {
    // Em uma linguagem fortemente tipada, o content seria protegido e inalterável
    this.content = content 
  }

  getContent () {
    return this.content
  }
}

// Caretaker
class History {
  constructor () {
    this.mementos = []
  }

  addMemento (memento) {
    this.mementos.push(memento)
  }

  recordLastMemento () {
    return this.mementos.pop()
  }
}

const history = new History()
const editor = new Editor()

editor.type('Texto legal 1 \n')
history.addMemento(editor.save())

editor.type('Texto legal 2 \n')
editor.type('Texto legal 3 \n')

console.log(editor.getContent())
/*
  Saída:

  Texto legal 1
  Texto legal 2
  Texto legal 3
*/

editor.restore(history.recordLastMemento())

console.log(editor.getContent())
// Texto legal 1
