export class WeightedDirectedGraph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyLists = new Map();
        for (const vertex of vertices) {
            this.adjacencyLists.set(vertex, new Map());
        }
    }

    addEdge = (source, dest, weight) => {
        this.adjacencyLists.get(source).set(dest, weight);
    }
};