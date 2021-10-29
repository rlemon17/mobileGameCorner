import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import VPStart from './VPStart';

const VideoPoker = () => {

    const [gameMode, setGameMode] = useState(0);

    return (
        <View style={styles.wholeContainer}>
            {gameMode === 0 && <VPStart />}
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default VideoPoker;