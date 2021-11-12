import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';
import BSStart from './BSStart';
import BSCharSelect from './BSCharSelect';
import BSGame from './BSGame';

const BattleSimulator = () => {

    const [mode, setMode] = useState(0); // 0 = settings; 1 = character select; 2 = battle
    const [humanPlayers, setHumanPlayers] = useState([true, false, false, false]);
    const [characterArray, setCharacterArray] = useState([]);
    const [startingPhase, setStartingPhase] = useState('1A');
    const [startingMsg, setStartingMsg] = useState('P1, select your move');

    const handleModeZero = () => {
        setMode(0);
    }

    const handleModeOne = (playerArray) => {
        setHumanPlayers(playerArray);
        if (!playerArray[0]) {
            setStartingPhase('0T');
            setStartingMsg('Battle Start!');
        }
        setMode(1);
    }

    const handleModeTwo = (chosenCharacters, playerArray) => {
        let newArray = [...chosenCharacters];

        // Handle any random picks
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].name === 'Random') {
                let choice = Math.floor(Math.random()*4);

                if (choice === 0) {
                    newArray[i] = BSCharacters.slime;
                }
                else if (choice === 1) {
                    newArray[i] = BSCharacters.fireSlime;
                }
                else if (choice === 2) {
                    newArray[i] = BSCharacters.waterSlime;
                }
                else if (choice === 3) {
                    newArray[i] = BSCharacters.zaru;
                }
            }
        }

        if (!playerArray[0]) {
            setStartingPhase('0T');
            setStartingMsg('Battle Start!');
        }
        
        setCharacterArray(newArray);
        setHumanPlayers(playerArray);
        setMode(2);
    }

    return (
        <View style={styles.wholeContainer}>
            {mode === 0 && <BSStart onSubmit={handleModeOne} />}
            {mode === 1 && <BSCharSelect 
                humanPlayers={humanPlayers} 
                onBack={handleModeZero} 
                onStart={handleModeTwo} 
            />}
            {mode === 2 && <BSGame 
                firstPhase={startingPhase} 
                firstMsg={startingMsg} 
                humanPlayers={humanPlayers} 
                chosenCharacters={characterArray} 
                onChange={handleModeOne} 
                onQuit={handleModeZero} 
            />}
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