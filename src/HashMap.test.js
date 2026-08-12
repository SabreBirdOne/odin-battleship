import HashMap from "./HashMap";

function createColorMap(){
    let map =  new HashMap() // or HashMap() if using a factory

    map.set('apple', 'red')
    map.set('banana', 'yellow')
    map.set('carrot', 'orange')
    map.set('dog', 'brown')
    map.set('elephant', 'gray')
    map.set('frog', 'green')
    map.set('grape', 'purple')
    map.set('hat', 'black')
    map.set('ice cream', 'white')
    map.set('jacket', 'blue')
    map.set('kite', 'pink')
    map.set('lion', 'golden') 

    return map;
} 

function createDoubledMap(){
    let map =  new HashMap() // or HashMap() if using a factory

    map.set('apple', 'red')
    map.set('banana', 'yellow')
    map.set('carrot', 'orange')
    map.set('dog', 'brown')
    map.set('elephant', 'gray')
    map.set('frog', 'green')
    map.set('grape', 'purple')
    map.set('hat', 'black')
    map.set('ice cream', 'white')
    map.set('jacket', 'blue')
    map.set('kite', 'pink')
    map.set('lion', 'golden') 
    map.set('moon', 'silver')

    return map;
}

test("Initial color map test", ()=>{
    const testMap = createColorMap();
    expect(testMap.numElements <= testMap.capacity * testMap.loadFactor)
    .toBeTruthy();
    expect(testMap.numElements).toBe(12);
})

test("get() function test", ()=>{
    const testMap = createColorMap();
    expect(testMap.get('ice cream')).toBe('white');
    expect(testMap.get('lion')).toBe('golden');  
})

test("set() function test: updating existing key-value pairs", ()=>{
    let testMap = createColorMap();
    testMap.set('ice cream', 'vanilla');
    testMap.set('lion', 'orange');

    expect(testMap.get('ice cream')).toBe('vanilla');
    expect(testMap.get('lion')).toBe('orange');
    expect(testMap.get('carrot')).toBe('orange');  

    expect(testMap.numElements <= testMap.capacity * testMap.loadFactor)
    .toBeTruthy();
    expect(testMap.numElements).toBe(12);
})

test("has() function test", ()=>{
    const testMap = createColorMap();
    expect(testMap.has('raven')).toBeFalsy();
    expect(testMap.has('lion')).toBeTruthy();
});

test("remove() function test", ()=>{
    const testMap = createColorMap();
    
    let result = testMap.remove('raven');
    expect(result).toBeFalsy();
    expect(testMap.numElements).toBe(12);

    // console.log(testMap.buckets[testMap.hash('lion')]);
    result = testMap.remove('lion');

    expect(result).toBeTruthy();
    expect(testMap.numElements).toBe(11);
    // console.log(testMap.buckets[testMap.hash('lion')]);
})

test("length() function test", ()=>{
    const testMap = createColorMap();
    expect(testMap.length()).toEqual(testMap.numElements);
})

test("clear() function test", ()=>{
    let testMap = createColorMap();
    testMap.clear();
    expect(testMap.length()).toEqual(0);
    expect(testMap.buckets[0]).toBeUndefined()
})

test("keys() function test", ()=>{
    const testMap = createColorMap();

    const keys = testMap.keys();
    expect(keys.length).toEqual(testMap.length());

    for (const key of keys){
        expect(testMap.has(key)).toBeTruthy();
    }
    // console.log(keys);
})

test("values() function test", ()=>{
    const testMap = createColorMap();

    const values = testMap.values();
    expect(values.length).toEqual(testMap.length())
    // Project Specifications said nothing about duplicates

    for (const value of values){
        let valueIsInMap = false;
        for (const bucket of testMap.buckets){
            if(bucket){
                let currentNode = bucket.headNode;
                while(currentNode !== null){
                    if (currentNode.value[1] === value){
                        valueIsInMap = true;
                        break;
                    } 
                    currentNode = currentNode.nextNode;
                }
            }
            if (valueIsInMap) break;
        }
        expect(valueIsInMap).toBeTruthy();
        // console.log(values);
    }
})

test("entries() function test", ()=>{
    const testMap = createColorMap();

    const entries = testMap.entries();
    expect(entries.length).toEqual(testMap.length());

    for(const entry of entries){
        expect(testMap.has(entry[0])).toBeTruthy();
        expect(testMap.get(entry[0])).toEqual(entry[1]);
    }
})

test("Doubling buckets test", ()=>{
    let testMap = createColorMap();
    testMap.set('moon', 'silver')

    expect(testMap.numElements <= testMap.capacity * testMap.loadFactor)
    .toBeTruthy();
    expect(testMap.numElements).toBe(13);
    expect(testMap.capacity).toBe(32);
})

test("set() function test on doubled hashmap: updating existing key-value pairs", ()=>{
    let testMap = createDoubledMap();
    testMap.set('ice cream', 'vanilla');
    testMap.set('lion', 'orange');

    expect(testMap.get('ice cream')).toBe('vanilla');
    expect(testMap.get('lion')).toBe('orange');
    expect(testMap.get('carrot')).toBe('orange');  

    expect(testMap.numElements <= testMap.capacity * testMap.loadFactor)
    .toBeTruthy();
    expect(testMap.numElements).toBe(13);
})

test("has() function test on doubled hashmap", ()=>{
    const testMap = createDoubledMap();
    expect(testMap.has('raven')).toBeFalsy();
    expect(testMap.has('lion')).toBeTruthy();
});

test("remove() function test on doubled hashmap", ()=>{
    const testMap = createDoubledMap();
    
    let result = testMap.remove('raven');
    expect(result).toBeFalsy();
    expect(testMap.numElements).toBe(13);

    // console.log(testMap.buckets[testMap.hash('lion')]);
    result = testMap.remove('lion');

    expect(result).toBeTruthy();
    expect(testMap.numElements).toBe(12);
    // console.log(testMap.buckets[testMap.hash('lion')]);
})

test("length() function test on doubled hashmap", ()=>{
    const testMap = createDoubledMap();
    expect(testMap.length()).toEqual(testMap.numElements);
})

test("clear() function test on doubled hashmap", ()=>{
    let testMap = createDoubledMap();
    testMap.clear();
    expect(testMap.length()).toEqual(0);
    expect(testMap.buckets[0]).toBeUndefined()
})

test("keys() function test on doubled hashmap", ()=>{
    const testMap = createDoubledMap();

    const keys = testMap.keys();
    expect(keys.length).toEqual(testMap.length());

    for (const key of keys){
        expect(testMap.has(key)).toBeTruthy();
    }
    // console.log(keys);
})

test("values() function test on doubled hashmap", ()=>{
    const testMap = createDoubledMap();

    const values = testMap.values();
    expect(values.length).toEqual(testMap.length())
    // Project Specifications said nothing about duplicates

    for (const value of values){
        let valueIsInMap = false;
        for (const bucket of testMap.buckets){
            if(bucket){
                let currentNode = bucket.headNode;
                while(currentNode !== null){
                    if (currentNode.value[1] === value){
                        valueIsInMap = true;
                        break;
                    } 
                    currentNode = currentNode.nextNode;
                }
            }
            if (valueIsInMap) break;
        }
        expect(valueIsInMap).toBeTruthy();
        // console.log(values);
    }
})

test("entries() function test on doubled hashmap", ()=>{
    const testMap = createDoubledMap();

    const entries = testMap.entries();
    expect(entries.length).toEqual(testMap.length());

    for(const entry of entries){
        expect(testMap.has(entry[0])).toBeTruthy();
        expect(testMap.get(entry[0])).toEqual(entry[1]);
    }
})