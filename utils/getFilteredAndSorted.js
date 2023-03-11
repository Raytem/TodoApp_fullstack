import reqFilter from "./reqFilter.js";

export default async function getFilteredAndSorted(ServiceName, queryParams) {
    let resArray = [];
    if ('filter' in queryParams && 'sort' in queryParams) {
        const filter = reqFilter(queryParams.filter);
        const sort = reqFilter(queryParams.sort);
        resArray = await ServiceName.getFilteredAndSorted(filter, sort);
    } 
    else if ('filter' in queryParams) {
        const filter = reqFilter(queryParams.filter);
        resArray = await ServiceName.getFiltered(filter);
    }
    else if ('sort' in queryParams) {
        const sort = reqFilter(queryParams.sort);
        resArray = await ServiceName.getSorted(sort);
    }  
    else {
        resArray = await ServiceName.getAll();
    }
    return resArray;
}