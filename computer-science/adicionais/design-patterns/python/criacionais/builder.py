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


class PizzaBuilder:
    """
    PizzaBuilder é a interface de construção para o design pattern builder. Ela
    permite estabelecer métodos que compõem os objetos, etapa por etapa.
    """

    def __init__(self):
        self.pizza = Pizza()

    def set_massa(self, massa):
        self.pizza.massa = massa
        return self  # Retorna self para permitir encadeamento de métodos

    def set_molho(self, molho):
        self.pizza.molho = molho
        return self

    def add_ingrediente(self, ingrediente):
        self.pizza.ingredientes.append(ingrediente)
        return self

    def build(self):
        return self.pizza


# Diretor - Controla a construção através do Builder
class Pizzaiolo:
    def __init__(self, builder):
        self.builder = builder

    def fazer_pizza_margherita(self):
        return (
            self.builder.set_massa("fina")
            .set_molho("tomate")
            .add_ingrediente("mussarela")
            .add_ingrediente("manjericão")
            .build()
        )

    def fazer_pizza_pepperoni(self):
        return (
            self.builder.set_massa("tradicional")
            .set_molho("tomate")
            .add_ingrediente("mussarela")
            .add_ingrediente("pepperoni")
            .build()
        )


# Exemplo de uso
if __name__ == "__main__":
    builder = PizzaBuilder()
    pizzaiolo = Pizzaiolo(builder)

    pizza1 = pizzaiolo.fazer_pizza_margherita()
    print(pizza1)

    pizza2 = pizzaiolo.fazer_pizza_pepperoni()
    print(pizza2)

    # Exemplo de pizza personalizada
    pizza3 = (
        builder.set_massa("grossa")
        .set_molho("pesto")
        .add_ingrediente("frango")
        .add_ingrediente("rúcula")
        .build()
    )
    print(pizza3)
