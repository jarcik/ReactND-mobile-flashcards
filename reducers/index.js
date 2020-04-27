import { ADD_DECK, ADD_CARD, GET_DECK, GET_DECKS } from '../actions/index';

export default function reducers(state = {}, action) {
    switch (action.type) {
        case ADD_DECK:
            let d = action.deck;
            return {
                decks: {...state.decks, ...d},
                deck: action.deck                
            };
        case ADD_CARD:
            let dd = state.decks[action.id];
            dd.questions.push(action.card);
            return {
                decks: {...state.decks},
                deck: dd
            };
        case GET_DECK:
            return action.deck;
        case GET_DECKS:
            return action.decks;
        default:
            return state;
    }
}