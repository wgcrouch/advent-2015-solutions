import _ from 'lodash';

function permutator(inputArr) {
  let results = [];

  function permute(arr, memo) {
    let cur, memo2 = memo || [];

    for (let i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo2.concat(cur));
      }
      permute(arr.slice(), memo2.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

function buildGraph(lines) {
    const graph = {};
    lines.forEach((line) => {
        const [ part, right ] = line.replace('.', '').split(" happiness units by sitting next to ");
        let [ left, dist ] = part.split(" would ");
        dist = dist.replace('gain ', '').replace('lose ', '-');
        if (!graph[left]) {
            graph[left] = {};
        }
        if (!graph[right]) {
            graph[right] = {};
        }
        const intDist = parseInt(dist, 10);
        graph[left][right] = intDist;
    });
    return graph;
}

function happiness (graph, path) {
    let dist = 0;
    for (let i = 0; i < (path.length - 1); i ++) {
        dist = dist + graph[path[i]][path[i+1]];
        dist = dist + graph[path[i+1]][path[i]];
    }
    dist = dist + graph[path[0]][path[path.length - 1]];
    dist = dist + graph[path[path.length - 1]][path[0]];
    return dist;
}

function bestHappiness (graph) {
    const people = Object.keys(graph);
    const options = permutator(people);
    // console.log(graph);
    // console.log(options[0]);

    // console.log(happiness(graph, options[0]));
    let first = happiness(graph, options[0]);
    let min = first;
    let maxI = 0;
    let max = first;
    let minI = 0;
    for (let i = 1; i < options.length; i++) {
        let dist = happiness(graph, options[i]);
        if (dist < min) {
            min = dist;
            minI = i;
        }

        if (dist > max) {
            max = dist;
            maxI = i;
        }
    }

    return max;
}

function addMeTo (graph) {
    _.forEach(graph, (value, key) => {
        graph[key].me = 0;
    });
    graph.me = _.zipObject(Object.keys(graph).map((name) => [name, 0]));

    return graph;
}

export default function day13 (input) {
    const lines = input.split("\n");

    const graph = buildGraph(lines);
    const part1 = bestHappiness(graph);
    addMeTo(graph);

    const part2 = bestHappiness(graph);


    return [ part1, part2 ];
}
