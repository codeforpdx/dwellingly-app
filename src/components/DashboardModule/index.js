import React from 'react';

import './dashboardmodule.scss';

function DashboardModule(props) {
    const { data } = props;


    if (data){

    return (
        <div className="dashboard__module">
            <a href={data.link || "#"}>
                <div className="dashboard__module_header">
                    <h3 className="dashboard__module_title h2">{data.title}</h3>
                    <span className="icon dashboard__module_title_link">
                        <i className="fas fa-chevron-right"></i>
                    </span>
                </div>
            </a>
            {
                data.stats.map((statRow, index) => {
                    return (
                        <div className="dashboard__module_row" key={`module_row--${index}`}>
                            {
                                statRow.map((stat, statIndex) => {
                                    return (
                                        <div key={`stat_container--${statIndex}`} className={`dashboard__module_stat_container ${statIndex === 0 && 'primary'}`}>
                                            <p className={`dashboard__module_${data.isDate ? 'date' : 'stat'}`}>{stat.stat}</p>
                                            <p className="dashboard__module_desc">{stat.desc}
                                                {stat.subtext && <span className="dashboard__module_subtext">{stat.subtext}</span>}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div >
    );
        }
    else {
        return(
            <div className="dashboard__module">
            <div className="dashboard__module_header">
                <h3 className="dashboard__module_title h2">Loading</h3>
            </div>
            
               <h6>Loading...</h6>
            
        </div >
        )
    }
};

export default DashboardModule;
