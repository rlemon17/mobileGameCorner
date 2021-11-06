import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';

const BSTargetMenu = (props) => {

    // For displaying chooseable target boxes
    const single = ['Tackle', 'Ember', 'Lava Snipe', 'Water Gun'];
    const multi = ['Slime Drench', 'Acid', 'ULT: Toxic Acid', 'ULT: Eruption', 'ULT: Water Surge']
    const supp = ['Healing Rain'];
    const multiSupp = ['Purifying Pulse'];
    const self = ['Heat Up']

    const id = props.currentUser.id;
    const attack = props.attacks[id-1];

    let type = 'single';

    if (multi.includes(attack)) {
        type = 'multi';
    }
    else if (supp.includes(attack)) {
        type = 'supp';
    }
    else if (multiSupp.includes(attack)) {
        type = 'multiSupp';
    }
    else if (self.includes(attack)) {
        type = 'self';
    }

    // Cancel for impossible or pointless chocies
    const onChoose = (target) => {

        if (target === '1') {
            if (
                (id > 2 && type === 'supp') ||
                (id > 2 && type === 'multiSupp') ||
                (id !== 1 && type === 'self') ||
                (id < 3 && type === 'single') ||
                (id < 3 && type === 'multi')
            ) {
                return;
            }
        }
        else if (target === '2') {
            if (
                (id > 2 && type === 'supp') ||
                (id > 2 && type === 'multiSupp') ||
                (id !== 2 && type === 'self') ||
                (id < 3 && type === 'single') ||
                (id < 3 && type === 'multi')
            ) {
                return;
            }
        }
        else if (target === '3') {
            if (
                (id < 3 && type === 'supp') ||
                (id < 3 && type === 'multiSupp') ||
                (id !== 3 && type === 'self') ||
                (id > 2 && type === 'single') ||
                (id > 2 && type === 'multi')
            ) {
                return;
            }
        }
        else {
            if (
                (id < 3 && type === 'supp') ||
                (id < 3 && type === 'multiSupp') ||
                (id !== 4 && type === 'self') ||
                (id > 2 && type === 'single') ||
                (id > 2 && type === 'multi')
            ) {
                return;
            }
        }
        props.onChoose(target);
    };

    // Various checks to change style to off
    return (
        <View style={styles.controls}>
            <View style={styles.moveRow}>
                {(type === 'multi' || type === 'multiSupp') && <View style={[styles.connector, 
                ((id < 3 && type === 'multiSupp') || (id > 2 && type === 'multi')) && styles.connectorOff]}/>}

                <TouchableOpacity style={[styles.card, (
                    (id < 3 && type === 'supp') ||
                    (id < 3 && type === 'multiSupp') ||
                    (id !== 3 && type === 'self') ||
                    (id > 2 && type === 'single') ||
                    (id > 2 && type === 'multi')
                ) && styles.off]} onPress={() => onChoose('3')}>
                    <Text style={styles.text}>{id === 3 ? 'You' : 'P3'}</Text>
                    <Image 
                        source={{uri: props.sprites[2]}}
                        style={styles.sprite}
                    />
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.card, (
                    (id < 3 && type === 'supp') ||
                    (id < 3 && type === 'multiSupp') ||
                    (id !== 4 && type === 'self') ||
                    (id > 2 && type === 'single') ||
                    (id > 2 && type === 'multi')
                ) && styles.off]} onPress={() => onChoose('4')}>
                    <Text style={styles.text}>{id === 4 ? 'You' : 'P4'}</Text>
                    <Image 
                        source={{uri: props.sprites[3]}}
                        style={styles.sprite}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.backButton} onPress={() => props.onBack()}>
                    <Text style={styles.text}>Back</Text>
                </TouchableOpacity>    
            </View>
            

            <View style={styles.moveRow}>
                {(type === 'multi' || type === 'multiSupp') && <View style={[styles.connector, 
                ((id > 2 && type === 'multiSupp') || (id < 3 && type === 'multi')) && styles.connectorOff]}/>}

                <TouchableOpacity style={[styles.card, (
                    (id > 2 && type === 'supp') ||
                    (id > 2 && type === 'multiSupp') ||
                    (id !== 1 && type === 'self') ||
                    (id < 3 && type === 'single') ||
                    (id < 3 && type === 'multi')
                ) && styles.off]} onPress={() => onChoose('1')}>
                    <Text style={styles.text}>{id === 1 ? 'You' : 'P1'}</Text>
                    <Image 
                        source={{uri: props.sprites[0]}}
                        style={styles.sprite}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, (
                    (id > 2 && type === 'supp') ||
                    (id > 2 && type === 'multiSupp') ||
                    (id !== 2 && type === 'self') ||
                    (id < 3 && type === 'single') ||
                    (id < 3 && type === 'multi')
                ) && styles.off]} onPress={() => onChoose('2')}>
                    <Text style={styles.text}>{id === 2 ? 'You' : 'P2'}</Text>
                    <Image 
                        source={{uri: props.sprites[1]}}
                        style={styles.sprite}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    controls: {
        height: '90%',
        width: '95%',
        borderRadius: 20,
        backgroundColor: Colors.primaryOff
    },
    moveRow: {
        flexDirection: 'row',
        flex: 10,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    moveName: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 10
    },
    card: {
        padding: 5,
        marginHorizontal: 5,
        marginTop: 5,
        marginBottom: 10,
        width: 120,
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accent,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    off: {
        backgroundColor: Colors.primary
    },
    sprite: {
        height: 35,
        width: 35
    },
    text: {
        fontWeight: 'bold',
        color: '#ffffff'
    },
    backButton: {
        backgroundColor: Colors.bg,
        borderRadius: 25,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    connector: {
        width: 42,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accent,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
        position: 'absolute',
        left: 157
    },
    connectorOff: {
        backgroundColor: Colors.primary
    }
})

export default BSTargetMenu;