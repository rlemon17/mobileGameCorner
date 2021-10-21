import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import MMStart from './MMStart';
import MMGame from './MMGame';

const Mastermind = () => {

    const [gameMode, setGameMode] = useState(0);

    const handleModeOne = () => {
        setGameMode(1);
    }

    return (
        <View style={styles.wholeContainer}>
            {gameMode === 0 && <MMStart onStart={handleModeOne} />}
            {gameMode === 1 && <MMGame />}
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Mastermind;