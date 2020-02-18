const paginate = require('../helpers/paginate')

const offset = 20

describe('Paginate', () => {
  it('should return correct params when index is undefined', () => {
    const result = paginate(undefined, offset, 100)
    expect(result).toEqual({
      hasNext: true,
      hasPrevious: false,
      previousIndex: 0,
      nextIndex: 20,
      totalResults: 100,
    })
  })

  it('should return correct params when index is larger than total results', () => {
    const result = paginate(100, offset, 80)
    expect(result).toEqual({
      hasNext: false,
      hasPrevious: true,
      previousIndex: 60,
      nextIndex: 80,
      totalResults: 80,
    })
  })

  it('should return correct params when there are more results to view', () => {
    const result = paginate(0, offset, 100)
    expect(result).toEqual({
      hasNext: true,
      hasPrevious: false,
      previousIndex: 0,
      nextIndex: 20,
      totalResults: 100,
    })
  })


  it('should return correct params when all results have been viewed', () => {
    const result = paginate(100, offset, 100)
    expect(result).toEqual({
      hasNext: false,
      hasPrevious: true,
      previousIndex: 80,
      nextIndex: 100,
      totalResults: 100,
    })
  })
})
