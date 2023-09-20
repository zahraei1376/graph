import { WeightedGraph } from "./WeightedGraph";

export class WeightedUnDirectedGraph extends WeightedGraph {
    constructor() {
        super();
    }

    addEdge = (node1, node2, weight) => {
        if (!this.adjacencyLists.get(node1)) throw new Error(`node ${node1} is not exist`);
        if (!this.adjacencyLists.get(node2)) throw new Error(`node ${node2} is not exist`);

        this.adjacencyLists.get(node1).push({ node: node2, weight });
        this.adjacencyLists.get(node2).push({ node: node2, weight });
    }

}