export function extractQueryParams(query) {
    return query.substr(1).split('&')
}