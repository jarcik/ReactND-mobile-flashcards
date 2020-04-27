import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native';
import { Card, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { _addDeck } from '../utils/api';
import { addDeck } from '../actions';
import { container, button, buttonText, disabledButton } from '../utils/styles'

class NewDeck extends Component {

  state = {
    title: ''
  };

  handleSubmit = () => {
    const { title } = this.state;
    //musth be filled title of the deck
    if (title) {
      //dispatch the redux
      this.props.dispatch(addDeck(title));
      //reset state
      this.setState({ title: '' });
      //add to database
      _addDeck(title);
      //navigate to the deck page
      this.props.navigation.navigate(
          'DeckDetail',
          {
          id: title
          },
          Keyboard.dismiss()
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={container}
        behavior="padding"
      >
        <Card title="Title for the deck" >
          <Input
            placeholder="Stargate"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
          <TouchableOpacity
            style={!this.state.title ? disabledButton : button}
            onPress={this.handleSubmit}
            disabled={!this.state.title}>
            <Text style={buttonText}>Save a Deck</Text>
          </TouchableOpacity>
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewDeck);