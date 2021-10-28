import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import MMStart from './MMStart';
import MMGame from './MMGame';

const Mastermind = () => {

    const [gameMode, setGameMode] = useState(0);

    const [p1Role, setP1Role] = useState('Codemaker');
    const [p2Role, setP2Role] = useState('Hacker');

    const [cpuMode, setCpuMode] = useState(false);

    const [dupeMode, setDupeMode] = useState(true);

    const handleModeOne = (p1Choice, cpuModeChoice, dupeChoice) => {
        setP1Role(p1Choice);
        setCpuMode(cpuModeChoice);
        setDupeMode(dupeChoice);

        if (p1Choice === 'Codemaker') {
            setP2Role('Hacker');
        }
        else {
            setP2Role('Codemaker');
        }

        setGameMode(1);
    }

    const handleModeZero = () => {
        setGameMode(0);
    }

    return (
        <View style={styles.wholeContainer}>
            {gameMode === 0 && <MMStart onStart={handleModeOne} />}
            {gameMode === 1 && <MMGame onQuit={handleModeZero} p1Choice={p1Role} p2Choice={p2Role} cpuMode={cpuMode} dupeMode={dupeMode} />}
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