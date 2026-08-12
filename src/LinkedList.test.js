import LinkedList from "./LinkedList";

function createAnimalList() {
    const list = new LinkedList();
    list.append("dog");
    list.append("cat");
    list.append("parrot");
    list.append("hamster");
    list.append("snake");
    list.append("turtle");
    return list;
}

function createNumbersList() {
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    return list;
}

function createRavenList() {
    const list = new LinkedList();
    list.append('raven');
    return list;
}

test('toString() test', () => {
    let list = createAnimalList();
    expect(list.toString()).toBe('( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null')
})

test('toString() test on empty list', () => {
    let list = new LinkedList();
    expect(list.toString()).toBe("");
})

test('size() test', () => {
    let list = createAnimalList();
    expect(list.size()).toEqual(6);
})

test('prepend() with existing list test', () => {
    let list = createAnimalList();
    list.prepend('raven');
    expect(list.toString()).toBe('( raven ) -> ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null')
});

test('prepend() on empty list test', () => {
    let list = new LinkedList();
    list.prepend('raven');
    list.prepend('lynx')
    expect(list.toString()).toBe('( lynx ) -> ( raven ) -> null');
});

test('head and tail functions on empty list', () => {
    let list = new LinkedList();
    expect(list.head()).toBeUndefined();
    expect(list.tail()).toBeUndefined();
});

test('head and tail functions on 1-element list', () => {
    let list = createRavenList();
    expect(list.head()).toBe('raven');
    expect(list.tail()).toBe('raven');
    expect(list.head()).toBe(list.tail());
});

test('head and tail functions on existing list', () => {
    const list = createAnimalList();
    expect(list.head()).toBe('dog');
    expect(list.tail()).toBe('turtle');
});

test('at() empty list', () => {
    let list = new LinkedList();
    expect(list.at(0)).toBeUndefined();
    expect(list.at(9999)).toBeUndefined();
});

test('at() on existing list', () => {
    const list = createAnimalList();
    expect(list.at(0)).toBe('dog');
    expect(list.at(4)).toBe('snake');
    expect(list.at(-1)).toBeUndefined();
    expect(list.at(6)).toBeUndefined();
});

test('pop() on empty list', () => {
    let list = new LinkedList();
    const poppedValue = list.pop();
    expect(list.toString()).toBe('');
    expect(poppedValue).toBeUndefined();
});

test('pop() on 1-element list', () => {
    let list = createRavenList();
    const poppedValue = list.pop();
    expect(list.toString()).toBe('');
    expect(poppedValue).toBe('raven');
})

test('pop() on existing list', () => {
    let list = createAnimalList();
    const poppedValue = list.pop();
    expect(list.toString()).toBe('( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null');
    expect(poppedValue).toBe('dog');
})

test('contains() on empty list', () => {
    let list = new LinkedList();
    expect(list.contains('anything')).toBeFalsy();
})

test('contains() on 1-element list', () => {
    let list = createRavenList();
    expect(list.contains('anything else not raven')).toBeFalsy();
    expect(list.contains('raven')).toBeTruthy();
})

test('contains() on existing list', () => {
    let list = createAnimalList();
    expect(list.contains('raven')).toBeFalsy();
    expect(list.contains('dog')).toBeTruthy();
})

test('findIndex() on empty list', () => {
    let list = new LinkedList();
    expect(list.findIndex('anything')).toBe(-1);
})

test('findIndex() on 1-element list', () => {
    let list = createRavenList();
    expect(list.findIndex('anything else not raven')).toBe(-1);
    expect(list.findIndex('raven')).toBe(0);
})

test('findIndex() on existing list (with duplicates)', () => {
    let list = createAnimalList();
    list.prepend('dog');
    expect(list.findIndex('raven')).toBe(-1);
    expect(list.findIndex('dog')).toBe(0);
})

test('insertAt() out of bounds', () => {
    let list = createRavenList();
    expect(() => {list.insertAt(-1, 'raven')}).toThrow(new RangeError());
    expect(() => {list.insertAt(2, 'raven')}).toThrow(new RangeError());
})

test('insertAt() to empty list', () => {
    let list = new LinkedList();
    list.insertAt(0, 'lynx', 'raven');
    expect(list.toString()).toBe('( lynx ) -> ( raven ) -> null');
})

test('insertAt() to 1-element list', () => {
    let list = createRavenList();
    list.insertAt(0, 'raven', 'lynx');
    expect(list.toString()).toBe('( raven ) -> ( lynx ) -> ( raven ) -> null');
})

test('insertAt() to existing list in the middle', () => {
    let list = createNumbersList();
    list.insertAt(1, 10, 11);
    expect(list.toString()).toBe(
        '( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null'
    );
})

test('insertAt() to existing list at the tailNode', () => {
    let list = createNumbersList();
    list.insertAt(3, 10, 11);
    expect(list.toString()).toBe(
        '( 1 ) -> ( 2 ) -> ( 3 ) -> ( 10 ) -> ( 11 ) -> null'
    );
})

test('insertAt() to existing list at the headNode', () => {
    let list = createNumbersList();
    list.insertAt(0, 10, 11);
    expect(list.toString()).toBe(
        '( 10 ) -> ( 11 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> null'
    );
})

test('removeAt() out of bounds', () => {
    let list = createRavenList();
    expect(() => { list.removeAt(-1)}).toThrow(new RangeError());
    expect(() => { list.removeAt(1)}).toThrow(new RangeError());
});
test('removeAt() on empty list', () => {
    let list = new LinkedList();
    expect(() => { list.removeAt(0)}).toThrow(new RangeError());
});
test('removeAt() to existing list in the headNode', () => {
    let list = createNumbersList();
    list.removeAt(0);
    expect(list.toString()).toBe('( 2 ) -> ( 3 ) -> null');
});
test('removeAt() to existing list in the tailNode', () => {
    let list = createNumbersList();
    list.removeAt(2);
    expect(list.toString()).toBe('( 1 ) -> ( 2 ) -> null');
});
test('removeAt() to existing list in the middle', () => {
    let list = createNumbersList();
    list.removeAt(1);
    expect(list.toString()).toBe('( 1 ) -> ( 3 ) -> null');
});