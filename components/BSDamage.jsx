import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';

const BSDamage = (props) => {
    let heal = false;
    let value = props.damage;

    if (props.damage < 0) {
        heal = true;
        value = -value;
    }

    return (
        <View style={[styles.damageBox, props.style]}>
            <View style={[styles.damageBg, heal && styles.healBg]} />
            <View style={[styles.damageTop, heal && styles.healTop]}>
                <Text style={styles.damageText}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    damageBox: {
        position: 'absolute'
    },
    damageTop: {
        backgroundColor: Colors.accent,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{rotate: '-15deg'}],
        shadowColor: '#FF3131',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2
    },
    damageText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffffff'
    },
    damageBg: {
        backgroundColor: Colors.accentOff,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{rotate: '30deg'}],
        position: 'absolute',
        shadowColor: '#FF3131',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2
    },
    healTop: {
        backgroundColor: Colors.primary,
        shadowColor: '#32cd32'
    },
    healBg: {
        backgroundColor: Colors.primaryOff,
        shadowColor: '#32cd32'
    }
})

export default BSDamage;