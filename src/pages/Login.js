import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, StyleSheet, Image, TextInput, TouchableOpacity, Text} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({navigation}) {
    const [user, setUser] = useState('');

    useEffect(() =>{
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('Main', {user})
            }
        })
    },[])

    async function handleLogin() {
        const response = await api.post('devs', {username: user})

        const {_id} = response.data;

        await AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', {user: _id});
    }

    return (
        <View style={styles.container}>
            <Image source={logo}/>

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#999"
                placeholder="Digite seu usuario no Github"
                style={styles.input}
                value={user}
                onChangeText={setUser}
            />
    
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        marginHorizontal: 15 
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#df4623',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})