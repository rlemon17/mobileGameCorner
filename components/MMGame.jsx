import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import MMRow from './MMRow';

const MMGame = () => {

    const [p1Role, setP1Role] = useState('Codemaker');
    const [p2Role, setP2Role] = useState('Hacker');

    const [p1Score, setP1Score] = useState(0);
    const [p2Score, setP2Score] = useState(0);

    return (
        <View style={styles.wholeContainer}>

            <View style={styles.scoreContainer}>
                <Card style={styles.scoreCard}>
                    <Text>P1 ({p1Role}):</Text>
                    <Text style={styles.scoreText}>{p1Score}</Text>
                </Card>
                <Card style={styles.scoreCard}>
                    <Text>P2 ({p2Role}):</Text>
                    <Text style={styles.scoreText}>{p2Score}</Text>
                </Card>
            </View>

            <View style={styles.gameContainer}>
                <MMRow />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },
    scoreContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    scoreCard: {
        flex: 1,
        height: 60,
        width: 50,
        margin: 5,
        padding: 10,
        alignItems: 'center',
        borderRadius: 20
    },
    scoreText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        color: Colors.accent
    },
    gameContainer: {
        flex: 9,
        backgroundColor: 'gray'
    }
})

export default MMGame;