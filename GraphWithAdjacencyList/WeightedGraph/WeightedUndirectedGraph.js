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

}

export default WeightedUnDirectedGraph;