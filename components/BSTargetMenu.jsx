import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';

const BSTargetMenu = (props) => {

    const id = props.currentUser.id;

    const onChoose = (target) => {
        props.onChoose(target);
    };

    return (
        <View style={styles.controls}>
            <View style={styles.moveRow}>
                <TouchableOpacity style={[styles.card, id > 2 && styles.ally]} onPress={() => onChoose('3')}>
                    <Text style={styles.text}>{id === 3 ? 'You' : 'P3'}</Text>
                    <Image 
                        source={{uri: props.sprites[2]}}
                        style={styles.sprite}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, id > 2 && styles.ally]} onPress={() => onChoose('4')}>
                    <Text style={styles.text}>{id === 4 ? 'You' : 'P4'}</Text>
                    <Image 
                        source={{uri: props.sprites[3]}}
                        style={styles.sprite}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.moveRow}>
                <TouchableOpacity style={[styles.card, id < 3 && styles.ally]} onPress={() => onChoose('1')}>
                    <Text style={styles.text}>{id === 1 ? 'You' : 'P1'}</Text>
                    <Image 
                        source={{uri: props.sprites[0]}}
                        style={styles.sprite}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, id < 3 && styles.ally]} onPress={() => onChoose('2')}>
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
        width: 100,
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
    ally: {
        backgroundColor: Colors.primary
    },
    sprite: {
        height: 25,
        width: 25
    },
    text: {
        fontWeight: 'bold',
        color: '#ffffff'
    }
})

export default BSTargetMenu;