import React, { useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { MainLayout } from './src/MainLayout';
import {TodoState} from './src/context/todo/todoState'
import {ScreenState} from './src/context/screen/screenState'



async function loadAplication() {
  await Font.loadAsync({
    'robot-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'robot-bold': require('./assets/fonts/Roboto-Bold.ttf')
  });
}
 
export default function App() {

  const [isReady, setIsReady] = useState<boolean>(false);


  if (!isReady) {
    return (
      <AppLoading 
      startAsync={loadAplication}
      onError={(err) => console.log(err)}
      onFinish={() => setIsReady(true)}
      />
    )
  }

             
        

  return (
    <ScreenState>
     <TodoState>
      <MainLayout/>  
     </TodoState>
    </ScreenState> 
  );
}

