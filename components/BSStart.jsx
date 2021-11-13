import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import Colors from './Colors';

const BSStart = (props) => {

    const [p1Human, setP1Human] = useState(true);
    const [p2Human, setP2Human] = useState(false);
    const [p3Human, setP3Human] = useState(false);
    const [p4Human, setP4Human] = useState(false);

    const onSubmit = () => {
        props.onSubmit([p1Human, p2Human, p3Human, p4Human]);
    }

    return (
        <View style={styles.wholeContainer}>
            <Title style={styles.title}>Battle Simulator Settings</Title>
            <View style={styles.settingsContainer}>

                <Text style={styles.text}>Player 1:</Text>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={[styles.button2, p1Human && styles.button2Selected]}
                        onPress={() => setP1Human(true)}
                    >
                        <Text>Human</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button2, !p1Human && styles.button2Selected]}
                        onPress={() => setP1Human(false)}
                    >
                        <Text>CPU</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>Player 2:</Text>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={[styles.button2, p2Human && styles.button2Selected]}
                        onPress={() => setP2Human(true)}
                    >
                        <Text>Human</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button2, !p2Human && styles.button2Selected]}
                        onPress={() => setP2Human(false)}
                    >
                        <Text>CPU</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>Player 3:</Text>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={[styles.button2, p3Human && styles.button2Selected]}
                        onPress={() => setP3Human(true)}
                    >
                        <Text>Human</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button2, !p3Human && styles.button2Selected]}
                        onPress={() => setP3Human(false)}
                    >
                        <Text>CPU</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>Player 4:</Text>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={[styles.button2, p4Human && styles.button2Selected]}
                        onPress={() => setP4Human(true)}
                    >
                        <Text>Human</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button2, !p4Human && styles.button2Selected]}
                        onPress={() => setP4Human(false)}
                    >
                        <Text>CPU</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={onSubmit}
                >
                    <Text style={styles.buttonText}>To Character Select</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.primaryOff,
        alignItems: 'center'
    },
    settingsContainer: {
        padding: 10,
        margin: 20,
        width: 275,
        maxHeight: 500,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
        bottom: 20
    },
    text: {
        textAlign: 'center',
        marginVertical: 5,
        top: 15
    },
    settingsRow: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    title: {
        paddingTop: 40,
        paddingBottom: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28,
        color: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 1,
    },
    button: {
        padding: 18,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        marginHorizontal: "1%",
        marginTop: 10,
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
    },
    button2: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.accentOff,
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: 100,
        textAlign: "center",
        alignItems: 'center',
        shadowColor: Colors.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
    },
    button2Selected: {
        backgroundColor: Colors.accent
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonOff: {
        backgroundColor: '#eee'
    }
})

export default BSStart;