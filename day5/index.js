import part1 from './part1';
import part2 from './part2';

export default function day5 (input) {
    const lines = input.split("\n");
    return [ part1(lines), part2(lines) ];
}
