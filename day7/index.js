import _ from 'lodash';
import assert from 'assert';


const parseLine = (wires) => (text) => {
    const [left, right] = text.split(" -> ");
    wires[right] = left.split(" ");
};

const operations = {
    'AND': (a, b) => a & b,
    'LSHIFT': (a, b) => a << b,
    'OR': (a, b) => a | b,
    'RSHIFT': (a, b) => a >> b
}

function isNumber(value) {
    const num = parseInt(value, 10);
    return !_.isArray(value) && !_.isNaN(num);
}

function resolve (wires) {
    const resolveValue =  _.memoize((value, key) => {
        if (isNumber(key)) {
            return parseInt(key, 10);
        }
        if (value.length === 1 && isNumber(value[0])) {
            return parseInt(value[0], 10);
        }

        let result = null;
        switch (value.length) {
            case 1:
                return resolveValue(wires[value[0]], key);
            case 2:
                return resolveValue(wires[value[1]], value[1]) ^ 65535;
            case 3:
                return operations[value[1]](resolveValue(wires[value[0]], value[0]), resolveValue(wires[value[2]], value[2]));
        }
    });

    return resolveValue(wires['a'], 'a');
}

export default function day7 (input) {
    const lines = input.split("\n");

    let wires = {}
    lines.forEach(parseLine(wires));
    resolve(wires);
    console.log(resolve(wires));

    return [ null, null ];
}
