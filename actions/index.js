import { _addDeck, _addCard, _getDeck, _getDecks } from '../utils/api';

//CONSTANTS FOR ACTIONS
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const GET_DECK = "GET_DECK";
export const GET_DECKS = "GET_DECKS";

//ACTIONS

//action for adding a deck
export function addDeck(title) {
    const deck = {[title]: { title, questions: [] }};
    return {
        type: ADD_DECK,
        deck
    }
}

//action for adding a card to an deck
export function addCard(id, card) {
    return {
        type: ADD_CARD,
        id,
        card
    }
}

//action for getting all decks
export function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}