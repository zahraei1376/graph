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

        return result.reverse();;
    }

    shortestRoutesOfSameOrigin = () => {
        const valuesVertexes = new Map();
        for (const vertex of this.vertices) {
            valuesVertexes.set(vertex, window.Infinity);
        }
        const parents = new Map();
        for (const vertex of this.vertices) {
            parents.set(vertex, -1);
        }
        const topologyVertices = this.#topology();
        let result = ``;

        valuesVertexes.set(topologyVertices[0], 0);

        for (const vertex of topologyVertices) {
            const neighbors = this.adjacencyLists.get(vertex);
            for (const [neighbor, weight] of neighbors.entries()) {
                const temp = valuesVertexes.get(vertex) + weight;
                if (valuesVertexes.get(vertex) !== window.Infinity && temp < valuesVertexes.get(neighbor)) {
                    valuesVertexes.set(neighbor, temp);
                    parents.set(neighbor, vertex);
                }
            }
        }

        const parentsArray = Array.from(parents.entries());
        for (let i = 1; i < parentsArray.length; i++) {
            const [vertex, parent] = parentsArray[i];
            if (parent === -1) {
                result += `There is no path to node ${vertex} \n`
            } else {
                result += `${parent} => ${vertex} with ${valuesVertexes.get(vertex)} weight \n`
            }
        }

        return result;
    }
};

export default WeightedDirectedGraph;