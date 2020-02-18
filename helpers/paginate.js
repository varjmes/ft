const paginate = (index = 0, offset, totalResults) => {
  const idx = Math.min(index, totalResults)

  return {
    totalResults,
    nextIndex: idx + offset < totalResults ? Math.min(idx + offset, totalResults) : 0,
    previousIndex: Math.max(0, idx - offset),
  }
}

module.exports = paginate
