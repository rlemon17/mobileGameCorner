import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';

const MMInfoBox = (props) => {

    const [showingAnswer, setShowingAnswer] = useState(false);

    const onShow = () => {
        setShowingAnswer(!showingAnswer);
        props.onShow();
    }

    const onNext = () => {
        setShowingAnswer(false);
        props.onNext();
    }

    return (
        <View style={styles.cardStyle} >
            <Text style={[styles.textStyle, styles.title]}>{props.turn}'s Turn</Text>
            <Text style={styles.textStyle}>{props.text}</Text>

            <View style={{flexDirection: 'row'}}>

                <TouchableOpacity style={styles.button} onPress={() => onNext()}>
                    <Text>Submit</Text>
                </TouchableOpacity>

                {props.phase === 2 && <TouchableOpacity style={[styles.button, styles.button2]} onPress={onShow}>
                    <Text>{showingAnswer ? 'Hide' : 'Show'} Answer</Text>
                </TouchableOpacity>}    

            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        margin: 6,
        width: 100,
        textAlign: "center",
        alignItems: 'center'
    },
    cardStyle: {
        height: 100,
        width: 250,
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
        margin: 10
    },
    textStyle: {
        textAlign: 'center',
        marginBottom: 2,
        fontSize: 12
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    button2: {
        backgroundColor: Colors.accentOff,
        width: 120
    }
})

export default MMInfoBox;