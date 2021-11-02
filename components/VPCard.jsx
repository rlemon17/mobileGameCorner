import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from './Colors';

const VPCard = (props) => {

    const held = props.held;

    const handleHold = () => {
        props.changeHeldCard(props.id);
    }

    return (
        <TouchableOpacity onPress={handleHold}>
            {held && <Text style={styles.holdText}>HOLD</Text>}
            <View style={styles.card}>
                <Text style={[styles.rank, props.isRed && styles.red]}>{props.rank}</Text>
                <Image 
                    source = {{uri: props.suit}}
                    style = {styles.suit}
                />
            </View>    
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        margin: 5,
        width: 65,
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20,
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2, 
    },
    rank: {
        fontWeight: 'bold',
        fontSize: 20,
        bottom: 10,
        right: 20
    },
    red: {
        color: 'red'
    },
    suit: {
        width: 40,
        height: 40,
        bottom: 5
    },
    holdText: {
        color: '#ffffff',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 130,
        left: 18,
        color: Colors.accentOff
    }
})

export default VPCard;