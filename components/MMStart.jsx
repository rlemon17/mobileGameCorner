import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Card } from 'react-native-paper';

import Colors from './Colors';

const MMStart = (props) => {

    const [numPlayers, setNumPlayers] = useState(1);
    const [p1Role, setP1Role] = useState('Codemaker');
    const [dupes, setDupes] = useState(true);

    const onSubmit = () => {
        let cpuMode = false;

        if (numPlayers === 1) {
            cpuMode = true;
        }

        props.onStart(p1Role, cpuMode, dupes);
    }

    return (
        <View style={styles.wholeContainer}>
            <Title style={styles.title}>Mastermind Settings</Title>
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

                <Text style={styles.text}>Player 1:</Text>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={[styles.button2, p1Role === 'Codemaker' && styles.button2Selected]}
                        onPress={() => setP1Role('Codemaker')}
                    >
                        <Text>Codemaker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button2, p1Role === 'Hacker' && styles.button2Selected]}
                        onPress={() => setP1Role('Hacker')}
                    >
                        <Text>Hacker</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>Allow Duplicate Colors:</Text>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={[styles.button2, dupes && styles.button2Selected]}
                        onPress={() => setDupes(true)}
                    >
                        <Text>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button2, !dupes && styles.button2Selected]}
                        onPress={() => setDupes(false)}
                    >
                        <Text>No</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={onSubmit}
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
        bottom: 20
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

export default MMStart;