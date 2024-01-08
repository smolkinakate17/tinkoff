export function setDefaultCardsInStorage() {
    localStorage.setItem('cards', JSON.stringify(defaultArray));
    return defaultArray;
}

export function saveCardInStorage(card) {
    if (!card) return;
    const cards = JSON.parse(localStorage.getItem('cards') || '[]');
    if (!card.id) {
        card.id = cards.length + 1;
        cards.push(card);
    } else {
        const index = cards.findIndex((x) => Number(x.id) === Number(card.id));
        cards[index] = card;
    }
    console.log("cards", cards);
    localStorage.setItem('cards', JSON.stringify(cards));
    return card;
}

export function delCardFromStorage(id) {
    const cards = JSON.parse(localStorage.getItem('cards') || '[]');
    localStorage.setItem('cards', JSON.stringify(cards.filter(card => card.id !== id)));
}

export function getCardsFromStorage() {
    const cards = localStorage.getItem('cards');
    if (!cards) return setDefaultCardsInStorage();
    return JSON.parse(localStorage.getItem('cards') || '[]');
}

export function getCardFromStorage(id) {
    return JSON.parse(localStorage.getItem('cards') || '[]').find(card => card.id === id);
}


const defaultArray = [
    {
        id: 1,
        img: "http://last-trend.ru/uploads/posts/2017-12/1512993116_59.jpg",
        name: "Сумка женская красная",
        description: "Удобная и функциональная сумочка в красном цвете подчеркнет вашу женственность и индивидуальность",
        provider: "Поставщик 1",
        code: 1234567
    },
    {
        id: 2,
        img: "http://last-trend.ru/uploads/posts/2017-12/1512993322_124.jpg",
        name: "Сумка женская розовая",
        description: "Необычная сумка в розовом цвете станет вашим любимым и незаменимым аксессуаром",
        provider: "Поставщик 2",
        code: 7654321
    },
    {
        id: 3,
        img: "http://img.allcorp.ru/boardsimgs/2016/12/27/5fa018af2793a8464855219cf18d223d.jpg",
        name: "Сумка женская черная",
        description: "Лаконичная черная сумка незаменима и подойдет под любой ваш образ от вечернего до повседневного",
        provider: "Поставщик 3",
        code: 1543298
    },
    {
        id: 4,
        img: "http://g01.a.alicdn.com/kf/HTB1je4qIpXXXXblXXXXq6xXFXXXd/Hot-Fashion-Korean-handbag-beautiful-Women-PU-leather-Bag-Tote-Bag-Printing-Handbags-many-style-Satchel.jpg",
        name: "Сумка женская белая",
        description: "Данная сумка отлично впишется в весенне-летний гардероб и станет отличным дополнением вашему образу",
        provider: "Поставщик 4",
        code: 5690364
    }
    
]