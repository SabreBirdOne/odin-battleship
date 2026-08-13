import { toStringType, toArrayType } from "./squareConverter";

test("toStringType test", ()=>{
    expect(toStringType([1, 2])).toBe("1,2");
})

test("toArrayType test", ()=>{
    expect(toArrayType("6,7")).toStrictEqual([6, 7]);
})