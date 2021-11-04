import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Title, Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';

const BSCharSelectBox = (props) => {

    return (
        <View style={[styles.sceneBox, 
        (props.style === 2) && styles.sceneBox2, 
        (props.style === 2 && props.sprite !== 'http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/ef680c30a573972.png') && styles.mirror]}>
            <Image 
                source = {{uri: props.sprite}}
                style = {styles.boxImg}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sceneBox: {
        borderWidth: 4,
        borderColor: Colors.accent,
        backgroundColor: Colors.accentOff,
        height: 75,
        width: 75,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sceneBox2: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primaryOff
    },
    mirror: {
        transform: [{scaleX: -1}]
    },
    boxImg: {
        height: 65,
        width: 65
    }
})

export default BSCharSelectBox;