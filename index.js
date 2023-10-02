import DirectedGraph from "./GraphWithAdjacencyList/Graph/DirectedGraph";
import UnDirectedGraph from "./GraphWithAdjacencyList/Graph/UnDirectedGraph";
import WeightedUnDirectedGraph from "./GraphWithAdjacencyList/WeightedGraph/WeightedUndirectedGraph";
import WeightedDirectedGraph from "./GraphWithAdjacencyList/WeightedGraph/WeighteDirectedGraph";

////////////////////////////////////////////////
// const directedGraphNodes = [0, 1, 2, 3, 4, 5];
// const directedGraphEdges = [
//     {
//         node1: 0,
//         node2: 1,
//     },
//     {
//         node1: 1,
//         node2: 2,
//     },
//     {
//         node1: 2,
//         node2: 3,
//     },
//     {
//         node1: 3,
//         node2: 5,
//     },
//     {
//         node1: 3,
//         node2: 4,
//     },
//     {
//         node1: 5,
//         node2: 4,
//     },
// ];

// const directedGraph = new DirectedGraph();

// directedGraphNodes.forEach(node => {
//     directedGraph.addAdjacency(node);
// });

// directedGraphEdges.forEach(edge => {
//     directedGraph.addEdgeToAdjacency(edge.node1, edge.node2);
// });

// console.log(directedGraph.numberOfConnectedComponents());
// console.log(directedGraph.dfsNonRecursive());
// console.log(directedGraph.bfsNonRecursive());
// console.log(directedGraph.dfs());
// console.log(directedGraph.bfs());
// console.log(directedGraph.topology());
// console.log(directedGraph.topologyWithoutRecursive());
// console.log(directedGraph.hasCircleInDirectedGraphRecursive());
// console.log(directedGraph.hasCircleInDirectedGraph());
// console.log(directedGraph.stronglyConnectedComponents());
// // //////////////////////////////////////
// const unDirectedGraphNodes = [0, 1, 2, 3, 4, 5];
// const unDirectedGraphEdges = [
//     {
//         node1: 0,
//         node2: 1,
//     },
//     {
//         node1: 1,
//         node2: 2,
//     },
//     {
//         node1: 2,
//         node2: 3,
//     },
//     {
//         node1: 3,
//         node2: 5,
//     },
//     {
//         node1: 3,
//         node2: 4,
//     },
//     {
//         node1: 5,
//         node2: 4,
//     },
// ];
// const unDirectedGraph = new UnDirectedGraph();

// unDirectedGraphNodes.forEach(node => {
//     unDirectedGraph.addAdjacency(node);
// });

// unDirectedGraphEdges.forEach(edge => {
//     unDirectedGraph.addEdgeToAdjacency(edge.node1, edge.node2);
// });

// console.log(unDirectedGraph.print());
// console.log(unDirectedGraph.numberOfConnectedComponents());
// console.log(unDirectedGraph.dfsNonRecursive());
// console.log(unDirectedGraph.bfsNonRecursive());
// console.log(unDirectedGraph.dfs());
// console.log(unDirectedGraph.bfs());
// console.log(unDirectedGraph.hasCircleInUndirectedGraphRecursive());
// console.log(unDirectedGraph.hasCircleInUndirectedGraph());
// console.log(unDirectedGraph.alticulationPointWithRomoveEdges());
// console.log(unDirectedGraph.alticulationPoint());
// console.log(unDirectedGraph.findBridgesWithRomoveEdges());
// console.log(unDirectedGraph.findBridges());
// ///////////////////////////////////////////////////
// const weightedUnDirectedGraphNodes = [0, 1, 2, 3, 4, 5];
// const weightedUnDirectedGraph = new WeightedUnDirectedGraph(weightedUnDirectedGraphNodes);

// weightedUnDirectedGraph.addEdge(1, 3, 2);
// weightedUnDirectedGraph.addEdge(0, 1, 2);
// weightedUnDirectedGraph.addEdge(0, 3, 3);
// weightedUnDirectedGraph.addEdge(0, 2, 4);
// weightedUnDirectedGraph.addEdge(4, 5, 5);
// weightedUnDirectedGraph.addEdge(2, 3, 6);
// weightedUnDirectedGraph.addEdge(3, 5, 7);
// weightedUnDirectedGraph.addEdge(2, 1, 8);
// weightedUnDirectedGraph.addEdge(2, 4, 9);
// weightedUnDirectedGraph.addEdge(2, 5, 10);
// weightedUnDirectedGraph.addEdge(3, 4, 11);

// console.log(weightedUnDirectedGraph.kruskalWithSet());
// console.log(weightedUnDirectedGraph.kruskalWithParent());
// console.log(weightedUnDirectedGraph.kruskalWithParentAndRank());
// console.log(weightedUnDirectedGraph.primWithAdjacencyMatrix());
// console.log(weightedUnDirectedGraph.primWithAdjacencyList());
// console.log(weightedUnDirectedGraph.bellmanFord());
////////////////////////////////////////////////////
const weightedDirectedGraphNodes = ["a", "b", "c", "d", "e", "f"];
const weightedDirectedGraph = new WeightedDirectedGraph(weightedDirectedGraphNodes);
weightedDirectedGraph.addEdge("b", "d", 2);
weightedDirectedGraph.addEdge("a", "b", 2);
weightedDirectedGraph.addEdge("a", "d", 3);
weightedDirectedGraph.addEdge("a", "c", 4);
weightedDirectedGraph.addEdge("e", "f", 5);
weightedDirectedGraph.addEdge("c", "d", 6);
weightedDirectedGraph.addEdge("d", "f", 7);
weightedDirectedGraph.addEdge("c", "b", 8);
weightedDirectedGraph.addEdge("c", "e", 9);
weightedDirectedGraph.addEdge("c", "f", 10);
weightedDirectedGraph.addEdge("d", "e", 11);

console.log(weightedDirectedGraph.shortestRoutesOfSameOrigin());
console.log(weightedDirectedGraph.dijkstra());
console.log(weightedDirectedGraph.maxFlowFordFulkerson("a", "f"));