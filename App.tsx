import React from 'react';
import IndexScreen from './src/screen/IndexScreen';
import CreateScreen from './src/screen/CreateScreen';
import ShowScreen from './src/screen/ShowScreen';
import EditScreen from './src/screen/EditScreen';
import {RootStackParamList} from './src/navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from './src/context/BlogContext';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index">
          <Stack.Screen
            name="Index"
            component={IndexScreen}
            options={{title: 'Blogs'}}
          />
          <Stack.Screen name="Create" component={CreateScreen} />
          <Stack.Screen name="Show" component={ShowScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
