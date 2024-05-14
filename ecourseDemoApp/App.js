import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Title } from 'react-native-paper';
import Course from './components/Course/Course';
import Lesson from './components/Course/Lesson';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Course" component={Course} options={{title: "Khóa học"}} />
      <Stack.Screen name="Lesson" component={Lesson} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}