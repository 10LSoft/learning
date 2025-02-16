"""
O padrão Lazy Initialization é um padrão que mantém a performance do sistema,
atrasando a inicialização de um determinado objeto até o momento em que ele
precisa ser usado. Há uma vantagem em termos de economia de recursos nesse
método de escrever código, pois o fato é que em ambientes onde objetos custosos
são criados e podem não ser usados, a iniacialização tardia pode evitar que
recursos sejam desperdiçados.

Por exemplo, imagine um objeto que realiza a leitura de um arquivo de 1GB. Se
em algum momento do programa esse arquivo não for necessário, a leitura dele
poderá ser evitada, somente ocorrendo quando o processamento for inevitável.

Isto é amplamente utilizado em sistemas reconhecidamente performáticos, como o
Django, que utiliza o padrão de inicializacão tardia para carregar os modelos e
efetivar conexões com o banco de dados somente quando necessário.

Vejamos como exemplo um código que implementa o padrão de inicialização tardia.
Vamos usar property, que é a forma mais comum de implementar esse padrão em
Python:
"""


class LazyInitialization:
    def __init__(self):
        self._lazy = None

    @property
    def lazy(self):
        if self._lazy is None:
            self._lazy = "Lazy Initialization - Property"

        return self._lazy


if __name__ == "__main__":
    lazy = LazyInitialization()  # Neste momento, o objeto não foi inicializado

    print(lazy.lazy)  # Aqui o objeto é inicializado
    print(lazy.lazy)  # Aqui ele já foi inicializado e é reusado


"""
Outra maneira de implmentar o padrão de inicialização tardia é utilizando o
Singleton, que é um padrão de projeto que garante que uma classe tenha apenas
uma instância e que pode ter a sua inicialização atrasada. Vejamos um exemplo:
"""


class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            print("Lazy Initialization - Singleton")

        return cls._instance


if __name__ == "__main__":
    singleton = Singleton()  # Neste momento, o objeto não foi inicializado
    same_singleton = Singleton()  # O objeto é o mesmo, pois é um Singleton
