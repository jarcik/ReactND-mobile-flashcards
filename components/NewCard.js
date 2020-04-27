import React, { Component } from 'react';
import { Switch, KeyboardAvoidingView, Keyboard, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Card, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { _addCard } from '../utils/api';
import { addCard } from '../actions';
import { container, button, buttonText, disabledButton } from '../utils/styles';

class NewCard extends Component {

  state = {
    question: '',
    answer: true
  };

  handleSubmit = () => {
    const { id } = this.props.route.params;
    const { question, answer } = this.state;
    if (question) {
      const card = { question, answer: answer ? 'Correct' : 'Incorrect' };
      this.props.dispatch(addCard(id, card));
      this.setState({ question: '', answer: false});
      _addCard(id, card);
      this.props.navigation.navigate(
        'DeckDetail',
        {
        id: id
        },
        Keyboard.dismiss()
      );
    }
  };

  //handle swithcing the toggle
  toggleSwitch = () => {
      this.setState((prevState) => (
          { answer: !prevState.answer }
      ));
  };

  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView style={container}
        behavior="padding">
        <Card title="Add new card" >
          <Input
            placeholder="S is a number"
            onChangeText={question => this.setState({ question })}
            value={question} />
          <View style={styles.inline}>
            <Switch
              style={container}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.toggleSwitch}
                value={answer} />
            <Text style={container}>{answer ? "Correct" : "Incorrect"}</Text>
          </View>          
          <TouchableOpacity
            style={!this.state.question ? disabledButton : button}
            onPress={this.handleSubmit}
            disabled={!this.state.question}>
            <Text style={buttonText}>Save a Card</Text>
          </TouchableOpacity>          
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({   
  inline: {
    flexDirection: "row",
    margin: 20
  }
});

export default connect()(NewCard);