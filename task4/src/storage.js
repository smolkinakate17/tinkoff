export async function setDefaultCardsInStorage() {
    const savedCards = []
    try {
        const allCards = await (await getCardsFromStorage()).json();
        for await (const card of allCards) {
            await delCardFromStorage(card.id)
        }
        for await (const card of defaultArray) {
            savedCards.push(await (await saveCardInStorage(card)).json())
        }
    } catch (e) {
        console.error(e);
    } finally {
        return savedCards;
    }
}

export function saveCardInStorage(card) {
    if (!card) return;
    
    return fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(card)
    });
}

export function updateCardInStorage(card) {
    if (!card || !card.id) return;
    
    return fetch(`http://localhost:3000/items/${card.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(card)
    });
}

export function delCardFromStorage(id) {
    return fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE',
    });
}

export function getCardsFromStorage() {
    return fetch('http://localhost:3000/items')
}

export function getUserInfo() {
    return fetch('http://localhost:3000/creatorInfo')
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