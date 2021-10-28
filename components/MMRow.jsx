import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import MMCodePeg from './MMCodePeg';
import MMHintPeg from './MMHintPeg';

const MMRow = (props) => {

    const [code, setCode] = useState(props.code);
    const [hint, setHint] = useState(props.hint);
    const [modalVisible, setModalVisible] = useState(false);

    const [numDark, setNumDark] = useState(0);
    const [numLight, setNumLight] = useState(0);

    const onCodeChange = (index, value) => {
        const newArray = [...code];
        newArray[index] = value;
        props.submitGuess(newArray);
        setCode(newArray);
    }

    const onHintChange = () => {

        // Player Codemaker Error Check
        if (!props.cpuMode || props.p1Role === 'Codemaker') {
            if (numDark + numLight > 4 || numDark < 0 || numLight < 0) {
                Alert.alert("Invalid submission", "Make sure both values are positive and aren't greater than 4 when added together.", [{text: "OK", style: "cancel"}]);
                return;
            }

            const newArray = [];

            for (let i = 0; i < numDark; i++) {
                newArray.push(2);
            }

            for (let i = 0; i < numLight; i++) {
                newArray.push(1);
            }

            while (newArray.length < 4) {
                newArray.push(0);
            }

            props.submitHint(newArray);
            setModalVisible(!modalVisible);
            setHint(newArray);      
        }

        // Codemaker AI Hint
        else {
            props.submitHint(props.hint);
            setModalVisible(!modalVisible);
            setHint(props.hint);
        }

        
    }

    return (
        <View style={styles.gameRow}>

            {/* =================== Code =================== */}
            <Text style={styles.idText}>{props.id+1}</Text>
            <View style={styles.codeContainer}>
                <MMCodePeg id={0} num={code[0]} onSelect={onCodeChange} />
                <MMCodePeg id={1} num={code[1]} onSelect={onCodeChange} />
                <MMCodePeg id={2} num={code[2]} onSelect={onCodeChange} />
                <MMCodePeg id={3} num={code[3]} onSelect={onCodeChange} />
            </View>

            {/* =================== Modal for Hints =================== */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={styles.modalRow}>

                            <MMHintPeg num={2} /> 
                            <Text style={styles.modalText}>pegs:</Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setNumDark(prev => prev - 1)}
                            >
                                <Text>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.modalBold}>{numDark}</Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setNumDark(prev => prev + 1)}
                            >
                                <Text>+</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.modalRow}>

                            <MMHintPeg num={1} /> 
                            <Text style={styles.modalText}>pegs:</Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setNumLight(prev => prev - 1)}
                            >
                                <Text>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.modalBold}>{numLight}</Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setNumLight(prev => prev + 1)}
                            >
                                <Text>+</Text>
                            </TouchableOpacity>

                        </View>

                            <Pressable
                                style={styles.buttonClose}
                                onPress={onHintChange}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>    

                    </View>
                </View>
            </Modal>

            {/* =================== Hints =================== */}
            <TouchableOpacity style={styles.hintContainer} onPress={() => setModalVisible(true)}>
                <View style={styles.hintRow} >
                    <MMHintPeg num={hint[0]} />
                    <MMHintPeg num={hint[1]} />
                </View>
                <View style={styles.hintRow} >
                    <MMHintPeg num={hint[2]} />
                    <MMHintPeg num={hint[3]} />
                </View>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    gameRow: {
        flexDirection: 'row',
        width: 375,
        height: 65,
        backgroundColor: Colors.bgOff,
        alignItems: 'center'
    },
    codeContainer: {
        flex: 4,
        margin: 5,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff'
    },
    hintContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    inactiveContainer: {
        backgroundColor: Colors.bgOff
    },
    codePeg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 2,
        backgroundColor: '#dedede'
    },
    hintRow: {
        flexDirection: 'row',
        flex: 1
    },
    hintPeg: {
        width: 20,
        height: 20,
        borderRadius: 25,
        margin: 4,
        backgroundColor: '#dedede'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#eeeeee',
        marginHorizontal: 10
    },
    buttonClose: {
        borderRadius: 25,
        padding: 15,
        backgroundColor: Colors.accent,
        marginHorizontal: 5,
        marginTop: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 14
    },
    modalText: {
        marginBottom: 3,
        textAlign: "center"
    },
    modalBold: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    modalRow: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    idText: {
        marginLeft: 2,
        color: '#ffffff'
    }
})

export default MMRow;