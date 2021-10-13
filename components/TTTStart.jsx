import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TTTStart = () => {
    return (
        <View style={styles.gameContainer}>
          <Text>Tic Tac Toe Start/Settings Screen</Text>
          <Button title='Start'/>
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

export default TTTStart;