"""
O padrão Multiton é uma variação do Singleton, onde ao invés de ter uma única
instância de uma determinada classe, é possível ter vários instâncias, mas cada
uma delas é idenficicada por uma chave única.

É como se fosse um dicionário de instâncias. Vamos ver um exemplo simples:
"""
from dataclasses import dataclass, field
from typing import Dict


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


def muliton(cls):
    instances = {}

    def get_instance(key):
        if key not in instances:
            instances[key] = cls(key)

        return instances[key]

    return get_instance


@muliton
class Multiton2:
    def __init__(self, key):
        self.key = key


if __name__ == "__main__":
    m1 = Multiton2("key1")
    m2 = Multiton2("key2")
    m3 = Multiton2("key1")

    print(m1 is m2)  # False
    print(m1 is m3)  # True


"""
É ainda possível criar Multitons usando dataclasses, veja:
"""


class MultitonMeta(type):
    _instances: Dict[str, object] = {}

    def __call__(cls, chave: str, *args, **kwargs):
        if chave not in cls._instances:
            instance = super().__call__(chave, *args, **kwargs)
            cls._instances[chave] = instance

        return cls._instances[chave]


@dataclass
class Configuracao(metaclass=MultitonMeta):
    chave: str
    valor: str
    descricao: str = field(default="Sem descrição")


config1 = Configuracao("banco", "PostgreSQL")
config2 = Configuracao("cache", "Redis")
config3 = Configuracao("banco", "MySQL")

print(f"config1 is config3? {config1 is config3}")
print(f"config1 is config2? {config1 is config2}")

print(f"config1: {config1}")
print(f"config2: {config2}")
print(f"config3: {config3}")
