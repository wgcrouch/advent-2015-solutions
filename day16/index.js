import _ from 'lodash';

const realSue = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
};

function possibleMatch (parts) {
    let count = 0;
    for (let i = 0; i < parts.length; i++) {
        const [name, value] = parts[i];
        if (realSue[name] === parseInt(value, 10)) {
            count ++;
        } else {
            return 0;
        }
    }
    return count;
}

function possibleMatchRange (parts) {
    let count = 0;
    for (let i = 0; i < parts.length; i++) {
        const [name, value] = parts[i];
        if (name === 'cats' || name === 'trees') {
            if (realSue[name] < parseInt(value, 10)) {
                count ++;
            } else {
                return 0;
            }
        } else if (name == 'pomeranians' || name === 'goldfish') {
            if (realSue[name] > parseInt(value, 10)) {
                count ++;
            } else {
                return 0;
            }
        } else {
            if (realSue[name] === parseInt(value, 10)) {
                count ++;
            } else {
                return 0;
            }
        }
    }
    return count;
}

const parseInput = (matcher) => (line) => {
    const [ match, sue, partsString ] = line.match(/Sue (\d+): (.*)/);
    const parts = partsString.split(", ").map((part) => part.split(': '));
    return {
        number: parseInt(sue, 10),
        parts,
        matchScore: matcher(parts)
    }
}


export default function day16 (input) {
    const lines = input.split("\n");
    const exactParser = parseInput(possibleMatch);
    const rangeParser = parseInput(possibleMatchRange);

    const sues = input.split("\n").map(exactParser);
    const sues2 = input.split("\n").map(rangeParser);
    //console.log(sues);

    const winner1 = _.max(sues, (sue) => sue.matchScore);
    const winner2 = _.max(sues2, (sue) => sue.matchScore);
    return [ winner1.number, winner2.number ];
}
