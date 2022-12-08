
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../components/Home/Home";
import Ingresos from "../components/Ingresos/Ingresos";
import Gastos from "../components/Gastos/Gastos";
import { StyleSheet, Text, Button } from "react-native";
import { Icon } from "@react-native-material/core";
import { useDispatch } from "react-redux";
import { changeFlagTrue, changeFlagTwoTrue } from "../components/redux/actions/FlagAction";
import { Pressable } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  const dispatch = useDispatch();

  return (
    <Tab.Navigator>      
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: () => (
          <Icon name="home" color="black" size={24} />
        ),
      }} />      
      <Tab.Screen name="Gastos" component={Gastos} options={{
        headerRight: () => (
          <Pressable
            style={styles.buttonHeader}
            onPress={() => {
              dispatch(changeFlagTrue());
            }}
          >
            <Icon name="plus" color="white" size={24} />
          </Pressable>
        )
      }} />
      <Tab.Screen name="Ingresos" component={Ingresos} 
        options={{
          headerRight: () => (
            <Pressable
              style={styles.buttonHeader}
              onPress={() => {
                dispatch(changeFlagTwoTrue());
              }}
            >
              <Icon name="plus" color="white" size={24} />
            </Pressable>
          )
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonHeader: {
    backgroundColor: '#093E80',
    marginRight: '2%',
    height: '40px',
    width: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonHeaderText: {
    color: 'white'
  }
});

export default TabNavigator;