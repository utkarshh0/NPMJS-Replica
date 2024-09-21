
export const timeAgo = (date) => {
    const now = new Date()
    const givenDate = new Date(date)
    const secondsAgo = Math.floor((now - givenDate) / 1000)
  
    const minutesAgo = Math.floor(secondsAgo / 60)
    const hoursAgo = Math.floor(minutesAgo / 60)
    const daysAgo = Math.floor(hoursAgo / 24)
    const monthsAgo = Math.floor(daysAgo / 30)
    const yearsAgo = Math.floor(daysAgo / 365)
  
    if (yearsAgo > 0) return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`
    if (monthsAgo > 0) return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`
    if (daysAgo > 0) return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
    if (hoursAgo > 0) return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`
    if (minutesAgo > 0) return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`
    return 'Just now'
  }