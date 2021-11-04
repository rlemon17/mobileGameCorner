import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from './Colors';
import BSCharacters from './BSCharacters';

const BSCharSelectCard = (props) => {

    const handlePress = () => {
        props.onSelect(props.character);
    }

    return (
        <TouchableOpacity style={[styles.card, props.character === props.selected && styles.selected]} onPress={handlePress}>
            <Image 
                source = {{uri: props.character.sprite}}
                style = {styles.cardImg}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        margin: 5,
        width: 65,
        height: 65,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    selected: {
        borderWidth: 4,
        borderColor: Colors.accent
    },
    cardImg: {
        width: 50,
        height: 50
    }
})

export default BSCharSelectCard;