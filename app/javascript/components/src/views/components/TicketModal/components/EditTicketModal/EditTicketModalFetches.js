export const fetchAllTenants = (context) =>
  context.apiCall('get', `/tenants`, {}, {})
    .then(({ data }) => {
      const filteredTenants = data.tenants.filter(tenant => !tenant.archived)
      const prunedTenants = filteredTenants.map(tenant => (
        { key: tenant.id, value: `${tenant.firstName} ${tenant.lastName}` }
      ))

      return prunedTenants
    });

export const updateTicket = (update, ticketId, context) => 
  context.apiCall('put', `/tickets/${ticketId}`, update, { success: "Ticket updated!" });
