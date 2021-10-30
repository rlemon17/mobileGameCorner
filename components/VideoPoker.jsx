import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import VPStart from './VPStart';
import VPGame from './VPGame'

const VideoPoker = () => {

    const [gameMode, setGameMode] = useState(0);
    const [money, setMoney] = useState(0.00);

    const handleModeZero = () => {
        setGameMode(0);
    }

    const handleModeOne = (startingMoney) => {
        let inputMoney = parseFloat(startingMoney);
        setMoney(inputMoney);
        setGameMode(1);
    }

    return (
        <View style={styles.wholeContainer}>
            {gameMode === 0 && <VPStart handleStart={handleModeOne} />}
            {gameMode === 1 && <VPGame money={money} />}
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default VideoPoker;