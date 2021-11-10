import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';

import Colors from './Colors';
import BSCharacters from './BSCharacters';
import BSMoves from './BSMoves';

import BSStatBar from './BSStatBar';
import BSMoveMenu from './BSMoveMenu';
import BSTargetMenu from './BSTargetMenu';
import BSDamage from './BSDamage';
import BSMoveAnimation from './BSMoveAnimation';

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

    const [p1Target, setP1Target] = useState('');
    const [p1Attack, setP1Attack] = useState('');

    const [p2Target, setP2Target] = useState('');
    const [p2Attack, setP2Attack] = useState('');

    const [p3Target, setP3Target] = useState('');
    const [p3Attack, setP3Attack] = useState('');

    const [p4Target, setP4Target] = useState('');
    const [p4Attack, setP4Attack] = useState('');

    const [p1Statuses, setP1Statuses] = useState([]);
    const [p2Statuses, setP2Statuses] = useState([]);
    const [p3Statuses, setP3Statuses] = useState([]);
    const [p4Statuses, setP4Statuses] = useState([]);

    const [p1Damage, setP1Damage] = useState(0);
    const [p2Damage, setP2Damage] = useState(0);
    const [p3Damage, setP3Damage] = useState(0);
    const [p4Damage, setP4Damage] = useState(0);

    const [p1Animation, setP1Animation] = useState('');
    const [p2Animation, setP2Animation] = useState('');
    const [p3Animation, setP3Animation] = useState('');
    const [p4Animation, setP4Animation] = useState('');

    // Resets damage numbers to 0 and animations to blank strings
    const setZeroes = () => {
        setP1Damage(prev => 0);
        setP2Damage(prev => 0);
        setP3Damage(prev => 0);
        setP4Damage(prev => 0);

        setP1Animation(prev => '');
        setP2Animation(prev => '');
        setP3Animation(prev => '');
        setP4Animation(prev => '');
    }

    // Change ATK, negative values imply raising
    const changeATK = (userData, value) => {
        let newValue = 0;

        // Figure out which state function to call
        if (userData.id === 1) {
            setP1(prevState => {
                newValue = prevState.curATK - value;
                if (newValue <= 1) {
                    newValue = 1;
                }
                return {
                    ...prevState,
                    curATK: newValue
                }
            });
        }
        else if (userData.id === 2) {
            setP2(prevState => {
                newValue = prevState.curATK - value;
                if (newValue <= 1) {
                    newValue = 1;
                }
                return {
                    ...prevState,
                    curATK: newValue
                }
            });
        }
        else if (userData.id === 3) {
            setP3(prevState => {
                newValue = prevState.curATK - value;
                if (newValue <= 1) {
                    newValue = 1;
                }
                return {
                    ...prevState,
                    curATK: newValue
                }
            });
        }
        else {
            setP4(prevState => {
                newValue = prevState.curATK - value;
                if (newValue <= 1) {
                    newValue = 1;
                }
                return {
                    ...prevState,
                    curATK: newValue
                }
            });
        }
    }

    // Negative values imply raising
    const changeDEF = (userData, value) => {
        let newValue = 0;

        // Figure out which state function to call
        if (userData.id === 1) {
            setP1(prevState => {
                newValue = prevState.curDEF - value;
                return {
                    ...prevState,
                    curDEF: newValue
                }
            });
        }
        else if (userData.id === 2) {
            setP2(prevState => {
                newValue = prevState.curDEF - value;
                return {
                    ...prevState,
                    curDEF: newValue
                }
            });
        }
        else if (userData.id === 3) {
            setP3(prevState => {
                newValue = prevState.curDEF - value;
                return {
                    ...prevState,
                    curDEF: newValue
                }
            });
        }
        else {
            setP4(prevState => {
                newValue = prevState.curDEF - value;
                return {
                    ...prevState,
                    curDEF: newValue
                }
            });
        }
    }

    // Negative values imply raising
    const changeSPD = (userData, value) => {
        let newValue = 0;

        // Figure out which state function to call
        if (userData.id === 1) {
            setP1(prevState => {
                newValue = prevState.curSPD - value;
                return {
                    ...prevState,
                    curSPD: newValue
                }
            });
        }
        else if (userData.id === 2) {
            setP2(prevState => {
                newValue = prevState.curSPD - value;
                return {
                    ...prevState,
                    curSPD: newValue
                }
            });
        }
        else if (userData.id === 3) {
            setP3(prevState => {
                newValue = prevState.curSPD - value;
                return {
                    ...prevState,
                    curSPD: newValue
                }
            });
        }
        else {
            setP4(prevState => {
                newValue = prevState.curSPD - value;
                return {
                    ...prevState,
                    curSPD: newValue
                }
            });
        }
    }

    // Undo any status effects
    const undoStatus = (userData, status) => {
        let difference = 0;
        if (status === 'atkUp') {
            difference = userData.curATK - userData.character.atk;
            changeATK(userData, difference);
        }
        else if (status === 'defUp') {
            difference = userData.curDEF - userData.character.def;
            changeDEF(userData, difference);
        }
        else if (status === 'spdDown') {
            difference = userData.curSPD - userData.character.spd;
            changeSPD(userData, difference);
        }
    }

    // Lowers count of all statuses in array (except burn and poison)
    const lowerStatuses = (userData) => {
        let newStatuses = {};

        // Figure out which state function to call
        if (userData.id === 1) {
            setP1Statuses(prevState => {
                newStatuses = [...prevState];
                // Decrement
                newStatuses.forEach(status => {
                    if (status.name !== 'burn' && status.name !== 'poison') {
                        status.turns = status.turns-1;

                        if (status.turns === 0) {
                            undoStatus(userData, status.name);
                        }
                    }
                })
                // Remove any cleared statuses
                newStatuses = newStatuses.filter(status => status.turns > 0);
                return newStatuses;
            })
        }
        else if (userData.id === 2) {
            setP2Statuses(prevState => {
                newStatuses = [...prevState];
                // Decrement
                newStatuses.forEach(status => {
                    if (status.name !== 'burn' && status.name !== 'poison') {
                        status.turns = status.turns-1;   
                    }
                })
                // Remove any cleared statuses
                newStatuses = newStatuses.filter(status => status.turns > 0);
                return newStatuses;
            })
        }
        else if (userData.id === 3) {
            setP3Statuses(prevState => {
                newStatuses = [...prevState];
                // Decrement
                newStatuses.forEach(status => {
                    if (status.name !== 'burn' && status.name !== 'poison') {
                        status.turns = status.turns-1;   
                    }
                })
                // Remove any cleared statuses
                newStatuses = newStatuses.filter(status => status.turns > 0);
                return newStatuses;
            })
        }
        else {
            setP4Statuses(prevState => {
                newStatuses = [...prevState];
                // Decrement
                newStatuses.forEach(status => {
                    if (status.name !== 'burn' && status.name !== 'poison') {
                        status.turns = status.turns-1;   
                    }
                })
                // Remove any cleared statuses
                newStatuses = newStatuses.filter(status => status.turns > 0);
                return newStatuses;
            })
        }
    }

    // Lowers count burn and poison statuses
    const lowerDamageStatuses = (userData) => {
        let newStatuses = {};
        let damage = 0;

        // Figure out which state function to call
        if (userData.id === 1) {
            setP1Statuses(prevState => {
                newStatuses = [...prevState];
                // Decrement
                newStatuses.forEach(status => {
                    if (status.name === 'burn') {
                        status.turns = status.turns-1;
                        damage = damage + 2;
                        setSubMessage(prev => prev + ` ${userData.character.name} took 2 ${status.name} damage`);
                    }
                    else if (status.name === 'poison') {
                        status.turns = status.turns-1;
                        damage = damage + 1;
                        setSubMessage(prev => prev + ` ${userData.character.name} took 1 ${status.name} damage`);
                    }
                })
                changeHP(userData, damage);
                // Remove any cleared statuses
                newStatuses = newStatuses.filter(status => status.turns > 0);
                return newStatuses;
            })
        }
        else if (userData.id === 2) {
            setP2Statuses(prevState => {
                newStatuses = [...prevState];
                // Decrement
                newStatuses.forEach(status => {
                    if (status.name === 'burn') {
                        status.turns = status.turns-1;
                        damage = damage + 2;
                        setSubMessage(prev => prev + ` ${userData.character.name} took 2 ${status.name} damage`);
                    }
                    else if (status.name === 'poison') {
                        status.turns = status.turns-1;
                        damage = damage + 1;
                        setSubMessage(prev => prev + ` ${userData.character.name} took 1 ${status.name} damage`);
                    }
                })
                changeHP(userData, damage);
                // Remove any cleared statuses
                newStatuses = newStatuses.filter(status => status.turns > 0);
                return newStatuses;
            })
        }
        else if (userData.id === 3) {
            setP3Statuses(prevState => {
                newStatuses = [...prevState];
                // Decrement
                newStatuses.forEach(status => {
                    if (status.name === 'burn') {
                        status.turns = status.turns-1;
                        damage = damage + 2;
                        setSubMessage(prev => prev + ` ${userData.character.name} took 2 ${status.name} damage`);
                    }
                    else if (status.name === 'poison') {
                        status.turns = status.turns-1;
                        damage = damage + 1;
                        setSubMessage(prev => prev + ` ${userData.character.name} took 1 ${status.name} damage`);
                    }
                })
                changeHP(userData, damage);
                // Remove any cleared statuses
                newStatuses = newStatuses.filter(status => status.turns > 0);
                return newStatuses;
            })
        }
        else {
            setP4Statuses(prevState => {
                newStatuses = [...prevState];
                // Decrement
                newStatuses.forEach(status => {
                    if (status.name === 'burn') {
                        status.turns = status.turns-1;
                        damage = damage + 2;
                        setSubMessage(prev => prev + ` ${userData.character.name} took 2 ${status.name} damage`);
                    }
                    else if (status.name === 'poison') {
                        status.turns = status.turns-1;
                        damage = damage + 1;
                        setSubMessage(prev => prev + ` ${userData.character.name} took 1 ${status.name} damage`);
                    }
                })
                changeHP(userData, damage);
                // Remove any cleared statuses
                newStatuses = newStatuses.filter(status => status.turns > 0);
                return newStatuses;
            })
        }
    }

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

    // Changes the user's current MANA by the value given
    // Negative numbers for value parameter imply regenerating
    const changeMANA = (userData, value) => {
        let newValue = 0;

        // Figure out which state function to call
        if (userData.id === 1) {
            setP1(prevState => {
                newValue = prevState.curMANA - value;
                if (newValue <= 0) {
                    newValue = 0;
                }
                if (newValue > prevState.character.mana) {
                    newValue = prevState.character.mana;
                }
                return {
                    ...prevState,
                    curMANA: newValue
                }
            });
        }
        else if (userData.id === 2) {
            setP2(prevState => {
                newValue = prevState.curMANA - value;
                if (newValue <= 0) {
                    newValue = 0;
                }
                if (newValue > prevState.character.mana) {
                    newValue = prevState.character.mana;
                }
                return {
                    ...prevState,
                    curMANA: newValue
                }
            });
        }
        else if (userData.id === 3) {
            setP3(prevState => {
                newValue = prevState.curMANA - value;
                if (newValue <= 0) {
                    newValue = 0;
                }
                if (newValue > prevState.character.mana) {
                    newValue = prevState.character.mana;
                }
                return {
                    ...prevState,
                    curMANA: newValue
                }
            });
        }
        else {
            setP4(prevState => {
                newValue = prevState.curMANA - value;
                if (newValue <= 0) {
                    newValue = 0;
                }
                if (newValue > prevState.character.mana) {
                    newValue = prevState.character.mana;
                }
                return {
                    ...prevState,
                    curMANA: newValue
                }
            });
        }
    }

    // Changes the user's current HP by the value given
    // Negative numbers for value parameter imply healing
    const changeHP = (userData, value) => {
        let newValue = 0;
        let newIsActive = true;

        // Figure out which state function to call
        if (userData.id === 1) {
            setP1Damage(value);
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
            setP2Damage(value);
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
            setP3Damage(value);
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
                setP4Damage(value);
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

    // ================================================================================
    // ============================= Master Move Function =============================
    // ================================================================================ 
    // Change target's HP, attacker's mana, inflict any statuses
    const useMove = (attackerData, targetData, moveName) => {

        setMessage(`${attackerData.character.name} used ${moveName}!`)
        let damage = 0;

        // Set animation for target
        if (targetData.id === 1) {
            setP1Animation(BSMoves[moveName]);
        }
        else if (targetData.id === 2) {
            setP2Animation(BSMoves[moveName]);
        }
        else if (targetData.id === 3) {
            setP3Animation(BSMoves[moveName]);
        }
        else {
            setP4Animation(BSMoves[moveName]);
        }

        // Handle all basic Attacks
        if (moveName === 'Tackle' || moveName === 'Ember' || moveName === 'Water Gun') {
            damage = getDamage(attackerData, targetData);
            changeHP(targetData, damage);
            setSubMessage(`${targetData.character.name} took ${damage} damage`);
            return;
        }

        // For multi-target attacks
        let foe1 = p3;
        let foe2 = p4;
        let damage2 = 0;

        if (attackerData.id === 3 || attackerData.id === 4) {
            foe1 = p1;
            foe2 = p2;
        }

        // Handle rest of the moves by character
        // ============================== Slime ==============================
        if (attackerData.character.name === 'Slime') {
            // Slime Drench
            if (moveName === 'Slime Drench') {
                setSubMessage(`${foe1.character.name} and ${foe2.character.name} will be slowed for the next 2 turns!`);
                changeMANA(attackerData, attackerData.character.moves[1].manaCost);

                if (foe1.id === 1) {
                    setP1Animation(BSMoves[moveName]);
                    setP2Animation(BSMoves[moveName]);
                    changeSPD(foe1, 6);
                    setP1Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'spdDown') {
                                let newArr = [...prev];
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'spdDown',
                                turns: 2
                            }
                        ]
                    })
                    changeSPD(foe2, 6);
                    setP2Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'spdDown') {
                                let newArr = [...prev];
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'spdDown',
                                turns: 2
                            }
                        ]
                    })
                }
                else {
                    setP3Animation(BSMoves[moveName]);
                    setP4Animation(BSMoves[moveName]);
                    changeSPD(foe1, 6);
                    setP3Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'spdDown') {
                                let newArr = [...prev];
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'spdDown',
                                turns: 2
                            }
                        ]
                    })
                    changeSPD(foe2, 6);
                    setP4Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'spdDown') {
                                let newArr = [...prev];
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'spdDown',
                                turns: 2
                            }
                        ]
                    })
                }
                return;
            }
            // Acid
            else if (moveName === 'Acid') {
                damage = getDamage(attackerData, foe1);
                changeHP(foe1, damage);

                damage2 = getDamage(attackerData, foe2);
                changeHP(foe2, damage2);

                if (foe1.id === 1) {
                    setP1Animation(BSMoves[moveName]);
                    setP2Animation(BSMoves[moveName]);
                }
                else {
                    setP3Animation(BSMoves[moveName]);
                    setP4Animation(BSMoves[moveName]);
                }

                setSubMessage(`${foe1.character.name} took ${damage} damage, ${foe2.character.name} took ${damage2} damage`)
                changeMANA(attackerData, attackerData.character.moves[2].manaCost);
                return;
            }
            // ULT: Toxic Acid
            else {
                damage = getDamage(attackerData, foe1);
                changeHP(foe1, damage);

                damage2 = getDamage(attackerData, foe2);
                changeHP(foe2, damage2);

                if (foe1.id === 1) {
                    setP1Animation(BSMoves[moveName]);
                    setP2Animation(BSMoves[moveName]);
                }
                else {
                    setP3Animation(BSMoves[moveName]);
                    setP4Animation(BSMoves[moveName]);
                }

                setSubMessage(`${foe1.character.name} took ${damage} damage, ${foe2.character.name} took ${damage2} damage. Both were poisoned`)
                changeMANA(attackerData, attackerData.character.moves[3].manaCost);

                if (foe1.id === 1) {
                    setP1Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'poison') {
                                let newArr = [...prev];
                                newArr[i].turns = 3;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'poison',
                                turns: 3
                            }
                        ]
                    })
                    setP2Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'poison') {
                                let newArr = [...prev];
                                newArr[i].turns = 3;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'poison',
                                turns: 3
                            }
                        ]
                    })
                }
                else {
                    setP3Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'poison') {
                                let newArr = [...prev];
                                newArr[i].turns = 3;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'poison',
                                turns: 3
                            }
                        ]
                    })
                    setP4Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'poison') {
                                let newArr = [...prev];
                                newArr[i].turns = 3;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'poison',
                                turns: 3
                            }
                        ]
                    })
                }
                return;
            }
        }
        // ============================== Fire Slime ==============================
        else if (attackerData.character.name === 'Fire Slime') {
            // Lava Snipe
            if (moveName === 'Lava Snipe') {
                damage = getDamage(attackerData, {curDEF: 0});
                changeHP(targetData, damage);

                setSubMessage(`${targetData.character.name} took ${damage} damage`);

                // Determine 40% burn chance
                if (Math.floor(Math.random()*10) < 4) {
                    setSubMessage(prev => prev + ` and was burned`);

                    if (targetData.id === 1) {
                        setP1Statuses(prev => {
                            for (let i = 0; i < prev.length; i++) {
                                if (prev[i].name === 'burn') {
                                    let newArr = [...prev];
                                    newArr[i].turns = 2;
                                    return newArr;
                                }
                            }
                            return [
                                ...prev,
                                {
                                    name: 'burn',
                                    turns: 2
                                }
                            ]
                        })
                    }
                    else if (targetData.id === 2) {
                        setP2Statuses(prev => {
                            for (let i = 0; i < prev.length; i++) {
                                if (prev[i].name === 'burn') {
                                    let newArr = [...prev];
                                    newArr[i].turns = 2;
                                    return newArr;
                                }
                            }
                            return [
                                ...prev,
                                {
                                    name: 'burn',
                                    turns: 2
                                }
                            ]
                        })
                    }
                    else if (targetData.id === 3) {
                        setP3Statuses(prev => {
                            for (let i = 0; i < prev.length; i++) {
                                if (prev[i].name === 'burn') {
                                    let newArr = [...prev];
                                    newArr[i].turns = 2;
                                    return newArr;
                                }
                            }
                            return [
                                ...prev,
                                {
                                    name: 'burn',
                                    turns: 2
                                }
                            ]
                        })
                    }
                    else {
                        setP4Statuses(prev => {
                            for (let i = 0; i < prev.length; i++) {
                                if (prev[i].name === 'burn') {
                                    let newArr = [...prev];
                                    newArr[i].turns = 2;
                                    return newArr;
                                }
                            }
                            return [
                                ...prev,
                                {
                                    name: 'burn',
                                    turns: 2
                                }
                            ]
                        })
                    }
                }

                changeMANA(attackerData, attackerData.character.moves[1].manaCost);
                return;
            }
            // Heat Up
            else if (moveName === 'Heat Up') {
                setSubMessage(`${attackerData.character.name}'s Attack increases for the next turn`);
                changeATK(attackerData, -3);

                if (attackerData.id === 1) {
                    setP1Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'atkUp') {
                                let newArr = [...prev];
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'atkUp',
                                turns: 2
                            }
                        ]
                    })
                }
                else if (attackerData.id === 2) {
                    setP2Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'atkUp') {
                                let newArr = [...prev];
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'atkUp',
                                turns: 2
                            }
                        ]
                    })
                }
                else if (attackerData.id === 3) {
                    setP3Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'atkUp') {
                                let newArr = [...prev];
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'atkUp',
                                turns: 2
                            }
                        ]
                    })
                }
                else {
                    setP4Statuses(prev => {
                        for (let i = 0; i < prev.length; i++) {
                            if (prev[i].name === 'atkUp') {
                                let newArr = [...prev];
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }
                        return [
                            ...prev,
                            {
                                name: 'atkUp',
                                turns: 2
                            }
                        ]
                    })
                }

                changeMANA(attackerData, attackerData.character.moves[2].manaCost);
                return;
            }
            // ULT: Eruption
            else {
                damage = getDamage(attackerData, foe1);
                changeHP(foe1, damage);

                damage2 = getDamage(attackerData, foe2);
                changeHP(foe2, damage2);

                setSubMessage(`${foe1.character.name} took ${damage} damage, ${foe2.character.name} took ${damage2} damage`)
                
                // Determine 70% burn chance
                if (Math.floor(Math.random()*10) < 7) {
                    setSubMessage(prev => prev + `. Both were burned`);
                    if (foe1.id === 1) {
                        setP1Animation(BSMoves[moveName]);
                        setP2Animation(BSMoves[moveName]);
                        setP1Statuses(prev => {
                            for (let i = 0; i < prev.length; i++) {
                                if (prev[i].name === 'burn') {
                                    let newArr = [...prev];
                                    newArr[i].turns = 2;
                                    return newArr;
                                }
                            }
                            return [
                                ...prev,
                                {
                                    name: 'burn',
                                    turns: 2
                                }
                            ]
                        })
                        setP2Statuses(prev => {
                            for (let i = 0; i < prev.length; i++) {
                                if (prev[i].name === 'burn') {
                                    let newArr = [...prev];
                                    newArr[i].turns = 2;
                                    return newArr;
                                }
                            }
                            return [
                                ...prev,
                                {
                                    name: 'burn',
                                    turns: 2
                                }
                            ]
                        })
                    }
                    else {
                        setP3Animation(BSMoves[moveName]);
                        setP4Animation(BSMoves[moveName]);
                        setP3Statuses(prev => {
                            for (let i = 0; i < prev.length; i++) {
                                if (prev[i].name === 'burn') {
                                    let newArr = [...prev];
                                    newArr[i].turns = 2;
                                    return newArr;
                                }
                            }
                            return [
                                ...prev,
                                {
                                    name: 'burn',
                                    turns: 2
                                }
                            ]
                        })
                        setP4Statuses(prev => {
                            for (let i = 0; i < prev.length; i++) {
                                if (prev[i].name === 'burn') {
                                    let newArr = [...prev];
                                    newArr[i].turns = 2;
                                    return newArr;
                                }
                            }
                            return [
                                ...prev,
                                {
                                    name: 'burn',
                                    turns: 2
                                }
                            ]
                        })
                    }
                }
                changeMANA(attackerData, attackerData.character.moves[3].manaCost);
                return;
            }
        }
        // ============================== Water Slime ==============================
        else if (attackerData.character.name === 'Water Slime') {
            // Healing Rain
            if (moveName === 'Healing Rain') {
                if (targetData.id === 1) {
                    setP1Animation(BSMoves['Heal']);
                }
                else if (targetData.id === 2) {
                    setP2Animation(BSMoves['Heal']);
                }
                else if (targetData.id === 3) {
                    setP3Animation(BSMoves['Heal']);
                }
                else {
                    setP4Animation(BSMoves['Heal']);
                }
                changeHP(targetData, -5);

                setSubMessage(`${targetData.character.name} healed 5 HP`);
                changeMANA(attackerData, attackerData.character.moves[1].manaCost);
                return;
            }
            // Purifying Pulse
            else if (moveName === 'Purifying Pulse') {
                setSubMessage(`${attackerData.character.name} and ally's Defense increases for 2 turns, any ailments were healed.`)
                if (foe1 === p3) {
                    setP1Animation(BSMoves[moveName]);
                    setP2Animation(BSMoves[moveName]);
                    changeDEF(p1, -1);
                    setP1Statuses(prev => {
                        let newArr = [...prev];
                        newArr = newArr.filter(status => status.name !== 'burn' && status.name !== 'poison');

                        for (let i = 0; i < newArr.length; i++) {
                            if (newArr[i].name === 'defUp') {
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }

                        newArr.push({name: 'defUp', turns: 2});

                        return newArr
                    })
                    changeDEF(p2, -1);
                    setP2Statuses(prev => {
                        let newArr = [...prev];
                        newArr = newArr.filter(status => status.name !== 'burn' && status.name !== 'poison');

                        for (let i = 0; i < newArr.length; i++) {
                            if (newArr[i].name === 'defUp') {
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }

                        newArr.push({name: 'defUp', turns: 2});

                        return newArr
                    })
                }
                else {
                    setP3Animation(BSMoves[moveName]);
                    setP4Animation(BSMoves[moveName]);
                    changeDEF(p3, -1);
                    setP3Statuses(prev => {
                        let newArr = [...prev];
                        newArr = newArr.filter(status => status.name !== 'burn' && status.name !== 'poison');

                        for (let i = 0; i < newArr.length; i++) {
                            if (newArr[i].name === 'defUp') {
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }

                        newArr.push({name: 'defUp', turns: 2});

                        return newArr
                    })
                    changeDEF(p4, -1);
                    setP4Statuses(prev => {
                        let newArr = [...prev];
                        newArr = newArr.filter(status => status.name !== 'burn' && status.name !== 'poison');

                        for (let i = 0; i < newArr.length; i++) {
                            if (newArr[i].name === 'defUp') {
                                newArr[i].turns = 2;
                                return newArr;
                            }
                        }

                        newArr.push({name: 'defUp', turns: 2});

                        return newArr
                    })
                }
                changeMANA(attackerData, attackerData.character.moves[2].manaCost);
                return;
            }
            // ULT: Water Surge
            else {
                let ally1 = p1;
                let ally2 = p2;

                if (attackerData.id === 3 || attackerData.id === 4) {
                    setP3Animation(BSMoves['Heal']);
                    setP4Animation(BSMoves['Heal']);
                    ally1 = p3;
                    ally2 = p4;
                }
                else {
                    setP1Animation(BSMoves['Heal']);
                    setP2Animation(BSMoves['Heal']);
                }

                damage = getDamage(attackerData, foe1);
                changeHP(foe1, damage);

                damage2 = getDamage(attackerData, foe2);
                changeHP(foe2, damage2);

                changeHP(ally1, -3);
                changeHP(ally2, -3);

                setSubMessage(`${foe1.character.name} took ${damage} damage, ${foe2.character.name} took ${damage2} damage, 
                    ${ally1.character.name} and ${ally2.character.name} healed 3 HP`);
                changeMANA(attackerData, attackerData.character.moves[3].manaCost);
                return;
            }
        }
    }

    // Goes back one phase. To only be used in target selection phase
    const goBackPhase = () => {
        if (phase === '1B') {
            setMessage('P1, select your move');
            setPhase('1A');
        }
        else if (phase === '2B') {
            setMessage('P2, select your move');
            setPhase('2A');
        }
        else if (phase === '3B') {
            setMessage('P3, select your move');
            setPhase('3A');
        }
        else if (phase === '4B') {
            setMessage('P4, select your move');
            setPhase('4A');
        }
    }

    // ============================================================================
    // =============================== GAME PHASES ================================
    // ============================================================================
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
            setP1Target(target);
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
            setP2Target(target);
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
            setP3Target(target);
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
            setP4Target(target);

            useMove(p1, p1Target, p1Attack)

            setPhase('ATK1');
        }

        // ATK1 (fastest player attacks)
        else if (phase === 'ATK1') {
            setZeroes();
            if (p1Statuses.length > 0) {
                lowerStatuses(p1);
            };
            useMove(p2, p2Target, p2Attack);
            setPhase('ATK2');
        }

        // ATK2
        else if (phase === 'ATK2') {
            setZeroes();
            if (p2Statuses.length > 0) {
                lowerStatuses(p2);
            };
            useMove(p3, p3Target, p3Attack);

            setPhase('ATK3');
        }

        // ATK3
        else if (phase === 'ATK3') {
            setZeroes();
            if (p3Statuses.length > 0) {
                lowerStatuses(p3);
            };
            useMove(p4, p4Target, p4Attack);

            setPhase('ATK4');
        }

        // ATK 4
        else if (phase === 'ATK4') {
            setZeroes();
            setSubMessage(prev => {return ''});
            if (p4Statuses.length > 0) {
                lowerStatuses(p4);
            };

            setMessage(`Everyone regained some mana`);
            if (p1.active) {
                changeMANA(p1, -2);
            }
            if (p2.active) {
                changeMANA(p2, -2);
            }
            if (p3.active) {
                changeMANA(p3, -2);
            }
            if (p4.active) {
                changeMANA(p4, -2);
            }

            // Lower any burns or poisons
            if (p1Statuses.length > 0) {
                lowerDamageStatuses(p1);
            }
            if (p2Statuses.length > 0) {
                lowerDamageStatuses(p2);
            }
            if (p3Statuses.length > 0) {
                lowerDamageStatuses(p3);
            }
            if (p4Statuses.length > 0) {
                lowerDamageStatuses(p4);
            }
            setPhase('ATK5');    
        }

        // ATK 5 (for any conditions, regen mana)
        else if (phase === 'ATK5') {
            setZeroes();
            setSubMessage('');
            setMessage('P1, select your move')
            setPhase('1A');
            setCurrentUser(p1);
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
                            conditions={p4Statuses}
                        />
                        <BSStatBar 
                            offset={false} 
                            player={'P3'} 
                            data={p3}
                            conditions={p3Statuses}
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
                            conditions={p1Statuses}
                        />
                        <BSStatBar 
                            offset={true} 
                            player={'P2'} 
                            data={p2}
                            conditions={p2Statuses}
                        />  
                    </View>
                </View>

                {p4Animation !== '' && <BSMoveAnimation img={p4Animation} style={{right: 0}}/>}
                {p4Damage !== 0 && <BSDamage damage={p4Damage} style={{top: 90, right: 70}}/>}
                {p3Animation !== '' && <BSMoveAnimation img={p3Animation} style={{right: 110}}/>}
                {p3Damage !== 0 && <BSDamage damage={p3Damage} style={{top: 90, right: 190}}/>}
                
                {p1Animation !== '' && <BSMoveAnimation img={p1Animation} style={{left: 0, bottom: 20}}/>}
                {p1Damage !== 0 && <BSDamage damage={p1Damage} style={{bottom: 120, left: 70}}/>}
                {p2Animation !== '' && <BSMoveAnimation img={p2Animation} style={{left: 110, bottom: 20}}/>}
                {p2Damage !== 0 && <BSDamage damage={p2Damage} style={{bottom: 120, left: 190}}/>}
                
            </View>
            <View style={styles.controlContainer}>
                {phase.charAt(1) === 'A' && <BSMoveMenu currentUser={currentUser} onChoose={changePhase}/>}
                {phase.charAt(1) === 'B' && <BSTargetMenu 
                    currentUser={currentUser}
                    attacks={[p1Attack, p2Attack, p3Attack, p4Attack]}
                    sprites={[p1.character.sprite,p2.character.sprite,p3.character.sprite,p4.character.sprite]}
                    onChoose={changePhase}
                    onBack={goBackPhase}
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
    }
})

export default BSGame;