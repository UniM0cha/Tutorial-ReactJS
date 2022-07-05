import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/Stack';
import TabNavigation from './navigations/Tab';

export default function App() {
  return (
    <NavigationContainer>
      {/* <StackNavigation /> */}
      <TabNavigation />
    </NavigationContainer>
  );
}
