import { node } from "webpack";
import Node from "./Node";

export default class LinkedList {
    constructor(){
        this.headNode = null;
        this.tailNode = null;
        this.length = 0;
    }
    // Representation Invariant: this.size >= 0

    append(value){
        // adds a new node containing value to the end of the list
        const newNode = new Node(value);

        if (this.length == 0){
            this.headNode = newNode;
            this.tailNode = newNode;
        }
        else {
            // at the tail node, update nextNode pointer
            (this.tailNode).nextNode = newNode; 

            // update the tail pointer of LinkedList
            this.tailNode = newNode;
        }

        this.length++;
    }

    prepend(value){
        //  adds a new node containing value to the start of the list
        let newNode = new Node(value);

        if (this.length == 0){
            this.headNode = newNode;
            this.tailNode = newNode;
        }

        else {
            newNode.nextNode = this.headNode;
            this.headNode = newNode;
        }

        this.length++;

    }

    size(){
        // returns the total number of nodes in the list
        return this.length;
    }

    head(){
        // returns the value of the first node in the list. If the list is empty, returns undefined
        if(!this.headNode) return undefined;
        return this.headNode.value;
    }

    tail(){
        // returns the value of the final node in the list. If the list is empty, returns undefined.
        if(!this.headNode) return undefined;
        return this.tailNode.value;
    }

    at(index){
        // return the value of the node at the given index. If there’s no node at the given index, returns undefined.
        let currentNode = this.headNode;
        let currentIndex = 0;
        while(currentNode !== null){
            if (currentIndex === index) return currentNode.value;
            currentNode = currentNode.nextNode;
            currentIndex++;
        }
        return undefined;
    }

    pop(){
        // remove the head node from the list and return its value. If it’s used on an empty list, returns undefined.
        const oldHead = this.headNode;
        if (!oldHead) return undefined;

        const oldHeadValue = oldHead.value;
        if (!oldHead.nextNode) {
            this.headNode = null;
            this.tailNode = null;
        }
        else {
            this.headNode = this.headNode.nextNode;
        }
            
        this.length--;
        return oldHeadValue;
    }

    contains(value){
        // returns true if the passed in value is in the list and otherwise returns false.
        let currentNode = this.headNode;
        while(currentNode !== null){
            if (currentNode.value === value) return true;
            currentNode = currentNode.nextNode;
        }
        return false;
    }

    findIndex(value){
        /* returns the index of the node containing the given value. 
        If the value can’t be found in the list, returns -1. 
        If more than one node has a value matching the given value, 
        returns the index of the first node with the matching value.
        */
        let currentNode = this.headNode;
        let currentIndex = 0;
        while(currentNode !== null){
            if (currentNode.value === value) return currentIndex;
            currentNode = currentNode.nextNode;
            currentIndex++;
        }
        return -1;
    }

    toString(){
        // returns a string displaying LinkedList. If the list is empty, returns an empty string
        let result = "";
        if (!this.length) return result;
        
        let currentNode = this.headNode;
        while(currentNode !== null){
            result += `( ${currentNode.value} ) -> `
            currentNode = currentNode.nextNode;
        }
        result += 'null';

        return result;
    }

    insertAt(index, ...values){
        /* insert new nodes with the given values at the given index. 
        If index is out of bounds (below 0 or above the list’s size), 
        throws a RangeError. 
        */
        if (index < 0 || (index > this.length && this.length > 0)) {
            throw new RangeError();
        }

        // if index == 0, insertAt is prepending values to the current linked list
        if (index === 0){
            for(let i = values.length - 1; i >= 0; i--){
                this.prepend(values[i]);
            }
        }
        // if index == this.length, insertAt is appending values to the current linked list
        else if (index === this.length){
            values.forEach((value) => this.append(value));
        }
        // if index is in range [1, this.length - 1], insertAt is inserting values at the index 
        // and shift older elements behind it back
        else {
            // Keep the old tail node as a record
            const oldTailNode = this.tailNode;

            // nodeToInsertAt is the node in front of the nodes to be inserted.
            let nodeToInsertAt = this.headNode;
            let currentIndex = 0;
            while(nodeToInsertAt !== null){
                if (currentIndex + 1 === index) break;
                nodeToInsertAt = nodeToInsertAt.nextNode;
                currentIndex++;
            }
            
            // remainingNodes point to the first node behind the nodes to be inserted.
            const remainingNodes = nodeToInsertAt.nextNode;

            // tailNode is set to nodeToInsertAt, so append can insert nodes behind the index.
            this.tailNode = nodeToInsertAt;
            values.forEach((value) => this.append(value));

            /* Append updates this.tailNode for every value inserted, 
            so this.tailNode points to the last inserted node.
            
            Last inserted node is connected to the nodes behind it
            - link the front nodes and inserted nodes with the rest of the list. */
            this.tailNode.nextNode = remainingNodes;

            // Set the tailNode to point to the end of the whole linked list
            this.tailNode = oldTailNode;
        }
        // There is no need to manually handle this.length in insertAt
        // because insertAt calls append() or prepend() when inserting values, 
        // which already handles this.length
    }

    removeAt(index){
        /*  removes the node at the given index. If the given index is out of 
        bounds (below 0 or greater than or equal to the list’s size), 
        throws a RangeError
         */
        if (index < 0 || index >= this.length){
            throw new RangeError();
        }

        if (index === 0 && this.length > 0){
            // Basically pop the first element. Ignore pop()'s return value
            this.pop();

            // pop() already decreases this.length so no need to do it here.
        }
        else {
            let nodeBeforeTarget = this.headNode;
            // target node to remove is nodeBeforeTarget.nextNode
            let currentIndex = 0;
            while(nodeBeforeTarget !== null){
                /* this while loop is OK because if blocks above already
                handles edge cases:
                    - 0 elements: rangeError always, regardless of index
                    - 1 element : only the first and only element can be removed with a pop()
                    - 2 or more : there'll always be indices 0 or 1 to reference.
                */
                if (currentIndex + 1 === index) break;
                nodeBeforeTarget = nodeBeforeTarget.nextNode;
                currentIndex++;
            }
            
            // if the target node is the tailNode
            if (nodeBeforeTarget.nextNode === this.tailNode){
                this.tailNode = nodeBeforeTarget;
                this.tailNode.nextNode = null;
            }
            else { // if the target node is before the tailNode
                const nodeToConnect = nodeBeforeTarget.nextNode.nextNode;
                nodeBeforeTarget.nextNode = nodeToConnect;
            }

            // make sure to update this.length
            this.length--;
        }
    }
}