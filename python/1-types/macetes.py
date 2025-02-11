"""
Em python, qualquer string multiplicada por 0 é uma string vazia. Uma maneira
inteligente de usar este recurso é como no exemplo em breve.

Suponhamos que você precise escrever uma função que receba dois argumentos e
retorne uma string que seja a combinação destes dois, contudo, se a soma dos
tamanhos dos dois parâmetros for menor do que 20, a função deverá preencher os
espaçoes entre o parâmetro 1 e o parâmetro 2 com o caractere '0'.

Ficaria mais ou menos assim:
"""


def preenche_com_zeros(param1, param2):
    total_size = len(param1) + len(param2)
    total_zeros = '0' * max(0, 20 - total_size)

    return f'{param1}{total_zeros}{param2}'
