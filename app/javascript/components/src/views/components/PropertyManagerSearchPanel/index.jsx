import React, { useContext, useEffect, useState } from 'react';
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import UserContext from '../../../contexts/UserContext';
import { tabletWidth } from '../../../constants';
import { useMediaQuery } from '@react-hook/media-query';

const matchManagers = (ids, managerList) => {
  if (ids && ids.length > 0 && managerList && managerList.length > 0) {
    return ids?.map(id => ({
      key: id,
      description: managerList.find(manager => manager.key == id)?.description
        ?? "Unknown staff"
    }));
  }
};

const managerOptionFormat = (manager) => {
  return {
    key: manager.id,
    description: `${manager.firstName}, ${manager.lastName}`
  }
};

const PropertyManagerSearchPanel = (props) => {
  const { initialManagerIds, managerSelections, setManagerSelections, multiSelect } = props;
  const context = useContext(UserContext);
  const [managerSearchText, setManagerSearchText] = useState("");
  const [managerOptions, setManagerOptions] = useState([]);
  const [managerSearchResults, setManagerSearchResults] = useState([]);
  const isMobile = useMediaQuery(`(max-width: ${tabletWidth})`);

  useEffect(() => {
    getPropertyManagers()
      .then((managerList) => {
        if (managerList && managerList.length > 0) {
          setManagerSelections(matchManagers(initialManagerIds, managerList));
        }
      });
  }, []);

  useEffect(() => {
    let choices = managerOptions.filter(
      s => s.description?.toLowerCase().includes(managerSearchText.toLowerCase()));
    setManagerSearchResults(choices);
  }, [managerSearchText, managerOptions]);

  const getPropertyManagers = () => {
    return context.apiCall('get', `/property_managers`, {}, {})
      .then(({ data }) => {
        let managerList = data.map(manager => managerOptionFormat(manager));
        setManagerOptions(managerList);
        setManagerSearchResults(managerList);
        return managerList;
      });
  };

  const handleManagerSearch = (event) => {
    const { value } = event.target;
    if (!value || value.length === 0) {
      setManagerSearchResults(managerOptions);
      setManagerSearchText("");
    } else {
      setManagerSearchText(value);
    }
  };

  return (
    <SearchPanel
      chips
      clearLabel="Clear search text"
      placeholder="Search Property Managers"
      small
      width={isMobile ? 300 : 400}
      variant={multiSelect ? SearchPanelVariant.checkbox : SearchPanelVariant.radio}
      choices={managerSearchResults}
      value={managerSearchText}
      onSelectionChange={setManagerSelections}
      onChange={handleManagerSearch}
      onClear={handleManagerSearch}
      preSelectedChoices={managerSelections}
      shadow
    />
  )
};

export default PropertyManagerSearchPanel;