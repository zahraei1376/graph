export class GraphWithAdjacencyList {
    constructor() {
        this.adjacencyLists = [];
    }
    //add adjacency list for every node
    addAdjacency = (node) => {
        if (!this.adjacencyLists[node]) this.adjacencyLists[node] = [];
    }

    addEdgeToAdjacency = (node1, node2, directed = false) => {
        if (!this.adjacencyLists[node1]) this.addAdjacency(node1);
        if (!this.adjacencyLists[node2]) this.addAdjacency(node2);

        this.adjacencyLists[node1].push(node2);
        if (!directed) {
            this.adjacencyLists[node2].push(node1);
        }
    }

    print = () => {
        let result = ``;
        this.adjacencyLists.forEach((edges, key) => {
            result += `${key} --> ${edges.join(",", " ")}` + "\n";
        });
        return result;
    }

    findConnectedComponents = (graph = this.adjacencyLists) => {

        const dfsRecursive = (node, visitedNodes) => {
            visitedNodes[node] = true;
            for (const neighbor of graph[node]) {
                if (!visitedNodes[neighbor]) dfsRecursive(neighbor, visitedNodes);
            }
        }

        const visitedNodes = [];
        let count = 0;

        for (let i = 0; i < graph.length; i++) {
            if (!visitedNodes[i]) {
                count++;
                dfsRecursive(i, visitedNodes);
            }

        }
        return count;
    }

    dfsNonRecursive = (startNode = 0) => {
        const visitedNodes = [];
        const stack = [startNode];
        visitedNodes[startNode] = true;
        let result = ``;
        while (stack.length) {
            const vertex = stack.pop();
            result += vertex;
            this.adjacencyLists[vertex].forEach(neighbor => {
                if (!visitedNodes[neighbor]) {
                    visitedNodes[neighbor] = true;
                    stack.push(neighbor);
                }
            })

        }
        return result;
    }

    bfsNonRecursive = (startNode = 0) => {
        const visitedNodes = [];
        const queue = [startNode];
        let result = ``;
        visitedNodes[startNode] = true;
        while (queue.length) {
            const vertex = queue.shift();
            result += vertex;
            for (const neighbor of this.adjacencyLists[vertex]) {
                if (!visitedNodes[neighbor]) {
                    visitedNodes[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }
        return result;
    }

    dfs = () => {
        const visitedNodes = [];
        const result = [];

        const dfsVisit = (node) => {
            const neighbors = this.adjacencyLists[node];
            for (let j = 0; j < neighbors.length; j++) {
                if (!visitedNodes[neighbors[j]]) {
                    result.push(neighbors[j]);
                    visitedNodes[neighbors[j]] = true;
                    dfsVisit(neighbors[j])
                }
            }
        }

        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (!visitedNodes[i]) {
                visitedNodes[i] = true;
                result.push(i);
                dfsVisit(i);
            }
        }

        return result;
    }

    bfs = (startNode = 0) => {
        const queue = [startNode];
        const visitedNodes = [];
        visitedNodes[startNode] = true;
        let result = ``;
        while (queue.length) {
            let currentVisited = queue.shift();
            result += currentVisited;
            this.adjacencyLists[currentVisited].forEach(connectNode => {
                if (!visitedNodes[connectNode]) {
                    visitedNodes[connectNode] = true;
                    queue.push(connectNode);
                }
            })
        }
        return result;
    }

    // stronglyConnectedComponents = () => {
    //     const dfsRun = this.dfs();

    //     const transposedGraph = [];
    //     for (let i = 0; i < this.adjacencyLists.length; i++) {
    //         const neighbors = this.adjacencyLists[i];
    //         for (const neighbor of neighbors) {
    //             if (!transposedGraph[neighbor]) {
    //                 transposedGraph[neighbor] = [i];
    //             } else {
    //                 transposedGraph[neighbor].push(i);
    //             }
    //         }

    //         if (neighbors.length === 0) {
    //             transposedGraph[i] = [];
    //         }
    //     }

    //     const dfsVisitOnstronglyConnectedComponents = (vertex, visitedNodes, count) => {
    //         // count++;
    //         console.log("vertex =>", vertex, "count =>", count);
    //         visitedNodes[vertex] = true;
    //         const neighbors = transposedGraph[vertex];
    //         console.log("neighbors", neighbors);
    //         // if (neighbors.length > 0) {
    //         let temp = 0;
    //         for (const neighbor of neighbors) {
    //             if (!visitedNodes[neighbor]) {
    //                 temp = dfsVisitOnstronglyConnectedComponents(neighbor, visitedNodes, count);
    //             }
    //         }
    //         // }
    //         temp++;
    //         return temp;
    //         // return count;
    //     }

    //     const dfsOnstronglyConnectedComponents = () => {
    //         const visitedNodes = new Array(transposedGraph.length).fill(false);
    //         let count = 0;
    //         console.log(dfsRun);
    //         for (const vertex of dfsRun) {
    //             console.log("vertexxx", vertex);
    //             if (!visitedNodes[vertex]) {
    //                 // count++;
    //                 console.log("vertexxrrrr", vertex);
    //                 dfsVisitOnstronglyConnectedComponents(vertex, visitedNodes, count);
    //             }
    //         }
    //         return count;
    //     }

    //     return dfsOnstronglyConnectedComponents();
    // }
}

export class GraphWithAdjacencyList2 {
    constructor(numberOfNodes) {
        this.adjacencyLists = [];
        for (let index = 0; index < numberOfNodes; index++) {
            this.adjacencyLists[index] = new Set([]);
        }
    }

    addEdgeToAdjacency = (node1, node2, directed = false) => {
        this.adjacencyLists[node1].add(node2);
        if (!directed) {
            this.adjacencyLists[node2].add(node1);
        }
    }

    bfs = (startNode) => {
        const queue = [startNode];
        const visitedNodes = [];
        visitedNodes[startNode] = true;
        let result = ``;
        while (queue.length) {
            let currentVisited = queue.shift();
            result += currentVisited + " ";
            this.adjacencyLists[currentVisited].forEach(connectNode => {
                if (!visitedNodes[connectNode]) {
                    visitedNodes[connectNode] = true;
                    queue.push(connectNode);
                }
            })
        }
        return result;
    }

    dfs = (startNode) => {
        const visitedNodes = [];
        let result = ``;
        const dfsVisit = (node) => {
            if (node == null) return;
            visitedNodes[node] = true;
            result += node;
            this.adjacencyLists[node].forEach(connectNode => {
                if (!visitedNodes[connectNode]) dfsVisit(connectNode);
            });
        }

        dfsVisit(startNode);
        //If the graph is not connected or if there is no edge to a certain vertex in the directed graph, check it as well.
        for (let i = 0; i < Array.from(this.adjacencyLists).length; i++) {
            if (!visitedNodes[i]) {
                dfsVisit(i)
            }

        }
        return result;
    }

    print = () => {
        let result = ``;
        this.adjacencyLists.forEach((edges, key) => {
            result += `${key} --> ${Array.from(edges).join(",", " ")}` + "\n";
        });
        return result;
    }
}