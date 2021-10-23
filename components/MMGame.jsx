import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Alert } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import MMRow from './MMRow';
import MMAnswerRow from './MMAnswerRow';
import MMInfoBox from './MMInfoBox';
import MMEndBox from './MMEndBox';

const MMGame = (props) => {

    const [p1Role, setP1Role] = useState(props.p1Choice);
    const [p2Role, setP2Role] = useState(props.p2Choice);

    const [p1Score, setP1Score] = useState(0);
    const [p2Score, setP2Score] = useState(0);

    // 0 - Codemaker sets code, 1 - Hacker guess, 2 - Codemaker rates
    const [phase, setPhase] = useState(0);
    const [turn, setTurn] = useState('Codemaker');
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('');

    // Dynamically rendering more rows
    const [gameRows, setGameRows] = useState([]);
    const [turnNum, setTurnNum] = useState(0);

    // For viewing answer on Codemaker's turn
    const [showAnswer, setShowAnswer] = useState(true);

    // For keeping track of answer even when re-rendering
    const [answer, setAnswer] = useState([0,0,0,0]);

    // Checking for correct hints
    const [currentGuess, setCurrentGuess] = useState([0,0,0,0]);
    const [currentHint, setCurrentHint] = useState([0,0,0,0]);

    // For only keeping one row of the game active

    const onShowAnswer = () => {
        setShowAnswer(prev => !prev);
    }

    const onChangeAnswer = (newArray) => {
        setAnswer(newArray);
    }

    const onChangeGuess = (newArray) => {
        setCurrentGuess(newArray);
    }

    const onChangeHint = (newArray) => {
        setCurrentHint(newArray);
    }

    const addRow = () => {
        setTurnNum(prev => prev + 1);
        setGameRows(prev => [...prev, <MMRow 
            key={turnNum} 
            id={turnNum} 
            onShowAnswer={onShowAnswer} 
            submitGuess={onChangeGuess}
            submitHint={onChangeHint}
        />]);
    }

    // Generates the correct hint array to make sure codemaster is giving accurate hints
    const getHint = (correct, guess) => {
        let expectedHint = [];
        let indicesLeft = [0,1,2,3];
        let indexToSplice = 0;
        let matchingColor = false;

        // Check for dark pegs
        for (let i = 0; i < correct.length; i++) {
            if (correct[i] === guess[i]) {
                expectedHint.push(2);
                indexToSplice = indicesLeft.indexOf(i);
                indicesLeft.splice(indexToSplice, 1);
            }
        }
        
        // Check for light pegs
        // Pick index to compare all to
        indicesLeft.forEach(indexOfCorrect => {

            // If ever true, we add a 1 to the hint array
            matchingColor = false;

            // Compare to the rest of the indices
            indicesLeft.forEach(indexOfGuess => {

                // Make sure don't count self
                if (indexOfCorrect === indexOfGuess) {
                    return;
                }

                else {
                    if (correct[indexOfCorrect] === guess[indexOfGuess]) {
                        matchingColor = true;
                    }
                }

            })

            // If true, there was a match somewhere. Makes sure we only add 1 in case of dupes
            if (matchingColor) {
                expectedHint.push(1);
            }
        })

        // Add any empty pegs
        while (expectedHint.length < 4) {
            expectedHint.push(0);
        }

        return expectedHint;
    }

    // Helper function to check if two arrays are equal
    const checkEqual = (arr1, arr2) => {
        return Array.isArray(arr1) &&
        Array.isArray(arr2) &&
        arr1.length === arr2.length &&
        arr1.every((val, index) => val === arr2[index]);
    }

    const nextPhase = () => {

        // 0 - Codemaker sets code, 1 - Hacker guess, 2 - Codemaker rates

        // Change game phase
        if (phase === 0) {

            // Check for invalid code
            if (answer.includes(0)) {
                Alert.alert("Invalid Code", "Please make sure there is a peg in each spot.", [{text: "OK", style: "cancel"}]);
                return
            }

            setShowAnswer(false);
            setPhase(1);
            addRow();
        }

        else if (phase === 1) {

            // Check for invalid code
            if (currentGuess.includes(0)) {
                Alert.alert("Invalid Code", "Please make sure there is a peg in each spot.", [{text: "OK", style: "cancel"}]);
                return
            }

            setPhase(2);
        }

        else {

            // Check that hint was accurate first
            if (checkEqual(getHint(answer,currentGuess), currentHint)) {

                // GAME OVER CHECK 1 --- currentHint is all 4 darks, Hacker wins
                if (checkEqual([2,2,2,2], currentHint)) {
                    setGameOver(true);
                    setWinner('Hacker');
                    setShowAnswer(true);
                    return;
                }

                // GAME OVER CHECK 1 --- 12th round, Codemaker wins
                else if (turnNum >= 12) {
                    setGameOver(true);
                    setWinner('Codemaker');
                    setShowAnswer(true);
                    return;
                }

                setShowAnswer(false);
                setPhase(1);
                addRow();

                if (p1Role === 'Codemaker') {
                    setP1Score(prev => prev + 1);
                }
        
                else {
                    setP2Score(prev => prev + 1);
                }
            }

            // Otherwise, hint was wrong
            else {
                Alert.alert("Inaccurate Hint", "Please make sure your hint is correct.", [{text: "OK", style: "cancel"}]);
                return;
            }
            
        }

        // Change turn
        if (turn === 'Codemaker') {
            setTurn('Hacker');
        }

        else {
            setTurn('Codemaker')
        }

    }

    const handleQuit = () => {
        props.onQuit();
    }

    const handleReset = (shouldSwitch) => {

        // Switch roles if needed
        if (shouldSwitch) {
            
            if (p1Role === 'Codemaker') {
                setP1Role('Hacker');
                setP2Role('Codemaker');
            }

            else {
                setP1Role('Codemaker');
                setP2Role('Hacker')
            }

        }

        // Reset States
        setPhase(0);
        setTurn('Codemaker');
        setWinner('');
        setGameRows([]);
        setTurnNum(0);
        setShowAnswer(true);

        setAnswer([0,0,0,0]);
        setCurrentGuess([0,0,0,0]);
        setCurrentHint([0,0,0,0]);

        setGameOver(false);
    }

    return (
        <View style={styles.wholeContainer}>

            <View style={styles.scoreContainer}>
                <Card style={styles.scoreCard}>
                    <Text>P1 ({p1Role}):</Text>
                    <Text style={styles.scoreText}>{p1Score}</Text>
                </Card>
                <Card style={styles.scoreCard}>
                    <Text>P2 ({p2Role}):</Text>
                    <Text style={styles.scoreText}>{p2Score}</Text>
                </Card>
            </View>

            <View style={styles.gameContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    {gameRows}

                    {showAnswer && <MMAnswerRow answer={answer} submit={onChangeAnswer} />}

                    {!gameOver ? <MMInfoBox 
                        onNext={nextPhase} 
                        onShow={onShowAnswer}
                        turn={turn} 
                        phase={phase}
                        text={
                            [phase === 0 && 'Create your code for the round.',
                            phase === 1 && 'Input your guess for this row.',
                            phase === 2 && "Rate the hacker's guess for this row."]
                        } 
                    /> : <MMEndBox 
                        winner={winner}
                        replay={handleReset}
                        quit={handleQuit}
                    />}    
                </ScrollView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.bg
    },
    scoreContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    scoreCard: {
        flex: 1,
        height: 60,
        width: 50,
        margin: 5,
        padding: 10,
        alignItems: 'center',
        borderRadius: 20
    },
    scoreText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        color: Colors.accent
    },
    gameContainer: {
        flex: 9,
        alignItems: 'center'
    },
    scrollContainer: {
        alignItems: 'center'
    }
})

export default MMGame;