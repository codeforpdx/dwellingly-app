import { convertManagersDataForTable } from 'components/src/views/PropertyManagerList/util/index'

describe("Manager list util methods", () => {
   it("should be Active status when 'archived' is false and has a valid 'lastActive'", () => {
    const managersDataCopy = [
      {
        email: "user1@dwellingly.org",
        phone: "1234567890",
        password: "1234",
        firstName: "user1",
        lastName: "tester",
        archived: false,
        lastActive: "11/29/2021 12:25:44",
        role: "admin",
        properties: [],
        tenants: []
      }
    ]
    const [ result ] = convertManagersDataForTable(managersDataCopy)

    expect(result.status).toEqual('Active')
  });

  it("should be Archived status when 'archived' is true and has a valid 'lastActive'", () => {
    const managersDataCopy = [
      {
        email: "user1@dwellingly.org",
        phone: "1234567890",
        password: "1234",
        firstName: "user1",
        lastName: "tester",
        archived: true,
        lastActive: "11/29/2021 12:25:44",
        role: "admin",
        properties: [],
        tenants: []
      }
    ]
    const [ result ] = convertManagersDataForTable(managersDataCopy)

    expect(result.status).toEqual('Archived')
  });

  it("should be Archived status when 'archived' is true and 'lastActive' is undefined", () => {
    const managersDataCopy = [
      {
        email: "user1@dwellingly.org",
        phone: "1234567890",
        password: "1234",
        firstName: "user1",
        lastName: "tester",
        archived: true,
        role: "admin",
        properties: [],
        tenants: []
      }
    ]
    const [ result ] = convertManagersDataForTable(managersDataCopy)

    expect(result.status).toEqual('Archived')
  });

  it("should be Pending status when 'archived' is false and 'lastActive' is undefined", () => {
    const managersDataCopy = [
      {
        email: "user1@dwellingly.org",
        phone: "1234567890",
        password: "1234",
        firstName: "user1",
        lastName: "tester",
        archived: false,
        role: "admin",
        properties: [],
        tenants: []
      }
    ]
    const [ result ] = convertManagersDataForTable(managersDataCopy)

    expect(result.status).toEqual('Pending')
  });
});
