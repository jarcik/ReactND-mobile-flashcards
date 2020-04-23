import { ADD_DECK, ADD_CARD, GET_DECK, GET_DECKS } from '../actions/index';

export default function reducers(state = {}, action) {
    switch (action.type) {
        case ADD_DECK:
            return {
                ...action.deck
            };
        case ADD_CARD:
            const deck = state[action.id];
            deck.questions.push(action.card);
            return {
                ...state,
                [action.id]: deck
            };
        case GET_DECK:
            return action.deck;
        case GET_DECKS:
            return action.decks;
        default:
            return state;
    }
}