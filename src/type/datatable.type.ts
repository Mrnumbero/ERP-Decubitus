export interface DataTablesResponse {
    draw: number;
    start: number;
    length: number;
    search: {
        value: string;
        regex: boolean;
    };
    order: { column: number; dir: string }[];
    columns: {
        data: string;
        name: string;
        searchable: boolean;
        orderable: boolean;
        search: {
            value: string;
            regex: boolean;
        };
    }[];
}
