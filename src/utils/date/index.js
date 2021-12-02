const formatDate = dateString => {
  if(isValidDate(dateString))
    return new Date(dateString + ' UTC').toLocaleString()
   else 
    return null
};

const isValidDate = d => isNaN(Date.parse(d)) === false

export { formatDate, isValidDate };
