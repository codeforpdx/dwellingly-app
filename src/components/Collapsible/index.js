import React, {useState} from 'react';
import './collapsible.scss';

function Collapsible(props) {
    const { children, title, count } = props;
    const countAsNumber = +(count || 0);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setIsCollapsed(countAsNumber ? !isCollapsed : false);
    }

    return (
        <div className={`collapsible ${isCollapsed && 'isCollapsed'} ${!countAsNumber && 'isDisabled'}`}>
            <div className="collapsible__header">
                <h3 className="collapsible__header_title" onClick={toggleCollapsed}>
                    {title}<span className="count"> ({countAsNumber})</span>
                </h3>
                <button 
                    className='collapsible__toggle'
                    onClick={toggleCollapsed}
                >
                    <span className="icon">
                        <i className="fas fa-chevron-down"></i>
                    </span>
                </button>
            </div>
            {countAsNumber
                ? children
                : (<></>)
            }
        </div>
    );
};

export default Collapsible;