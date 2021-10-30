import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import Colors from './Colors';
import VPCardRow from './VPCardRow';
import VPBetColumn from './VPBetColumn';

const VPGame = (props) => {

    const [phase, setPhase] = useState(0); // 0 = set up bet || 1 = initial deal, choose held cards ||  2 = second deal
    const [bet, setBet] = useState(1);
    const [money, setMoney] = useState(props.money);
    const [hand, setHand] = useState([
        Math.floor(Math.random()*52),
        Math.floor(Math.random()*52),
        Math.floor(Math.random()*52),
        Math.floor(Math.random()*52),
        Math.floor(Math.random()*52)
    ]);
    const [heldCards, setHeldCards] = useState([
        false,
        false,
        false,
        false,
        false
    ]);

    const royalFlush = 250;
    const straightFlush = 50;
    const fourKind = 25;
    const fullHouse = 9;
    const flush = 6;
    const straight = 4;
    const threeKind = 3;
    const twoPair = 2;
    const jacksPair = 1;

    const betUp = () => {
        if (bet >= 5) {
            return;
        }
        setBet(prev => prev + 1);
    }

    const betDown = () => {
        if (bet <= 1) {
            return;
        }
        setBet(prev => prev - 1);
    }

    const dealCards = () => {

        let newHand = [
            Math.floor(Math.random()*52),
            Math.floor(Math.random()*52),
            Math.floor(Math.random()*52),
            Math.floor(Math.random()*52),
            Math.floor(Math.random()*52)
        ];

        //Keep held cards
        for (let i = 0; i < 5; i++) {
            if (heldCards[i]) {
                newHand[i] = hand[i];
            }
        }

        setHand(newHand);
    }

    const changeHeldCard = (index) => {
        let newArray = [...heldCards];
        newArray[index] = !newArray[index];
        setHeldCards(newArray);
    }

    return (
        <View style={styles.wholeContainer}>

            <View style={styles.chartContainer}>
                <View style={styles.rowContainer}>
                    <View style={styles.handList}>
                        <Text style={styles.betText}>Royal Flush</Text>
                        <Text style={styles.betText}>Straight Flush</Text>
                        <Text style={styles.betText}>Four of a Kind</Text>
                        <Text style={styles.betText}>Full House</Text>
                        <Text style={styles.betText}>Flush</Text>
                        <Text style={styles.betText}>Straight</Text>
                        <Text style={styles.betText}>Three of a Kind</Text>
                        <Text style={styles.betText}>Two Pairs</Text>
                        <Text style={styles.betText}>One Pair (Jacks+)</Text>
                    </View>

                    <VPBetColumn id={1} bet={bet}/>
                    <VPBetColumn id={2} bet={bet}/>
                    <VPBetColumn id={3} bet={bet}/>
                    <VPBetColumn id={4} bet={bet}/>
                    <VPBetColumn id={5} bet={bet}/>
                </View>
                
            </View>

            <View style={styles.gameContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>One Pair!</Text>
                </View>
                
                <VPCardRow handArr={hand} changeHeldCard={changeHeldCard} />

                <View style={styles.infoContainer}>
                    <View style={styles.infoSubContainer}>
                        <Text style={styles.infoText}>BET:</Text>
                        <Text style={styles.infoText2}>{bet}</Text>
                    </View>

                    <View style={styles.infoSubContainer}>
                        <Text style={styles.infoText}>CREDITS:</Text>
                        <Text style={styles.infoText2}>${money.toFixed(2)}</Text>    
                    </View>
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <View style={[styles.rowContainer, styles.buttonsRow]}>
                    <TouchableOpacity style={[styles.button, styles.button2]}>
                        <Text style={styles.buttonText}>Cashout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={betDown}>
                        <Text style={styles.buttonText}>Bet -1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={betUp}>
                        <Text style={styles.buttonText}>Bet +1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={dealCards}>
                        <Text style={styles.buttonText}>Deal/Draw</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    wholeContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: Colors.accentOff
    },
    chartContainer: {
        flex: 2,
        backgroundColor: Colors.bg,
        borderWidth: 10,
        borderColor: Colors.accentOff,
        borderRadius: 25,
        padding: 10
    },
    gameContainer: {
        flex: 4,
        backgroundColor: Colors.primary,
        justifyContent: 'center'
    },
    buttonsContainer: {
        flex: 2,
        backgroundColor: Colors.primaryOff,
        borderWidth: 10,
        borderColor: Colors.accentOff,
        borderRadius: 25
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    buttonsRow: {
        justifyContent: 'space-evenly',
        marginTop: 20
    },
    button: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.accent,
        textAlign: "center"
    },
    button2: {
        backgroundColor: Colors.bg
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    handList: {
        padding: 10
    },
    betText: {
        color: '#ffffff'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        top: 30
    },
    infoSubContainer: {
        flexDirection: 'row'
    },
    infoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryOff
    },
    infoText2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.accentOff,
        marginLeft: 20
    },
    titleContainer: {
        alignItems: 'center',
        bottom: 60
    },
    titleText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.primaryOff
    }
})

export default VPGame;