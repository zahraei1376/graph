class GraphWithAdjacencyList {
    constructor() {
        this.adjacencyLists = [];
    }
    //add adjacency list for every node
    addAdjacency = (node) => {
        if (!this.adjacencyLists[node]) this.adjacencyLists[node] = [];
    }

    addEdgeToAdjacency = (node1, node2, directed = false) => {
        if (!this.adjacencyLists[node1]) this.addAdjacency(node1);
        else if (!this.adjacencyLists[node2]) this.addAdjacency(node2);

        if (directed) {
            this.adjacencyLists[node1].push(node2);
        } else {
            this.adjacencyLists[node1].push(node2);
            this.adjacencyLists[node2].push(node1);
        }

    }
}