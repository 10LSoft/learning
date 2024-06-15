/*
  * O padrão proxy serve como camada intermediaria entre o cliente e a operação.
  * Com este padrão, podemos executar a chamada do cliente e ainda mais. O foco
  * deste padrão é controlar chamadas do cliente.
  * 
  * Para exemplificar, utilizaremos uma imagem como exemplo, e divideremos em:
  * 
  * Subject -> interface tanto para o Proxy quanto para o objeto real
  * 
  * Real Subject -> O assunto real. Objeto original.
  * 
  * Proxy -> Mantém referência ao real subject, e pode adicionar outras
  * funcionalidades
*/

// Subject
class Image {
  display () {
    throw new Error('It should be implemented')
  }
}

// Real Subject
class RealImage extends Image {
  constructor (filename) {
    super()
    this.filename = filename
    this.loadImage()
  }

  loadImage () {
    console.log(`It's loading this file: ${this.filename}`)
  }

  display () {
    console.log(`It's displaying this file ${this.filename}`)
  }
}

// Proxy
class ImageProxy extends Image {
  constructor(filename) {
    super()
    this.filename = filename
    this.realImage = null
  }

  display () {
    console.log('Manipulando a chamada a imagem')

    if (!this.realImage) {
      this.realImage = new RealImage(this.filename)
    }
    this.realImage.display()
  }
}

const realImage = new RealImage('picture.png') // It's loading this file: picture.png
const imageProxy = new ImageProxy('picture.png')

imageProxy.display()
/*
  * Output:
  *
  * Manipulando a chamada a imagem
  * It's loading this file: picture.png
  * It's displaying this file: picture.png
*/
