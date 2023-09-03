import { GraphWithAdjacencyList, GraphWithAdjacencyList2 } from "./component/GraphWithAdjacencyList";

const directed = true;
// const nodes = [0, 1, 2, 3, 4, 5];
// const edges = [
//     {
//         node1: 0,
//         node2: 1,
//     },
//     {
//         node1: 0,
//         node2: 2,
//     },
//     {
//         node1: 0,
//         node2: 3,
//     },
//     {
//         node1: 0,
//         node2: 4,
//     },
//     {
//         node1: 3,
//         node2: 4,

//     },
//     {
//         node1: 2,
//         node2: 3,

//     },
//     {
//         node1: 1,
//         node2: 2,
//     },
// ];

const nodes = [0, 1, 2, 3];
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
        node1: 1,
        node2: 3,
    },
    {
        node1: 3,
        node2: 2,
    },
];
/////////////////////////////////////////////////////
// const graphWithAdjacencyList = new GraphWithAdjacencyList2(nodes.length);

// edges.forEach(edge => {
//     graphWithAdjacencyList.addEdgeToAdjacency(edge.node1, edge.node2, directed);
// });

// console.log(graphWithAdjacencyList.print());
// console.log(graphWithAdjacencyList.bfs(0));
// console.log(graphWithAdjacencyList.dfs(0));
///////////////////////////////////////////////////
const graphWithAdjacencyList = new GraphWithAdjacencyList();

nodes.forEach(node => {
    graphWithAdjacencyList.addAdjacency(node);
});

edges.forEach(edge => {
    graphWithAdjacencyList.addEdgeToAdjacency(edge.node1, edge.node2, directed);
});

console.log(graphWithAdjacencyList.print());
console.log(graphWithAdjacencyList.dfs());
console.log(graphWithAdjacencyList.dfsNonRecursive());
console.log(graphWithAdjacencyList.bfs());
console.log(graphWithAdjacencyList.bfsNonRecursive());
console.log(graphWithAdjacencyList.findConnectedComponents())




