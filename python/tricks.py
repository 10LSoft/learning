"""
Python é uma linguagem fantástica e cheia de troques. Aqui estão alguns
exemplos de truques que você pode usar para tornar seu código mais limpo e
eficiente.

1. Usando `enumerate` para obter índices e valores de uma lista

    names = ['Alice', 'Bob', 'Charlie', 'David']

    for index, name in enumerate(names):
        print(f'{index}: {name}')

    # Output:
    # 0: Alice
    # 1: Bob
    # 2: Charlie
    # 3: David

2. Usando `zip` para iterar sobre duas listas simultaneamente

    names = ['Alice', 'Bob', 'Charlie', 'David']
    ages = [24, 50, 18, 35]

    for name, age in zip(names, ages):
        print(f'{name} is {age} years old')

    # Output:
    # Alice is 24 years old
    # Bob is 50 years old
    # Charlie is 18 years old
    # David is 35 years old

3. Usando `collections.Counter` para contar a ocorrência de itens em uma lista

    from collections import Counter

    colors = ['red', 'blue', 'red', 'green', 'blue', 'blue']
    counter = Counter(colors)

    print(counter)

    # Output:
    # Counter({'blue': 3, 'red': 2, 'green': 1})


4. Usando `collections.defaultdict` para evitar a verificação de chaves em um
dicionário

    from collections import defaultdict

    fruits = [
        ('apple', 2), ('banana', 3), ('apple', 5), ('banana', 1), ('apple', 4)
    ]

    fruit_count = defaultdict(int)

    for fruit, count in fruits:
        fruit_count[fruit] += count

    print(fruit_count)

    # Output:
    # defaultdict(<class 'int'>, {'apple': 11, 'banana': 4})

5. Usando `collections.namedtuple` para criar uma tupla nomeada

        from collections import namedtuple

        Point = namedtuple('Point', ['x', 'y'])
        p = Point(10, y=20)

        print(p.x, p.y)

        # Output:
        # 10 20

6. Usando `itertools.product` para calcular o produto cartesiano de duas listas

    from itertools import product

    list1 = [1, 2, 3]
    list2 = ['a', 'b']

    for item1, item2 in product(list1, list2):
        print(item1, item2)

    # Output:
    # 1 a
    # 1 b
    # 2 a
    # 2 b
    # 3 a
    # 3 b

7. Usando `itertools.combinations` para gerar todas as combinações possíveis de
uma lista

    from itertools import combinations

    colors = ['red', 'green', 'blue']

    for color1, color2 in combinations(colors, 2):
        print(color1, color2)

    # Output:
    # red green
    # red blue
    # green blue

8. Usando `itertools.permutations` para gerar todas as permutações possíveis de
uma lista

    from itertools import permutations

    colors = ['red', 'green', 'blue']

    for color1, color2, color3 in permutations(colors):
        print(color1, color2, color3)

    # Output:
    # red green blue
    # red blue green
    # green red blue
    # green blue red
    # blue red green
    # blue green red

9. Usando `functools.reduce` para aplicar uma função cumulativa a elementos de
uma lista

    from functools import reduce

    numbers = [1, 2, 3, 4, 5]

    total = reduce(lambda x, y: x + y, numbers)

    print(total)

    # Output:
    # 15

10. Usando `operator.itemgetter` para ordenar uma lista de tuplas por um índice
específico

    from operator import itemgetter

    students = [
        ('Alice', 25, 90),
        ('Bob', 22, 85),
        ('Charlie', 21, 95)
    ]

    students.sort(key=itemgetter(1))

    print(students)

    # Output:
    # [('Charlie', 21, 95), ('Bob', 22, 85), ('Alice', 25, 90)]

11. Usando `sorted` com uma função de chave personalizada para classificar uma
lista

    students = [
        ('Alice', 25, 90),
        ('Bob', 22, 85),
        ('Charlie', 21, 95)
    ]

    students.sort(key=lambda student: student[2])

    print(students)

    # Output:
    # [('Bob', 22, 85), ('Alice', 25, 90), ('Charlie', 21, 95)]

12. Usando `filter` para filtrar elementos de uma lista com base em uma função

    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    even_numbers = list(filter(lambda x: x % 2 == 0, numbers))

    print(even_numbers)

    # Output:
    # [2, 4, 6, 8, 10]

13. Usando `map` para aplicar uma função a todos os elementos de uma lista

    numbers = [1, 2, 3, 4, 5]

    squared = list(map(lambda x: x ** 2, numbers))

    print(squared)

    # Output:
    # [1, 4, 9, 16, 25]

14. Usando `functools.partial` para criar funções com argumentos predefinidos

    from functools import partial

    def power(base, exponent):
        return base ** exponent

    square = partial(power, exponent=2)
    cube = partial(power, exponent=3)

    print(square(2))
    print(cube(2))

    # Output:
    # 4
    # 8

15. Usando `*args` e `**kwargs` para aceitar um número variável de argumentos
em funções

    def variable_args(*args, **kwargs):
        print('args:', args)
        print('kwargs:', kwargs)

    variable_args(1, 2, 3, a=4, b=5)

    # Output:
    # args: (1, 2, 3)
    # kwargs: {'a': 4, 'b': 5}

16. Usando `collections.deque` para uma fila eficiente

    from collections import deque

    queue = deque()

    queue.append(1)
    front = queue.popleft()

    print(front)

    # Output:
    # 1
"""
