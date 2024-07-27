/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  
} from 'react-native';



import Searchbar from "./screens/food_info/searchbar.tsx";
import Homepage from "./screens/home/Homepage.tsx";
import MealPlanner from "./screens/meal_planner/Meal_planner.tsx";
import FoodInfo from "./screens/food_info/Food_info.tsx";
import FoodFinder from "./screens/food_finder/Food_Finder.tsx"
import Profile from "./screens/settings/Profile.tsx";

export type RootStackParamList = {
  Home: undefined;
  LoginScreen: undefined;
  MealPlanner: undefined;
  FoodInfo: undefined;
  FoodFinder: undefined;
  Profile: undefined;
};



declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();


// export const Read = () => {
//   // Find
//   const profiles = useQuery(Profiles);
//   // Sort
//   const sortedProfiles = useQuery(Profiles, profiles => {
//     return profiles.sorted('name', false);
//   });
//   // Filter
//   const filteredProfiles = useQuery(Profiles, profiles => {
//     return profiles.filtered('name == "testProfile"');
//   });
//   // ... rest of component
// };


// import React from 'react';
// import {RealmProvider} from '@realm/react';
import {Profiles} from './schemas/Profiles';
import { FoodProvider } from './FoodContext.js';
import { AuthProvider } from './AuthContext';
import { ProfileProvider } from './ProfileContext.js';
import { CalculatorProvider } from './CalculatorContext';
import UserStack from './screens/login/UserStack.tsx';

function App() {
  type Stack = {
    Screen: {
      name: string,
      component: object;
    }
  }
  

  return (
    <AuthProvider>
      <FoodProvider>
        <CalculatorProvider>
        <ProfileProvider>

          <UserStack />

        </ProfileProvider>
        </CalculatorProvider>
      </FoodProvider>
    </AuthProvider>

  );
}



//initialRouteName = "Home"


// export default function Index() {
//     const loginCheck = false;
    
//     if (loginCheck==false){
//     return (
      
//       <View style ={styles.background}>
//         <Login/>
//       </View>

//     );
//   };
//     if(loginCheck==true){
//     return(
//       <View style ={styles.background}>
//       <Homepage/>
//       </View>
//     );
//   };
  
// };

// const Header = () => {
//   return (
//     <View style={styles.headerContainer}>
//       <Text style={styles.headerText}></Text>
//     </View>
//   );
// };


export default App;

  const styles = StyleSheet.create({
    background: {  //style for the main container
      flex: 1,
      padding: 0,
      backgroundColor: 'rgb(245,234,206)',         //'blue',
    },

    headerContainer: {
      flex: 0.15,
      margin: 0,
      padding: 10,
      backgroundColor: 'rgb(255, 230, 0)',
    },

    headerText:{
      color: 'black',
      fontSize: 40,
      fontWeight: 'bold',
      padding: 10,
    },

    subheaderText:{
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      padding: 10,
    }
  });








// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>

//           <Section title="Step 123One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits. 
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
            
//           </Section>
//           <Section title="Learn More">
//             Testing 12
//             </Section>
            
//           <LearnMoreLinks />
        
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
