const paginate = (index = 0, offset, totalResults) => {
  const idx = Math.min(index, totalResults)

  return {
    totalResults,
    hasNext: idx + offset < totalResults,
    hasPrevious: index > 0,
    nextIndex: Math.min(idx + offset, totalResults),
    previousIndex: Math.max(0, idx - offset),
  }
}

module.exports = paginate
