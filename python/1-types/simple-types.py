import sys
from typing import Final


"""
Python suporta alguns tipos numéricos de rápido acesso e outros que estão
disponíveis por meio de módulos, como o tipo Decimal, por exemplo.
"""

# Int
number: int = 45
other_number = 37
max_int = sys.maxsize
MB: Final = 23

# Float
exp: float = 2.54312
billion = 1E+9

"""
Python também possui suporte ao tipo string:
"""

greeting: Final[str] = 'Hello, world!'

# multiline text
text1 = "você poder escrever\n" + \
        "seu texto assim sem problemas"

text2 = """ou você poderá usar um
recurso bem legal de string multi linha
para o seu texto mais longo"""

text3 = (
    "se você usar este recurso "
    "o python irá juntar o texto pra você"
)
