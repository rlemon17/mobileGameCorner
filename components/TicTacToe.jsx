import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import TTTEnd from './TTTEnd';
import TTTGame from './TTTGame';
import TTTStart from './TTTStart';

const TicTacToe = () => {

    // 0 - Settings, 1 - Play, 2 - Game Over
    const [gameMode, setGameMode] = useState(0);

    return (
        <View style={styles.gameContainer}>
          {gameMode === 0 && <TTTStart />}
          {gameMode === 1 && <TTTGame />}
          {gameMode === 2 && <TTTEnd />}
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