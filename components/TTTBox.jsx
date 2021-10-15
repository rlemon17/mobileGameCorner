import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { Title } from 'react-native-paper';

import Colors from './Colors';

const TTTBox = (props) => {

    const [symbol, setSymbol] = useState(props.symbol);

    const handlePress = () => {
        if (symbol === '') {
            setSymbol(props.turn);
            props.handleMove(props.id, props.turn);
        }
        else {
            Alert.alert("Invalid Move", "Space is already taken.", [{text: "OK", style: "cancel"}]);
        }
    }

    return (
        <TouchableOpacity 
            style={{...styles.box, ...props.style}}
            onPress={handlePress}
        >
            <Text style={styles.mark}>{symbol}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    box: {
        height: 100,
        width: 100,
        backgroundColor: Colors.accentOff,
        position: 'absolute',
        justifyContent: 'center'
    },
    mark: {
        textAlign: 'center',
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 80
    }
})

export default TTTBox;