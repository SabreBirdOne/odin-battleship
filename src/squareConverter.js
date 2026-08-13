
function toArrayType(str){
    return str.split(",").map((element) => Number(element));
}

function toStringType(arr){

    return (typeof arr === 'string' || arr instanceof String) ? arr : arr.join(",");
}

export {toArrayType, toStringType}