import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Ionicons} from '@expo/vector-icons'

import InicioScreen from './src/screens/Inicio'
import ConfiguracoesScreen from './src/screens/Configuracoes';
import FotoScreen from './src/screens/Foto'
import {Platform} from 'react-native'

const Drawer = createDrawerNavigator()

export default function App(){

  const[iconePadrao, setIconePadrao] = useState('md')

  useEffect(() =>{
    //dependendo do so, mostraremos funcoes diff
    switch(Platform.OS){
      case 'ios':
        setIconePadrao('ios')
        break
      case 'android':
        setIconePadrao('android')
        break
    }
  },{})

  return(
    <NavigationContainer>
      <Drawer.Navigator 
          initialRouteName='Inicio'
          screenOptions={{
            drawerStyle:{
              backgroundColor:'#FFF', width: 270
            }
          }}>
            
          <Drawer.Screen name="Inicio" component={InicioScreen} options={{
            drawerIcon: ({focused}) => (
              <Ionicons name={`${iconePadrao}-home`}
              size={32}
              color={focused ? '#7CC' : '#CCC'}/>)
            }}
        />
          <Drawer.Screen name="Configurações" component={ConfiguracoesScreen} options={{
            drawerIcon: ({focused}) => (
              <Ionicons name={`${iconePadrao}-cog`}
              size={32}
              color={focused ? '#7CC' : '#CCC'}/>)
            }}/>
          <Drawer.Screen name="Foto" component={FotoScreen} options={{
            drawerIcon: ({focused}) => (
              <Ionicons name={`${iconePadrao}-camera`}
              size={32}
              color={focused ? '#7CC' : '#CCC'}/>)
            }}/>

      </Drawer.Navigator>
    </NavigationContainer>
  )
}