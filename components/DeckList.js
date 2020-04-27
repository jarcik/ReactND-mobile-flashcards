import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { getDecks } from '../actions';
import { _getDecks } from '../utils/api';
import { white, blue } from '../utils/colors';
import { Card } from 'react-native-elements';
import { button, buttonText, container } from '../utils/styles';

class DeckList extends Component {

    state = {
        ready: false,
    }

    componentDidMount() {
        _getDecks()
            .then((decks) => {
                this.props.dispatch(getDecks({decks}))
            })
            .then((decks) => this.setState(() => ({ ready: true })))
    }

    //navigate to the deck
    toDeck = (item) => {
        this.props.navigation.navigate(
            'DeckDetail',
            { id: item }
        );
    }

    //navigate to create new deck
    newDeck = () => {
        this.props.navigation.navigate(
            'NewDeck'
        );
    }

    render() {
        const { decks } = this.props;
        const { ready } = this.state;

        if (ready === false) {
            return <AppLoading />;
        }

        return (
            <View style={container}>
                {decks
                    ? <FlatList data={Object.keys(decks)}
                        keyExtractor={item => item}
                        renderItem={({ item }) => {
                            return <View>
                                <TouchableOpacity
                                    onPress={() => this.toDeck(item)}>
                                    <Card
                                    containerStyle={styles.deckContainer}>
                                        <Text style={styles.title}>{decks[item].title}</Text>
                                        <Text style={styles.numOfCards}>{decks[item].questions.length} cards</Text>
                                    </Card>
                                </TouchableOpacity>
                            </View>
                        }}
                    />
                    : <Card title='No decks!'>
                        <TouchableOpacity
                            style={button}
                            onPress={this.newDeck}>
                            <Text style={buttonText}>Add some Deck</Text>
                        </TouchableOpacity>
                    </Card>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 25,
        color: white
    },
    numOfCards: {
        textAlign: 'center',
        fontSize: 18,
        color: white
    },
    deckContainer: {
        backgroundColor: blue,
    }
})

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)