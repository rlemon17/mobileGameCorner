import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSStart from './BSStart';
import BSCharSelect from './BSCharSelect';

const BattleSimulator = () => {

    const [mode, setMode] = useState(0); // 0 = settings; 1 = character select; 2 = battle
    const [humanPlayers, setHumanPlayers] = useState([true, false, false, false]);

    const handleModeOne = (playerArray) => {
        setHumanPlayers(playerArray);
        setMode(1);
    }

    return (
        <View style={styles.wholeContainer}>
            {mode === 0 && <BSStart onSubmit={handleModeOne} />}
            {mode === 1 && <BSCharSelect humanPlayers={humanPlayers} />}
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default BattleSimulator;