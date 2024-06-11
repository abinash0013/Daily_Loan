import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import ViewAllUser from './pages/ViewAllUser';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        {/* <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Daily Loan', //Set Header Title
            headerStyle: {
              backgroundColor: '#f05555', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />  */}
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUser}
          options={{
            title: 'Record List', //Set Header Title
            headerStyle: {
              backgroundColor: '#f05555', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        /> 
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Add New Records', //Set Header Title
            headerStyle: {
              backgroundColor: '#f05555', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;