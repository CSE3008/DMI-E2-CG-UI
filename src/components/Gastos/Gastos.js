import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Button, TextInput, ImageBackground, Text, View, ScrollView } from 'react-native';
import { Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { changeFlagFalse } from "../redux/actions/FlagAction";
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
  } from "@react-native-material/core";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { changeCategoryId } from "../redux/actions/CategoryActions";
import { Image } from "react-native";
import { Pressable } from "react-native";

const Gastos = () => {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const change = useSelector((store) => store.flag.flag);    
    const user = useSelector((store) => store.user.userId);
    const [elements, setElements] = useState([]);
    const [inputCategory, setInputCategory] = useState('');
    const [inputTitle, setInputTitle] = useState('');
    const [inputDes, setInputDes] = useState('');
    const [edit, setEdit] = useState(false);
    const [deleteC, setDeleteC] = useState(false);
    const [id, setID] = useState("");

    useLayoutEffect(() => {
        getCategorias();
    }, []);
    
    const getCategorias = () => {
        axios.get(process.env.REACT_APP_API + '/categorias').then(result => {
            let filter = result.data.filter(element => (element.descripcion === "Cat" && element.idUser === user));
            setElements(filter);
        }).catch(e => {
            console.log(e);
        });
    }

    const handleSubmit = () => {
        axios.post(process.env.REACT_APP_API + '/categorias', {
            idUser: user,
            titulo: inputCategory,
            descripcion: 'Cat'
        }).then(result => {
            setInputCategory('');
            getCategorias();
        }).catch(e => {
            console.log(e);
        });
    }

    const handleEdit = () => {
        axios.put(process.env.REACT_APP_API + `/categorias/${id}`, {
            idUser: user,
            titulo: inputTitle,
            descripcion: inputDes
        }).then(result => {
            getCategorias();
            setInputTitle("");
            setInputDes("");
        }).catch(e => {
            console.log(e);
        }); 
    }
    
    const handleDelete = () => {
        axios.patch(process.env.REACT_APP_API + `/categorias/delete/${id}`).then(result => {
            getCategorias();
            setInputTitle("");
            setInputDes("");
        }).catch(e => {
            console.log(e);
        }); 
    }

    const navigateTo = () => {
        navigate.navigate('Tabla de gastos');
    }

    return (
        <ScrollView style={styles.containerGastos}>
            <Title style={styles.title}>Categorias</Title>
            {
                elements.length > 0 && elements.map((element, index) => (
                    <View key={index} style={styles.containerOne}>
                        <Image style={{
                            width: '100%',
                            height: '50%',
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',   
                            resizeMode: 'contain'                         
                        }} 
                        source={require(`../../../assets/gastos.png`)
                        }></Image>
                        <View style={styles.containerText}>
                            <Text style={styles.textCard}>{element?.titulo}</Text>
                            <View style={styles.buttons}>
                                <Pressable style={styles.colorY} onPress={
                                        () => {
                                            setID(element?._id);                                   
                                            setInputTitle(element?.titulo);
                                            setInputDes(element?.descripcion);
                                            setEdit(true);
                                        } 
                                    }
                                >
                                    <Text>Editar</Text>
                                </Pressable>
                                <Pressable style={styles.colorR} onPress={
                                        () => {     
                                            setID(element?._id);                                   
                                            setDeleteC(true);
                                        }
                                    }
                                >
                                    <Text style={styles.color}>Eliminar</Text>
                                </Pressable>
                            </View>
                            <View>
                                <Pressable    
                                    style={styles.button}
                                    onPress={() => {
                                        dispatch(changeCategoryId(element._id));
                                        navigateTo();
                                    }}
                                >
                                    <Text style={styles.color}>Ver</Text>
                                </Pressable>                                 
                            </View>
                        </View>
                    </View>
                ))
            }
            <Dialog style={styles.modal} visible={change} onDismiss={() => dispatch(changeFlagFalse())}>
                <DialogHeader title="Crear categoria" />
                <DialogContent>
                    <Text style={styles.color}>Nombre de categoria gastos:</Text>
                    <TextInput 
                        onChangeText={setInputCategory}
                        value={inputCategory}
                        keyboardType="string"
                        style={styles.input}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        title="Cancel"
                        compact
                        variant="text"
                        onPress={() => dispatch(changeFlagFalse())}
                    />
                    <Button
                        title="Ok"
                        compact
                        variant="text"
                        onPress={() => {
                            handleSubmit()
                            dispatch(changeFlagFalse())
                        }}
                    />
                </DialogActions>
            </Dialog>
            <Dialog style={styles.modal} visible={edit} onDismiss={() => setEdit(false)}>
                <DialogHeader title="Crear categoria" />
                <DialogContent>
                    <Text style={styles.color}>Titulo:</Text>
                    <TextInput 
                        onChangeText={setInputTitle}
                        value={inputTitle}
                        keyboardType="string"
                        style={styles.input}
                    />                   
                </DialogContent>
                <DialogActions>
                    <Button
                        title="Cancel"
                        compact
                        variant="text"
                        onPress={() => setEdit(false)}
                    />
                    <Button
                        title="Ok"
                        compact
                        variant="text"
                        onPress={() => {
                            handleEdit()
                            setEdit(false)
                        }}
                    />
                </DialogActions>
            </Dialog>
            <Dialog style={styles.modal} visible={deleteC} onDismiss={() => setDeleteC(false)}>
                <DialogHeader title="Crear categoria" />
                <DialogContent>
                    <Text style={styles.color}>Seguro que desea eliminar la categoria?</Text>
                </DialogContent>
                <DialogActions>
                    <Button
                        title="Cancel"
                        compact
                        variant="text"
                        onPress={() => setDeleteC(false)}
                    />
                    <Button
                        title="Ok"
                        compact
                        variant="text"
                        onPress={() => {
                            handleDelete();
                            setDeleteC(false)
                        }}
                    />
                </DialogActions>
            </Dialog>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerGastos: {
        padding: '2%'
    },
    containerOne: {
        height: '50vh',
        backgroundColor: 'white',
        border: 'solid 2px #353535',
        borderRadius: '15px',
        scroll: 'auto',
        marginBottom: '2%',
        width: '100%'
    },
    containerText: {
        height: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'        
    },
    button: {
        backgroundColor: '#093E80',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '96vw',
        color: 'white',        
        height: '4rem',
        marginTop: '2%',
        position: 'relative',   
        top: '51%',
        borderBottomLeftRadius: '18px',
        borderBottomRightRadius: '18px'

    },
    textCard: {
        fontWeight: 'bold',
        marginBottom: '2%',
        fontSize: '2rem'
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold'
    },
    title: {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '5%',
        marginTop: '5%',
        fontWeight: 'bold'
    },
    color: {
        color: 'white'
    },
    input: {
        backgroundColor: 'white',
        marginTop: '5%',
        height: '25px',
        paddingLeft: '5px'
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    colorY: {
        backgroundColor: 'white',
        height: '2rem',
        width: '20vw',
        borderBottomLeftRadius: '18px',
        borderTopLeftRadius: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'solid #353535 1px'
    },
    colorR: {
        backgroundColor: '#353535',
        height: '2rem',
        width: '20vw',
        borderTopRightRadius: '18px',
        borderBottomRightRadius: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'solid #353535 1px'
    }
});
  

export default Gastos;