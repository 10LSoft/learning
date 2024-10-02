class Singleton:
    """
    This design pattern has the main goal into no to allow that a class
    generates more than one instance of an object.

    The __new__ method is a class method that works in the instantiation time
    and in our case, if a instance has been created, the method return this
    instance in place to bring a new one.
    """

    def __new__(cls):
        if not hasattr(cls, "instance"):
            # cls.instance = super(Singleton, cls).__new__(cls)
            cls.instance = super().__new__(cls)

        return cls.instance


s1 = Singleton()
s2 = Singleton()

print(s1 == s2)  # True
print(id(s1), id(s2))  # same memory address


class Singleton2:
    """
    Another reason to create a singleton is when we need to make some lazy
    instantiation. It means that when we don't need to instantiate an object,
    we can only call __init__ for example and only by another method create the
    true object itself. Works like this:
    """

    _instance = None

    def __init__(self):
        if not Singleton2._instance:
            print("this object was not created yet")
        else:
            return self.create()

    @classmethod
    def create(cls):
        if not cls._instance:
            cls._instance = Singleton2()

        return cls._instance


Singleton2()

s3 = Singleton2()
s4 = Singleton2()

print(s3 == s4)
print(id(s3), id(s4))
