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

    dfsRecursive(node, visitedNodes) {
        visitedNodes[node] = true;
        for (const neighbor of this.adjacencyLists[node]) {
            if (!visitedNodes[neighbor]) this.dfsRecursive(neighbor, visitedNodes);

        }
    }

    findConnectedComponents = () => {
        const visitedNodes = [];
        let count = 0;
        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (!visitedNodes[i]) {
                count++;
                this.dfsRecursive(i, visitedNodes);
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

        // const dfsVisitor2 = (vertex, visitedNodes, stack) => {
        //     visitedNodes[vertex] = true;
        //     const neighbors = transposedGraph[vertex];
        //     for (let i = 0; i < neighbors.length; i++) {
        //         if (!visitedNodes[neighbors[i]]) {
        //             dfsVisitor2(neighbors[i], visitedNodes, stack);
        //         }
        //     }
        //     stack.push(vertex);
        // }

        for (const vertex of orderOfEndingInDfs) {
            if (!visitedNodes[vertex]) {
                const scc = []
                dfsVisitor(vertex, visitedNodes, scc, transposedGraph);
                stronglyConnected.push(scc);
            }
        }

        return stronglyConnected;
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