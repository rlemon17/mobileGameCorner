import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Title, Card } from 'react-native-paper';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

import Colors from './Colors';
import BSCharacters from './BSCharacters';
import BSCharSelectBox from './BSCharSelectBox';
import BSCharSelectCard from './BSCharSelectCard';
import BSCharSelectMoveBox from './BSCharSelectMoveBox';

const BSCharSelect = (props) => {

    const [playerSelecting, setPlayerSelecting] = useState(1);
    const [currentlySelected, setCurrentlySelected] = useState(BSCharacters.random);
    const [p1Character, setP1Character] = useState(BSCharacters.random);
    const [p2Character, setP2Character] = useState(BSCharacters.random);
    const [p3Character, setP3Character] = useState(BSCharacters.random);
    const [p4Character, setP4Character] = useState(BSCharacters.random);

    const humanPlayers = props.humanPlayers;

    const nextPlayer = () => {
        if (playerSelecting === 1) {
            setCurrentlySelected(p2Character);
        }
        else if (playerSelecting === 2) {
            setCurrentlySelected(p3Character);
        }
        else if (playerSelecting === 3) {
            setCurrentlySelected(p4Character);
        }
        else {
            props.onStart([p1Character, p2Character, p3Character, p4Character]);
            return;
        }
        setPlayerSelecting(prev => prev+1);
    }

    const lastPlayer = () => {
        if (playerSelecting === 1) {
            props.onBack();
            return;
        }
        else if (playerSelecting === 2) {
            setCurrentlySelected(p1Character);
        }
        else if (playerSelecting === 3) {
            setCurrentlySelected(p2Character);
        }
        else {
            setCurrentlySelected(p3Character);
        }
        setPlayerSelecting(prev => prev-1);
    }

    const handleCardSelect = (characterSelected) => {
        setCurrentlySelected(characterSelected);
        if (playerSelecting === 1) {
            setP1Character(characterSelected);
        }
        else if (playerSelecting === 2) {
            setP2Character(characterSelected);
        }
        else if (playerSelecting === 3) {
            setP3Character(characterSelected);
        }
        else {
            setP4Character(characterSelected);
        }
    }

    return (
        <View style={styles.wholeContainer}>
            <View style={styles.sceneContainer}>
                <BSCharSelectBox sprite={p1Character.sprite}/>
                <BSCharSelectBox sprite={p2Character.sprite}/>
                <Text style={styles.sceneText}>VS</Text>
                <BSCharSelectBox sprite={p3Character.sprite} style={2}/>
                <BSCharSelectBox sprite={p4Character.sprite} style={2}/>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.subRowContainer}>
                    <View style={styles.statsSubContainer1}>
                        <Text style={styles.statNameText}>{currentlySelected.name}</Text>
                        <Image 
                            source = {{uri: currentlySelected.animated}}
                            style = {styles.statImg}
                        />
                        <View style={styles.subRowContainer}>
                            <View style={styles.statText}>
                                <Text>HP:</Text>
                                <Text>Attack:</Text>
                                <Text>Defense:</Text>
                                <Text>Speed:</Text>  
                                <Text>Mana:</Text>  
                            </View>
                            <View style={styles.statText}>
                                <Text>{currentlySelected.hp}</Text>
                                <Text>{currentlySelected.atk}</Text>
                                <Text>{currentlySelected.def}</Text>
                                <Text>{currentlySelected.spd}</Text>  
                                <Text>{currentlySelected.mana}</Text>  
                            </View>
                            <View style={styles.statBars}>
                                <View style={{backgroundColor: '#ff1f57', minWidth: 10, width: (((currentlySelected.hp-30)*0.2)*10), minHeight: 17}} />
                                <View style={{backgroundColor: '#ff8800', minWidth: 10, width: (((currentlySelected.atk-5)*1.14)*10), minHeight: 17}} />
                                <View style={{backgroundColor: '#00cf45', minWidth: 10, width: (((currentlySelected.def*1.3)+1)*10), minHeight: 17}} />
                                <View style={{backgroundColor: '#fa69ff', minWidth: 10, width: ((currentlySelected.spd*0.4)*10), minHeight: 17}} />
                                <View style={{backgroundColor: '#009dff', minWidth: 10, width: (((currentlySelected.mana-10)*0.8)*10), minHeight: 17}} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.statsSubContainer2}>
                        <BSCharSelectMoveBox move={currentlySelected.moves[0]}/>
                        <BSCharSelectMoveBox move={currentlySelected.moves[1]}/>
                        <BSCharSelectMoveBox move={currentlySelected.moves[2]}/>
                        <BSCharSelectMoveBox move={currentlySelected.moves[3]}/>
                    </View>
                </View>
            </View>

            <View style={styles.selectContainer}>
                <View style={styles.subRowContainer}>
                    <BSCharSelectCard onSelect={handleCardSelect} character={BSCharacters.random} selected={currentlySelected}/>
                    <BSCharSelectCard onSelect={handleCardSelect} character={BSCharacters.slime} selected={currentlySelected}/>
                    <BSCharSelectCard onSelect={handleCardSelect} character={BSCharacters.fireSlime} selected={currentlySelected}/>
                    <BSCharSelectCard onSelect={handleCardSelect} character={BSCharacters.waterSlime} selected={currentlySelected}/>
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <Text style={styles.settingsText}>Player {playerSelecting}, choose your character</Text>
                <View style={styles.settingsRow}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={lastPlayer}
                    >
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={nextPlayer}
                    >
                        <Text>{playerSelecting === 4 ? 'Start!' : 'Next'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wholeContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: Colors.bg
    },
    sceneContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    sceneText: {
        color: Colors.bgOff,
        fontSize: 20,
        fontWeight: 'bold'
    },
    statsContainer: {
        flex: 2,
        backgroundColor: Colors.primaryOff
    },
    statNameText: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10
    },
    statImg: {
        width: 100,
        height: 100,
        marginBottom: 10
    },
    statText: {
        alignItems: 'flex-end',
        minWidth: 25
    },
    statBars: {
        alignItems: 'flex-start',
        marginLeft: 10,
        minWidth: 80
    },
    statsSubContainer1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    statsSubContainer2: {
        flex: 1,
        backgroundColor: Colors.primaryOff
    },
    selectContainer: {
        flex: 2,
        backgroundColor: Colors.primary
    },
    subRowContainer: {
        flexDirection: 'row'
    },
    buttonsContainer: {
        flex: 1,
        alignItems: 'center'
    },
    settingsRow: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    settingsText: {
        color: Colors.accentOff,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 15
    },
    button: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        marginHorizontal: 40,
        minWidth: 100,
        textAlign: "center",
        alignItems: 'center'
    }
})

export default BSCharSelect;