import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import MMCodePeg from './MMCodePeg';

const MMAnswerRow = (props) => {

    const [code, setCode] = useState(props.answer);

    const onCodeChange = (index, value) => {
        const newArray = [...code];
        newArray[index] = value;
        props.submit(newArray);
        setCode(newArray);
    }

    return (
        <View style={styles.gameRow}>

            {/* =================== Code =================== */}
            <View style={styles.codeContainer}>
                <MMCodePeg id={0} num={code[0]} onSelect={onCodeChange} />
                <MMCodePeg id={1} num={code[1]} onSelect={onCodeChange} />
                <MMCodePeg id={2} num={code[2]} onSelect={onCodeChange} />
                <MMCodePeg id={3} num={code[3]} onSelect={onCodeChange} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    gameRow: {
        flexDirection: 'row',
        width: 375,
        height: 65,
        justifyContent: 'center',
        backgroundColor: Colors.primaryOff
    },
    codeContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 30,
        maxWidth: 290,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff'
    },
    codePeg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 2,
        backgroundColor: '#dedede'
    }
})

export default MMAnswerRow;