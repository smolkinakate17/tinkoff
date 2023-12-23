/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {

    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    getDistance() {
        return (this.x**2 + this.y**2)**0.5
    }
}


/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {

    constructor(x=0, y=0, z=0) {
        super(x, y);
        this.z = z
    }
    static vectorLength(a, b) {
        return ((a.x - b.x)**2 + (a.y - b.y)**2 + (a.z - b.z)**2)**0.5
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Для тех, кто доверяет, но проверяет: написать тесты на методы класса (oop.spec.js)
 */
class Queue {

    constructor(array = []) {
        this.queue = array
        this.size = array.length
    }

    push(...args) {
        for (const elem of args) {
            this.queue.push(elem)
            this.size += 1
        }
    };

    pop() {
        const elem = this.queue[0]
        this.queue = this.queue.slice(1)
        this.size -= 1
        return elem
    };

    clear() {
        this.queue = []
        this.size = 0
    };
}


module.exports = {
    Point,
    Point3D,
    Queue,
};
