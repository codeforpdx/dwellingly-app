import React from "react"
import { Route, Redirect } from "react-router-dom"
import * as axios from "axios"
import UserContext from "./contexts/UserContext"
import Toast from "./utils/toast"

const token = document.getElementsByName(
  "csrf-token"
)[0].content

export const auth = {
  isAuthenticated: false,
  async authenticate(email, password) {
    return axios.post("/api/users/sign_in", {
      email: email,
      password: password
    }, { headers: { "X-CSRF-Token": token } })
      .then((response) => {
        if(response){
          this.isAuthenticated = true
          Toast("Successfully logged in.", "success")
          return response
        }
      })
      .catch((error) => {
        Toast(error.response.data.error, "error")
        return null
      })
  },
  async signout() {
    return axios.delete("/api/users/sign_out", {headers: { "X-CSRF-Token": token }})
      .then((response) => {
        this.isAuthenticated = false
        localStorage.removeItem( "authenticated" )
        localStorage.removeItem( "firstName" )
        localStorage.removeItem( "lastName" )
        localStorage.removeItem( "phone" )
        localStorage.removeItem( "email" )
        localStorage.removeItem( "id" )
        localStorage.removeItem( "type" )
        localStorage.removeItem( "admin" )
        localStorage.removeItem( "staff" )
        localStorage.removeItem( "staff_level" )
        localStorage.removeItem( "property_manager" )
        Toast("Successfully logged out", "success")
        return Promise.resolve(response)
      })
      .catch((error) => {
        this.isAuthenticated = false
        localStorage.removeItem( "authenticated" )
        localStorage.removeItem( "firstName" )
        localStorage.removeItem( "lastName" )
        localStorage.removeItem( "phone" )
        localStorage.removeItem( "email" )
        localStorage.removeItem( "id" )
        localStorage.removeItem( "type" )
        localStorage.removeItem( "admin" )
        localStorage.removeItem( "staff" )
        localStorage.removeItem( "staff_level" )
        localStorage.removeItem( "property_manager" )
        Toast("Already signed out", "error")
        return Promise.resolve(error)
      })
  },
}

/* eslint-disable react/prop-types */
// User just has to be logged in to be able to hit this page
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    { context => {
      return <Route {...rest} render={(props) => (
        context.user.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{pathname: "/login", search: props.location.search}} />
      )} />
    }}
  </UserContext.Consumer>
)

// User has to be admin to be able to hit this page
export const AdminRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    { context => {
      return <Route {...rest} render={(props) => (
        context.user.isAuthenticated && context.user.admin
          ? <Component {...props} />
          : <Redirect to={{pathname: "/dashboard", search: props.location.search}} />
      )} />
    }}
  </UserContext.Consumer>
)

// User has to be staff or admin to be able to hit this page
export const StaffRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    { context => {
      return <Route {...rest} render={(props) => (
        context.user.isAuthenticated && context.user.staff_level
          ? <Component {...props} />
          : <Redirect to={{pathname: "/dashboard", search: props.location.search}} />
      )} />
    }}
  </UserContext.Consumer>
)

// User has to be property manager or staff or admin to be able to hit this page
export const PropertyManagerRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    { context => {
      return <Route {...rest} render={(props) => (
        context.user.isAuthenticated && (context.user.staff_level || context.user.property_manager)
          ? <Component {...props} />
          : <Redirect to={{pathname: "/dashboard", search: props.location.search}} />
      )} />
    }}
  </UserContext.Consumer>
)
/* eslint-enable react/prop-types */
