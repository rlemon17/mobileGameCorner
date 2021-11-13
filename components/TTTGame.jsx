import { useLinkProps } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Card, Title } from 'react-native-paper';

import Colors from './Colors';
import TTTBox from './TTTBox';
import TTTEnd from './TTTEnd';

const TTTGame = (props) => {

    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);

    const [gameArray, setGameArray] = useState([
        '','','',
        '','','',
        '','',''
    ]);

    const [moves, setMoves] = useState(0);
    const [turn, setTurn] = useState(props.p1);

    const [overMsg, setOverMsg] = useState("It's a tie!");
    const [isGameOver, setIsGameOver] = useState(false);

    const winningRows = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const cpuMode = props.cpuMode;

    const handleMove = (index, symbol) => {

        setMoves(prev => prev + 1);

        const newArray = [...gameArray];
        newArray[index] = symbol;
        setGameArray(newArray);

        if (turn === 'X') {
            setTurn('O');
        }
        else {
            setTurn('X');
        }
    }

    // AI for Easy, just randomly choose an open spot
    const easyCpu = () => {
        
        let choice = Math.floor(Math.random()*9);

        while (gameArray[choice] !== '') {
            choice = Math.floor(Math.random()*9);
        }

        handleMove(choice, turn);
    }

    // AI for Hard
    // Highest priority = changing choice last
    const hardCpu = () => {

        // Default random choice if none of the below checks pass
        let choice = Math.floor(Math.random()*9);

        while (gameArray[choice] !== '') {
            choice = Math.floor(Math.random()*9);
        }

        // Used to determine if player or self (CPU) is one space from winning
        let loseCount = 0;
        let loseIndex = choice;

        let winCount = 0;
        let winIndex = choice;

        // Stop player from winning by checking if one away
        winningRows.forEach(possibleWin => {

            loseCount = 0;

            possibleWin.forEach(index => {

                if (gameArray[index] === props.p1) {
                    loseCount = loseCount + 1;
                }

                else if (gameArray[index] === '') {
                    loseIndex = index;
                }

                // Remove possibility altogether if any space on this row is occupied by other character
                else {
                    loseCount = loseCount - 1;
                }

            })

            // If count is 2 at this point, the missingIndex should be the move
            if (loseCount === 2) {
                choice = loseIndex;
            }

        })

        // Highest priority should be winning and ending the game
        winningRows.forEach(possibleWin => {

            // Determine CPU Character
            let cpuChar = 'O';
            if (props.p1 === 'O') {
                cpuChar = 'X';
            }

            winCount = 0;

            possibleWin.forEach(index => {

                if (gameArray[index] === cpuChar) {
                    winCount = winCount + 1;
                }

                else if (gameArray[index] === '') {
                    winIndex = index;
                }

                else {
                    winCount = winCount - 1;
                }

            })

            // If count is 2 at this point, the missingIndex should be the move
            if (winCount === 2) {
                choice = winIndex;
            }

        })

        // Make the move
        handleMove(choice, turn);
    }

    const handleReset = () => {
        setGameArray([
            '','','',
            '','','',
            '','',''
        ]);
        setMoves(0);
        setOverMsg("It's a tie!");
        setIsGameOver(false);
    }

    const checkGameOver = (player) => {

        let cpuMove = true;

        winningRows.forEach(condition => {
            if (gameArray[condition[0]] === player && gameArray[condition[1]] === player && gameArray[condition[2]] === player) {
                setOverMsg(`${player} wins!`);
                setIsGameOver(true);
                cpuMove = false;

                if (player === 'X') {
                    setXWins(prev => prev + 1);
                }
                else {
                    setOWins(prev => prev + 1);
                }
            }
        })

        if (moves >= 9) {
            setIsGameOver(true);
            cpuMove = false;
        }

        // Handle computer's move
        if (cpuMode && cpuMove && turn !== props.p1) {
            if (props.cpuDifficulty === 1) {
                easyCpu();
            }
            else {
                hardCpu();
            }
        }
    }

    useEffect(() => {
        
        if (turn === 'O') {
            checkGameOver('X');
        }
        else {
            checkGameOver('O');
        }

    }, [turn])

    // Edge case for CPU being first move
    if (cpuMode && moves == 0 && turn !== props.p1) {
        if (props.cpuDifficulty === 1) {
            easyCpu();
        }
        else {
            hardCpu();
        }
    }

    return (
        <View>
            <Card style={styles.scoreContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.scoreTitle}>X Wins:</Text>
                    <Text style={styles.scoreTitle}>O Wins:</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.score}>{xWins}</Text>
                    <Text style={styles.score}>{oWins}</Text>
                </View>
            </Card>

            <Text style={styles.turnTeller}>{turn}'s Turn</Text>

            <View style={styles.bgBox}/>

            <TTTBox id={0} symbol={gameArray[0]} turn={turn} handleMove={handleMove} style={{bottom: 130, right: 170}}/>
            <TTTBox id={1} symbol={gameArray[1]} turn={turn} handleMove={handleMove} style={{bottom: 130, right: 60}}/>
            <TTTBox id={2} symbol={gameArray[2]} turn={turn} handleMove={handleMove} style={{bottom: 130, right: -50}}/>

            <TTTBox id={3} symbol={gameArray[3]} turn={turn} handleMove={handleMove} style={{bottom: 20, right: 170}}/>
            <TTTBox id={4} symbol={gameArray[4]} turn={turn} handleMove={handleMove} style={{bottom: 20, right: 60}}/>
            <TTTBox id={5} symbol={gameArray[5]} turn={turn} handleMove={handleMove} style={{bottom: 20, right: -50}}/>

            <TTTBox id={6} symbol={gameArray[6]} turn={turn} handleMove={handleMove} style={{bottom: -90, right: 170}}/>
            <TTTBox id={7} symbol={gameArray[7]} turn={turn} handleMove={handleMove} style={{bottom: -90, right: 60}}/>
            <TTTBox id={8} symbol={gameArray[8]} turn={turn} handleMove={handleMove} style={{bottom: -90, right: -50}}/>

            {isGameOver && <TTTEnd winner={overMsg} onEnd={props.onEnd} onReset={handleReset} />}
            
        </View>
    );
}

const styles = StyleSheet.create({
    scoreContainer: {
        maxHeight: 100,
        borderRadius: 20,
        bottom: 270,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    turnTeller: {
        position: 'absolute',
        bottom: 240,
        right: 82
    },
    rowContainer: {
        flexDirection: 'row'
    },
    scoreTitle: {
        padding: 10,
        marginHorizontal: 20
    },
    score: {
        padding: 5,
        marginHorizontal: 40,
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.accent
    },
    bgBox: {
        height: 320,
        width: 320,
        backgroundColor: Colors.accent,
        position: 'absolute',
        bottom: -90,
        right: -50,
        shadowColor: Colors.accent,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.75,
        shadowRadius: 3,
    }
})

export default TTTGame;