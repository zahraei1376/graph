export class WeightedGraph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyLists = new Map();
        for (const vertex of vertices) {
            this.adjacencyLists.set(vertex, []);
        }
    }

    addEdge = (node1, node2, weight, directed = false) => {
        this.adjacencyLists.get(node1).push({ node: node2, weight });
        if (!directed) {
            this.adjacencyLists.get(node2).push({ node: node2, weight });
        }
    }
};