import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Title, Card } from 'react-native-paper';

import Colors from './Colors';

const VPStart = (props) => {

    const [money, setMoney] = useState(props.money.toFixed(2));
    const [creditCost, setCreditCost] = useState('0.25');

    const handleChange = (text) => {
        setMoney(text);
    }

    const handleChangeCredit = (text) => {
        setCreditCost(text);
    }

    const handleStart = () => {
        if (parseFloat(money).toFixed(2) <= 0 || 
            parseFloat(creditCost).toFixed(2) <= 0 || 
            money === '' || 
            creditCost === '' ||
            isNaN(parseFloat(money)) ||
            isNaN(parseFloat(creditCost))) {
            Alert.alert("Invalid Input", "Please make all values are non-zero, positive dollar values.", [{text: "OK", style: "cancel"}]);
            return;
        }

        if (parseFloat(parseFloat(money).toFixed(2)) < parseFloat(parseFloat(creditCost).toFixed(2))) {
            Alert.alert("Insufficient Funds", "You won't be able to play given those values.", [{text: "OK", style: "cancel"}]);
            return;
        }

        props.handleStart(money, creditCost);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.wholeContainer}>

                <Title style={styles.title}>Video Poker Settings</Title>

                <View style={styles.settingsContainer}>

                    <Text>Insert starting money below:</Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.inputText}>$</Text>
                        <TextInput
                            style={styles.input} 
                            keyboardType='numeric'
                            value={money}
                            onChangeText={handleChange}
                        />
                    </View>

                    <Text>Determine cost per credit:</Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.inputText}>$</Text>
                        <TextInput
                            style={styles.input} 
                            keyboardType='numeric'
                            value={creditCost}
                            onChangeText={handleChangeCredit}
                        />
                    </View>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleStart}
                    >
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>    
                    
                </View>
            </View>    
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    wholeContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.primaryOff,
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 20
    },
    input: {
        height: 60,
        minWidth: 100,
        margin: 12,
        borderWidth: 3,
        padding: 10,
        borderRadius: 20,
        borderColor: Colors.accent,
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.accent
    },
    settingsContainer: {
        padding: 20,
        margin: 20,
        width: 275,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
    },
    title: {
        paddingTop: 40,
        paddingBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 1,
    },
    button: {
        padding: 18,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
})

export default VPStart;