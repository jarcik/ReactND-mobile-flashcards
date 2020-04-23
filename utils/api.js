import { AsyncStorage } from 'react-native';

const KEY = 'MobileFlashCards';

const data = {
    Stargate: {
        title: 'Stargate',
        questions: [
            {
                question: 'Is SG1 the first series from Stargate world?',
                answer: 'Correct'
            },
            {
                question: 'Does Samantha Carted make it to the general?',
                answer: 'Incorrect'
            }
        ]
    },
    Months: {
        title: 'Months',
        questions: [
            {
                question: 'Is January the last month of the year?',
                answer: 'Incorrect'
            },
            {
                question: 'Does whole year have 12 months?',
                answer: 'Correct'
            }
        ]
    }
}

//add new deck
export function _addDeck(title) {
    const deck = { title, questions: [] };
    return AsyncStorage.mergeItem(KEY,
        JSON.stringify({
            [title]: deck
        })
    );
}

//add new card
export function _addCard(id, card) {
    getDeck(id)
        .then((deck) => {
            deck.questions.push(card);
            return AsyncStorage.mergeItem(KEY, JSON.stringify(deck));
        });
}

//get one particular deck
export function _getDeck(id) {
    return getDecks()
        .then((decks) => decks[id]);
}

//get all decks
export function _getDecks() {
    return AsyncStorage.getItem(KEY).then(decks => {
        if (decks !== null) {
            return JSON.parse(decks)
        } else {
            AsyncStorage.setItem(KEY, JSON.stringify(data));
            return data;
        }
    });
}
