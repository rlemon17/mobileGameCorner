import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import HomeConfirm from './HomeConfirm';

const HomeScreen = ({ navigation }) => {
    const [selected, setSelected] = useState(1);
    const [route, setRoute] = useState('TicTacToe');
    const [gameInfo, setGameInfo] = useState('Get three in a row before your opponent does! (2 players or 1 player VS a computer)')

    const confirmGame = () => {
        navigation.navigate(route);
    }

    return (
        <View style={styles.entireContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Lemon's</Text>
                <Text style={styles.title2}>Mobile Game Corner</Text>
            </View>
            <View style={styles.gameContainer}>

                <TouchableOpacity 
                    style={[styles.button, selected === 1 && styles.buttonSelected]}
                    onPress={() => {
                        setRoute('TicTacToe')
                        setSelected(1)
                        setGameInfo('Get three in a row before your opponent does! (2 players)')
                    }}
                >
                    <Text style={styles.buttonText}>Tic Tac Toe</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, selected === 2 && styles.buttonSelected]}
                    onPress={() => {
                        setRoute('Mastermind')
                        setSelected(2)
                        setGameInfo('Crack the password the codemaker makes, or be the codemaker yourself! (2 players)')
                    }}
                >
                    <Text style={styles.buttonText}>Mastermind</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, selected === 3 && styles.buttonSelected]}
                    onPress={() => {
                        setRoute('VideoPoker')
                        setSelected(3)
                        setGameInfo('Try to get the best hand of 5 cards from a deck! (1 player)')
                    }}
                >
                    <Text style={styles.buttonText}>Video Poker</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, selected === 4 && styles.buttonSelected]}
                    onPress={() => {
                        setRoute('TicTacToe')
                        setSelected(4)
                        setGameInfo('Enim sit amet venenatis urna cursus eget nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
                    }}
                >
                    <Text style={styles.buttonText}>Coming Soon</Text>
                </TouchableOpacity>

            </View>

            <HomeConfirm handlePress={confirmGame} gameInfo={gameInfo} />
        </View>
    );
}

const styles = StyleSheet.create({
    entireContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    gameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    },
    title2: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5
    },
    titleContainer: {
        padding: 20
    },
    cardStyle: {
        padding: 10,
        maxHeight: 65,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
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
        justifyContent: 'center'
    },
    buttonSelected: {
        backgroundColor: Colors.accent
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18
    }
})

export default HomeScreen;