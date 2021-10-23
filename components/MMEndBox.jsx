import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';

const MMEndBox = (props) => {

    return (
        <View style={styles.cardStyle} >
            <Text style={[styles.textStyle, styles.title]}>Game Over</Text>
            <Text style={styles.textStyle}>The {props.winner} wins!</Text>

            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.button} onPress={() => props.replay(true)}>
                    <Text>Play Again</Text>
                    <Text style={styles.buttonText}>(switch roles)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => props.replay(false)}>
                    <Text>Play Again</Text>
                    <Text style={styles.buttonText}>(keep roles)</Text>
                </TouchableOpacity>    
            </View>
            

            <TouchableOpacity style={[styles.button, styles.button2]} onPress={() => props.quit()}>
                <Text>Quit</Text>
            </TouchableOpacity>     
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
        height: 170,
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
        fontSize: 14
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: Colors.primary
    },
    buttonText: {
        fontSize: 8
    },
    button2: {
        backgroundColor: Colors.accentOff
    }
})

export default MMEndBox;