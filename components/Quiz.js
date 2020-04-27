import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { lightPurp } from '../utils/colors';
import { button, buttonText, container } from '../utils/styles';

class Quiz extends Component {

    state = {
        ready: false,
        questions: [],
        currentQ: 0,
        correctA: 0,
        rotateCard: true
    }

    componentDidMount() {
        this.setState(() => (
            {
                ready: true,
                questions: this.props.route.params.questions
            }
        ));
    }

    //reset the notification
    resetNotification = () => {
        clearLocalNotification()
            .then(setLocalNotification);
    }

    //reset the quiz
    reset = () => {
        //reset the state
        this.setState({
                ready: true,
                currentQ: 0,
                correctA: 0,
                rotateCard: true
            });
        //reset the notification
        //this.resetNotification()
    }

    //go back to the deck
    back = () => {
        //reset state
        this.reset();
        //go back
        this.props.navigation.goBack();
        //reset notifications
        //this.resetNotification()
    }

    //user wants to rotate the qustion/answer
    rotateCard = () => {
        //flip the state of the rotateCard to update the view
        this.setState((previousState) => ({ rotateCard: !previousState.rotateCard }));
    }

    //click on the asnwer to the question
    answered = (answer) => {
        const {
            questions,
            currentQ
        } = this.state;
        //is the user answer correct?
        let correct = questions[currentQ].answer === answer;
        //update the state - show next question and update the number of correct answers
        this.setState((previousState) => ({ 
            currentQuestion: previousState.currentQ++,
            correctAnswers: correct ? previousState.correctA++ : previousState.correctA
         }));
    }

    //render the card for question/answer
    renderCard() {
        const {
            questions,
            currentQ,
            correctA,
            rotateCard
        } = this.state;
        
        //total amount of questions
        const lenght = questions.length;

        //is there space for another question?
        if (currentQ < lenght) {
            //yes it is
            return (
                <Card title={rotateCard ? `Question` : `Answer` } >                    
                    <Text style={styles.question}>{rotateCard ? questions[currentQ].question : questions[currentQ].answer}</Text>
                    <TouchableOpacity 
                        style={[ button, styles.rotateCard]} 
                        onPress={this.rotateCard}>
                        <Text style={buttonText}>{rotateCard ? "Show answer" : "Show question"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={button}
                        onPress={() => this.answered("Correct")}>
                        <Text style={buttonText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={button}
                        onPress={() => this.answered("Incorrect")}>
                        <Text style={buttonText}>Incorrect</Text>
                    </TouchableOpacity>
                    <Text style={styles.remains}>{`Question ${currentQ + 1} of ${lenght}`}</Text>
                </Card>
            );
        }
        //finish line of the quiz
        return (
            <Card title={`You got ${correctA} out of ${lenght} correct!`}>
                <TouchableOpacity
                    style={button}
                    onPress={this.reset}>
                    <Text style={buttonText}>Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={button}
                    onPress={this.back}>
                    <Text style={buttonText}>Back to Deck</Text>
                </TouchableOpacity>
            </Card>
        );
    }

    render() {
        if (this.state === false) {
            return <AppLoading />;
        }
        return (
            <View style={container}>
                {this.renderCard()}
            </View>
        );
    }
}

const styles = StyleSheet.create({   
    question: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    remains: {
        textAlign: 'center',
        marginTop: 10,
    },
    rotateCard: {
        marginBottom: 30,
        backgroundColor: lightPurp,
    }
});

export default connect()(Quiz);