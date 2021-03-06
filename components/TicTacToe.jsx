import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import TTTEnd from './TTTEnd';
import TTTGame from './TTTGame';
import TTTStart from './TTTStart';

const TicTacToe = () => {

    // 0 - Settings, 1 - Play, 2 - Game Over
    const [gameMode, setGameMode] = useState(0);
    const [p1, setP1] = useState('X');
    const [cpuMode, setCpuMode] = useState(true);
    const [cpuDifficulty, setCpuDifficulty] = useState(1);

    const handleModeZero = () => {
        setGameMode(0);
    }

    const handleModeOne = (p1Choice, cpuMode, cpuDiff) => {
        setP1(p1Choice);
        setCpuMode(cpuMode);
        setCpuDifficulty(cpuDiff);
        setGameMode(1);
    }

    return (
        <View style={styles.gameContainer}>
          {gameMode === 0 && <TTTStart onStart={handleModeOne}/>}
          {gameMode === 1 && <TTTGame onEnd={handleModeZero} p1={p1} cpuMode={cpuMode} cpuDifficulty={cpuDifficulty} />}
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