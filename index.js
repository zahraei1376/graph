import DirectedGraph from "./GraphWithAdjacencyList/DirectedGraph";
import UnDirectedGraph from "./GraphWithAdjacencyList/UnDirectedGraph";

const nodes = [0, 1, 2, 3, 4, 5, 6, 7];
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
        node1: 3,
        node2: 5,
    },
    {
        node1: 3,
        node2: 4,
    },
    {
        node1: 5,
        node2: 4,
    },
    {
        node1: 2,
        node2: 6,
    },
];

// const directedGraph = new DirectedGraph();

// nodes.forEach(node => {
//     directedGraph.addAdjacency(node);
// });

// edges.forEach(edge => {
//     directedGraph.addEdgeToAdjacency(edge.node1, edge.node2);
// });

// console.log(directedGraph.findConnectedComponents());
//////////////////////////////////////
const unDirectedGraph = new UnDirectedGraph();

nodes.forEach(node => {
    unDirectedGraph.addAdjacency(node);
});

edges.forEach(edge => {
    unDirectedGraph.addEdgeToAdjacency(edge.node1, edge.node2);
});

// console.log(unDirectedGraph.alticulationPointWithRomoveEdges());
// console.log(unDirectedGraph.alticulationPoint());
console.log(unDirectedGraph.bridgeWithRomoveEdges());




