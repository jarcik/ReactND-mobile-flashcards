import { AsyncStorage } from 'react-native';

//key for notigication
const KEY = 'MobileFlashCards';

//add new deck
export function _addDeck(title) {
    const deck = { title, questions: [] };
    return AsyncStorage.mergeItem(KEY,
        JSON.stringify({[title]: deck})
    );
}

//add new card
export function _addCard(id, card) {
    return _getDeck(id)
        .then((deck) => {
            return AsyncStorage.mergeItem(KEY, JSON.stringify({
                [deck.title]: deck
            }));
        });
}

//get one particular deck
export function _getDeck(id) {
    return _getDecks()
        .then((decks) => decks[id]);
}

//get all decks
export function _getDecks() {
    AsyncStorage.clear();
    return AsyncStorage.getItem(KEY).then(decks => {
        if (decks) {
            return JSON.parse(decks);
        } else {
            AsyncStorage.setItem(KEY, JSON.stringify(data));
            return data;
        }
    });
}

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
};