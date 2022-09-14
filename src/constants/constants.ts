import { QueryDto } from "src/commonDTO/query.dto";

export const queryDefault: QueryDto = {
    pageNumber: '1',
    pageSize: '10', 
    sortBy: 'createdAt', 
    searchNameTerm: '', 
    sortDirection: 'desc',
}