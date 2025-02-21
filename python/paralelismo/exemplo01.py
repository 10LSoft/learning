"""
Multi-threading real em Python não existe devido ao GIL (Global Interpreter
Lock). O GIL é um mutex que protege o acesso a objetos Python, evitando que
mais de uma thread execute código Python ao mesmo tempo. Isso significa que o
GIL impede que o Python execute código de forma paralela, mas permite que o
Python execute código de forma concorrente.

Mas o Python tem um módulo chamado multiprocessing que permite que você crie um
processo, que é uma forma de paralelismo real. Vamos ver como funciona:
"""


import multiprocessing
import time


def worker(num):
    """thread worker function"""
    print(f"Iniciando processo {num}")
    time.sleep(1)
    print(f"Finalizando processo {num}")


if __name__ == "__main__":
    jobs = []

    for i in range(20):
        p = multiprocessing.Process(target=worker, args=(i,))
        p.start()
        jobs.append(p)

    for p in jobs:
        # join faz com que o processo pai espere o processo filho terminar
        p.join()


"""
Você também pode executar tarefas em paralelo usando o Pool do módulo
multiprocessing. O Pool oferece um método de mapeamento conveniente que permite
que você distribua um trabalho entre um número específico de processos. Aqui
está um exemplo:
"""


if __name__ == "__main__":
    with multiprocessing.Pool(5) as p:
        p.map(worker, range(20))
