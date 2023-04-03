import rsqlMongoDB from "rsql-mongodb";

function replaceOperators(strForParse) {
    return strForParse.replace('>=', '=ge=').replace('<=', '=le=').replace('>', '=gt=').replace('<', '=lt=');
}

export default function reqParser(strForParse) {
    try {
        const result = rsqlMongoDB(replaceOperators(strForParse));
        return result;
    } catch(e) {
        return new Error("Error when parsing the query string");
    }
}