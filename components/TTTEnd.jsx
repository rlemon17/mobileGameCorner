import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title } from 'react-native-paper';

import Colors from './Colors';

const TTTEnd = (props) => {
    return (
        <View>
            <TouchableOpacity style={styles.gameOverCover}/>

            <Card style={styles.gameOver}>
                <Title style={styles.gameOverText}>{props.winner}</Title>
                <View style={styles.rowContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => props.onReset()}
                    >
                        <Text style={styles.centerText}>Play Again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => props.onEnd()}
                    >
                        <Text style={styles.centerText}>Quit</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    gameOver: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        bottom: -260,
        left: -21,
        position: 'absolute',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
    },
    rowContainer: {
        flexDirection: 'row'
    },
    gameOverText: {
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 20
    },
    button: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        marginHorizontal: 10,
        marginBottom: 10,
        minWidth: 100,
        textAlign: "center",
        marginTop: 20,
        shadowColor: Colors.accent,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
    },
    centerText: {
        textAlign: 'center',
        color: '#ffffff'
    },
    gameOverCover: {
        height: 320,
        width: 320,
        position: 'absolute',
        bottom: -90,
        right: -50   
    }
})

export default TTTEnd;