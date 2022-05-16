export const formatDateTime = dateString => {
  if(isValidDate(dateString))
    return new Date(dateString).toLocaleString()
  else 
    return null
}

export const formatDate = dateString => {
  if(isValidDate(dateString))
    return new Date(dateString).toLocaleDateString()
  else
    return null
}

export const isValidDate = d => isNaN(Date.parse(d)) === false
