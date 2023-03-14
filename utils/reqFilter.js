import rsqlMongoDB from "rsql-mongodb";

function replaceOperators(filterStr) {
    return filterStr.replace('>=', '=ge=').replace('<=', '=le=').replace('>', '=gt=').replace('<', '=lt=');
}

export default function reqFilter(filterStr) {
    try {
        const result = rsqlMongoDB(replaceOperators(filterStr));
        console.log(rsqlMongoDB(replaceOperators(filterStr)))
        return result;
    } catch(e) {
        return new Error("Error when parsing the query string");
    }
}