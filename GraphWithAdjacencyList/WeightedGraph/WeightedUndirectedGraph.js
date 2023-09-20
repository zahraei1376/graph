
export class WeightedUnDirectedGraph {
    constructor(vertices) {
        this.vertices = vertices;
        this.edges = [];
        // super();

    }

    addEdge = (node1, node2, weight) => {
        this.edges.push({ node1, node2, weight });
    }

    kruskal = () => {

    }

}