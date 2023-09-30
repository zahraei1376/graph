class WeightedDirectedGraph {
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

    #topologyVisit = (vertex, visitedNodes, result) => {
        visitedNodes.set(vertex, true);
        const neighbors = this.adjacencyLists.get(vertex);
        for (const [neighbor, weight] of neighbors.entries()) {
            if (!visitedNodes.get(neighbor)) {
                this.#topologyVisit(neighbor, visitedNodes, result);
            }
        }
        result.push(vertex);
    }

    #topology = () => {
        const visitedNodes = new Map();
        const result = [];
        for (const vertex of this.vertices) {
            visitedNodes.set(vertex, false);
        }

        for (const vertex of this.vertices) {
            if (!visitedNodes.get(vertex)) {
                this.#topologyVisit(vertex, visitedNodes, result);
            }
        }

        return result;
    }

    shortestRoutesOfSameOrigin = () => {

    }
};

export default WeightedDirectedGraph;