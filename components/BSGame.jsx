import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';

const BSGame = (props) => {

    const [p1Active, setP1Active] = useState(true);
    const [p2Active, setP2Active] = useState(true);
    const [p3Active, setP3Active] = useState(true);
    const [p4Active, setP4Active] = useState(true);

    return (
        <View style={styles.wholeContainer}>
            <View style={styles.logContainer}>
               
            </View>
            <View style={styles.sceneContainer}>
                <View style={[styles.rowContainer, styles.mirrorContainer]}>
                    <Image 
                        source = {{uri: p4Active ? props.chosenCharacters[3].animated : props.chosenCharacters[3].sprite}}
                        style = {[styles.characterSprite, !p4Active && styles.spriteOff]}
                    />   
                    <Image 
                        source = {{uri: p3Active ? props.chosenCharacters[2].animated : props.chosenCharacters[2].sprite}}
                        style = {[styles.characterSprite, !p3Active && styles.spriteOff]}
                    />
                </View>

                <View style={styles.rowContainer}>
                    <Image 
                        source = {{uri: p1Active ? props.chosenCharacters[0].animated : props.chosenCharacters[0].sprite}}
                        style = {[styles.characterSprite, !p1Active && styles.spriteOff]}
                    />
                    <Image 
                        source = {{uri: p2Active ? props.chosenCharacters[1].animated : props.chosenCharacters[1].sprite}}
                        style = {[styles.characterSprite, !p2Active && styles.spriteOff]}
                    />    
                </View>
                
            </View>
            <View style={styles.controlContainer}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    rowContainer: {
        flexDirection: 'row'
    },
    mirrorContainer: {
        transform: [{scaleX: -1}]
    },
    logContainer: {
        flex: 1,
        backgroundColor: Colors.accent,
        width: '100%'
    },
    sceneContainer: {
        flex: 3,
        width: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'space-between'
    },
    characterSprite: {
        height: 110,
        width: 110
    },
    spriteOff: {
        opacity: 0.1
    },
    controlContainer: {
        flex: 2,
        backgroundColor: Colors.primary,
        width: '100%'
    }
})

export default BSGame;