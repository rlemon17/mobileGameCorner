import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';

const MMCodePeg = (props) => {

    return (
        <TouchableOpacity 
            style={[styles.codePeg,
                props.num === 1 && styles.one,
                props.num === 2 && styles.two,
                props.num === 3 && styles.three,
                props.num === 4 && styles.four,
                props.num === 5 && styles.five,
                props.num === 6 && styles.six,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    codePeg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 2,
        backgroundColor: '#dedede'
    },
    one: {
        backgroundColor: '#D22B2B'
    },
    two: {
        backgroundColor: '#F08000'
    },
    three: {
        backgroundColor: '#FFEA00'
    },
    four: {
        backgroundColor: '#009E60'
    },
    five: {
        backgroundColor: '#0096FF'
    },
    six: {
        backgroundColor: '#5D3FD3'
    }
})

export default MMCodePeg;