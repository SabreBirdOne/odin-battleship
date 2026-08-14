import HashMap from "./HashMap";

export default function hashMapCopy(hashMap){
    let copy = new HashMap();
    hashMap.entries().forEach((keyValuePair) => copy.set(keyValuePair[0], keyValuePair[1]));
    return copy;
}