import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Card } from 'react-native-paper';

import Colors from './Colors';

const TTTStart = (props) => {

    const [numPlayers, setNumPlayers] = useState(1);
    const [cpu, setCpu] = useState(1);
    const [first, setFirst] = useState(1);

    const startGame = () => {
        props.onStart();
    }

    return (
        <View style={styles.wholeContainer}>
            <Title style={styles.title}>Tic Tac Toe Settings</Title>
            <Card style={styles.settingsContainer}>

                <Text style={styles.text}>Number of Players:</Text>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={[styles.button2, numPlayers === 1 && styles.button2Selected]}
                        onPress={() => setNumPlayers(1)}
                    >
                        <Text>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button2, numPlayers === 2 && styles.button2Selected]}
                        onPress={() => setNumPlayers(2)}
                    >
                        <Text>2</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>CPU Difficulty:</Text>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={[styles.button2, cpu === 1 && styles.button2Selected, numPlayers === 2 && styles.buttonOff]}
                        onPress={() => setCpu(1)}
                    >
                        <Text>Easy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button2, cpu === 2 && styles.button2Selected, numPlayers === 2 && styles.buttonOff]}
                        onPress={() => setCpu(2)}
                    >
                        <Text>Hard</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>First Move:</Text>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={[styles.button2, first === 1 && styles.button2Selected]}
                        onPress={() => setFirst(1)}
                    >
                        <Text>X</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button2, first === 2 && styles.button2Selected]}
                        onPress={() => setFirst(2)}
                    >
                        <Text>O</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={startGame}
                >
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        maxHeight: "90%"
    },
    settingsContainer: {
        flex: 10,
        width: 275,
        maxHeight: 500,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 70
    },
    text: {
        textAlign: 'center',
        marginTop: 10,
        top: 15
    },
    settingsRow: {
        flexDirection: 'row',
        paddingVertical: 30
    },
    title: {
        flex: 1,
        padding: 20,
        textAlign: 'center'
    },
    button: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
        marginTop: 40
    },
    button2: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.accentOff,
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: 100,
        textAlign: "center",
        alignItems: 'center'
    },
    button2Selected: {
        backgroundColor: Colors.accent
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff'
    },
    buttonOff: {
        backgroundColor: '#eee'
    }
})

export default TTTStart;