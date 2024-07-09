"""
O pydantic permite que possamos gerar um padrão de validação bastante completo, de modo que os
mapeamentos para dados do tipo body parameter tenham o mesmo nível de profundidade de validação dos
query e path parameters.

Validações via field e validators são bastante poderosas e se comportam assim:
"""

import re

from pydantic import BaseModel, Field, validator


class ConverterInput(BaseModel):
    price: float = Field(gt=0)
    to_currencies: list[str]

    @validator("to_currencies")
    def validate_to_currencies(cls, value):
        for currency in value:
            if not re.match("^[A-Z]{3}$", currency):
                raise ValueError(f"Invalid currency: {currency}")

        return value


"""
Pronto! Isto valida o campo to_currencies com uma potente modalidade de checagem para cada item
descrito na lista e a validação será executada com os valores que serão comparados a ConverterInput
DTO (Data Transfer Object).

Thank's to Barbara Liskov 🤍

Daí basta que tenhamos o nosso endpoint usando o schema anterior como body. Algo mais ou menos
assim:
"""

from asyncio import gather

from fastapi import FastAPI, Path

"""
também podemos usar o apirouter para combinar rotas em outros arquivos:

from fastapi import APIRouter

router = APIRouter(prefix='/some-prefix')

E nas rotas ou no app usaríamos:

app.add_routes(router)
"""
app = FastAPI()


async def async_converter(*args, **kwargs):
    pass


@app.get("/convert/{from_currency}")
async def converter_with_body(
    body: ConverterInput, from_currency: str = Path(max_length=3, regex="^[A-Z]{3}$")
):
    to_currencies = body.to_currencies
    price = body.price

    coroutines = []

    for currency in to_currencies:
        coro = async_converter(from_currency, currency, price)

        coroutines.append(coro)

    result = await gather(*coroutines)
    return result


"""
Da mesma maneira que foi feito para a entrada, podemos fazer um schema ser usado na saída. Seria
algo como o seguinte:
"""


class ConverterOutput(BaseModel):
    message: str
    data: list[dict]


@app.get("/convert/v2/{from_currency}", response_model=ConverterOutput)
async def converter_with_body_v2(
    body: ConverterInput, from_currency: str = Path(max_length=3, regex="^[A-Z]{3}$")
):
    to_currencies = body.to_currencies
    price = body.price

    coroutines = []

    for currency in to_currencies:
        coro = async_converter(from_currency, currency, price)

        coroutines.append(coro)

    result = await gather(*coroutines)

    return ConverterOutput(message="success", data=result)
