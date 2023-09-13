import { GraphWithAdjacencyList } from "./Graph";

class DirectedGraph extends GraphWithAdjacencyList {
    constructor() {
        super();
    }

    addEdgeToAdjacency = (node1, node2) => {
        if (!this.adjacencyLists[node1]) this.addAdjacency(node1);
        if (!this.adjacencyLists[node2]) this.addAdjacency(node2);

        this.adjacencyLists[node1].push(node2);
    }

    topologyDfs = (vertex, visitedNodes, stack) => {
        visitedNodes[vertex] = true;
        const adjacencyListVertex = this.adjacencyLists[vertex];
        for (let i = 0; i < adjacencyListVertex?.length; i++) {
            const neighbor = adjacencyListVertex[i];
            if (!visitedNodes[neighbor]) {
                this.topologyDfs(neighbor, visitedNodes, stack);
            }
        }
        stack.push(vertex);
    }

    topology = () => {
        const visitedNodes = [];
        const stack = [];
        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (!visitedNodes[i]) {
                this.topologyDfs(i, visitedNodes, stack);
            }

        }
        return stack.reverse();
    }

    topologyWithoutRecursive = () => {
        const degrees = new Array(this.adjacencyLists.length).fill(0);
        const stack = [];
        const result = [];

        for (const adjacencyList of this.adjacencyLists) {
            for (let i = 0; i < adjacencyList.length; i++) {
                degrees[adjacencyList[i]]++;
            }
        }

        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (degrees[i] === 0) {
                stack.push(i);
            }
        }

        while (stack.length > 0) {
            const vertex = stack.pop();
            result.push(vertex);
            const neighbors = this.adjacencyLists[vertex];
            for (const neighbor of neighbors) {
                degrees[neighbor]--;
                if (degrees[neighbor] === 0) {
                    stack.push(neighbor);
                }
            }
        }
        if (result.length !== this.adjacencyLists.length) {
            throw new Error('The graph has a cycle.');
        }

        return result;
    }

    hasCircleInDirectedGraphRecursive = () => {
        const visitedNodes = new Array(this.adjacencyLists.length).fill(false);

        const isCircle = (vertex) => {
            visitedNodes[vertex] = true;
            const neighbors = this.adjacencyLists[vertex];
            let flag = false;
            for (let i = 0; i < neighbors.length; i++) {
                if (visitedNodes[neighbors[i]]) return true
                else {
                    flag = isCircle(neighbors[i]);
                    if (flag) return flag;
                }
            }
            visitedNodes[vertex] = false;
            return false;
        }

        let flag = false;
        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (!visitedNodes[i]) {
                flag = isCircle(i);
                if (flag) return true;
            }
        }

        return false;
    }

    hasCircleInDirectedGraph = () => {
        const visitedNodes = new Array(this.adjacencyLists.length).fill(false);
        const stack = [];

        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (!visitedNodes[i]) {
                stack.push(i);
                while (stack.length) {
                    let currentVisited = stack.pop();
                    visitedNodes[currentVisited] = true;
                    let neighbors = this.adjacencyLists[currentVisited];
                    for (const neighbor of neighbors) {
                        if (visitedNodes[neighbor]) return true;
                        else {
                            stack.push(neighbor);
                        }

                    }
                }
            }

        }

        return false;
    }

    stronglyConnectedComponents = () => {
        const dfsVisitor = (vertex, visitedNodes, stack, adjacencyLists) => {
            visitedNodes[vertex] = true;
            const neighbors = adjacencyLists[vertex];
            for (let i = 0; i < neighbors.length; i++) {
                if (!visitedNodes[neighbors[i]]) {
                    dfsVisitor(neighbors[i], visitedNodes, stack, adjacencyLists);
                }

            }
            stack.push(vertex);
        }

        const dfs = () => {
            const visitedNodes = new Array(this.adjacencyLists.length).fill(false);
            const stack = [];
            for (let i = 0; i < this.adjacencyLists.length; i++) {
                if (!visitedNodes[i]) {
                    dfsVisitor(i, visitedNodes, stack, this.adjacencyLists);
                }
            }
            return stack;
        }

        const transposed = () => {
            const transposedGraph = [];
            for (let i = 0; i < this.adjacencyLists.length; i++) {
                if (!transposedGraph[i]) {
                    transposedGraph[i] = [];
                }
                const neighbors = this.adjacencyLists[i];
                for (let j = 0; j < neighbors.length; j++) {
                    if (!transposedGraph[neighbors[j]]) {
                        transposedGraph[neighbors[j]] = [i];
                    } else {
                        transposedGraph[neighbors[j]].push(i);
                    }
                }
            }
            return transposedGraph;
        }

        const orderOfEndingInDfs = dfs().reverse();
        const transposedGraph = transposed();
        const visitedNodes = new Array(transposedGraph.length).fill(false);
        const stronglyConnected = [];

        for (const vertex of orderOfEndingInDfs) {
            if (!visitedNodes[vertex]) {
                const scc = []
                dfsVisitor(vertex, visitedNodes, scc, transposedGraph);
                stronglyConnected.push(scc);
            }
        }

        return stronglyConnected;
    }
}

export default DirectedGraph;