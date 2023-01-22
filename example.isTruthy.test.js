import { isTruthy } from "./isTruthy";

describe("isTruthy", () => {

    test("should return true for truthy values", () => {
        let truthyBool = true;
        expect(isTruthy(truthyBool)).toBe(true);

        let truthyNumber = 69;
        expect(isTruthy(truthyNumber)).toBe(true);

        let alsoTruthyNumber = 0;
        expect(isTruthy(alsoTruthyNumber)).toBe(true);
        expect(isTruthy(alsoTruthyNumber, false)).toBe(false); // Disable zero as truthy by passing false as the second argument.

        let truthyString = "foo";
        expect(isTruthy(truthyString)).toBe(true);

        // If an object, array, set, or map contains ANY truthy values, it is truthy.
        let truthyObject = { id: NaN, foo: "bar", baz: undefined }; // Specifically check for the id if you need it to be truthy.
        expect(isTruthy(truthyObject)).toBe(true);

        let truthyArray = [null, undefined, NaN, "", {}, [], 0]; // 0 is truthy.
        expect(isTruthy(truthyArray)).toBe(true);
        expect(isTruthy(truthyArray, false)).toBe(false); // Disabled zero being truthy.

        let truthyMultiArray = [[null, undefined], NaN, [{}, [], [[""], 0]]]; // 0 is truthy.
        expect(isTruthy(truthyMultiArray)).toEqual(true);

        let truthySet = new Set(); truthySet.add(0); // Set(1) { 0 } - 0 is truthy.
        let truthySet2 = new Set([null, NaN, 0]); // Set(3) { null, NaN, 0 } - 0 is truthy.
        expect(isTruthy(truthySet)).toEqual(true);
        expect(isTruthy(truthySet2)).toEqual(true);

        let truthyMultiSet = new Set([
            null, undefined, NaN, "", {}, [], new Set([
                null, undefined, NaN, "", {}, [new Set([
                    null, undefined, NaN, "", {}, [0]
                ])]
            ])
        ]); // Set(7) { null, undefined, NaN, '', {}, [], Set(6) { null, undefined, NaN, '', {}, [ [Set] ] } } - 0 is truthy.
        expect(isTruthy(truthyMultiSet)).toBe(true);
        
        let truthyMap = new Map(); truthyMap.set("foo", 0); // "Map(1) { 'foo' => 0 } - 0 is truthy.
        let truthyMap2 = new Map([["foo", 0]]); // "Map(1) { 'foo' => 0 } - 0 is truthy.
        expect(isTruthy(truthyMap)).toBe(true);
        expect(isTruthy(truthyMap2)).toBe(true);

        let truthyMultiMap = new Map([[["foo", ""], ["bar", 0]]]);  //  Map(1) { [ 'foo', '' ] => [ 'bar', 0 ] } - 0 is truthy.
        let truthyMultiMap2 = new Map(truthyMap, truthyMultiMap);
        expect(isTruthy(truthyMultiMap)).toBe(true);
        expect(isTruthy(truthyMultiMap2)).toBe(true);
    });

    //--------------------------------------------------

    test("should return false for falsy values", () => {
        let falsyNull = null;
        expect(isTruthy(falsyNull)).toBe(false);

        let falsyUndefined = undefined;
        expect(isTruthy(falsyUndefined)).toBe(false);

        let falsyBool = false;
        expect(isTruthy(falsyBool)).toBe(false);

        let falsyNumber = NaN;
        expect(isTruthy(falsyNumber)).toBe(false);

        let falsyZero = 0;
        expect(isTruthy(falsyZero, false)).toBe(false); // Add the false parameter to consider 0 as falsy.

        let falsyString = "";
        expect(isTruthy(falsyString)).toBe(false);

        let falsyObject = {};
        let falsyObject2 = { id: NaN, foo: "", baz: undefined };
        // let falsyObject3 = { id }; // TODO: This should be falsy, but it's not.
        let falsyZeroObject = { id: 0 }
        expect(isTruthy(falsyObject)).toBe(false);
        expect(isTruthy(falsyObject2)).toBe(false);
        // expect(isTruthy(falsyObject3)).toBe(false);
        expect(isTruthy(falsyZeroObject, false)).toBe(false);

        // To only allow objects where ALL values are truthy, pass true as the third argument.
        let optionalFalsyObject = { id: 1, foo: "" };
        let optionalFalsyNestedObject = { id: 1, data: { foo: "" }};
        expect(isTruthy(optionalFalsyObject, null, true)).toBe(false);
        expect(isTruthy(optionalFalsyNestedObject, null, true)).toBe(false);

        let falsyArray = [];
        expect(isTruthy(falsyArray)).toBe(false);

        let falsyMultiArray = [[null, undefined], NaN, [{}, [], [[""], false]]];
        let falsyZeroMultiArray = [[null, undefined], NaN, [{}, [], [[""], false]], 0];
        expect(isTruthy(falsyMultiArray)).toBe(false);
        expect(isTruthy(falsyZeroMultiArray, false)).toBe(false);

        let emptySet = new Set();
        expect(isTruthy(emptySet)).toBe(false);

        let badSet = new Set(null, undefined, NaN); // Badly initialized Set - results in Set(0) {}
        expect(isTruthy(badSet)).toBe(false);

        let falsySet = new Set([null, NaN, ""]);
        let falsyZeroSet = new Set([null, NaN, "", 0]);
        expect(isTruthy(falsySet)).toBe(false);
        expect(isTruthy(falsyZeroSet, false)).toBe(false);

        let falsyMultiSet = new Set([
            null, undefined, NaN, "", {}, [], new Set([
                null, undefined, NaN, "", {}, [new Set([
                    null, undefined, NaN, "", {}, []
                ])]
            ])
        ]);
        expect(isTruthy(falsyMultiSet)).toBe(false);

        let falsyZeroMultiSet = new Set([
            null, undefined, NaN, "", {}, [], new Set([
                null, undefined, NaN, "", {}, [new Set([
                    null, undefined, NaN, "", {}, [0]
                ])]
            ])
        ]);
        expect(isTruthy(falsyZeroMultiSet, false)).toBe(false);

        let falsyMap = new Map();
        let falsyMap2 = new Map([["foo", ""]]);
        let badMap = new Map(null, undefined, NaN); // Badly initialized Map - results in Map(0) {}
        expect(isTruthy(falsyMap)).toBe(false);
        expect(isTruthy(falsyMap2)).toBe(false);
        expect(isTruthy(badMap)).toBe(false);

        let falsyZeroMap = new Map([["foo", 0]]);
        expect(isTruthy(falsyZeroMap, false)).toBe(false);

        let falsyMultiMap = new Map(); falsyMultiMap.set(badMap, falsyMap2);
        expect(isTruthy(falsyMultiMap)).toBe(false);

        let falsyZeroMultiMap = new Map(); falsyZeroMultiMap.set(falsyMultiMap, falsyZeroMap);
        expect(isTruthy(falsyZeroMultiMap, false)).toBe(false);


        // TODO: look into this:
        // let optionalFalsyNestedZeroObject = { id: 1, data: { foo: 0 }};
        // expect(isTruthy(optionalFalsyNestedZeroObject, false, true)).toBe(false);

        // let optionalTruthyNestedZeroObject = { id: 1, data: { foo: 0 }};
        // expect(isTruthy(optionalTruthyNestedZeroObject, null, true)).toBe(true);
    });

    // TODO: Separate tests for truthy zero's and fully-truthy objects.
});