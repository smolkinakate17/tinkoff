"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    const [f, i, o] = fio.split(' ');
    return `${i} ${f}`
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array))
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    return Math.floor(Math.max(...array) / Math.min(...array))
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor() {
        this.map = new Map();
    }

    add(word, definition) {
        if (typeof word !== 'string' || typeof definition !== 'string') {
            throw new TypeError('Word and definition must be strings');
        }

        this.map.set(word, definition);
    }

    getDefinition(word) {
        if (typeof word !== 'string') {
            throw new TypeError('Word must be a string');
        }

        return this.map.get(word);
    }

    delete(word) {
        if (typeof word !== 'string') {
            throw new Error('Word must be a string');
        }

        return this.map.delete(word);
    }

    get size() {
        return this.map.size;
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
