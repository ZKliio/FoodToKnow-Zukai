// ProfileNavigator.js (or wherever your navigation stack is configured)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsCustomisation from './SettingsCustomisation';
import EditProfile from './EditProfile';
import SignInScreen from '../login/SignInScreen';
import SignUpScreen from '../login/SignUpScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SettingsCustomisation">
      <Stack.Screen name="SettingsCustomisation" component={SettingsCustomisation} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      {/* <Stack.Screen name="SignInScreen" component={SignInScreen} /> */}
      {/* <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
    </Stack.Navigator>
  );
};

export default ProfileNavigator;