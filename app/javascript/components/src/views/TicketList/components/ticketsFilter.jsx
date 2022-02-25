import React, { useEffect, useState } from 'react';
import { formatDate } from '../../../utils/date';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function Filter(props) {
    const { input, placeholderMessage } = props;
    const [status, setStatus] = useState('');

    let timerId;
    const throttleFunction = (func, delay) => {
        if (timerId) {
            return
        }
        timerId = setTimeout(() => {
            func()
            timerId = undefined
        }, delay)
    };

    useEffect(() => {
        if (status) {
            onChangeHandler();
        }
    }, [status]
    );

    const onChangeHandler = () => {
        throttleFunction(searchInput, 800)
    };

    const handleStatus = (e) => {
        setStatus(e.currentTarget.id);
    };

    const clearDate = () => {
        document.getElementById("filterDate").value = "";
        props.setIsFilteredStateFalse();
    };

    const searchInput = () => {
        let allData = input;
        let output = [];
        let date = formatDate(document.getElementById("filterDate").value);
        let searchTokens = [];

        date ? searchTokens.push(date) : null;
        status ? searchTokens.push(status) : null;
        if (searchTokens.length > 0) {
            for (var i = 0; i < allData.length; i++) {
                let dataPoint = Object.assign({}, allData[i]);
                delete dataPoint.id;
                delete dataPoint.updated_at;
                let dataValues = Object.values(dataPoint).toString().toLowerCase()
                if (searchTokens.every(cur => dataValues.includes(cur))) {
                    output.push(allData[i]);
                }

            }
            props.setOutputState(output, true);
        }
        else {
            props.setIsFilteredStateFalse();
        }
    };

    return (
        <div>
            <div className="section-row">
                <div className="filter-control">
                    <label>Opened From</label>
                    <input type="date" id="filterDate" onChange={onChangeHandler} className="input is-rounded" ></input>
                </div>
                <div className="filter-control">
                    <label>Status</label>
                    <div className="buttons has-addons" >
                        <button id="open" onClick={e => handleStatus(e)} className="button is-rounded btn-group">Open </button>
                        <button id="progress" onClick={e => handleStatus(e)} className="button is-rounded btn-group">In Progress</button>
                        <button id="closed" onClick={e => handleStatus(e)} className="button is-rounded btn-group">Closed</button>
                    </div>
                </div>
                <div className="filter-control">
                    <label>Clear Filters</label>
                    <button id="clear" onClick={clearDate} className="button is-rounded">
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filter;