"""
Corrotinas são funções que basicamente poderão ser interrompidas e
posteriormente continuadas. Esta é basicamente uma maneira de se executar um
determinado trecho de código e pausa-lo para que outro trecho seja executado,
de modo que haja uma concorrência entre estes trechos.

As corrotinas são definidas com a palavra reservada async def, e são chamadas
com a função await. Se você tentar executar uma corrotina sem o await, o Python
irá retornar um objeto do tipo coroutine, que é um objeto que representa aquilo
que a corrotina irá fazer, mas que ainda não foi executado. Isto também é
conhecido como promise.

No Javascript, por exemplo, as promises são altamente comuns e são usadas em
quase todas as operações assíncronas. No Python, as corrotinas são usadas para
a mesma finalidade.

Um exemplo de corrotina é o seguinte:
"""

import asyncio


async def corrotina():
    print("Corrotina iniciada")
    await asyncio.sleep(1)
    print("Corrotina finalizada")

asyncio.run(corrotina())
