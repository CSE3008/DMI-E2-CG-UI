import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Button, TextInput, Text, View, ScrollView, Pressable } from 'react-native';
import { DataTable, Dialog } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DialogActions, DialogContent, DialogHeader } from "@react-native-material/core";
import { changeModalFalse, changeModalTrue } from "../redux/actions/AlterAction";

const TableGastos = () => {
    const dispatch = useDispatch();
    const category = useSelector((store) => store.category.categoryId);
    const modal = useSelector((store) => store.modal.modal);
    const user = useSelector((store) => store.user.userId);
    const [registros, setRegistros] = useState([]);
    const [deleteG, setDeletG] = useState(false);
    const [monto, setMonto] = useState("");
    const [montoEdit, setMontoEdit] = useState("");
    const [descripcion, setDescripcion] = useState("");    
    const [descripcionEdit, setDescripcionEdit] = useState("");    
    const [id, setID] = useState("");    

    useLayoutEffect(() => {
        if(!!category){
            getGastos();
        }
    }, [category]);

    const getGastos = () => {
        axios.get(process.env.REACT_APP_API + '/gastos').then(result => {
            let filter = result.data.filter(element => element.idCatg === category);
            setRegistros(filter)
        }).catch(e => {
            console.log(e);
        })   
    }

    const handleSubmit = () => {
        let parseMonto = Number.parseInt(monto);
        axios.post(process.env.REACT_APP_API + '/gastos', {
            monto: parseMonto, 
            descripcion,
            idUser: user,
            idCatg: category
        }).then(result => {
            getGastos();
            setMonto("");
            setDescripcion("");
        }).catch(err => {
            console.log(err);
        });
    }
  
    const handleEdit = () => {
        let parseMonto = Number.parseInt(montoEdit);
        axios.put(process.env.REACT_APP_API + `/gastos/${id}`, {
            monto: parseMonto, 
            descripcion: descripcionEdit,
            idUser: user,
            idCatg: category
        }).then(result => {
            getGastos();
            setMontoEdit("");
            setDescripcionEdit("");
        }).catch(err => {
            console.log(err);
        });
    }

    const handleDelete = () => {
        axios.patch(process.env.REACT_APP_API + `/gastos/delete/${id}`).then(result => {
            getGastos();
        }).catch(e => {
            console.log(e);
        });
    }
  
    return (
        <ScrollView>
            <View style={styles.containerButton}>
                <DialogContent>
                    <Text style={styles.color}>Descripcion:</Text>
                    <TextInput 
                        onChangeText={setDescripcion}
                        value={descripcion}
                        keyboardType="string"
                        style={styles.input}
                    />
                    <Text style={styles.color}>Monto:</Text>
                    <TextInput 
                        onChangeText={setMonto}
                        value={monto}
                        keyboardType="string"
                        style={styles.input}
                    />
                </DialogContent>
                <Pressable style={styles.button} onPress={() => {
                    handleSubmit();
                }}>
                    <Text style={styles.text}>Guardar</Text>
                </Pressable>
            </View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Nombre</DataTable.Title>
                    <DataTable.Title>Monto "$"</DataTable.Title>
                    <DataTable.Title>Editar</DataTable.Title>
                    <DataTable.Title>Eliminar</DataTable.Title>
                </DataTable.Header>                
                {
                    registros.map((registro, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell>{registro.descripcion}</DataTable.Cell>
                            <DataTable.Cell>{registro.monto}</DataTable.Cell>
                            <DataTable.Cell>
                                <Pressable onPress={() => {
                                    dispatch(changeModalTrue());
                                    setDescripcionEdit(registro.descripcion);
                                    setMontoEdit(registro.monto);
                                    setID(registro._id);
                                }}>
                                    <Text>Editar</Text>
                                </Pressable>
                            </DataTable.Cell>
                            <DataTable.Cell>
                                <Pressable onPress={() => {
                                    setDeletG(true);
                                    setID(registro._id);
                                }}>
                                    <Text>Eliminar</Text>
                                </Pressable>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))
                }
            </DataTable>
            <Dialog style={styles.modal} visible={deleteG} onDismiss={() => setDeletG(false)}>
                <DialogHeader title="Seguro que desea eliminar este registro?" />
                <DialogActions>
                    <Button
                        title="Cancelar"
                        compact
                        variant="text"
                        onPress={() => setDeletG(false)}
                    />
                    <Button
                        title="Ok"
                        compact
                        variant="text"
                        onPress={() => {
                            handleDelete();
                            setDeletG(false);
                        }}
                    />
                </DialogActions>
            </Dialog>
            <Dialog style={styles.modal} visible={modal} onDismiss={() => dispatch(changeModalFalse())}>
                <DialogHeader title="Editar gasto" />
                <DialogContent>
                    <Text style={styles.color}>Descripcion</Text>
                    <TextInput 
                        onChangeText={setDescripcionEdit}
                        value={descripcionEdit}
                        keyboardType="string"
                        style={styles.input}
                    />
                    <Text style={styles.color}>Monto</Text>
                    <TextInput 
                        onChangeText={setMontoEdit}
                        value={montoEdit}
                        keyboardType="string"
                        style={styles.input}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        title="Cancel"
                        compact
                        variant="text"
                        onPress={() => dispatch(changeModalFalse())}
                    />
                    <Button
                        title="Ok"
                        compact
                        variant="text"
                        onPress={() => {
                            handleEdit();
                            dispatch(changeModalFalse())
                        }}
                    />
                </DialogActions>
            </Dialog>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%'
    },
    button: {
        backgroundColor: 'black',
        width: '25%',
        height: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%'
    },
    text: {
        color: 'white'
    },
    input: {
        border: 'solid black 2px',
        marginTop: '2%',
        marginBottom: '2%'
    }
});
  

export default TableGastos;