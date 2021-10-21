import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';

const MMHintPeg = (props) => {

    return (
        <View 
            style={[styles.hintPeg,
                props.num === '1' && styles.one,
                props.num === '2' && styles.two
            ]} 
        />
    );
}

const styles = StyleSheet.create({
    hintPeg: {
        width: 20,
        height: 20,
        borderRadius: 25,
        margin: 4,
        backgroundColor: '#dedede'
    },
    one: {
        backgroundColor: Colors.primaryOff
    },
    two: {
        backgroundColor: Colors.primary
    },
})

export default MMHintPeg;