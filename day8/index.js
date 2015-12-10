function getCounts(line) {
    const code = line.length;
    const memory = eval(line).length;
    const encoded = JSON.stringify(line).length;
    return [ code, memory, encoded ];
}

export default function day8 (input) {
    const lines = input.split("\n");

    const part1 = lines.map(getCounts).reduce((total, [code, memory]) => total + code - memory , 0);
    const part2 = lines.map(getCounts).reduce((total, [code, _, encoded]) => total + encoded - code , 0);
    return [ part1, part2 ];
}
