import React, { Component } from 'react';
import { View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { container } from './utils/styles';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import { purple } from './utils/colors';
import { setLocalNotification } from './utils/notifications';

//store for redux
const store = createStore(reducer, {}, middleware);

const Tabs = createBottomTabNavigator();

const TabsScreen = () => (
  <Tabs.Navigator 
    tabBarOptions={{
      activeTintColor: purple,
    }}>
    <Tabs.Screen name="DeckList" component={DeckList}
      options={{
            tabBarLabel: 'List',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
          }} />
    <Tabs.Screen name="NewDeck" component={NewDeck}
      options={{
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="plus" color={color} size={size} />
            ),
          }} />
  </Tabs.Navigator>
);

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={TabsScreen} />
    <MainStack.Screen
      name="DeckDetail"
      component={DeckDetail}
      options={({ route }) => ({
        title: 'Deck detail'
      })}
    />
    <MainStack.Screen
      name="NewCard"
      component={NewCard}
      options={({ route }) => ({
        title: 'New Card'
      })}
    />
    <MainStack.Screen
      name="Quiz"
      component={Quiz}
      options={({ route }) => ({
        title: 'Quiz'
      })}
    />
  </MainStack.Navigator>
);

//App component
export default class App extends Component {
  
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={container}>
            <NavigationContainer>
              <MainStackScreen />
            </NavigationContainer>
        </View>
      </Provider>
    );
  }
}