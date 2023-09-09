import { GraphWithAdjacencyList } from "./component/GraphWithAdjacencyList";

const directed = true;
const nodes = [0, 1, 2, 3, 4, 5, 6];
const edges = [
    {
        node1: 0,
        node2: 1,
    },
    {
        node1: 1,
        node2: 2,
    },
    {
        node1: 2,
        node2: 3,
    },
    {
        node1: 3,
        node2: 0,
    },
    {
        node1: 2,
        node2: 4,
    },
    {
        node1: 3,
        node2: 4,
    },
    {
        node1: 4,
        node2: 5,
    },
    {
        node1: 5,
        node2: 0,
    },
];
///////////////////////////////////////////////////
const graphWithAdjacencyList = new GraphWithAdjacencyList();

nodes.forEach(node => {
    graphWithAdjacencyList.addAdjacency(node);
});

edges.forEach(edge => {
    graphWithAdjacencyList.addEdgeToAdjacency(edge.node1, edge.node2, directed);
});

console.log(graphWithAdjacencyList.hasCircleInUndirectedGraph());
console.log(graphWithAdjacencyList.hasCircleInUndirectedGraphRecursive());
console.log(graphWithAdjacencyList.hasCircleInDirectedGraphRecursive());
console.log(graphWithAdjacencyList.hasCircleInDirectedGraph());
// console.log(graphWithAdjacencyList.print());
console.log(graphWithAdjacencyList.dfs());
// console.log(graphWithAdjacencyList.dfsNonRecursive());
// console.log(graphWithAdjacencyList.bfs());
// console.log(graphWithAdjacencyList.bfsNonRecursive());
// console.log(graphWithAdjacencyList.findConnectedComponents());
// console.log(graphWithAdjacencyList.topology());
// console.log(graphWithAdjacencyList.topologyWithoutRecursive());




