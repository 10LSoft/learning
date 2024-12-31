"""
Antes de aprofundar o estudo sobre corrotinas, vamos deixar aqui de forma clara
a diferença entre funções geradoras e corrotinas.

Funções geradoras trabalham com sequência de coisas, mas estas coisas são
geradas conforme se ataca a função. Ex:

def sequencia_numeros():
    yield 1
    yield 2
    yield 3

Corrotinas são funções especiais que permitem (assim como as geradoras) pausar
a execução e retoma-la em seguidda.

Vamos abordar neste paper as corrotinas.

O Python possui uma lib embarcada na linguagem que nos permite o uso de
corrotinas e programação assíncrona, trazendo consigo nativamente o uso de
async/await na execução de código.

Quando criamos uma função corrotina, ela, ao ser chamada não é executada como
as funções padrão no Python. Ela retorna um objeto do tipo corrotina.

import asyncio

async def my_counter():
    print('starting...')
    await asyncio.sleep(2)
    print('finished!')

my_counter()
<coroutine object my_counter at 0x1036457e0>

asyncio.run(my_counter())
starting...
finished!

O módulo asyncio traz muitos métodos e funções interessantes. Dentre eles
podemos falar sobre o Queue ou o Lock, sendo o primeiro para construir filas de
itens que serão executados em sequência, mas de forma assíncrona e o Lock que
permite que os itens sendo executados compartilhem recursos.

Vamos começar com o Queue. O asyncio.Queue é uma estrutura FIFO, que permite
que tarefas executando de forma assíncrona possam trocar informações de maneira
segura. Um exemplo seria:

import asyncio


async def produtor(queue):
    for i in range(5):
        print('Produzindo item ', i)
        await queue.put(i)
        await asyncio.sleep(1)


async def consumidor(queue):
    while True:
        item = await queue.get()
        print('Consumindo item ', item)
        queue.task_done()
        await asyncio.sleep(2)


async def main():
    queue = asyncio.Queue()

    produtor_task = asyncio.create_task(produtor(queue))
    consumidor_task = asyncio.create_task(consumidor(queue))

    await produtor_task
    await queue.join()
    consumidor_task.cancel()

asyncio.run(main())

Além do uso do Queue, o módulo asyncio possui ainda disponível um recurso
interessante chamado Lock. Ele permite que apenas uma task utilize os recursos
de execução por vez, ou seja, antes de uma determinada tarefa rodar usando os
recursos, outra precisará terminar o uso e liberar o lock. Um exemplo simples:

import asyncio

async def tarefa_critica(nome, lock):
    print(nome, ' aguardando pelo lock...')

    async with lock:
        print(nome, 'entrou na sessão crítica...')
        await asyncio.sleep(2)

    print(nome, 'liberou o lock.')


async dev main():
    lock = asyncio.Lock()

    await asyncio.gather(
        tarefa_critica('Tarefa 1', lock),
        tarefa_critica('Tarefa 2', lock),
        tarefa_critica('Tarefa 3', lock),
        tarefa_critica('Tarefa 4', lock)
    )


asyncio.run(main())

Na corrotina tarefa_critica, apenas uma das tarefas poderá entrar na sessão
crítica por vez e somente após o lock ser liberado outra tarefa poderá entrar
na sessão.

Este recurso é interessante quando você precisa garantir que apenas uma
execução de determinado recurso ocorra por vez em um determinado processamento
assíncrono.

Complementando o Lock, temos o asyncio.Semaphore. Ele funciona como um lock,
mas podemos informar sobre quantas tarefas deverão compartilhar o mesmo recurso
ao mesmo tempo.

Um simples exemplo usando o Semaphore:

import asyncio

async def tarefa(nome, semaforo):
    async with semaforo:
        print(nome, 'entrou na sessão crítica...')
        await asyncio.sleep(2)
        print(nome, 'liberou o semáforo.')

async def main():
    semaforo = asyncio.Semaphore(2)

    await asyncio.gather(
        tarefa('Tarefa 1', semaforo),
        tarefa('Tarefa 2', semaforo),
        tarefa('Tarefa 3', semaforo),
        tarefa('Tarefa 4', semaforo)
    )

asyncio.run(main())
"""
