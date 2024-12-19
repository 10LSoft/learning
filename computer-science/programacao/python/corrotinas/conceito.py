"""
As corrotinas são funções que permitem que o python execute código de forma
assíncrona. Elas são basicamente funções cujo fluxo de execução pode ser
suspenso e retomado conforme necessário.

Um corrotina, quando chamada, não é imediatamente executada. Ela retorna um
objeto corrotina.

O python possui nativamente um módulo chamado asyncio, usado para a manipulação
de corrotinas e portanto, programação assíncrona. Eis abaixo um exemplo siples
usando assyncio e uma corrotina sendo executada:
"""
import asyncio


async def minha_corrotina():
    print('Iniciando corrotina')
    await asyncio.sleep(5)
    print('Fim da corrotina')

# asyncio.run(minha_corrotina())

"""
No exemplo acima eu tenho um trecho de código que não finaliza a rotina
enquanto a instrução em await não for concluída. Daí você pode pensar algo
como: isso não é tão diferente de uma função síncrona normal, pois a execução
parece ter bloquado o flow de execução...

Mas aí é onde você se engana, pequeno gafanhoto!

Quando temos algo como o exposto acima, o python permite que este tipo de
função seja executada junto com outras funções e a magia começa a ocorrer
nestes casos.

Vejamos outro exemplo:
"""


async def minha_outra_corrotina():
    print('Iniciando a segunda corrotina')
    await asyncio.sleep(2)
    print('finalizando a segunda corrotina')


async def run_all():
    """
    O gather realiza a execução em paralelo de um conjunto de corrotinas, de
    modo que elas concorram entre si para as execuções, mas respeitando o tempo
    de cada operação assíncrona, o que permite definir quem iniciará e
    terminará primeiro.

    No caso acima, a corrotina 1 leva 5 segundos para ser concluída, enquanto a
    corrotina 2 leva apenas 2 segundos e isto faz com que ela seja encerrada
    primeiro que a corrotina 1.
    """
    await asyncio.gather(minha_corrotina(), minha_outra_corrotina())

asyncio.run(run_all())
