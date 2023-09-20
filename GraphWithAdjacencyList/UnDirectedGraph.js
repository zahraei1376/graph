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

    #numberOfConnectedComponentsWithDeletedNode = (graph = this.adjacencyLists, deletedNodes) => {

        const dfsRecursive = (node, visitedNodes, deletedNodes) => {
            visitedNodes[node] = true;
            for (const neighbor of graph[node]) {
                if (!visitedNodes[neighbor] && deletedNodes !== neighbor) dfsRecursive(neighbor, visitedNodes, deletedNodes);
            }
        }

        const visitedNodes = [];
        let count = 0;

        for (let i = 0; i < graph.length; i++) {
            if (!visitedNodes[i] && deletedNodes !== i) {
                count++;
                dfsRecursive(i, visitedNodes, deletedNodes);
            }

        }
        return count;
    }

    checkingConnectOfGraph = (graph = this.adjacencyLists) => {
        const count = this.numberOfConnectedComponents(graph);
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
        if (nodeForDelete > graph.length) return;

        const neighborDeletedNode = graph[nodeForDelete];
        for (let i = 0; i < neighborDeletedNode.length; i++) {
            this.removeEdge(nodeForDelete, neighborDeletedNode[i], graph);
        }

        graph.splice(nodeForDelete, 1);
    }

    alticulationPointWithRomoveEdges = () => {
        const result = [];
        const temporaryAdjacencyLists = [...this.adjacencyLists];
        let deletedNodes = null;
        const count = this.numberOfConnectedComponents(temporaryAdjacencyLists);
        for (let i = 0; i < temporaryAdjacencyLists.length; i++) {
            deletedNodes = i;
            if (this.#numberOfConnectedComponentsWithDeletedNode(temporaryAdjacencyLists, deletedNodes) > count) {
                result.push(i);
            }
        }
        return result;
    }

    alticulationPoint = () => {
        const visitedNodes = new Array(this.adjacencyLists.length).fill(false);
        const disCoveryTimes = new Array(this.adjacencyLists.length).fill(0);
        const lowTimes = new Array(this.adjacencyLists.length).fill(0);
        const parents = new Array(this.adjacencyLists.length).fill(null);
        const result = [];
        let time = 0;

        const dfsVisit = (vertex) => {
            time++;
            visitedNodes[vertex] = true;
            disCoveryTimes[vertex] = lowTimes[vertex] = time;
            const neighbors = this.adjacencyLists[vertex];
            let child = 0;
            for (let i = 0; i < neighbors.length; i++) {
                if (!visitedNodes[neighbors[i]]) {
                    child++;
                    parents[neighbors[i]] = vertex;
                    dfsVisit(neighbors[i]);
                    lowTimes[vertex] = Math.min(lowTimes[vertex], lowTimes[neighbors[i]]);
                    if (parents[vertex] === null && child > 1) {
                        result.push(vertex);
                    } else if (parents[vertex] !== null && lowTimes[neighbors[i]] >= disCoveryTimes[vertex]) {
                        result.push(vertex)
                    }
                } else {
                    if (parents[vertex] !== neighbors[i]) {
                        lowTimes[vertex] = Math.min(lowTimes[vertex], disCoveryTimes[neighbors[i]])
                    }

                }
            }
        }

        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (!visitedNodes[i]) {
                dfsVisit(i);
            }
        }

        return result;
    }

    findBridgesWithRomoveEdges = () => {

        const addEdge = (node1, node2, adjacencyLists) => {
            if (adjacencyLists[node1] === undefined || adjacencyLists[node2] === undefined) return;

            const index1 = adjacencyLists[node1].indexOf(-1);
            const index2 = adjacencyLists[node2].indexOf(-1);

            if (index1 > -1 && index2 > -1) {
                adjacencyLists[node1].splice(index1, 1, node2);
                adjacencyLists[node2].splice(index2, 1, node1);
            }
        }

        const removeEdge = (node1, node2, adjacencyLists) => {
            const index1 = adjacencyLists[node1].indexOf(node2);
            const index2 = adjacencyLists[node2].indexOf(node1);

            if (index1 > -1 && index2 > -1) {
                adjacencyLists[node1].splice(index1, 1, -1);
                adjacencyLists[node2].splice(index2, 1, -1);
            }
        }

        const temporaryAdjacencyLists = [...this.adjacencyLists];
        const count = this.numberOfConnectedComponents(temporaryAdjacencyLists);
        const visitedNodes = new Array(temporaryAdjacencyLists.length).fill(false);
        const result = [];

        for (let i = 0; i < temporaryAdjacencyLists.length; i++) {
            visitedNodes[i] = true;
            const neighbors = temporaryAdjacencyLists[i];
            neighbors.forEach(neighbor => {
                if (!visitedNodes[neighbor]) {
                    removeEdge(i, neighbor, temporaryAdjacencyLists);
                    if (this.numberOfConnectedComponents(temporaryAdjacencyLists) > count) {
                        result.push(`${i} => ${neighbor}`);
                    }
                    addEdge(i, neighbor, temporaryAdjacencyLists);
                }
            });
        }

        return result;
    }

    findBridges = () => {
        const visitedNodes = new Array(this.adjacencyLists.length).fill(false);
        const parents = new Array(this.adjacencyLists.length).fill(null);
        const disCoveryTimes = new Array(this.adjacencyLists.length).fill(0);
        const lowTimes = new Array(this.adjacencyLists.length).fill(0);
        const result = [];
        let time = 0;

        const dfsVisit = (vertex) => {
            time++;
            visitedNodes[vertex] = true;
            disCoveryTimes[vertex] = lowTimes[vertex] = time;
            const neighbors = this.adjacencyLists[vertex];
            for (let i = 0; i < neighbors.length; i++) {
                if (!visitedNodes[neighbors[i]]) {
                    parents[neighbors[i]] = vertex;
                    dfsVisit(neighbors[i]);
                    lowTimes[vertex] = Math.min(lowTimes[vertex], lowTimes[neighbors[i]]);
                    // if (lowTimes[neighbors[i]] !== lowTimes[vertex]) {
                    //     result.push(`${vertex} => ${neighbors[i]}`);
                    // }
                    if (lowTimes[neighbors[i]] > disCoveryTimes[vertex]) {
                        result.push(`${vertex} => ${neighbors[i]}`);
                    }
                } else {
                    if (parents[vertex] !== neighbors[i]) {
                        lowTimes[vertex] = Math.min(lowTimes[vertex], disCoveryTimes[neighbors[i]]);
                    }
                }
            }
        }

        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (!visitedNodes[i]) {
                dfsVisit(i, visitedNodes, result);
            }
        }

        return result;
    }
}

export default UnDirectedGraph;