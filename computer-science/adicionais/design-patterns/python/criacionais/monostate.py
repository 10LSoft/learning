class Monostate:
    """
    O tipo monostate é um padrão que tem um objetivo parecido com o singleton.
    Também conhecido como Borg, o padrão tem como objetivo, ainda que
    permitindo a criação de novas instâncias de um determinado objeto, fornecer
    um compartilhamento de estado do objeto, ou seja, fornecendo uma API onde
    um determinado conjunto de valores sejam compartilhados entre as várias
    possíveis instâncias daquele objeto.
    """
    _shared_state = {}

    def __init__(self):
        self.__dict__ = self._shared_state

    def add_value(self, key, value):
        self._shared_state[key] = value

    def __str__(self):
        return f'{self._shared_state}'


a = Monostate()
b = Monostate()

print(f'A e B são iguais? {a is b}')

a.add_value('nome', 'Gênese')
print(f'Valores em B: {b}')
