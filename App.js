import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore,  applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(reducer, {}, applyMiddleware(thunk));

export default class App extends React.Component {  
  render() {
    return (    
      <Provider store={ store }>
        <View style={{ flex: 1 }}>
          <View>
            <Text>Hello there</Text>
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
