import DirectedGraph from "./GraphWithAdjacencyList/DirectedGraph";
import UnDirectedGraph from "./GraphWithAdjacencyList/UnDirectedGraph";


const nodes = ["A", "B", "C"];
const edges = [
    {
        node1: "A",
        node2: "B",
    },
    {
        node1: "B",
        node2: "C",
    },
    {
        node1: "C",
        node2: "A",
    },
    {
        node1: "D",
        node2: "A",
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
const unDirectedGraph = new UnDirectedGraph(nodes);

edges.forEach(edge => {
    unDirectedGraph.addEdgeToAdjacency(edge.node1, edge.node2);
});


console.log(unDirectedGraph.print());



