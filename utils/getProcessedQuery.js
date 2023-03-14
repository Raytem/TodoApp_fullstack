import reqFilter from "./reqFilter.js";

export default function getProcessedQuery(queryParams) {
    const skip = queryParams.skip || 0;
    const limit = queryParams.limit || '';
    const filter = reqFilter(queryParams.filter || "");
    const sort = reqFilter(queryParams.sort || "");

    return {skip, limit, filter, sort};
}