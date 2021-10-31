import React from 'react';
import { Link } from 'react-router-dom';
import './dashboardmodule.scss';
import PropTypes from "prop-types";

function DashboardModule(props) {
  const { data, title, link} = props;


  if (data) {

    return (
      <div className="dashboard__module">
        <Link to={link}>
          <div className="dashboard__module_header">
            <h3 className="dashboard__module_title h2">{title}</h3>
            <span className="icon dashboard__module_title_link">
              <i className="fas fa-chevron-right"></i>
            </span>
          </div>
        </Link>
        <div className="dashboard__grid">
        {
          data.map((item) => {
            return (
              <React.Fragment key={item.id}>
                  <p className="dashboard__module_stat">{item.stat}</p>
                  <p className="dashboard__module_desc">{item.desc}</p>
                  <p className="dashboard__module_subtext">{item.subtextStat}</p>
                  <p className="dashboard__module_subtext">{item.subtext}</p>
              </React.Fragment>
            )
          })
        }
        </div>
      </div >
    );
  }
  else {
    return (
      <div className="dashboard__module">
        <div className="dashboard__module_header">
          <h3 className="dashboard__module_title h2">Loading</h3>
        </div>

        <h6>Loading...</h6>

      </div >
    )
  }
};

DashboardModule.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  data: PropTypes.array,
}

export default DashboardModule;
