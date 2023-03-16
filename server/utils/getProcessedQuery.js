import reqFilter from "./reqFilter.js";

export default function getProcessedQuery(queryParams) {
    let page = Number(queryParams.page);
    let limit = queryParams.limit || '';

    if (page <= 0) page = 1;
    if (!limit && page) limit = 2;
    if (!page && !limit) limit = 0;

    const skip = limit * (page - 1);

    const filter = reqFilter(queryParams.filter || "");
    const sort = reqFilter(queryParams.sort || "");

    return {skip, limit, filter, sort};
}