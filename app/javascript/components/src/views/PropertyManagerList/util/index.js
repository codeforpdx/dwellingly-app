import { formatDate } from "../../../utils/date"

const convertManagersDataForTable = (managersArray) => {
  const convertedManagers = managersArray.map(manager => {
    // Combining data into first level fields for Search capabilities
    manager.fullName = `${manager.firstName} ${manager.lastName}`
    manager.propertyNames = manager.properties?.map(property => property.name).join(", ")
    manager.lastActive = formatDate(manager.lastActive)

    if(manager.lastActive && !manager.archived) {
      manager.status = "Active"
    } else if(manager.archived) {
      manager.status = "Archived"
    } else {
      manager.status = "Pending"
    }

    return manager
  })

  return convertedManagers
}

export {convertManagersDataForTable}