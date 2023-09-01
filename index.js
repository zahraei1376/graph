import { GraphWithAdjacencyList, GraphWithAdjacencyList2 } from "./component/GraphWithAdjacencyList";

const directed = false;
const nodes = [0, 1, 2, 3, 4, 5];
const edges = [
    {
        node1: 0,
        node2: 1,
    },
    {
        node1: 0,
        node2: 2,
    },
    {
        node1: 0,
        node2: 3,
    },
    {
        node1: 0,
        node2: 4,
    },
    {
        node1: 3,
        node2: 4,

    },
    {
        node1: 2,
        node2: 3,

    },
    {
        node1: 1,
        node2: 2,
    },
];

const graphWithAdjacencyList = new GraphWithAdjacencyList2(nodes.length);

edges.forEach(edge => {
    graphWithAdjacencyList.addEdgeToAdjacency(edge.node1, edge.node2, directed);
});

// console.log(graphWithAdjacencyList.print());
// console.log(graphWithAdjacencyList.BFS(0));
console.log(graphWithAdjacencyList.DFS(0));




