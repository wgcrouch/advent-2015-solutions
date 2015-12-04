const MOVES = {
    '(': 1,
    ')': -1
}

export default function day1 (input) {
    const moves = input.split('');

    let basement = null;

    var result = moves.reduce((floor, move, index) => {
        const next = floor + (MOVES[move] || 0);
        if (!basement && next === -1) {
            basement = index + 1;
        }
        return next;
    }, 0);

    return [result, basement];
}
