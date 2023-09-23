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
            const { elementSet: findNode1, index: findIndex1 } = find(list, edge.node1);
            const { elementSet: findNode2, index: findIndex2 } = find(list, edge.node2);
            if (findNode1 !== findNode2) {
                mergeAndRemove(list, findIndex1, findIndex2)
                const communityOfSetsOfTwoEdgeNodes = new Set([...findNode1, ...findNode2]);
                result = new Set([...result, ...communityOfSetsOfTwoEdgeNodes]);
            }
        }

        return result;
    }

}

export default WeightedUnDirectedGraph;