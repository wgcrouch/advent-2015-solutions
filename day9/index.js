
function buildGraph(lines) {
    const edges = lines.map((line) => {
        const [ edge, dist ] = line.split(" = ");
        const [ left, right ] = edge.split(" to ");
        return [left, right, dist];
    });
    console.log(edges);
}

export default function day9 (input) {
    const lines = input.split("\n");
    buildGraph(lines);
}
