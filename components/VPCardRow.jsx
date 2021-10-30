import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from './Colors';
import VPCard from './VPCard';

const VPCardRow = (props) => {

    const spade = 'https://art.pixilart.com/7af614bf2c08d57.png';
    const clover = 'https://art.pixilart.com/32453e44c4fa793.png';
    const heart = 'https://art.pixilart.com/05d2ffce247e88c.png';
    const diamond = 'https://art.pixilart.com/bfef753fe2e62e4.png';

    // mod 4 for suits, mod 13 for ranks
    const suits = [spade, clover, heart, diamond];
    const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

    const changeHeldCard = (index) => {
        props.changeHeldCard(index);
    }

    return (
        <View style={styles.cardRow}>
            <VPCard id={0} rank={ranks[props.handArr[0]%13]} suit={suits[props.handArr[0]%4]} isRed={(props.handArr[0]%4) > 1} changeHeldCard={changeHeldCard} />
            <VPCard id={1} rank={ranks[props.handArr[1]%13]} suit={suits[props.handArr[1]%4]} isRed={(props.handArr[1]%4) > 1} changeHeldCard={changeHeldCard} /> 
            <VPCard id={2} rank={ranks[props.handArr[2]%13]} suit={suits[props.handArr[2]%4]} isRed={(props.handArr[2]%4) > 1} changeHeldCard={changeHeldCard} /> 
            <VPCard id={3} rank={ranks[props.handArr[3]%13]} suit={suits[props.handArr[3]%4]} isRed={(props.handArr[3]%4) > 1} changeHeldCard={changeHeldCard} /> 
            <VPCard id={4} rank={ranks[props.handArr[4]%13]} suit={suits[props.handArr[4]%4]} isRed={(props.handArr[4]%4) > 1} changeHeldCard={changeHeldCard} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    cardRow: {
        flexDirection: 'row',
        backgroundColor: Colors.primary
    }
});

export default VPCardRow;