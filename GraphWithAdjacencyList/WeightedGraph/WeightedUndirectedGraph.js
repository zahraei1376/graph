class WeightedUnDirectedGraph {
    constructor(vertices) {
        this.vertices = vertices;
        this.edges = [];
        // super();

    }

    addEdge = (node1, node2, weight) => {
        this.edges.push({ node1, node2, weight });
    }

    #sortByEdges = (obj1, obj2) => {
        return obj1.weight - obj2.weight;

    }

    kruskal = () => {
        const orderedEdges = this.edges.sort(this.#sortByEdges);
        return orderedEdges;
    }

}

export default WeightedUnDirectedGraph;