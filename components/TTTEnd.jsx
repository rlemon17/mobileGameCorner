import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TTTEnd = () => {
    return (
        <View style={styles.gameContainer}>
          <Text>Tic Tac Toe Game Over Screen</Text>
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

export default TTTEnd;