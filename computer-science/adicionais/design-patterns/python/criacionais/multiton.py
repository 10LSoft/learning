"""
O padrão Multiton é uma variação do Singleton, onde ao invés de ter uma única
instância de uma determinada classe, é possível ter vários instâncias, mas cada
uma delas é idenficicada por uma chave única.

É como se fosse um dicionário de instâncias. Vamos ver um exemplo simples:
"""


class Multiton:
    instances = {}

    def __new__(cls, key):
        if key not in cls.instances:
            cls.instances[key] = super().__new__(cls)

        return cls.instances[key]


if __name__ == "__main__":
    m1 = Multiton("key1")
    m2 = Multiton("key2")
    m3 = Multiton("key1")

    print(m1 is m2)  # False
    print(m1 is m3)  # True
    print(m1.instances)
