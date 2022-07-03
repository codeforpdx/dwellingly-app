import React, { useContext, useEffect, useState } from 'react';
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import UserContext from '../../../contexts/UserContext';
import { tabletWidth } from '../../../constants';
import { useMediaQuery } from '@react-hook/media-query';

const matchStaff = (ids, staffList) => {
  if (ids && ids.length > 0 && staffList && staffList.length > 0) {
    return ids?.map(id => ({
      key: id,
      description: staffList.find(staff => staff.key == id)?.description
        ?? "Unknown staff"
    }));
  }
};

const JoinStaffSearchPanel = (props) => {
  const { initialStaffIds, staffSelections, setStaffSelections, multiSelect } = props;
  const context = useContext(UserContext);
  const [staffSearchText, setStaffSearchText] = useState("");
  const [staffOptions, setStaffOptions] = useState([]);
  const [staffSearchResults, setStaffSearchResults] = useState([]);
  const isMobile = useMediaQuery(`(max-width: ${tabletWidth})`);

  useEffect(() => {
    getStaff()
      .then((staffList) => {
        if (staffList && staffList.length > 0) {
          setStaffSelections(matchStaff(initialStaffIds, staffList));
        }
      });
  }, []);

  useEffect(() => {
    let choices = staffOptions.filter(
      s => s.description?.toLowerCase().includes(staffSearchText.toLowerCase()));
    setStaffSearchResults(choices);
  }, [staffSearchText, staffOptions]);

  const staffOptionFormat = (staff) => {
    return {
      key: staff.id,
      description: `${staff.firstName}, ${staff.lastName}`
    }
  };

  const getStaff = () => {
    return context.apiCall('get', `/staff_members`, {}, {})
      .then(({ data }) => {
        let staffList = data.joinStaff
          .concat(data.admins)
          .map(staff => staffOptionFormat(staff));
        setStaffOptions(staffList);
        setStaffSearchResults(staffList);
        return staffList;
      });
  };

  const handleStaffSearch = (event) => {
    const { value } = event.target;
    if (!value || value.length === 0) {
      setStaffSearchResults(staffOptions);
      setStaffSearchText("");
    } else {
      setStaffSearchText(value);
    }
  };

  return (
    <SearchPanel
      chips
      clearLabel="Clear search text"
      placeholder="Search Staff Members"
      small
      width={isMobile ? 300 : 400}
      variant={multiSelect ? SearchPanelVariant.checkbox : SearchPanelVariant.radio}
      choices={staffSearchResults}
      value={staffSearchText}
      onSelectionChange={setStaffSelections}
      onChange={handleStaffSearch}
      onClear={handleStaffSearch}
      preSelectedChoices={staffSelections}
      shadow
    />
  )
};

export default JoinStaffSearchPanel;