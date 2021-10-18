import RoleEnum from '../../Enums/RoleEnum';

export const fetchAllTenants = (context) =>
  context.apiCall('get', `/tenants`, {}, {})
    .then(({ data }) => {
      const filteredTenants = data.tenants.filter(tenant => !tenant.archived)
      const prunedTenants = filteredTenants.map(tenant => (
        { key: tenant.id, value: `${tenant.firstName} ${tenant.lastName}` }
      ))

      return prunedTenants
    });

export const fetchAllManagers = (context) =>
  context.apiCall('get', `/user?r=${RoleEnum.PROPERTY_MANAGER}`, {}, {})
    .then(({ data }) => {
      const prunedManagers = data.users.map(manager => (
        { key: manager.id, value: `${manager.firstName} ${manager.lastName}` }
      ))
      return prunedManagers;
    });

export const fetchAllUsers = async (context) => {

  const URLs = ['/user?r=3', '/user?r=4'];

  const fetchData = URL => 
    context.apiCall('get', URL, {}, {})
      .then(({ data }) => data.users);

  return Promise.all(URLs.map(url => fetchData(url)))
    .then(users => {
      let array = [];
      users.forEach(user => {
        array = [...array, ...user]
      })
      const prunedUsers = array.map(user => (
        { key: user.id, value: `${user.firstName} ${user.lastName}` }
      ))
      return prunedUsers;
    })
}

export const updateTicket = (update, ticketId, context) => 
  context.apiCall('put', `/tickets/${ticketId}`, update, { success: "Ticket updated!" });
