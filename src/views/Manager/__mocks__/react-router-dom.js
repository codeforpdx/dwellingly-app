import React from 'react';
const reactRouterDom = require('react-router-dom');

// Render plain div with children
reactRouterDom.BrowserRouter = ({children}) => <div>{children}</div>
module.exports = reactRouterDom;