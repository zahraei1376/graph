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

    print = () => {
        let result = ``;
        this.adjacencyLists.forEach((edges, key) => {
            result += `${key} --> ${Array.from(edges).join(",", " ")}` + "\n";
        });
        return result;
    }
}