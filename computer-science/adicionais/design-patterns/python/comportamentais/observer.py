"""
O design patter observer é um padrão comportamental que define uma dependência
de um para muitos entre objetos, de modo que, ao alterar o estado de um objeto
observado, os observadores são notificados automaticamente.

Este padrão é usado para implementar a comunicação entre objetos em tempo real.
Python suporta callbacks e eventos por meio de bibliotecas, mas o observer é
uma simples de implementar isto sem depender de bibliotecas externas.
"""


class Subject:
    def __init__(self):
        self._observers = []

    def attach(self, observer: "ObserverInterface") -> None:
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer: "ObserverInterface") -> None:
        try:
            self._observers.remove(observer)
        except ValueError:
            pass

    def notify(self) -> None:
        for observer in self._observers:
            observer.update(self)


class ObserverInterface:
    def __init__(self, name: str):
        self.name = name

    def update(self) -> None:
        raise NotImplementedError("update() must be implemented")


class Observer(ObserverInterface):
    def update(self, subject: Subject) -> None:
        print(f"{self.name}: Notified")


subject = Subject()

o1 = Observer("Observer 1")
o2 = Observer("Observer 2")
o3 = Observer("Observer 3")

subject.attach(o1)
subject.attach(o2)
subject.attach(o3)

subject.notify()

subject.detach(o2)

subject.notify()
