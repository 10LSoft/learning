"""
O padrão Command é um padrão de design comportamental que associa operações a
objetos simples, de modo que o emissor não precisar saber nada sobre o comando
em si.

É interessante quando se deseja desacoplar o emissor do receptor, permitindo
que os comandos sejam compostos e reutilizados.

Os componentes do padrão são:

1. Command Interface: é a estrutura que define como os comandos devem ser
implementados
2. Command: é a classe que implementa a interface e direciona a execução da
operação para o receiver
3. Receiver (ou Receptor): é a classe que contém a operação a ser executada),
ou seja, a lógica real da operação a ser executada
4. Invoker (ou Emissor): é a classe que invoca o comando, mas não sabe nada
sobre a operação a ser executada
5. Client: é a classe que cria o comando e o invoca

Vamos ver um exemplo de implementação do padrão Command em Python para um
sistema de gestão de pedidos:
"""

from abc import ABC, abstractmethod


class Command(ABC):
    @abstractmethod
    def execute(self):
        pass


"""
Commands: como as operações são executadas?

Os commands contém a lógica relacionada a execução de uma determinada operação.
Mas os commands não executam a operação diretamente, eles delegam a execução a
outras estruturas organizadas dentro da aplicação. Para o caso do design
pattern Command, a execução é delegada ao receiver.
"""


class CreateOrder(Command):
    def __init__(self, receiver, order):
        self.receiver = receiver
        self.order = order

    def execute(self):
        self.receiver.create_order(self.order)


class DeleteOrder(Command):
    def __init__(self, receiver, order):
        self.receiver = receiver
        self.order = order

    def execute(self):
        self.receiver.delete_order(self.order)


"""
Receiver: lógica de negócio

Os receivers funcionam como uma espécie de "repositório" de operações que serão
executadas. No exemplo, o receiver é a classe Order, que contém as operações a
serem executadas.
"""


class Order:
    def create_order(self, order):
        # lógica de criação de pedido
        print(f"Pedido {order} criado")

    def delete_order(self, order):
        # lógica de deleção de pedido
        print(f"Pedido {order} deletado")


"""
Invoker: quem invoca os comandos

Os invokers são responsáveis por invocar os comandos, mas não sabem nada sobre
a operação a ser executada. No exemplo, o invoker é a classe OrderManager, que
é responsável por adicionar os comandos e executá-los.

Perceba que invokers podem ser compostos por vários comandos, permitindo a
execução de várias operações em sequência (como neste exemplo). Isto traz
algumas vantagens de uso do padrão Command, como a possibilidade de desfazer e
enfileirar operações.
"""


class OrderManager:
    def __init__(self):
        self.commands = []

    def add_command(self, command):
        self.commands.append(command)

    def execute_commands(self):
        for command in self.commands:
            command.execute()
        self.commands = []


# cliente: cria os comandos e os executa
if __name__ == "__main__":
    order = Order()
    order_manager = OrderManager()

    order_manager.add_command(CreateOrder(order, 1))
    order_manager.add_command(CreateOrder(order, 2))
    order_manager.add_command(DeleteOrder(order, 1))

    order_manager.execute_commands()
