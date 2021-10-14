import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Switch, Title } from 'react-native-paper';

const TTTStart = () => {

    const [twoP, setTwoP] = useState(false);

    return (
        <View>
            <Title style={styles.title}>Tic Tac Toe Settings</Title>
            <View style={styles.gameContainer}>
                <Switch 
                    value={twoP}
                    onValueChange={() => setTwoP(!twoP)}
                />
                <Button title='Start'/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    gameContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        padding: 20
    }
})

export default TTTStart;