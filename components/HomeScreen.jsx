import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Lemon's Mobile Game Corner</Text>
            </View>
            <View style={styles.gameContainer}>
                <Card style={styles.cardStyle}>
                    <Button
                        title="Tic Tac Toe"
                        onPress={() => navigation.navigate('TicTacToe')}
                    />
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    gameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleContainer: {
        padding: 20
    },
    cardStyle: {
        padding: 10,
        maxHeight: 65,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    }
})

export default HomeScreen;