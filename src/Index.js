import React from "react";
import TabNavigator from './Navigation/Navigation';
import { IconComponentProvider } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Provider as Prov } from '@react-native-material/core';

export default function Index() {        

    return (
        <Prov>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <TabNavigator />                    
            </IconComponentProvider>            
        </Prov>
    )
}