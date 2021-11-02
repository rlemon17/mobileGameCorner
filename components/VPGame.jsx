import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import Colors from './Colors';
import VPCardRow from './VPCardRow';
import VPBetColumn from './VPBetColumn';

const VPGame = (props) => {

    const [phase, setPhase] = useState(0); // 0 = set up bet || 1 = initial deal, choose held cards ||  2 = second deal
    const [message, setMessage] = useState('Try Again!')
    const [bet, setBet] = useState(1);
    const [money, setMoney] = useState(props.money);
    const [winString, setWinString] = useState('');
    const [prizeMoneyString, setPrizeMoneyString] = useState('');
    const [hand, setHand] = useState([8, 48, 36, 24, 12]);
    const [heldCards, setHeldCards] = useState([
        false,
        false,
        false,
        false,
        false
    ]);

    var winCredit = 0;
    const creditCost = parseFloat(props.creditCost.toFixed(2));
    const jackpot = 800;
    const royalFlush = 250;
    const straightFlush = 50;
    const fourKind = 25;
    const fullHouse = 9;
    const flush = 6;
    const straight = 4;
    const threeKind = 3;
    const twoPair = 2;
    const jacksPair = 1;

    // Helper function to check if two arrays are equal
    const checkEqual = (arr1, arr2) => {
        return Array.isArray(arr1) &&
        Array.isArray(arr2) &&
        arr1.length === arr2.length &&
        arr1.every((val, index) => val === arr2[index]);
    }

    const betUp = () => {
        // Don't do anything if phase 1
        if (phase === 1) {
            return;
        }
        
        // Max bet is 5
        if (bet >= 5) {
            return;
        }

        // Other Max is if not enough credits
        if ((bet+1)*creditCost > money) {
            return;
        }

        setBet(prev => prev + 1);
    }

    const betDown = () => {
        if (phase === 1 || prizeMoneyString === 'Game Over!') {
            return;
        }

        // Min bet is 1
        if (bet <= 1) {
            return;
        }
        setBet(prev => prev - 1);
    }

    // Helper functions to make calculations clearer
    const getRank = (num) => {
        return (num % 13);
    }

    const getSuit = (num) => {
        return (num % 4);
    }

    // Converts entire array to just their ranks, and sorts it
    const convertToRanks = (handArr) => {
        let rankArray = [];
        handArr.forEach(num => rankArray.push(getRank(num)));
        return rankArray.sort((a, b) => a-b);
    };

    // Converts entire array to just their suits, and sorts it
    const convertToSuits = (handArr) => {
        let suitArray = [];
        handArr.forEach(num => suitArray.push(getSuit(num)));
        return suitArray.sort();
    };

    // ========== ALL HAND CHECKING FUNCTIONS ========== 
    const checkPairs = (rankArray) => {
        let firstNum = -1;
        let firstNumCount = 1;

        let secondNum = -1;
        let secondNumCount = 1;

        // Scan through each card
        for (let i = 0; i < rankArray.length-1; i++) {

            // If we find a match...
            if (rankArray[i] === rankArray[i+1]) {

                // Check if this is the first occurrence of first pair
                if (firstNum === -1) {
                    firstNum = rankArray[i];
                    firstNumCount++;
                }

                // If first pair already found and this matches, increment
                else if (rankArray[i] === firstNum) {
                    firstNumCount++;
                }

                // Check if this is the first occurrence of second pair
                else if (secondNum === -1) {
                    secondNum = rankArray[i];
                    secondNumCount++;
                }

                // If second pair already found and this matches, increment
                else if (rankArray[i] === secondNum) {
                    secondNumCount++;
                }
            }

            // else, there wasn't a match with the next number, nothing to be done
        }

        // Check most specific cases first
        // Four of a Kind Check
        if (firstNumCount === 4) {
            winCredit = fourKind;
            return("Four of a Kind!");
        }

        // Full House Check
        else if ((firstNumCount === 3 && secondNumCount === 2) || (firstNumCount === 2 && secondNumCount === 3)) {
            winCredit = fullHouse;
            return("Full House!");
        }

        // Three of a Kind
        else if (firstNumCount === 3) {
            winCredit = threeKind;
            return("Three of a Kind!");
        }

        // Two Pairs
        else if (firstNum !== -1 && secondNum !== -1) {
            winCredit = twoPair;
            return("Two Pairs!");
        }

        // One Pair, jacks or better
        else if (firstNum >= 9) {
            winCredit = jacksPair;
            return("One Pair (Jacks+)!");
        }

        // Else, none
        else {
            return("Try Again!");
        }
    };

    const checkStraight = (rankArray) => {

        const edgeCases = [
            [0,9,10,11,12],
            [0,1,10,11,12],
            [0,1,2,11,12],
            [0,1,2,3,12]
        ];

        // Check edge cases for Aces (12) and Twos (0)
        if (rankArray.includes(12) && rankArray.includes(0)) {
            for (let i = 0; i < edgeCases.length; i++) {
                if (checkEqual(edgeCases[i], rankArray)) {
                    winCredit = straight;
                    return("Straight!");
                }    
            }
            // If it's none of those, then it can't be a straight
            return("Try Again!");
        }

        else {
            for (let i = 0; i < rankArray.length-1; i++) {
                // If ever not one less than next number, not a straight
                if ((rankArray[i+1] - rankArray[i]) !== 1) {
                    return("Try Again!");
                }
            }
            winCredit = straight;
            return("Straight!");
        }
        
    };

    const checkFlush = (suitArray) => {
        for (let i = 0; i < suitArray.length-1; i++) {
            // If ever not same suit as next number, not a flush
            if (suitArray[i] !== suitArray[i+1]) {
                return("Try Again!");
            }
        }
        winCredit = flush;
        return("Flush!");
    }

    // Checks hand for a winning hand
    const checkHand = (handArr) => {
        setMessage('Try Again!');

        let rankArray = convertToRanks(handArr);
        let suitArray = convertToSuits(handArr);

        let pairCheckResult = checkPairs(rankArray);
        let straightCheckResult = checkStraight(rankArray);
        let flushCheckResult = checkFlush(suitArray);

        // Check for various pair hands
        if (pairCheckResult !== 'Try Again!') {
            setMessage(pairCheckResult);
        }

        // Check for straights and flushes
        if (straightCheckResult !== 'Try Again!') {
            setMessage(straightCheckResult);
        }
        if (flushCheckResult !== 'Try Again!') {
            setMessage(flushCheckResult);
        }    

        // Check for Straight Flushes
        if (straightCheckResult !== 'Try Again!' && flushCheckResult !== 'Try Again!') {
            // Check for Royal Flush
            if (checkEqual(rankArray, [8,9,10,11,12])) {
                winCredit = royalFlush;
                // Edge case if max bet
                if (bet === 5) {
                    winCredit = jackpot;
                }
                setMessage('Royal Flush!');
            }
            else {
                winCredit = straightFlush;
                setMessage('Straight Flush!');
            }
        }

        if (phase === 1) {
            setMoney(prev => prev + (bet*creditCost*winCredit));
            if (winCredit > 0) {
                setWinString(`Won! $${creditCost} x ${bet} x ${winCredit} = `);
                setPrizeMoneyString(`+$${(bet*creditCost*winCredit).toFixed(2)}`);    
            }
            else {
                setWinString('');
                // Check for game over
                if (money < creditCost) {
                    setPrizeMoneyString('Game Over!')
                }
                else {
                    setPrizeMoneyString('');    
                }
            }
        }
        
    };

    // Also used to change game phases
    const dealCards = () => {

        // Game Over
        if (prizeMoneyString === 'Game Over!') {
            return;
        }

        // Generate 5 random cards, make sure no repeats
        let newHand = [];
        let usedCards = [];

        for (let i = 0; i < 5; i++) {

            // Generate a random card
            let initialCard = Math.floor(Math.random()*52);

            // Check if it's already been played
            while (usedCards.includes(initialCard)) {
                initialCard = Math.floor(Math.random()*52);
            }

            newHand.push(initialCard);
            usedCards.push(initialCard);
        }

        // 0 (start) ===> 1 (first deal)
        if (phase === 0) {
            // Subtract from credits
            setMoney(prev => prev - (bet*creditCost));
            setPhase(1);
        }

        // 1 (first deal) ===> 2 (second deal, results, set up next bet)
        // Still random, but keep held cards and avoid any repeats
        else if (phase === 1) {

            usedCards = [...hand];

            for (let i = 0; i < 5; i++) {

                // Keep held cards
                if (heldCards[i]) {
                    newHand[i] = hand[i];
                }

                // Make sure new cards aren't repeats
                else {
                    let newCard = newHand[i];
                    while (usedCards.includes(newHand[i])) {
                        newCard = Math.floor(Math.random()*52);
                        newHand[i] = newCard;
                    }
                    usedCards.push(newCard);
                }
            }

            setPhase(2);
        }

        // 2 (second deal, results, set up next bet) ===> 1 (first deal)
        else if (phase === 2) {
            winCredit = 0;
            let nextBet = bet;

            // Check if need to lower bet when almost out of credits
            while ((nextBet*creditCost) > money) {
                nextBet--;
            }

            setHeldCards([
                false,
                false,
                false,
                false,
                false
            ]);
            setBet(nextBet);
            setMoney(prev => prev - (nextBet*creditCost));
            setMessage('Try Again!');
            setPhase(1);
        }

        checkHand(newHand);
        setHand(newHand);
    }

    const changeHeldCard = (index) => {
        let newArray = [...heldCards];
        newArray[index] = !newArray[index];
        setHeldCards(newArray);
    }

    const handleCashout = () => {
        props.handleCashout(money);
    };

    return (
        <View style={styles.wholeContainer}>

            <View style={styles.chartContainer}>
                <View style={styles.rowContainer}>
                    <View style={styles.handList}>
                        <Text style={[styles.betText, message === 'Royal Flush!' && styles.highlightBetText]}>Royal Flush</Text>
                        <Text style={[styles.betText, message === 'Straight Flush!' && styles.highlightBetText]}>Straight Flush</Text>
                        <Text style={[styles.betText, message === 'Four of a Kind!' && styles.highlightBetText]}>Four of a Kind</Text>
                        <Text style={[styles.betText, message === 'Full House!' && styles.highlightBetText]}>Full House</Text>
                        <Text style={[styles.betText, message === 'Flush!' && styles.highlightBetText]}>Flush</Text>
                        <Text style={[styles.betText, message === 'Straight!' && styles.highlightBetText]}>Straight</Text>
                        <Text style={[styles.betText, message === 'Three of a Kind!' && styles.highlightBetText]}>Three of a Kind</Text>
                        <Text style={[styles.betText, message === 'Two Pairs!' && styles.highlightBetText]}>Two Pairs</Text>
                        <Text style={[styles.betText, message === 'One Pair (Jacks+)!' && styles.highlightBetText]}>One Pair (Jacks+)</Text>
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
                    <Text style={styles.titleText}>{[
                        phase === 0 && 'Bet then Deal to start!',
                        phase === 1 && 'Choose cards to keep',
                        phase === 2 && message
                    ]}</Text>
                </View>
                
                <VPCardRow 
                    handArr={hand} 
                    changeHeldCard={changeHeldCard} 
                    phase={phase} 
                    heldCards={heldCards}
                />

                <View style={styles.infoContainer}>
                    <View style={styles.infoSubContainer}>
                        <Text style={styles.infoText}>BET:</Text>
                        <Text style={styles.infoText2}>${(bet*creditCost).toFixed(2)}</Text>
                    </View>

                    <View style={styles.infoSubContainer}>
                        <Text style={styles.infoText}>CREDITS:</Text>
                        <Text style={styles.infoText2}>${money.toFixed(2)}</Text>    
                    </View>
                </View>
            </View>

            {/* Block cards during phases you can't hold */}
            {phase !== 1 && <View style={styles.gameContainerBlock} />}

            <View style={styles.buttonsContainer}>
                <View style={[styles.rowContainer, styles.buttonsRow]}>
                    <TouchableOpacity style={[styles.button, styles.button2]} onPress={handleCashout}>
                        <Text style={styles.buttonText}>Cashout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, (phase === 1 || bet === 1 || prizeMoneyString === 'Game Over!') && styles.buttonInactive]} onPress={betDown}>
                        <Text style={styles.buttonText}>Bet -1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, (phase === 1 || (bet+1)*creditCost > money) && styles.buttonInactive]} onPress={betUp}>
                        <Text style={styles.buttonText}>Bet +1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, prizeMoneyString === 'Game Over!' && styles.buttonInactive]} onPress={dealCards}>
                        <Text style={styles.buttonText}>Deal/Draw</Text>
                    </TouchableOpacity>

                </View>
                {(phase === 2 && prizeMoneyString !== '') && 
                    <Text style={styles.winText}>{winString}
                        <Text style={styles.winTextBold}>{prizeMoneyString}</Text>
                    </Text>
                }
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
    gameContainerBlock: {
        position: 'absolute',
        height: 150,
        width: '100%'
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
    buttonInactive: {
        backgroundColor: Colors.bgOff
    },
    handList: {
        padding: 10
    },
    betText: {
        color: '#ffffff'
    },
    highlightBetText: {
        backgroundColor: Colors.accentOff,
        color: Colors.bg
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
    },
    winText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 20,
        color: Colors.primary
    },
    winTextBold: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 25,
        color: Colors.accent,
        fontWeight: 'bold'
    }
})

export default VPGame;