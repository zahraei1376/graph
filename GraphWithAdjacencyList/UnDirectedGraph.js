import { GraphWithAdjacencyList } from "./Graph";

class UnDirectedGraph extends GraphWithAdjacencyList {
    constructor() {
        super();
    }

    addEdgeToAdjacency = (node1, node2) => {
        if (!this.adjacencyLists[node1]) this.addAdjacency(node1);
        if (!this.adjacencyLists[node2]) this.addAdjacency(node2);

        this.adjacencyLists[node1].push(node2);
        this.adjacencyLists[node2].push(node1);
    }

    hasCircleInUndirectedGraphRecursive = () => {
        const visitedNodes = new Array(this.adjacencyLists.length).fill(false);

        const isCircle = (vertex, parent) => {
            visitedNodes[vertex] = true;
            const neighbors = this.adjacencyLists[vertex];
            let flag = false;
            for (let i = 0; i < neighbors.length; i++) {
                if (visitedNodes[neighbors[i]] && parent !== null && neighbors[i] !== parent) {
                    return true;
                }
                else if (!visitedNodes[neighbors[i]]) {
                    flag = isCircle(neighbors[i], vertex);
                    if (flag) return true;
                }
            }

            return false;
        }

        let flag = false;
        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (!visitedNodes[i]) {
                flag = isCircle(i, null);
                if (flag) return flag;
            }
        }

        return false;
    }

    hasCircleInUndirectedGraph = () => {
        const visitedNodes = new Array(this.adjacencyLists.length).fill(false);
        const parents = new Array(this.adjacencyLists.length).fill(null);
        const stack = [];

        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (!visitedNodes[i]) {
                stack.push(i);
                while (stack.length) {
                    let currentVisited = stack.pop();
                    visitedNodes[currentVisited] = true;
                    const neighbors = this.adjacencyLists[currentVisited];
                    for (let j = 0; j < neighbors.length; j++) {
                        parents[neighbors[j]] = currentVisited;
                        if (visitedNodes[neighbors[j]] && parents[currentVisited] && parents[currentVisited] !== neighbors[j]) {
                            return true;
                        } else if (!visitedNodes[neighbors[j]]) {
                            stack.push(neighbors[j]);
                        }
                    }
                }
            }
        }

        return false;
    }

    checkingConnectOfGraph = (graph = this.adjacencyLists) => {
        const count = this.findConnectedComponents(graph);
        if (count === 1) return true;
        return false
    }

    removeEdge = (node1, node2, graph = this.adjacencyLists) => {
        const index1 = graph[node1].indexOf(node2);
        const index2 = graph[node2].indexOf(node1);

        if (index1 !== -1 && index2 !== -1) {
            graph[node1].splice(index1, 1);
            graph[node2].splice(index2, 1);
        }
    }

    removeVertex = (nodeForDelete, graph = this.adjacencyLists) => {
        const findIndexNodeForDelete = graph.indexOf(nodeForDelete);
        if (findIndexNodeForDelete > -1) {
            graph.splice(nodeForDelete, 1);

            for (const vertex of graph) {
                this.removeEdge(vertex, nodeForDelete, graph);
            }
        }
    }

    alticulationPointWithRomoveEdges = () => {

    }
}

export default UnDirectedGraph;