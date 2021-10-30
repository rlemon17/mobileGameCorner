import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from './Colors';

const VPBetColumn = (props) => {

    const royalFlush = 250;
    const straightFlush = 50;
    const fourKind = 25;
    const fullHouse = 9;
    const flush = 6;
    const straight = 4;
    const threeKind = 3;
    const twoPair = 2;
    const jacksPair = 1;

    return (
        <View style={[styles.betColumn, props.bet === props.id && styles.highlightColumn]}>
            <Text style={[styles.betText, props.bet === props.id && styles.highlightText]}>{props.id === 5 ? 4000 : royalFlush*props.id}</Text>
            <Text style={[styles.betText, props.bet === props.id && styles.highlightText]}>{straightFlush*props.id}</Text>
            <Text style={[styles.betText, props.bet === props.id && styles.highlightText]}>{fourKind*props.id}</Text>
            <Text style={[styles.betText, props.bet === props.id && styles.highlightText]}>{fullHouse*props.id}</Text>
            <Text style={[styles.betText, props.bet === props.id && styles.highlightText]}>{flush*props.id}</Text>
            <Text style={[styles.betText, props.bet === props.id && styles.highlightText]}>{straight*props.id}</Text>
            <Text style={[styles.betText, props.bet === props.id && styles.highlightText]}>{threeKind*props.id}</Text>
            <Text style={[styles.betText, props.bet === props.id && styles.highlightText]}>{twoPair*props.id}</Text>
            <Text style={[styles.betText, props.bet === props.id && styles.highlightText]}>{jacksPair*props.id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    betColumn: {
        alignItems: 'center',
        borderLeftColor: Colors.accent,
        borderLeftWidth: 2,
        padding: 5
    },
    betText: {
        color: Colors.bgOff
    },
    highlightColumn: {
        backgroundColor: Colors.accent
    },
    highlightText: {
        color: '#ffffff'
    }
});

export default VPBetColumn;