export class QueryDto {
    readonly pageNumber: string;
    readonly pageSize: string;
    readonly sortBy: string;
    readonly searchNameTerm: string;
    readonly sortDirection: "desc" | "asc";
}