import { _addDeck, _addCard, _getDeck, _getDecks } from '../utils/api';

//CONSTANTS FOR ACTIONS
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const GET_DECK = "GET_DECK";
export const GET_DECKS = "GET_DECKS";

//ACTIONS

//action for adding a deck
function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

//action for adding a card to an deck
function addCard(id, card) {
    return {
        type: ADD_CARD,
        id,
        card
    }
}

//action for getting a particular deck
function getDeck(deck) {
    return {
        type: GET_DECK,
        deck
    }
}

//action for getting all decks
function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}


//HANDLING ACTIONS

export function handleAddDeck(deck) {
    return (dispatch) => {
        return _addDeck(deck)
            .then((d) => {
                dispatch(addDeck(d));
            }).catch(error => console.log(error))
    }
}

export function handleAddCard(id, card) {
    return (dispatch) => {
        return _addCard(id, card)
            .then((deck) => {
                dispatch(addCard(id, card));
            }).catch(error => console.log(error))
    }
}

export function handleGetDeck(id) {
    return (dispatch) => {
        return getDeck(id)
            .then((deck) => {
                dispatch(getDeck(deck));
            }).catch(error => console.log(error))
    }
}

export function handleGetDecks() {
    return (dispatch) => {
        return getDecks()
            .then((decks) => {
                dispatch(getDeck(decks));
            }).catch(error => console.log(error))
    }
}
