import LinkedList from "./LinkedList";

export default class HashMap {
    constructor(){
        this.loadFactor = 0.75; 
        // (Number of elements / number of buckets) at which point to double the buckets.
        
        this.capacity = 16; 
        // number of buckets. Note: this.buckets.length === this.capacity at all times.
        
        this.buckets = new Array(this.capacity); 
        // Array of Linked Lists to store elements
        // Each bucket / Linked List stores key-value pairs as elements
        // Each key-value pair is a 2-tuple (JS Array)
        
        this.numElements = 0; 
    }

    hash(key){
        /* takes a key to produce a hash code to a bucket*/
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value){
        /*
        takes two arguments: the first is a key, and the second is a value that is assigned to this key. 
            If a key already exists, then the old value is overwritten
        when a collision occurs, the key-value pair is prepended to the bucket it is hashed to
        when loadFactor is reached (this.numLength + 1 > loadFactor * this.capacity), double the number of buckets and rehash elements
        */

        if (this.numElements + 1 > this.loadFactor * this.capacity){ 
            // Copy the old buckets to a separate variable.
            const oldBuckets = structuredClone(this.buckets);

            // Double the number of buckets (update this.buckets and this.capacity)
            this.capacity *= 2;            
            this.buckets = new Array(this.capacity);
            this.numElements = 0;

            // For each old bucket, 
            for(let i = 0; i < oldBuckets.length; i++){
                if (oldBuckets[i]){
                    // For each key-value pair in an old bucket
                    let currentNode = oldBuckets[i].headNode;
                    while(currentNode !== null){
                        // call set(key, value) pair to current this.buckets
                        this.set(currentNode.value[0], currentNode.value[1]);
                        currentNode = currentNode.nextNode;
                    }
                }                    
            }
            // numElements and loadFactor should be the same after doubling buckets
            
        }
        

        const index = this.hash(key) % this.capacity;
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        // if bucket is empty (undefined or empty Linked List), 
        if (!this.buckets[index] || !this.buckets[index].head()){
            
            // if bucket position does not have a Linked List, create a new one
            if (!this.buckets[index]){
                this.buckets[index] = new LinkedList();
            }

            // Add key-value pair to bucket
            // size of the hash map is numElements + 1
            this.buckets[index].prepend([key, value]);
            this.numElements++;
        }
        else {
            // get all the keys in the bucket at index
            let keysInBucket = new Array();
            for (let i = 0; i < this.buckets.length; i++){
                if (this.buckets[index]){
                    let currentNode = this.buckets[index].headNode;
                    while(currentNode !== null){
                        keysInBucket.push(currentNode.value[0]);
                        currentNode = currentNode.nextNode;
                    }
                }
            }

            if (keysInBucket.includes(key)){
                // if the input key is contained in the bucket, then update the value of this key in the bucket.
                let currentNode = this.buckets[index].headNode;
                while(currentNode !== null){
                    if (currentNode.value[0] === key) {
                        currentNode.value[1] = value;
                        break;
                    }
                    currentNode = currentNode.nextNode;
                }
                // size of the hash map is the same - numElements and capacity is the same.
            }
            else {  
                // if the input key is not contained in the bucket, this is a collision. 
            
                // Add key-value pair to bucket
                // size of the hash map is numElements + 1
                this.buckets[index].prepend([key, value]);
                this.numElements++;
            }
        }
    }

    get(key){
        /* takes a key and returns the value assigned to this key. 
        If the key is not found, return null.*/

        const index = this.hash(key) % this.capacity;
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucketAtIndex = this.buckets[index];
        if (bucketAtIndex){
            for (let currentNode = bucketAtIndex.headNode;
                currentNode !== null;
                currentNode = currentNode.nextNode){

                if (currentNode.value[0] === key){
                    return currentNode.value[1]
                } 
            }
        }
        return null;
    }

    has(key){
        /* returns true if the key is in the hash map, else false */

        const index = this.hash(key) % this.capacity;
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucketAtIndex = this.buckets[index];
        if (bucketAtIndex){
            for (let currentNode = bucketAtIndex.headNode;
                currentNode !== null;
                currentNode = currentNode.nextNode){

                if (currentNode.value[0] === key) return true;
            }
        }
        return false;

    }

    remove(key){
        /* If the key is in the hash map, remove the entry with that key and return true. 
        If the key isn’t in the hash map, returns false 
        */

        const index = this.hash(key) % this.capacity;
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucketAtIndex = this.buckets[index];
        if (bucketAtIndex){
            let currentIndex = 0;
            for (let currentNode = bucketAtIndex.headNode;
                currentNode !== null;
                currentNode = currentNode.nextNode){

                if (currentNode.value[0] === key) {
                    bucketAtIndex.removeAt(currentIndex);
                    this.numElements--;
                    return true;
                }
                currentIndex++;
            }
        }
        return false;
    }

    length() {
        // returns the number of stored keys in the hash map.
        return this.numElements;
    } 

    clear() {
        // removes all entries in the hash map.
        this.buckets = new Array(this.capacity); 
        this.numElements = 0; 
    } 

    keys() {
        // returns an array containing all the keys inside the hash map.
        let keys = new Array();
        
        for (let i = 0; i < this.buckets.length; i++){
            const bucketAtIndex = this.buckets[i];
            if (!bucketAtIndex) continue;
            for (let currentNode = bucketAtIndex.headNode;
                currentNode !== null;
                currentNode = currentNode.nextNode){

                keys.push(currentNode.value[0]);
            }
        }
        return keys;            
    }

    values() {
        // returns an array containing all the values.
        let values = new Array();
        
        for (let i = 0; i < this.buckets.length; i++){
            const bucketAtIndex = this.buckets[i];
            if (!bucketAtIndex) continue;
            for (let currentNode = bucketAtIndex.headNode;
                currentNode !== null;
                currentNode = currentNode.nextNode){

                values.push(currentNode.value[1]);
            }
        }
        return values;    
    }

    entries() {
        /* returns an array that contains each key, value pair. 
        Example: [[firstKey, firstValue], [secondKey, secondValue]]
        A hash map does not preserve insertion order.
        */
        let entries = new Array();
        
        for (let i = 0; i < this.buckets.length; i++){
            const bucketAtIndex = this.buckets[i];
            if (!bucketAtIndex) continue;
            for (let currentNode = bucketAtIndex.headNode;
                currentNode !== null;
                currentNode = currentNode.nextNode){

                entries.push(currentNode.value);
            }
        }
        return entries; 
    } 
}