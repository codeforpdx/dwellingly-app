import React from 'react';

function DashboardModule(props){
    const {data} = props;
    return(
        <div className="dashboard__module">
            <div className="dashboard__module_header">
                <h3 className="dashboard__module_title h2">{data.title}</h3>
            </div>
            {
                data.stats.map((statRow,index)=>{
                    console.log(statRow);
                    return (
                        <div className="dashboard__module_row" key={`module_row--${index}`}>
                            {
                                statRow.map((stat,statIndex)=>{
                                    console.log(stat.stat);
                                    return (
                                        <div key={`stat_container--${statIndex}`}className={`dashboard__module_stat_container ${statIndex === 0 && 'primary'}`}>
                                            <p className="dashboard__module_stat">{stat.stat}</p>
                                            <p className="dashboard__module_desc">{stat.desc}</p>
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
};

export default DashboardModule;