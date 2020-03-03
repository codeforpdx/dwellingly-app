import React, {useState} from 'react';
import './collapsible.scss';

function Collapsible(props) {
    const { data, children, title, count } = props;

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`collapsible ${isCollapsed && 'isCollapsed'}`}>
            <div className="collapsible__header">
                <h3 className="collapsible__header_title">{title}
                {count && <span className="count"> ({count})</span>}
                </h3>
                <button href="#" className="collapsible__toggle" onClick={()=>{ setIsCollapsed(!isCollapsed)}}>
                    <span className="icon">
                        <i className="fas fa-chevron-down"></i>
                    </span>
                </button>
            </div>
            {props.children}
        </div>
    );
};

export default Collapsible;