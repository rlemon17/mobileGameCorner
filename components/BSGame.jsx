import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';
import BSStatBar from './BSStatBar';
import BSMoveMenu from './BSMoveMenu';
import BSTargetMenu from './BSTargetMenu';

const BSGame = (props) => {

    const [p1, setP1] = useState({
        id: 1,
        active: true,
        character: props.chosenCharacters[0],
        curHP: props.chosenCharacters[0].hp,
        curATK: props.chosenCharacters[0].atk,
        curDEF: props.chosenCharacters[0].def,
        curSPD: props.chosenCharacters[0].spd,
        curMANA: Math.floor(props.chosenCharacters[0].mana/2),
    });

    const [p2, setP2] = useState({
        id: 2,
        active: true,
        character: props.chosenCharacters[1],
        curHP: props.chosenCharacters[1].hp,
        curATK: props.chosenCharacters[1].atk,
        curDEF: props.chosenCharacters[1].def,
        curSPD: props.chosenCharacters[1].spd,
        curMANA: Math.floor(props.chosenCharacters[1].mana/2),
    });

    const [p3, setP3] = useState({
        id: 3,
        active: true,
        character: props.chosenCharacters[2],
        curHP: props.chosenCharacters[2].hp,
        curATK: props.chosenCharacters[2].atk,
        curDEF: props.chosenCharacters[2].def,
        curSPD: props.chosenCharacters[2].spd,
        curMANA: Math.floor(props.chosenCharacters[2].mana/2),
    });

    const [p4, setP4] = useState({
        id: 4,
        active: true,
        character: props.chosenCharacters[3],
        curHP: (props.chosenCharacters[3].hp),
        curATK: props.chosenCharacters[3].atk,
        curDEF: props.chosenCharacters[3].def,
        curSPD: props.chosenCharacters[3].spd,
        curMANA: Math.floor(props.chosenCharacters[3].mana/2),
    });

    const [message, setMessage] = useState('P1, select your move');
    const [subMessage, setSubMessage] = useState('');

    const [phase, setPhase] = useState('1A');
    const [currentUser, setCurrentUser] = useState(p1);

    const [p1Targets, setP1Targets] = useState('');
    const [p1Attack, setP1Attack] = useState('');

    const [p2Targets, setP2Targets] = useState('');
    const [p2Attack, setP2Attack] = useState('');

    const [p3Targets, setP3Targets] = useState('');
    const [p3Attack, setP3Attack] = useState('');

    const [p4Targets, setP4Targets] = useState('');
    const [p4Attack, setP4Attack] = useState('');

    // Returns how much damage should be dealt
    const getDamage = (userDataA, userDataB) => {
        // Get differnce between ATK and DEF
        let diff = userDataA.curATK - userDataB.curDEF;

        // Mininmum damage is always 1
        if (diff < 1) {
            diff = 1;
        }

        // Now randomize a number from 1 to diff
        return(Math.floor(Math.random()*(diff))+1);
    }

    // Change's the user's current HP by the value given
    // Negative numbers for value parameter imply healing
    const changeHP = (userData, value) => {
        let newValue = 0;
        let newIsActive = true;

        // Figure out which state function to call
        if (userData.id === 1) {
            setP1(prevState => {
                newValue = prevState.curHP - value;
                if (newValue <= 0) {
                    newValue = 0;
                    newIsActive = false;
                }
                if (newValue > prevState.character.hp) {
                    newValue = prevState.character.hp;
                }
                return {
                    ...prevState,
                    curHP: newValue,
                    active: newIsActive
                }
            });
        }
        else if (userData.id === 2) {
            setP2(prevState => {
                newValue = prevState.curHP - value;
                if (newValue <= 0) {
                    newValue = 0;
                    newIsActive = false;
                }
                if (newValue > prevState.character.hp) {
                    newValue = prevState.character.hp;
                }
                return {
                    ...prevState,
                    curHP: newValue,
                    active: newIsActive
                }
            });
        }
        else if (userData.id === 3) {
            setP3(prevState => {
                newValue = prevState.curHP - value;
                if (newValue <= 0) {
                    newValue = 0;
                    newIsActive = false;
                }
                if (newValue > prevState.character.hp) {
                    newValue = prevState.character.hp;
                }
                return {
                    ...prevState,
                    curHP: newValue,
                    active: newIsActive
                }
            });
        }
        else {
            setP4(prevState => {
                newValue = prevState.curHP - value;
                if (newValue <= 0) {
                    newValue = 0;
                    newIsActive = false;
                }
                if (newValue > prevState.character.hp) {
                    newValue = prevState.character.hp;
                }
                return {
                    ...prevState,
                    curHP: newValue,
                    active: newIsActive
                }
            });
        }
    };

    const changePhase = (moveOrTarget) => {

        let target = '';
        let damageValue = 0;

        // Assign target data
        if (moveOrTarget === '1') {
            target = p1;
        }

        else if (moveOrTarget === '2') {
            target = p2;
        }

        else if (moveOrTarget === '3') {
            target = p3;
        }

        else if (moveOrTarget === '4') {
            target = p4;
        }

        // 1A (P1 choose move)
        if (phase === '1A') {
            setP1Attack(moveOrTarget);
            setMessage(`Use ${moveOrTarget} on who?`);
            setPhase('1B');
        }

        // 1B (P1 choose target)
        else if (phase === '1B') {
            setP1Targets(target);
            setMessage('P2, select your move');
            setPhase('2A');
            setCurrentUser(p2);
        }

        // 2A (P2 choose move)
        else if (phase === '2A') {
            setP2Attack(moveOrTarget);
            setMessage(`Use ${moveOrTarget} on who?`);
            setPhase('2B')
        }

        // 2B (P2 choose target)
        else if (phase === '2B') {
            setP2Targets(target);
            setMessage('P3, select your move');
            setPhase('3A');
            setCurrentUser(p3);
        }

        // 3A (P3 choose move)
        else if (phase === '3A') {
            setP3Attack(moveOrTarget);
            setMessage(`Use ${moveOrTarget} on who?`);
            setPhase('3B');
        }

        // 3B (P3 choose target)
        else if (phase === '3B') {
            setP3Targets(target);
            setMessage('P4, select your move');
            setPhase('4A');
            setCurrentUser(p4);
        }

        // 4A (P4 choose move)
        else if (phase === '4A') {
            setP4Attack(moveOrTarget);
            setMessage(`Use ${moveOrTarget} on who?`);
            setPhase('4B');
        }

        // 4B (P4 choose target)
        else if (phase === '4B') {
            setP4Targets(target);
            setMessage(`${p1.character.name} used ${p1Attack} on ${p1Targets.character.name}!`);
            
            damageValue = getDamage(p1, p1Targets);
            changeHP(p1Targets, damageValue);

            setSubMessage(`${p1Targets.character.name} took ${damageValue} damage`);
            setPhase('ATK1');
        }

        // ATK1 (fastest player attacks)
        else if (phase === 'ATK1') {
            setMessage(`${p2.character.name} used ${p2Attack} on ${p2Targets.character.name}!`);
            
            damageValue = getDamage(p2, p2Targets);
            changeHP(p2Targets, damageValue);

            setSubMessage(`${p2Targets.character.name} took ${damageValue} damage`);
            setPhase('ATK2');
        }

        // ATK2
        else if (phase === 'ATK2') {
            setMessage(`${p3.character.name} used ${p3Attack} on ${p3Targets.character.name}!`);
            
            damageValue = getDamage(p3, p3Targets);
            changeHP(p3Targets, damageValue);

            setSubMessage(`${p3Targets.character.name} took ${damageValue} damage`)
            setPhase('ATK3');
        }

        // ATK3
        else if (phase === 'ATK3') {
            setMessage(`${p4.character.name} used ${p4Attack} on ${p4Targets.character.name}!`);
            
            damageValue = getDamage(p4, p4Targets);
            changeHP(p4Targets, damageValue);

            setSubMessage(`${p4Targets.character.name} took ${damageValue} damage`)
            setPhase('ATK4');
        }

        // ATK 4
        else if (phase === 'ATK4') {
            setMessage(`Everyone regained some mana`);
            setSubMessage('');
            setPhase('ATK5');
            setCurrentUser(p1);
        }

        // ATK 5 (for any conditions, regen mana)
        else if (phase === 'ATK5') {
            setMessage('P1, select your move')
            setPhase('1A');
        }
    }

    return (
        <View style={styles.wholeContainer}>
            <View style={styles.logContainer}>
               <View style={styles.messageContainer}>
                   <Text style={styles.messageText}>{message}</Text>
                   <Text style={styles.subMessageText}>{subMessage}</Text>
               </View>
            </View>

            <View style={styles.sceneContainer}>
                <View style={styles.rowContainer}>
                    <View style={styles.statContainer}>
                        <BSStatBar 
                            offset={true} 
                            player={'P4'} 
                            data={p4}
                            conditions={[]}
                        />
                        <BSStatBar 
                            offset={false} 
                            player={'P3'} 
                            data={p3}
                            conditions={[]}
                        />
                    </View>

                    <View style={[styles.rowContainer, styles.mirrorContainer]}>
                        <Image 
                            source = {{uri: p4.active ? p4.character.animated : p4.character.sprite}}
                            style = {[styles.characterSprite, !p4.active && styles.spriteOff]}
                        />   
                        <Image 
                            source = {{uri: p3.active ? p3.character.animated : p3.character.sprite}}
                            style = {[styles.characterSprite, !p3.active && styles.spriteOff]}
                        />
                    </View>    
                </View>

                <View style={styles.rowContainer}>
                    <Image 
                        source = {{uri: p1.active ? p1.character.animated : p1.character.sprite}}
                        style = {[styles.characterSprite, !p1.active && styles.spriteOff]}
                    />
                    <Image 
                        source = {{uri: p2.active ? p2.character.animated : p2.character.sprite}}
                        style = {[styles.characterSprite, !p2.active && styles.spriteOff]}
                    />    
                    <View style={styles.statContainer}>
                        <BSStatBar 
                            offset={false} 
                            player={'P1'} 
                            data={p1}
                            conditions={[]}
                        />
                        <BSStatBar 
                            offset={true} 
                            player={'P2'} 
                            data={p2}
                            conditions={[]}
                        />  
                    </View>
                </View>

            </View>
            <View style={styles.controlContainer}>
                {phase.charAt(1) === 'A' && <BSMoveMenu currentUser={currentUser} onChoose={changePhase}/>}
                {phase.charAt(1) === 'B' && <BSTargetMenu 
                    currentUser={currentUser} 
                    sprites={[p1.character.sprite,p2.character.sprite,p3.character.sprite,p4.character.sprite]}
                    onChoose={changePhase}
                />}
                {phase.charAt(1) === 'T' && 
                    <TouchableOpacity style={styles.nextButton} onPress={() => changePhase('')}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    rowContainer: {
        flexDirection: 'row'
    },
    mirrorContainer: {
        transform: [{scaleX: -1}]
    },
    logContainer: {
        flex: 1,
        backgroundColor: Colors.accent,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageContainer: {
        backgroundColor: Colors.accentOff,
        width: '95%',
        height: '80%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    messageText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000000',
        textAlign: 'center'
    },
    subMessageText: {
        fontSize: 12,
        color: Colors.bg,
        textAlign: 'center',
        marginTop: 5
    },
    sceneContainer: {
        flex: 3,
        width: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'space-between'
    },
    characterSprite: {
        height: 110,
        width: 110
    },
    spriteOff: {
        opacity: 0.1
    },
    card: {
        padding: 5,
        margin: 5,
        width: 125,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
    statContainer: {
        width: 155
    },
    controlContainer: {
        flex: 2,
        backgroundColor: Colors.primary,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextButton: {
        padding: 5,
        margin: 5,
        width: 125,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.accent,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2
    },
})

export default BSGame;