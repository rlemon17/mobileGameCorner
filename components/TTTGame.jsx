import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TTTGame = () => {
    return (
        <View style={styles.gameContainer}>
          <Text>Tic Tac Toe Game Screen</Text>
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

export default TTTGame;