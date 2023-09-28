class WeightedUnDirectedGraph {
    constructor(vertices) {
        this.vertices = vertices;
        this.edges = [];
        // super();

    }

    addEdge = (source, dest, weight) => {
        this.edges.push({ source, dest, weight });
    }

    #sortByEdges = (obj1, obj2) => {
        return obj1.weight - obj2.weight;

    }

    kruskalWithSet = () => {

        const find = (array, node) => {
            for (const [index, elementSet] of array.entries()) {
                if (elementSet.has(node)) {
                    return { elementSet, index };
                }
            }
            return null;
        }

        const mergeAndRemove = (array, index1, index2) => {
            array[index1].forEach(element => array[index2].add(element));
            array.splice(index1, 1);
        }

        let result = new Set();
        const orderedEdges = this.edges.sort(this.#sortByEdges);
        const list = [];

        for (const vertex of this.vertices) {
            const node = new Set();
            list.push(node.add(vertex));
        }

        for (const edge of orderedEdges) {
            const { elementSet: findSource, index: findIndex1 } = find(list, edge.source);
            const { elementSet: findDest, index: findIndex2 } = find(list, edge.dest);
            if (findSource !== findDest) {
                mergeAndRemove(list, findIndex1, findIndex2)
                const communityOfSetsOfTwoEdgeNodes = new Set([...findSource, ...findDest]);
                result = new Set([...result, ...communityOfSetsOfTwoEdgeNodes]);
            }
        }

        return result;
    }

    #findParent = (vertex, parents) => {
        if (parents[vertex] === vertex) {
            return vertex;
        } else {
            return this.#findParent(parents[vertex], parents);
        }
    }

    kruskalWithParent = () => {
        const orderedEdges = this.edges.sort(this.#sortByEdges);
        const parents = new Array(this.vertices.length);
        for (let i = 0; i < parents.length; i++) {
            parents[i] = i;
        }

        let i = 0;
        const result = [];
        while (result.length !== this.vertices.length - 1) {
            const currentEdge = orderedEdges[i];
            const sourceParent = this.#findParent(currentEdge.source, parents);
            const destParent = this.#findParent(currentEdge.dest, parents);
            if (sourceParent !== destParent) {
                result.push(currentEdge);
                parents[sourceParent] = destParent;
            }
            i++;
        }

        let outputRes = ``;
        for (let i = 0; i < result.length; i++) {
            if (result[i].source < result[i].dest) {
                outputRes += `${result[i].source} => ${result[i].dest} with ${result[i].weight} \n`
            } else {
                outputRes += `${result[i].dest} => ${result[i].source} with ${result[i].weight} \n`
            }
        }

        return outputRes;
    }

    #union = (parents, ranks, sourceParent, destParent) => {
        if (sourceParent !== destParent) {
            if (ranks[sourceParent] < ranks[destParent]) {
                parents[sourceParent] = destParent;
            } else if (ranks[sourceParent] > ranks[destParent]) {
                parents[destParent] = sourceParent;
            } else {
                parents[destParent] = sourceParent;
                ranks[sourceParent]++;
            }
        }
    }

    kruskalWithParentAndRank = () => {
        const orderedEdges = this.edges.sort(this.#sortByEdges);
        const parents = new Array(this.vertices.length);
        const ranks = new Array(this.vertices.length).fill(0);

        for (let i = 0; i < parents.length; i++) {
            parents[i] = i;
        }

        let i = 0;
        const result = [];
        while (result.length !== this.vertices.length - 1) {
            const currentEdge = orderedEdges[i];
            const sourceParent = this.#findParent(currentEdge.source, parents);
            const destParent = this.#findParent(currentEdge.dest, parents);
            if (sourceParent !== destParent) {
                result.push(currentEdge);
                this.#union(parents, ranks, sourceParent, destParent);
            }
            i++;
        }

        let outputRes = ``;
        for (let i = 0; i < result.length; i++) {
            outputRes += `${result[i].source} => ${result[i].dest} with ${result[i].weight} \n`
        }

        return outputRes;
    }

    #addEdgesToMatrix = () => {
        const matrix = new Array(this.vertices.length).fill().map(() => new Array(this.vertices.length).fill(0));
        for (const edge of this.edges) {
            matrix[edge.source][edge.dest] = edge.weight;
            matrix[edge.dest][edge.source] = edge.weight;

        }
        return matrix;
    }

    #selectMinVertex = (valuesVertexes, mstSet) => {
        let min = window.Infinity;
        let vertex = null;
        for (let i = 0; i < valuesVertexes.length; i++) {
            if (!mstSet[i] && valuesVertexes[i] < min) {
                vertex = i;
                min = valuesVertexes;
            }
        }
        return vertex;
    }

    primWithAdjacencyMatrix = () => {
        const adjacencyMatrix = this.#addEdgesToMatrix();
        const valuesVertexes = new Array(this.vertices.length).fill(window.Infinity);
        const mstSet = new Array(this.vertices.length).fill(false);
        const parents = new Array(this.vertices.length).fill(-1);
        let result = ``;

        valuesVertexes[0] = 0;

        for (let i = 0; i < this.vertices.length - 1; i++) {
            const selectedVertex = this.#selectMinVertex(valuesVertexes, mstSet);
            mstSet[selectedVertex] = true;
            for (let j = 0; j < this.vertices.length; j++) {
                if ((adjacencyMatrix[selectedVertex][j] !== 0 && !mstSet[j]) && adjacencyMatrix[selectedVertex][j] < valuesVertexes[j]) {
                    valuesVertexes[j] = adjacencyMatrix[selectedVertex][j];
                    parents[j] = selectedVertex;
                }
            }
        }

        for (let i = 1; i < this.vertices.length; i++) {
            result += `${parents[i]} => ${i} with weight ${adjacencyMatrix[parents[i]][i]} \n`
        }

        return result;

    }

    #addEdgeToList = () => {
        const adjacencyList = [];
        for (const edge of this.edges) {
            if (!adjacencyList[edge.source] && !adjacencyList[edge.dest]) {
                adjacencyList[edge.source] = [];
                adjacencyList[edge.source].push(edge.dest);
                adjacencyList[edge.dest] = [];
                adjacencyList[edge.dest].push(edge.source);
            } else if (!adjacencyList[edge.source]) {
                adjacencyList[edge.source] = [];
                adjacencyList[edge.source].push(edge.dest);
                adjacencyList[edge.dest].push(edge.source);
            } else if (!adjacencyList[edge.dest]) {
                adjacencyList[edge.dest] = [];
                adjacencyList[edge.dest].push(edge.source);
                adjacencyList[edge.source].push(edge.dest);
            } else {
                adjacencyList[edge.dest].push(edge.source);
                adjacencyList[edge.source].push(edge.dest);
            }
        }
        return adjacencyList;
    }
}

export default WeightedUnDirectedGraph;