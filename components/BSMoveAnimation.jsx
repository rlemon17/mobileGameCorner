import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';

const BSMoveAnimation = (props) => {

    return (
        <View style={[styles.contiainer, props.style]}>
            <Image 
                source={{uri: props.img}}
                style={styles.image}
            />    
        </View>
    );
}

const styles = StyleSheet.create({
    contiainer: {
        height: 110,
        width: 110,
        position: 'absolute',
        opacity: 0.7
    },
    image: {
        width: 110,
        height: 110
    }
})

export default BSMoveAnimation;