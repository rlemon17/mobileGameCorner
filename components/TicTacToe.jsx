import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TicTacToe = () => {
    return (
        <View style={styles.gameContainer}>
          <Text>Tic Tac Toe Screen 1</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    gameContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default TicTacToe;