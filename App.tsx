import React, { Component, useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { MainLayout } from './src/MainLayout';
import {TodoState} from './src/context/todo/todoState'
import {ScreenState} from './src/context/screen/screenState'



  
export default function App()  {

async function loadApplication() {
  try {
    await Font.loadAsync({
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    })
    setIsReady(true)
  } catch (error) {
    console.log(error)
  }
}
  
    

  const [isReady, setIsReady] = useState<boolean>(false);


  if (!isReady) {
    return (
      <AppLoading 
      startAsync={loadApplication}
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

