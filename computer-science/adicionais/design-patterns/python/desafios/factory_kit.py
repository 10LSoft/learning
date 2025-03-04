"""
🔥 Desafio: Criando um Sistema de Inimigos para um Jogo

Imagine que você está desenvolvendo um jogo e precisa de um sistema flexível
para criar diferentes tipos de inimigos. Alguns inimigos podem ser terrestres,
outros voadores, e cada um pode ter comportamentos distintos.

O seu objetivo é implementar um Factory Kit para gerenciar a criação de
inimigos de forma dinâmica.

Requisitos:
   1. Crie uma classe EnemyFactoryKit que permita registrar e criar inimigos
   dinamicamente.

   2. Implemente pelo menos três tipos de inimigos com características
   distintas:
     • Goblin: Um inimigo terrestre com ataque fraco.
     • Orc: Um inimigo terrestre com ataque forte.
     • Harpy: Um inimigo voador com ataque médio.

   3. Cada inimigo deve ter pelo menos os atributos:
     • name: Nome do inimigo.
     • attack_power: Poder de ataque.
     • move(): Método que exibe como o inimigo se movimenta.

   4. No final, registre os inimigos na fábrica e crie pelo menos um de cada
   tipo usando sua Factory Kit.
"""


class EnemyFactoryKit:
    def __init__(self):
        self.enemies = {}

    def register_enemy(self, name, enemy):
        self.enemies[name] = enemy

    def create_enemy(self, name):
        enemy = self.enemies.get(name)
        if enemy:
            return enemy()
        return None


class Goblin:
    name = "Goblin"
    attack_power = 10

    def move(self):
        print(f"{self.name} is moving slowly.")


class Orc:
    name = "Orc"
    attack_power = 20

    def move(self):
        print(f"{self.name} is moving aggressively.")


class Harpy:
    name = "Harpy"
    attack_power = 15

    def move(self):
        print(f"{self.name} is flying swiftly.")


# Registrando os inimigos na fábrica
factory = EnemyFactoryKit()

factory.register_enemy("Goblin", Goblin)
factory.register_enemy("Orc", Orc)
factory.register_enemy("Harpy", Harpy)

# Criando inimigos
goblin = factory.create_enemy("Goblin")
orc = factory.create_enemy("Orc")
harpy = factory.create_enemy("Harpy")

# Testando os inimigos
goblin.move()
print(f"{goblin.name} attack power: {goblin.attack_power}\n")

orc.move()
print(f"{orc.name} attack power: {orc.attack_power}\n")

harpy.move()
print(f"{harpy.name} attack power: {harpy.attack_power}")
