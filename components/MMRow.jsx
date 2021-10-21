import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import MMCodePeg from './MMCodePeg';
import MMHintPeg from './MMHintPeg';

const MMRow = () => {

    const [code, setCode] = useState([0,0,0,0]);
    const [hint, setHint] = useState('0000');

    return (
        <View style={styles.gameRow}>
            <View style={styles.codeContainer}>
                <MMCodePeg num={code[0]} />
                <MMCodePeg num={code[1]} />
                <MMCodePeg num={code[2]} />
                <MMCodePeg num={code[3]} />
            </View>
            <TouchableOpacity style={styles.hintContainer} >
                <View style={styles.hintRow} >
                    <MMHintPeg num={hint.charAt(0)} />
                    <MMHintPeg num={hint.charAt(1)} />
                </View>
                <View style={styles.hintRow} >
                    <MMHintPeg num={hint.charAt(2)} />
                    <MMHintPeg num={hint.charAt(3)} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    gameRow: {
        flexDirection: 'row',
        backgroundColor: 'black',
        width: '100%',
        height: '10%'
    },
    codeContainer: {
        flex: 4,
        margin: 5,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff'
    },
    hintContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    codePeg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 2,
        backgroundColor: '#dedede'
    },
    hintRow: {
        flexDirection: 'row',
        flex: 1
    },
    hintPeg: {
        width: 20,
        height: 20,
        borderRadius: 25,
        margin: 4,
        backgroundColor: '#dedede'
    }
})

export default MMRow;