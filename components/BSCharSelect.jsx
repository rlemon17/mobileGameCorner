import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import Colors from './Colors';

const BSCharSelect = (props) => {

    const [playerSelecting, setPlayerSelecting] = useState(1);
    const [playersChosen, setPlayersChosen] = useState([]);

    const humanPlayers = props.humanPlayers;

    const nextPlayer = () => {
        setPlayerSelecting(prev => prev + 1);
    }

    const lastPlayer = () => {
        setPlayerSelecting(prev => prev - 1);
    }

    return (
        <View style={styles.wholeContainer}>
            <View style={styles.sceneContainer}>
            </View>

            <View style={styles.statsContainer}>
            </View>

            <View style={styles.selectContainer}>
            </View>

            <View style={styles.buttonsContainer}>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={lastPlayer}
                    >
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={nextPlayer}
                    >
                        <Text>{playerSelecting === 4 ? 'Start!' : 'Next'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: Colors.bg
    },
    sceneContainer: {
        flex: 1
    },
    statsContainer: {
        flex: 2,
        backgroundColor: Colors.primaryOff
    },
    selectContainer: {
        flex: 2,
        backgroundColor: Colors.primary
    },
    buttonsContainer: {
        flex: 1,
        alignItems: 'center'
    },
    settingsRow: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    button: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        marginVertical: 10,
        marginHorizontal: 40,
        minWidth: 100,
        textAlign: "center",
        alignItems: 'center'
    }
})

export default BSCharSelect;