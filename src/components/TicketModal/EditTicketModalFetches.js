import * as axios from 'axios';
import Toast from '../../utils/toast';
import RoleEnum from '../../Enums/RoleEnum';

const makeAuthHeaders = (user) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

export const fetchAllTenants = (user) => {
  return axios
    .get(`/api/tenants`, {}, makeAuthHeaders(user))
    .then(({ data }) => {
      const filteredTenants = data.tenants.filter(tenant => !tenant.archived)
      const prunedTenants = filteredTenants.map(tenant => (
        { key: tenant.id, value: `${tenant.firstName} ${tenant.lastName}` }
      ))

      return prunedTenants
    })
    .catch((error) => {
      Toast(error.message, "error");
    });
}

export const fetchAllManagers = (user) => {

  return axios
    .get(`/api/user?r=${RoleEnum.PROPERTY_MANAGER}`, makeAuthHeaders(user))
    .then(({ data }) => {
      const prunedManagers = data.users.map(manager => (
        { key: manager.id, value: `${manager.firstName} ${manager.lastName}` }
      ))
      return prunedManagers;
    })
    .catch((error) => {
      Toast(error.message, "error");
    });
}

export const fetchAllUsers = async (user) => {

  const URLs = ['/api/user?r=3', '/api/user?r=4'];

  const fetchData = URL => {
    return axios
      .get(URL, makeAuthHeaders(user))
      .then(({ data }) => {

        return data.users
      })
      .catch(err => {
        Toast(err, "error");
      });
  };

  return Promise.all(URLs.map(url => fetchData(url)))
    .then(users => {
      console.log(users)
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

export const updateTicket = async (user, update, ticketId) => {

  return axios.put(`/api/tickets/${ticketId}`, update, makeAuthHeaders(user))
    .then(({ data }) => {
      return data
    })
    .catch((error) => {
      Toast(error.message, "error");
      console.log(error)
    })
}
