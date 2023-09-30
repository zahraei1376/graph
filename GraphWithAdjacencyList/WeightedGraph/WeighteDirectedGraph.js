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
                const clacNeighborsWeight = valuesVertexes.get(vertex) + weight;
                if (valuesVertexes.get(vertex) !== window.Infinity && clacNeighborsWeight < valuesVertexes.get(neighbor)) {
                    valuesVertexes.set(neighbor, clacNeighborsWeight);
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

    #findMinValueInMap = (map, processed) => {
        let minValue = window.Infinity;
        let minKey = window.Infinity;
        for (const [key, value] of map.entries()) {
            if (value < minValue && !processed.get(key)) {
                minValue = value;
                minKey = key;
            }
        }

        return minKey;
    }

    dijkstra = () => {
        const valuesVertexes = new Map();
        const parents = new Map();
        const processed = new Map();
        let result = ``;

        for (const vertex of this.vertices) {
            valuesVertexes.set(vertex, window.Infinity);
        }

        for (const vertex of this.vertices) {
            parents.set(vertex, -1);
        }

        for (const vertex of this.vertices) {
            processed.set(vertex, -false);
        }

        valuesVertexes.set(this.vertices[0], 0);

        for (let i = 0; i < this.vertices.length - 1; i++) {
            const vertexMinValue = this.#findMinValueInMap(valuesVertexes, processed);
            processed.set(vertexMinValue, true);
            const neighbors = this.adjacencyLists.get(vertexMinValue);
            for (const [neighbor, weight] of neighbors.entries()) {
                const clacNeighborsWeight = valuesVertexes.get(vertexMinValue) + weight;
                if (valuesVertexes.get(vertexMinValue) !== window.Infinity && clacNeighborsWeight < valuesVertexes.get(neighbor)) {
                    valuesVertexes.set(neighbor, clacNeighborsWeight);
                    parents.set(neighbor, vertexMinValue);
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