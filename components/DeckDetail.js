import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { button, buttonText, container } from '../utils/styles';

class DeckDetail extends Component {

  //go to add new card
  newCard = () => {
    this.props.navigation.navigate(
      'NewCard',
      { id: this.props.deck.title }
    );
  }

  //go to quiz
  quiz = () => {
    this.props.navigation.navigate(
      'Quiz',
      { questions: this.props.deck.questions }
    );
  }

  render() {
    const { deck } = this.props;

    return (
      <View style={container}>
        <Card title={deck.title} >
            <Text style={styles.numOfCards}>
              {deck.questions ? deck.questions.length : 0} cards
            </Text>
            <TouchableOpacity
              style={button}
              onPress={this.newCard}>
              <Text style={buttonText}>Add new Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={button}
              onPress={this.quiz}>
              <Text style={buttonText}>Take a Quiz</Text>
            </TouchableOpacity>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  numOfCards: {
    marginBottom: 10, 
    textAlign: 'center',
    fontSize: 30
  }
});

function mapStateToProps({ deck, decks }, props) {
    let id = null;
    if(props && props.route && props.route.params && props.route.params.id) {
      id = props.route.params.id;
    }
    return {
        deck: id !== null ? decks[id] : Object.values(deck)[0]
    }
}

export default connect(mapStateToProps)(DeckDetail);