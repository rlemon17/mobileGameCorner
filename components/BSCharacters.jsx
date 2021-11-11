export default {
    random: {
        name: 'Random',
        sprite: 'http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/ef680c30a573972.png',
        animated: 'http://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/ef680c30a573972.png',
        hp: 0,
        atk: 0,
        def: 0,
        spd: 0,
        mana: 0,
        moves: [
            {
                name: '?',
                manaCost: 0,
                desc: '?'
            },
            {
                name: '?',
                manaCost: 0,
                desc: '?'
            },
            {
                name: '?',
                manaCost: 0,
                desc: '?'
            },
            {
                name: '?',
                manaCost: 0,
                desc: '?'
            },
        ]
    },
    slime: {
        name: 'Slime',
        sprite: 'https://art.pixilart.com/25c3a5ea799affd.png',
        animated: 'https://art.pixilart.com/25c3a5ea799affd.gif',
        hp: 50,
        atk: 8,
        def: 2,
        spd: 10,
        mana: 15,
        moves: [
            {
                name: 'Tackle',
                manaCost: 0,
                desc: 'Single-target, damaging attack'
            },
            {
                name: 'Slime Drench',
                manaCost: 7,
                desc: 'Covers both targets in slime, lowering their Speed by 6 for 2 turns'
            },
            {
                name: 'Acid',
                manaCost: 5,
                desc: 'Multi-target, damaging attack.'
            },
            {
                name: 'ULT: Toxic Acid',
                manaCost: 10,
                desc: 'Multi-target, damaging attack. Also inflicts poison on both opponents.'
            },
        ]
    },
    fireSlime: {
        name: 'Fire Slime',
        sprite: 'https://art.pixilart.com/cb68e616ccb9327.png',
        animated: 'https://art.pixilart.com/cb68e616ccb9327.gif',
        hp: 40,
        atk: 10,
        def: 1,
        spd: 15,
        mana: 12,
        moves: [
            {
                name: 'Ember',
                manaCost: 0,
                desc: 'Single-target, basic attack'
            },
            {
                name: 'Lava Snipe',
                manaCost: 6,
                desc: 'Single-target attack that pierces defense. 40% chance of inflicting burn.'
            },
            {
                name: 'Heat Up',
                manaCost: 4,
                desc: 'Raises own Attack by 3 for the next turn.'
            },
            {
                name: 'ULT: Eruption',
                manaCost: 6,
                desc: 'Multi-target attack. 70% of inflicting burn on opponents.'
            },
        ]
    },
    waterSlime: {
        name: 'Water Slime',
        sprite: 'https://art.pixilart.com/10696e5ca60470f.png',
        animated: 'https://art.pixilart.com/10696e5ca60470f.gif',
        hp: 60,
        atk: 6,
        def: 4,
        spd: 5,
        mana: 20,
        moves: [
            {
                name: 'Water Gun',
                manaCost: 0,
                desc: 'Single-target, basic attack'
            },
            {
                name: 'Healing Rain',
                manaCost: 5,
                desc: 'Heals target by 5 HP.'
            },
            {
                name: 'Purifying Pulse',
                manaCost: 10,
                desc: 'Boost all allies Defense by 1 for 3 turns, cures all ailments.'
            },
            {
                name: 'ULT: Water Surge',
                manaCost: 10,
                desc: 'Multi-target attack. Also heals all allies by 3 HP.'
            },
        ]
    }
}