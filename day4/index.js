import crypto from 'crypto';

const makeHash = (input, number) => crypto.createHash('md5').update(`${input}${number}`).digest('hex');
const isAdventCoin = (hash, criteria) => !!hash.match(criteria);

export default function day4 (input) {
    let number1 = 0;
    let number2 = 0;

    do {
        number1 ++;
    } while (!isAdventCoin(makeHash(input, number1), /^00000.*/));

    do {
        number2 ++;
    } while (!isAdventCoin(makeHash(input, number2), /^000000.*/));

    return [ number1, number2 ];
}
