"""
O design pattern Factory Kit é uma variação do design pattern Factory Method. A
diferença é que o Factory Kit é uma coleção de Factory Methods, onde cada
Factory Method é responsável por criar um tipo específico de objeto. O Factory
Kit é útil quando temos um conjunto de classes que implementam uma mesma
interface e queremos criar objetos dessas classes de forma dinâmica.

Um exemplo de uso do Factory Kit é quando temos um conjunto de classes que são
responsáveis por se conectar a diferentes bancos de dados. Cada classe é uma
subclasse de uma classe abstrata que define um método para se conectar ao banco
de dados. O Factory Kit pode ser usado para criar objetos dessas classes de
forma dinâmica, sem a necessidade de saber qual a classe concreta que será
usada.

A seguir um exemplo de implementação do Factory Kit em Python:
"""

from typing import Callable, Dict


class FactoryKit:
    def __init__(self):
        self._creators: Dict[str, Callable] = {}

    def register(self, key: str, creator: Callable):
        """Registra um novo tipo de produto."""
        self._creators[key] = creator

    def create(self, key: str, *args, **kwargs):
        """Cria um produto com base na chave."""
        if key not in self._creators:
            raise ValueError(f"Tipo de produto '{key}' não registrado.")
        return self._creators[key](*args, **kwargs)


class ProdutoA:
    def __init__(self):
        self.nome = "Produto A"

    def __str__(self):
        return self.nome


class ProdutoB:
    def __init__(self):
        self.nome = "Produto B"

    def __str__(self):
        return self.nome


# Criando e configurando o Factory Kit
factory = FactoryKit()
factory.register("A", ProdutoA)
factory.register("B", ProdutoB)

# Criando objetos dinamicamente
produto1 = factory.create("A")
produto2 = factory.create("B")

print(produto1)  # Saída: Produto A
print(produto2)  # Saída: Produto B
