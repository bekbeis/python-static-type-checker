{
    basicTesting: [
        { variableName: "x", variableType: `int`, lin: 0, col: 0, err: null },
        { variableName: "y", variableType: `float`, lin: 0, col: 3, err: null },
        { variableName: "z", variableType: `float`, lin: 1, col: 0, err: null },
        { variableName: "x", variableType: `int`, lin: 1, col: 4, err: null },
        { variableName: "y", variableType: `float`, lin: 1, col: 8, err: null },
        {
            variableName: "x",
            variableType: `int`,
            lin: 2,
            col: 0,
            err: `ERROR: expression has type "str", variable has type "int"`,
        },
    ],
        annotations;
    [
        { variableName: "i", variableType: `int`, lin: 0, col: 0, err: null },
        {
            variableName: "j",
            variableType: `int`,
            lin: 1,
            col: 8,
            err: `ERROR: Incompatible types in assignment (expression has type "float", variable has type "int")  [assignment]`,
        },
        {
            variableName: "l1",
            variableType: `List[int]`,
            lin: 3,
            col: 0,
            err: null,
        },
        {
            variableName: "l2",
            variableType: `List[str]`,
            lin: 4,
            col: 0,
            err: `ERROR: List item 2 has incompatible type "int"; expected "str"  [list-item]`,
        },
        {
            variableName: "getBoolean",
            variableType: `Function`,
            lin: 6,
            col: 4,
            err: `ERROR: Incompatible return value type (got "int", expected "bool")  [return-value]`,
        },
        {
            variableName: "calculateDiv",
            variableType: `Function`,
            lin: 9,
            col: 4,
            err: null,
        },
        {
            variableName: "getBoolean",
            variableType: `Function`,
            lin: 13,
            col: 6,
            err: null,
        },
        {
            variableName: "calculateDiv",
            variableType: `Function`,
            lin: 15,
            col: 6,
            err: null,
        },
        {
            variableName: "calculateDiv",
            variableType: `Function`,
            lin: 16,
            col: 6,
            err: `ERROR: Argument 1/2 to "calculateDiv" has incompatible type "float"; expected "int"  [arg-type]`,
        },
    ],
        arithmeticOperators;
    [
        { variableName: "a", variableType: `int`, lin: 0, col: 0, err: null },
        { variableName: "b", variableType: `str`, lin: 1, col: 0, err: null },
        { variableName: "f", variableType: `None`, lin: 2, col: 0, err: null },
        { variableName: "x", variableType: `int`, lin: 5, col: 0, err: null },
        { variableName: "a", variableType: `int`, lin: 5, col: 4, err: null },
        {
            variableName: "y",
            variableType: `int`,
            lin: 6,
            col: 0,
            err: `ERROR: Unsupported operand types for + ("int" and "str")`,
        },
        { variableName: "a", variableType: `int`, lin: 6, col: 4, err: null },
        { variableName: "b", variableType: `str`, lin: 6, col: 8, err: null },
        { variableName: "x1", variableType: `int`, lin: 9, col: 0, err: null },
        { variableName: "a", variableType: `int`, lin: 9, col: 5, err: null },
        {
            variableName: "y1",
            variableType: `int`,
            lin: 10,
            col: 0,
            err: `ERROR: Unsupported operand types for - ("int" and "str")`,
        },
        { variableName: "a", variableType: `int`, lin: 10, col: 5, err: null },
        { variableName: "b", variableType: `str`, lin: 10, col: 9, err: null },
        { variableName: "x2", variableType: `int`, lin: 13, col: 0, err: null },
        { variableName: "a", variableType: `int`, lin: 13, col: 5, err: null },
        { variableName: "y2", variableType: `str`, lin: 14, col: 0, err: null },
        { variableName: "a", variableType: `int`, lin: 14, col: 5, err: null },
        { variableName: "b", variableType: `str`, lin: 14, col: 9, err: null },
        {
            variableName: "w2",
            variableType: `int`,
            lin: 15,
            col: 0,
            err: `ERROR: Unsupported operand types for * ("int" and "None")`,
        },
        { variableName: "a", variableType: `int`, lin: 15, col: 5, err: null },
        { variableName: "f", variableType: `None`, lin: 15, col: 9, err: null },
        { variableName: "x3", variableType: `int`, lin: 18, col: 0, err: null },
        { variableName: "a", variableType: `int`, lin: 18, col: 5, err: null },
        {
            variableName: "y3",
            variableType: `int`,
            lin: 19,
            col: 0,
            err: `ERROR: Unsupported operand types for / ("int" and "str")`,
        },
        { variableName: "a", variableType: `int`, lin: 19, col: 5, err: null },
        { variableName: "b", variableType: `str`, lin: 19, col: 9, err: null },
    ],
        classes;
    [
        {
            variableName: "Person",
            variableType: `Class`,
            lin: 0,
            col: 6,
            err: null,
        },
        {
            variableName: "__init__",
            variableType: `Method`,
            lin: 1,
            col: 8,
            err: null,
        },
        { variableName: "name", variableType: `str`, lin: 2, col: 13, err: null },
        {
            variableName: "surname",
            variableType: `str`,
            lin: 3,
            col: 13,
            err: null,
        },
        { variableName: "age", variableType: `int`, lin: 4, col: 13, err: null },
        {
            variableName: "MyClass",
            variableType: `Class`,
            lin: 6,
            col: 6,
            err: null,
        },
        {
            variableName: "__init__",
            variableType: `Method`,
            lin: 7,
            col: 8,
            err: null,
        },
        {
            variableName: "my_dict",
            variableType: `Dict`,
            lin: 8,
            col: 13,
            err: null,
        },
        {
            variableName: "my_list",
            variableType: `List`,
            lin: 9,
            col: 13,
            err: null,
        },
        {
            variableName: "my_tuple",
            variableType: `Tuple`,
            lin: 10,
            col: 13,
            err: null,
        },
        { variableName: "test1", variableType: `None`, lin: 13, col: 0, err: null },
        {
            variableName: "Person",
            variableType: `Class`,
            lin: 13,
            col: 8,
            err: `ERROR: Argument 2 to "Person" has incompatible type "int"; expected "str"  [arg-type]`,
        },
        { variableName: "test2", variableType: `None`, lin: 14, col: 0, err: null },
        {
            variableName: "Person",
            variableType: `Class`,
            lin: 14,
            col: 8,
            err: `ERROR: Argument 3 to "Person" has incompatible type "str"; expected "int"  [arg-type]`,
        },
        {
            variableName: "test3",
            variableType: `MyClass`,
            lin: 16,
            col: 0,
            err: null,
        },
        {
            variableName: "test3",
            variableType: `MyClass`,
            lin: 17,
            col: 0,
            err: `ERROR: Incompatible types in assignment (expression has type "List[Any]", variable has type "Dict[Any, Any]") [assignment]`,
        },
        { variableName: "test4", variableType: `None`, lin: 19, col: 0, err: null },
        {
            variableName: "MyClass",
            variableType: `Class`,
            lin: 19,
            col: 8,
            err: `ERROR: Argument 1 to "MyClass" has incompatible type "List[int]"; expected "Dict[Any, Any]"  [arg-type]`,
        },
    ],
        comparisons;
    [
        { variableName: "a", variableType: `int`, lin: 0, col: 0, err: null },
        { variableName: "c", variableType: `str`, lin: 1, col: 0, err: null },
        { variableName: "j", variableType: `Set[str]`, lin: 2, col: 0, err: null },
        {
            variableName: "i",
            variableType: `Tuple[int]`,
            lin: 3,
            col: 0,
            err: null,
        },
        {
            variableName: "q",
            variableType: `Tuple[int, str, float]`,
            lin: 4,
            col: 0,
            err: null,
        },
        { variableName: "a", variableType: `int`, lin: 6, col: 0, err: null },
        {
            variableName: "a",
            variableType: `int`,
            lin: 7,
            col: 0,
            err: `ERROR: Unsupported operand types for > ("int" and "str")`,
        },
        {
            variableName: "c",
            variableType: `str`,
            lin: 7,
            col: 4,
            err: `ERROR: Unsupported operand types for > ("int" and "str")`,
        },
        {
            variableName: "i",
            variableType: `Tuple[int]`,
            lin: 9,
            col: 0,
            err: null,
        },
        {
            variableName: "q",
            variableType: `Tuple[int, str, float]`,
            lin: 9,
            col: 5,
            err: null,
        },
        {
            variableName: "j",
            variableType: `Set[str]`,
            lin: 10,
            col: 0,
            err: `ERROR: Unsupported operand types for <= ("Set[str]" and "Tuple[int, str, float]")  [operator]`,
        },
        {
            variableName: "q",
            variableType: `Tuple[int, str, float]`,
            lin: 10,
            col: 5,
            err: `ERROR: Unsupported operand types for <= ("Set[str]" and "Tuple[int, str, float]")  [operator]`,
        },
    ],
        loops;
    [
        { variableName: "a", variableType: `int`, lin: 0, col: 0, err: null },
        { variableName: "b", variableType: `str`, lin: 1, col: 0, err: null },
        { variableName: "c", variableType: `List[int]`, lin: 2, col: 0, err: null },
        { variableName: "d", variableType: `float`, lin: 3, col: 0, err: null },
        { variableName: "f", variableType: `None`, lin: 4, col: 0, err: null },
        { variableName: "m", variableType: `bool`, lin: 5, col: 0, err: null },
        { variableName: "x", variableType: `int`, lin: 8, col: 4, err: null },
        { variableName: "a", variableType: `int`, lin: 8, col: 15, err: null },
        { variableName: "y", variableType: `None`, lin: 9, col: 5, err: null },
        {
            variableName: "b",
            variableType: `-`,
            lin: 9,
            col: 16,
            err: `ERROR: No overload variant of "range" matches argument type "str" [call-overload]`,
        },
        { variableName: "z", variableType: `int`, lin: 10, col: 6, err: null },
        {
            variableName: "c",
            variableType: `List[int]`,
            lin: 10,
            col: 11,
            err: null,
        },
        { variableName: "w", variableType: `str`, lin: 11, col: 7, err: null },
        { variableName: "b", variableType: `str`, lin: 11, col: 12, err: null },
        { variableName: "v", variableType: `None`, lin: 12, col: 8, err: null },
        {
            variableName: "f",
            variableType: `-`,
            lin: 12,
            col: 13,
            err: `ERROR: "None" has no attribute "__iter__" (not iterable)  [attr-defined]`,
        },
        { variableName: "s", variableType: `None`, lin: 13, col: 9, err: null },
        {
            variableName: "d",
            variableType: `-`,
            lin: 13,
            col: 20,
            err: `ERROR: No overload variant of "range" matches argument type "float"  [call-overload]`,
        },
        { variableName: "n", variableType: `None`, lin: 14, col: 10, err: null },
        {
            variableName: "m",
            variableType: `-`,
            lin: 14,
            col: 15,
            err: `ERROR:"bool" has no attribute "__iter__" (not iterable)  [attr-defined]`,
        },
    ],
    ;
}
;
//# sourceMappingURL=results.js.map