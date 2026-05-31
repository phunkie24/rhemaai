export function parsePagination(query, options = {}) {
  const defaultLimit = options.defaultLimit || 20
  const maxLimit = options.maxLimit || 50

  const parsedPage = Number.parseInt(query.page, 10)
  const parsedLimit = Number.parseInt(query.limit, 10)

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1
  const limit = Number.isInteger(parsedLimit) && parsedLimit > 0
    ? Math.min(parsedLimit, maxLimit)
    : defaultLimit

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  }
}
