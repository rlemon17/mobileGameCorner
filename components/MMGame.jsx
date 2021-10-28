import React, { useState, useEffect } from 'react';
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

    // For handling AI
    const cpuMode = props.cpuMode;

    // For viewing answer on Codemaker's turn. Only show if 2 human players or CPU is hacker
    const [showAnswer, setShowAnswer] = useState((!cpuMode || p1Role === 'Codemaker'));

    // For keeping track of answer even when re-rendering
    const [answer, setAnswer] = useState([0,0,0,0]);

    // Checking for correct hints
    const [currentGuess, setCurrentGuess] = useState([0,0,0,0]);
    const [currentHint, setCurrentHint] = useState([0,0,0,0]);

    // ======================= FUNCTIONS =========================
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

        // Have Hacker AI generate guess with this new row
        if (cpuMode && p2Role === 'Hacker') {
            setTurnNum(prev => prev + 1);
            setCurrentHint([0,0,0,0]);

            let newCpuGuess = [
                Math.floor(Math.random()*6)+1,
                Math.floor(Math.random()*6)+1,
                Math.floor(Math.random()*6)+1,
                Math.floor(Math.random()*6)+1,
            ];

            setCurrentGuess(newCpuGuess);

            setGameRows(prev => [...prev, <MMRow 
                key={turnNum} 
                id={turnNum}
                code={newCpuGuess}
                hint={[0,0,0,0]} 
                onShowAnswer={onShowAnswer} 
                submitGuess={onChangeGuess}
                submitHint={onChangeHint}
                cpuMode={cpuMode}
                p1Role={p1Role}
            />]);   
        }

        // Otherwise, Hacker is a human player, just add an empty row
        else {
            setTurnNum(prev => prev + 1);
            setCurrentHint([0,0,0,0]);
            setCurrentGuess([0,0,0,0]);
            setGameRows(prev => [...prev, <MMRow 
                key={turnNum} 
                id={turnNum}
                code={[0,0,0,0]}
                hint={[0,0,0,0]} 
                onShowAnswer={onShowAnswer} 
                submitGuess={onChangeGuess}
                submitHint={onChangeHint}
                cpuMode={cpuMode}
                p1Role={p1Role}
            />]);    
        }
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

        let indicesCountedFor = [];
        
        // Check for light pegs
        // Pick index to compare all to
        indicesLeft.forEach(indexOfCorrect => {

            // If ever true, we add a 1 to the hint array
            matchingColor = false;

            // Compare to the rest of the indices
            indicesLeft.forEach(indexOfGuess => {

                // Don't count self since we already checked that
                if (indexOfCorrect === indexOfGuess) {
                    return;
                }

                else {
                    if (correct[indexOfCorrect] === guess[indexOfGuess]) {
                        // Check if we already counted this index for answer dupes
                        if (!indicesCountedFor.includes(indexOfGuess) && !matchingColor) {
                            matchingColor = true;
                            indicesCountedFor.push(indexOfGuess);
                        }
                    }
                }

            })

            // If true, there was a match somewhere. Makes sure we only add 1 in case of guess dupes
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

        // 0 - Codemaker sets code, 1 - Hacker guesses, 2 - Codemaker rates

        // ================================= PHASE 0 =================================
        if (phase === 0) {

            // Handle Codemaker AI
            if (cpuMode && p2Role === 'Codemaker') {
                setAnswer([
                    Math.floor(Math.random()*6)+1,
                    Math.floor(Math.random()*6)+1,
                    Math.floor(Math.random()*6)+1,
                    Math.floor(Math.random()*6)+1,
                ])
            }

            // Player Codemaker error checks
            else {
                // Check for invalid code
                if (answer.includes(0)) {
                    Alert.alert("Invalid Code", "Please make sure there is a peg in each spot.", [{text: "OK", style: "cancel"}]);
                    return
                }    
            }
            
            setShowAnswer(false);
            setPhase(1);
            addRow();
        }

        // ================================= PHASE 1 ==================================
        else if (phase === 1) {

            // Check for invalid guess if Hacker is a player
            if (!cpuMode || p1Role === 'Hacker') {
                if (currentGuess.includes(0)) {
                    Alert.alert("Invalid Code", "Please make sure there is a peg in each spot.", [{text: "OK", style: "cancel"}]);
                    return
                }    
            }

            // HANDLE COMPUTER MODE
            // Set up Codemaker AI to generate guess for next phase
            if (cpuMode && p2Role === 'Codemaker') {

                // Generate guess
                let newCpuHint = getHint(answer, currentGuess);
                setCurrentHint(newCpuHint);

                // Replace current row so it re-renders
                let newRows = [...gameRows];
                newRows = newRows.filter((row, index) => index !== turnNum-1);
                newRows = [...newRows, <MMRow 
                    key={turnNum-1*100} 
                    id={turnNum-1}
                    code={currentGuess}
                    hint={newCpuHint}
                    onShowAnswer={onShowAnswer} 
                    submitGuess={onChangeGuess}
                    submitHint={onChangeHint}
                    cpuMode={cpuMode}
                    p1Role={p1Role}
                />]
                setGameRows(newRows);
            }

            setPhase(2);
        }

        // ================================= PHASE 2 =================================
        else {
            // PLAYER CODEMAKER error check. Nothing else should run if incorrect hint.
            if ((!cpuMode || p1Role === 'Codemaker') && !checkEqual(getHint(answer,currentGuess), currentHint)) {
                Alert.alert("Inaccurate Hint", "Please make sure your hint is correct.", [{text: "OK", style: "cancel"}]);
                return;
            }

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
                setShowAnswer(false);
                setP1Role('Hacker');
                setP2Role('Codemaker');
            }

            else {
                setP1Role('Codemaker');
                setP2Role('Hacker')
            }

        }

        if (!shouldSwitch) {
            if (p1Role === 'Hacker') {
                setShowAnswer(false);
            }
        }

        // Reset States
        setPhase(0);
        setTurn('Codemaker');
        setWinner('');
        setGameRows([]);
        setTurnNum(0);
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
                        cpuMode={cpuMode}
                        p1Role={p1Role}
                        text={
                            [
                                (cpuMode && p2Role === 'Codemaker' && phase === 0) && 'CPU has created the code, press Next.',
                                (cpuMode && p2Role === 'Codemaker' && phase === 1) && 'Input your guess for this row.',
                                (cpuMode && p2Role === 'Codemaker' && phase === 2) && 'CPU has rated your guess, press Next.',
                                (cpuMode && p2Role === 'Hacker' && phase === 0) && 'Create your code for the round.',
                                (cpuMode && p2Role === 'Hacker' && phase === 1) && 'CPU has made a guess, press Next.',
                                (cpuMode && p2Role === 'Hacker' && phase === 2) && "Rate the hacker's guess for this row.",
                                (!cpuMode && phase === 0) && 'Create your code for the round.',
                                (!cpuMode && phase === 1) && 'Input your guess for this row.',
                                (!cpuMode && phase === 2) && "Rate the hacker's guess for this row."
                            ]
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