import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import Colors from './Colors';
import BSCharacters from './BSCharacters';
import BSCharSelectBox from './BSCharSelectBox';
import BSCharSelectCard from './BSCharSelectCard';

const BSCharSelectMoveBox = (props) => {

    return (
        <View style={styles.moveContainer}>
            <View style={styles.moveHeading}>
                <Text style={styles.moveText}>{props.move.name}</Text>
                <Text style={styles.manaText}>{props.move.manaCost} Mana</Text>
            </View>
            <View style={styles.moveDescription}>
                <Text style={styles.descText}>{props.move.desc}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    moveContainer: {
        flex: 1
    },
    moveHeading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 4
    },
    moveDescription: {
        borderBottomWidth: 2,
        borderColor: Colors.bgOff,
        padding: 4,
        minHeight: 37
    },
    moveText: {
        fontWeight: 'bold'
    },
    manaText: {
        fontStyle: 'italic',
        fontSize: 12,
        color: Colors.accent
    },
    descText: {
        color: Colors.primary,
        fontSize: 9
    }
})

export default BSCharSelectMoveBox;