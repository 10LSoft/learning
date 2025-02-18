"""
O design pattern Prototype basicamente realiza uma cópia de determinado objeto
e com isso impede que a criação de um novo objeto seja feita evitando consumo
excessive de recursos. O exemplo abaixo mostra a implementação de um protótipo
de um objeto Pizza.
"""

import copy


class Pizza:
    """
    Definição natural de um produto do tipo Pizza. Este cara será usado no
    processo de criação de um objeto cuja composição precise de etapas para se
    chegar a um resultado satisfatório.
    """

    def __init__(self):
        self.massa = None
        self.molho = None
        self.ingredientes = []

    def __str__(self):
        return (
            f'Pizza com massa {self.massa}, '
            f'molho {self.molho} '
            f'e ingredientes: {", ".join(self.ingredientes)}'
        )

    def clone(self):
        """
        Método que realiza a cópia do objeto Pizza.
        """
        return copy.deepcopy(self)


class Pizzaiolo:
    def __init__(self, pizza_prototype):
        self.pizza_prototype = pizza_prototype

    def fazer_pizza_margherita(self):
        """
        Aqui a lógica de criação de um objeto Pizza é realizado através da
        cópia do objeto protótipo.
        """
        pizza = self.pizza_prototype.clone()
        pizza.massa = "fina"
        pizza.molho = "tomate"
        pizza.ingredientes = ["mussarela", "manjericão"]
        return pizza

    def fazer_pizza_pepperoni(self):
        """
        Mesmo esquema do método acima, porém com ingredientes diferentes.
        """
        pizza = self.pizza_prototype.clone()
        pizza.massa = "fina"
        pizza.molho = "tomate"
        pizza.ingredientes = ["mussarela", "pepperoni"]
        return pizza


if __name__ == "__main__":
    pizza_prototype = Pizza()
    pizzaiolo = Pizzaiolo(pizza_prototype)

    pizza_margherita = pizzaiolo.fazer_pizza_margherita()
    pizza_pepperoni = pizzaiolo.fazer_pizza_pepperoni()

    print(pizza_margherita)
    print(pizza_pepperoni)
