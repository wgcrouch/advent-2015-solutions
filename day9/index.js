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
        const [ edge, dist ] = line.split(" = ");
        const [ left, right ] = edge.split(" to ");
        if (!graph[left]) {
            graph[left] = {};
        }
        if (!graph[right]) {
            graph[right] = {};
        }
        const intDist = parseInt(dist, 10);
        graph[left][right] = intDist;
        graph[right][left] = intDist;
    });
    return graph;
}

function distance (graph, path) {
    let dist = 0;
    for (let i = 0; i < (path.length - 1); i ++) {
        dist = dist + graph[path[i]][path[i+1]];
    }
    return dist;
}



export default function day9 (input) {
    const lines = input.split("\n");

    const graph = buildGraph(lines);
    const cities = Object.keys(graph);
    const options = permutator(cities);

    let first = distance(graph, options[0]);
    let min = first;
    let max = first;
    for (let i = 1; i < options.length; i++) {
        let dist = distance(graph, options[i]);
        if (dist < min) {
            min = dist;
        }

        if (dist > max) {
            max = dist;
        }
    }

    return [ min, max ];
}
