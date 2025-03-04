"""
O padrão Object Pool é um padrão de projeto de software que usa um conjunto de
objetos pré-criados em vez de criar e destruir objetos dinamicamente. Este
padrão é muito útil quando o custo de criação de um determinado objeto é alto,
de modo que o reuso de objetos faça sentido.

A ideia por trás do Object Pool é simples. Pense numa piscina de objetos.
Quando o usuário precisa de um objeto, ele não cria um novo, mas usa um dos
disponíveis na piscina. Assim que ele termina de usar o objeto, ele o devolve,
de modo que este fica disponível para ser usado por outro usuário.

Vamos implementar um exemplo simples de Object Pool em Python. Imagine que
temos uma classe chamada Connection que representa uma conexão com um banco de
dados. Criar uma nova conexão é um processo caro, então vamos criar um pool de
Connection para reutilizar conexões já criadas.
"""


class Connection:
    def __init__(self, name: str = "default"):
        self._is_open = False
        self.name = name

    def __setattr__(self, name, value):
        if name not in ["_is_open", "name"]:
            print(f"Setting {name} to {value} in {self.name}")

        super().__setattr__(name, value)

    def open(self) -> None:
        if self._is_open:
            raise Exception("Connection already open")

        print("Opening connection...")
        self._is_open = True

    def close(self) -> None:
        if not self._is_open:
            raise Exception("Connection already closed")

        print("Closing connection...")
        self._is_open = False


class ConnectionPool:
    def __init__(self, size: int):
        self._size = size
        self._connections = [
            Connection(f"connection_{i}")
            for i in range(self._size)
        ]

        self._free_connections = self._connections.copy()

    def get_connection(self) -> "Connection":
        if not self._free_connections:
            raise Exception("No free connections available")

        conn = self._free_connections.pop()
        conn.open()

        print("Connection acquired")

        return conn

    def release_connection(self, connection: "Connection") -> None:
        if connection not in self._connections:
            raise Exception("Connection does not belong to this pool")

        connection.close()
        self._free_connections.append(connection)
        print("Connection released")


pool = ConnectionPool(5)

conn1 = pool.get_connection()
conn2 = pool.get_connection()
conn3 = pool.get_connection()

pool.release_connection(conn2)
pool.release_connection(conn1)
pool.release_connection(conn3)

conn4 = pool.get_connection()

pool.release_connection(conn4)
