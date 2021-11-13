import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';

const HomeConfirm = (props) => {

    return (
        <View style={styles.wholeContainer}>
            <Card style={styles.confirmContainer}>
                <Text style={styles.confirmText}>{props.gameInfo}</Text>
                <TouchableOpacity 
                    style={[styles.button, {backgroundColor: Colors.primary}]}
                    onPress={() => props.handlePress()}
                >
                    <Text style={styles.buttonText}>Play!</Text>
                </TouchableOpacity>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        alignItems: 'center'
    },
    confirmContainer: {
        width: '80%',
        maxHeight: 200,
        borderRadius: 20,
        padding: 20,
        position: 'absolute',
        top: '100%',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.75,
        shadowRadius: 1
    },
    confirmText: {
        paddingBottom: 20,
        textAlign: 'center'
    },
    button: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.accentOff,
        marginHorizontal: "1%",
        marginBottom: 20,
        minWidth: 200,
        minHeight: 60,
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.75,
        shadowRadius: 1
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18
    }
})

export default HomeConfirm;