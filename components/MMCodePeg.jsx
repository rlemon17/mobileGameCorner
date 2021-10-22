import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption, renderers } from 'react-native-popup-menu';

import Colors from './Colors';

const { Popover } = renderers;

const MMCodePeg = (props) => {

    return (
        <Menu 
            onSelect={(value) => {
                props.onSelect(props.id, value);
            }} 
            renderer={Popover}
        >
            <MenuTrigger 
                customStyles={{
                    TriggerTouchableComponent: TouchableOpacity,
                    triggerWrapper: [styles.codePeg,
                        props.num === 1 && styles.one,
                        props.num === 2 && styles.two,
                        props.num === 3 && styles.three,
                        props.num === 4 && styles.four,
                        props.num === 5 && styles.five,
                        props.num === 6 && styles.six,
                    ]
                }}
            />
            <MenuOptions>
                <MenuOption value={1}
                    customStyles={{
                        OptionTouchableComponent: TouchableOpacity,
                        optionWrapper: [styles.codePeg, styles.one]
                    }}
                />
                <MenuOption value={2}
                    customStyles={{
                        OptionTouchableComponent: TouchableOpacity,
                        optionWrapper: [styles.codePeg, styles.two]
                    }}
                />
                <MenuOption value={3}
                    customStyles={{
                        OptionTouchableComponent: TouchableOpacity,
                        optionWrapper: [styles.codePeg, styles.three]
                    }}
                />
                <MenuOption value={4}
                    customStyles={{
                        OptionTouchableComponent: TouchableOpacity,
                        optionWrapper: [styles.codePeg, styles.four]
                    }}
                />
                <MenuOption value={5}
                    customStyles={{
                        OptionTouchableComponent: TouchableOpacity,
                        optionWrapper: [styles.codePeg, styles.five]
                    }}
                />
                <MenuOption value={6}
                    customStyles={{
                        OptionTouchableComponent: TouchableOpacity,
                        optionWrapper: [styles.codePeg, styles.six]
                    }}
                />
            </MenuOptions>
        </Menu>
    );
}


const styles = StyleSheet.create({
    codePeg: {
        width: 45,
        height: 45,
        borderRadius: 25,
        margin: 4,
        backgroundColor: '#dedede',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2,  
    },
    one: {
        backgroundColor: '#D22B2B'
    },
    two: {
        backgroundColor: '#F08000'
    },
    three: {
        backgroundColor: '#FFEA00'
    },
    four: {
        backgroundColor: '#009E60'
    },
    five: {
        backgroundColor: '#0096FF'
    },
    six: {
        backgroundColor: '#5D3FD3'
    }
})

export default MMCodePeg;