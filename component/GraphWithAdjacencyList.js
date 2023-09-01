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

    DFS = () => {
        const visitedNodes = [];
        let result = ``;

        const DFS_VISIT = (adjacencyListNode) => {
            for (let j = 0; j < adjacencyListNode.length; j++) {
                if (!visitedNodes[adjacencyListNode[j]]) {
                    result += adjacencyListNode[j];
                    visitedNodes[adjacencyListNode[j]] = true;
                    DFS_VISIT(adjacencyListNode[j])
                }
            }
        }

        for (let i = 0; i < this.adjacencyLists.length; i++) {
            if (!visitedNodes[i]) {
                visitedNodes[i] = true;
                result += "\n" + i;
                DFS_VISIT(this.adjacencyLists[i]);
            }
        }

        return result;
    }
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



    BFS = (startNode) => {
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



    DFS = (startNode) => {
        const visitedNodes = [];
        let result = ``;
        const DFS_VISIT = (node) => {
            if (node == null) return;
            visitedNodes[node] = true;
            result += node;
            this.adjacencyLists[node].forEach(connectNode => {
                if (!visitedNodes[connectNode]) DFS_VISIT(connectNode);
            });
        }

        DFS_VISIT(startNode);
        //If the graph is not connected or if there is no edge to a certain vertex in the directed graph, check it as well.
        for (let i = 0; i < Array.from(this.adjacencyLists).length; i++) {
            if (!visitedNodes[i]) {
                DFS_VISIT(i)
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