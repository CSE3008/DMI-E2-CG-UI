import React, { useLayoutEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { StyleSheet, ScrollView, Text } from 'react-native';
import { useSelector } from "react-redux";
// import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import axios from "axios";

const Home = () => {
    const [gastos, setGastos] = useState([]);
    const [ingresos, setIngresos] = useState([]);
    const user = useSelector((store) => store.user.userId);

    useLayoutEffect(() => {
        if(user){
            axios.get(process.env.REACT_APP_API + '/gastos').then(result => {
                let filter = result.data.filter(element => element.idUser == user);
                setGastos(filter);
            }).catch(e => {
                console.log(e);
            });
        }
    }, [user]);

    useLayoutEffect(() => {
        if(user){
            axios.get(process.env.REACT_APP_API + '/ingresos').then(result => {
                let filter = result.data.filter(element => element.idUser === user);
                setIngresos(filter);
            }).catch(e => {
                console.log(e);
            });
        }
    }, [user]);
  
    return (
        <ScrollView style={styles.containerTable}>
            <Text style={styles.title}>Gastos</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Nombre</DataTable.Title>
                    <DataTable.Title>Monto "$"</DataTable.Title>
                </DataTable.Header>
                {
                    gastos.map((registro, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{registro.descripcion}</DataTable.Cell>
                            <DataTable.Cell>{registro.monto}</DataTable.Cell>                          
                        </DataTable.Row>
                    ))
                }
           </DataTable>
           <Text style={styles.title}>Ingresos</Text>
           <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Nombre</DataTable.Title>
                    <DataTable.Title>Monto "$"</DataTable.Title>
                </DataTable.Header>
                {
                    ingresos.map((registro, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{registro.descripcion}</DataTable.Cell>
                            <DataTable.Cell>{registro.monto}</DataTable.Cell>                          
                        </DataTable.Row>
                    ))
                }
           </DataTable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '34px',
        marginTop: '13%',
        marginBottom: '7%'
    }
});
  

export default Home;