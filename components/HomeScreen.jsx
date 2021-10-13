import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Lemon's Mobile Game Corner</Text>
            </View>
            <View style={styles.gameContainer}>
                <Button
                    title="Tic Tac Toe"
                    onPress={() => navigation.navigate('TicTacToe')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    gameContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleContainer: {
        padding: 20
    }
})

export default HomeScreen;