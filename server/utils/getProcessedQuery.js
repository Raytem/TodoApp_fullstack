import reqParser from "./reqParser.js";

export default function getProcessedQuery(queryParams) {
    let page = Number(queryParams.page);
    let limit = queryParams.limit || '';

    if (page <= 0) page = 1;
    if (!limit && page) limit = 3;
    if (!page && !limit) limit = 0;

    const skip = limit * (page - 1);

    const filter = reqParser(queryParams.filter || "")  || {};
    const sort = reqParser(queryParams.sort || "") || {};

    return {skip, limit, filter, sort};
}