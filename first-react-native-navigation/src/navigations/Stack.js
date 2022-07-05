import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Item from '../screens/Item';
import List from '../screens/List';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: { backgroundColor: '#ffffff' },
        headerStyle: {
          height: 110,
          backgroundColor: '#95a5a6',
          borderBottomWidth: 5,
          borderBottomColor: '#34495e',
        },
        headerTitleStyle: { color: '#ffffff', fontSize: 24 },
        headerTitleAlign: 'center',
        headerTitle: ({ style }) => (
          <MaterialCommunityIcons name="react" style={style} />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="List"
        component={List}
        options={{
          headerTitle: 'List Screen',
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen name="Detail" component={Item} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
