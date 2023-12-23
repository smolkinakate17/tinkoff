//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return (n ^ 0) === n
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    return [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
function sumTo(n) {
    let sum = 0

    for (let i = 1; i <= n; i ++) {
        sum += i
    }

    return sum
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
function recSumTo(n) {
    if (n === 0) return 0
    return n + recSumTo(n - 1)
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    if (n === 1) return 1
    return n * factorial(n - 1)
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
function isBinary(n) {
    if (n === 1) return true
    let pow = 1
    while (true) {
        const currentPow = 2**pow
        if (currentPow > n) return false
        if (currentPow === n) return true
        pow++
    }
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    let first = 1;
    let second = 1;
    for (let i = 3; i <= n; i++) {
        let firstSecondSum = first + second;
        first = second;
        second = firstSecondSum;
    }
    return second;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */

function getOperationFn(initialValue, operatorFn = (storedValue, newValue) => storedValue) {
    let storedValue = initialValue;
    return function (newValue) {
        storedValue = operatorFn(storedValue, newValue);
        return storedValue;
    }
}
/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    let currentValue = start;
    return function generate() {
        const result = currentValue;
        currentValue += step;
        return result;
    }
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */

function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject) {
        return true;
    }
    if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
        return true
    }
    if (typeof firstObject !== 'object' || typeof secondObject !== 'object') {
        return false;
    }
    const firstObjectKeys = Object.keys(firstObject);
    const secondObjectKeys = Object.keys(secondObject);
    if (firstObjectKeys.length !== secondObjectKeys.length) {
        return false;
    }
    for (let key of firstObjectKeys) {
        if (!secondObject.hasOwnProperty(key) || !deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }
    return true;
}



module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
