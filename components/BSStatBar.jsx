import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';

const BSStatBar = (props) => {

    return (
        <View style={[styles.card, props.offset && styles.offset]}>
            <View style={styles.rowContainer}>
                <Text style={styles.nameText}>({props.player}) {props.data.character.name}</Text>
            </View>
            
            <View style={styles.barRowContainer}>
                <Text style={styles.statText}>H</Text>
                <View style={styles.hpBarDark}/>
                <View style={[styles.hpBar, 
                    {width: ((props.data.curHP/props.data.character.hp)*100)},
                    props.data.curHP < (props.data.character.hp*0.4) && styles.hpBarUlt]}
                />
            </View>
            <View style={styles.barRowContainer}>
                <Text style={styles.statText}>M</Text>
                <View style={styles.manaBarDark}/>
                <View style={[styles.manaBar, 
                    {width: ((props.data.curMANA/props.data.character.mana)*100)}]}
                />
            </View>

            {props.conditions.length !== 0 && <View style={styles.statusCard}>
                <Text style={styles.nameText}>{props.conditions[0]}</Text>
            </View>}

            <Text style={styles.hpText}>
                {props.data.curHP}/{props.data.character.hp}
            </Text>
            <Text style={styles.manaText}>
                {props.data.curMANA}/{props.data.character.mana}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 5,
        marginHorizontal: 5,
        marginTop: 5,
        marginBottom: 10,
        width: 125,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.bgOff,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    barRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 110,
        maxWidth: 110
    },
    offset: {
        left: 20
    },
    nameText: {
        fontSize: 10
    },
    statText: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    hpBarDark: {
        position: 'absolute',
        backgroundColor: '#000000',
        height: 9,
        width: 100,
        borderWidth: 1,
        left: 8
    },
    hpBar: {
        backgroundColor: '#ff1f57',
        height: 9,
        borderWidth: 1
    },
    hpBarUlt: {
        backgroundColor: '#ff8800'
    },
    manaBarDark: {
        position: 'absolute',
        backgroundColor: '#000000',
        height: 6,
        width: 100,
        borderWidth: 1,
        left: 9.25
    },
    manaBar: {
        backgroundColor: '#009dff',
        height: 6,
        borderWidth: 1
    },
    statusCard: {
        minWidth: 24,
        height: 12,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 1,
        position: 'absolute',
        top: 45,
        left: 10,
        flexDirection: 'row'
    },
    hpText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 7,
        position: 'absolute',
        bottom: 20.5,
        left: 54
    },
    manaText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 5,
        position: 'absolute',
        bottom: 10,
        left: 59
    }
})

export default BSStatBar;