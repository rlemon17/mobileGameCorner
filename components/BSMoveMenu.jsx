import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';

const BSMoveMenu = (props) => {

    const user = props.currentUser;

    const onChoose = (moveName, manaCost) => {
        // Do nothing if not enough mana
        if (user.curMANA < manaCost) {
            return;
        }
        // If ULT, also do nothing if above 40% HP
        if (moveName === user.character.moves[3].name && user.curHP > user.character.hp*0.4) {
            return;
        }

        props.onChoose(moveName);
    }

    return (
        <View style={styles.controls}>
            <View style={styles.moveRow}>
                <TouchableOpacity 
                    style={styles.move} 
                    onPress={() => onChoose(user.character.moves[0].name, user.character.moves[0].manaCost)}
                >
                    <Text style={styles.moveName}>{user.character.moves[0].name}</Text>
                    <Text style={styles.moveMana}>{user.character.moves[0].manaCost} mana</Text>
                    <Text style={styles.moveDesc}>{user.character.moves[0].desc}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.move, user.curMANA < user.character.moves[1].manaCost && styles.unusable]} 
                    onPress={() => onChoose(user.character.moves[1].name, user.character.moves[1].manaCost)}
                >
                    <Text style={styles.moveName}>{user.character.moves[1].name}</Text>
                    <Text style={styles.moveMana}>{user.character.moves[1].manaCost} mana</Text>
                    <Text style={styles.moveDesc}>{user.character.moves[1].desc}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.moveRow}>
                <TouchableOpacity 
                    style={[styles.move, user.curMANA < user.character.moves[2].manaCost && styles.unusable]} 
                    onPress={() => onChoose(user.character.moves[2].name, user.character.moves[2].manaCost)}
                >
                    <Text style={styles.moveName}>{user.character.moves[2].name}</Text>
                    <Text style={styles.moveMana}>{user.character.moves[2].manaCost} mana</Text>
                    <Text style={styles.moveDesc}>{user.character.moves[2].desc}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.move, (user.curMANA < user.character.moves[3].manaCost || user.curHP > user.character.hp*0.4) && styles.unusable]} 
                    onPress={() => onChoose(user.character.moves[3].name, user.character.moves[3].manaCost)}
                >
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    move: {
        padding: 5,
        marginHorizontal: 5,
        marginTop: 5,
        marginBottom: 10,
        width: 160,
        height: 90,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    unusable: {
        backgroundColor: '#dddddd'
    },
    moveName: {
        fontWeight: 'bold',
        fontSize: 14,
        paddingTop: 5
    },
    moveMana: {
        fontStyle: 'italic',
        color: Colors.accent,
        fontSize: 8
    },
    moveDesc: {
        color: Colors.primary,
        fontSize: 8,
        padding: 5
    }
})

export default BSMoveMenu;