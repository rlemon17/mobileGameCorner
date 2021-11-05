import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';

const BSMoveMenu = (props) => {

    const user = props.currentUser;

    const onChoose = (moveName) => {
        props.onChoose(moveName);
    }

    return (
        <View style={styles.controls}>
            <View style={styles.moveRow}>
                <TouchableOpacity style={styles.move1} onPress={() => onChoose(user.character.moves[0].name)}>
                    <Text style={styles.moveName}>{user.character.moves[0].name}</Text>
                    <Text style={styles.moveMana}>{user.character.moves[0].manaCost} mana</Text>
                    <Text style={styles.moveDesc}>{user.character.moves[0].desc}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.move2} onPress={() => onChoose(user.character.moves[1].name)}>
                    <Text style={styles.moveName}>{user.character.moves[1].name}</Text>
                    <Text style={styles.moveMana}>{user.character.moves[1].manaCost} mana</Text>
                    <Text style={styles.moveDesc}>{user.character.moves[1].desc}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.moveRow}>
                <TouchableOpacity style={styles.move3} onPress={() => onChoose(user.character.moves[2].name)}>
                    <Text style={styles.moveName}>{user.character.moves[2].name}</Text>
                    <Text style={styles.moveMana}>{user.character.moves[2].manaCost} mana</Text>
                    <Text style={styles.moveDesc}>{user.character.moves[2].desc}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.move4} onPress={() => onChoose(user.character.moves[3].name)}>
                    <Text style={styles.moveName}>{user.character.moves[3].name}</Text>
                    <Text style={styles.moveMana}>{`Usable at < ${Math.floor(user.character.hp*0.4)} HP`}</Text>
                    <Text style={styles.moveMana}>{user.character.moves[3].manaCost} mana</Text>
                    <Text style={styles.moveDesc}>{user.character.moves[3].desc}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    controls: {
        height: '90%',
        width: '95%',
        borderRadius: 20,
        backgroundColor: Colors.primaryOff
    },
    moveRow: {
        flexDirection: 'row',
        flex: 1
    },
    move1: {
        flex: 1,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: Colors.primary,
        alignItems: 'center'
    },
    move2: {
        flex: 1,
        borderBottomWidth: 2,
        borderColor: Colors.primary,
        alignItems: 'center'
    },
    move3: {
        flex: 1,
        borderRightWidth: 2,
        borderColor: Colors.primary,
        alignItems: 'center'
    },
    move4: {
        flex: 1,
        alignItems: 'center'
    },
    moveName: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 10
    },
    moveMana: {
        fontStyle: 'italic',
        color: Colors.accent,
        fontSize: 10
    },
    moveDesc: {
        color: Colors.primary,
        fontSize: 10,
        padding: 5
    }
})

export default BSMoveMenu;