import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import VPStart from './VPStart';
import VPGame from './VPGame'

const VideoPoker = () => {

    const [gameMode, setGameMode] = useState(0);
    const [money, setMoney] = useState(10.00);
    const [creditCost, setCreditCost] = useState(0.25);

    const handleModeZero = (cashoutMoney) => {
        setMoney(cashoutMoney);
        setGameMode(0);
    }

    const handleModeOne = (startingMoney, creditCostChoice) => {
        let inputMoney = parseFloat(startingMoney);
        let inputCost = parseFloat(creditCostChoice);
        setMoney(inputMoney);
        setCreditCost(inputCost);
        setGameMode(1);
    }

    return (
        <View style={styles.wholeContainer}>
            {gameMode === 0 && <VPStart money={money} handleStart={handleModeOne} />}
            {gameMode === 1 && <VPGame money={money} creditCost={creditCost} handleCashout={handleModeZero} />}
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