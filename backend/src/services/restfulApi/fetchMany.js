const MIN_PAGE = 1
const MIN_LIMIT = 1
const MAX_LIMIT = 1000

module.exports = ({ Model, sanitize }) => {
  return async ({
    page = '1',
    limit = '10',
    query = '{}',
    sort = '{ "updatedAt": -1 }'
  }) => {
    let records
    let total
    let maxPage = 1
    let _page = parseInt(page)
    let _limit = parseInt(limit)
    const _query = JSON.parse(query)
    const _sort = JSON.parse(sort)

    _page = _page < MIN_PAGE ? MIN_PAGE : _page
    _limit =
      _limit < MIN_LIMIT ? MIN_LIMIT : _limit > MAX_LIMIT ? MAX_LIMIT : _limit

    try {
      total = await Model.countDocuments({})
      maxPage = Math.ceil(total / _limit)

      if (_page > maxPage) {
        records = []
      } else {
        records = await Model.find(_query)
          .sort(_sort)
          .skip((_page - 1) * _limit)
          .limit(_limit)
      }
    } catch (e) {
      return null
    }

    return {
      total,
      limit: _limit,
      page: _page,
      maxPage,
      query: _query,
      sort: _sort,
      records: records.map(sanitize)
    }
  }
}
