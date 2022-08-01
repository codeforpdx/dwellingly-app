import React, { useContext, useEffect, useState } from 'react';
import { SearchPanel, SearchPanelVariant } from "react-search-panel";
import UserContext from '../../../contexts/UserContext';
import { tabletWidth } from '../../../constants';
import { useMediaQuery } from '@react-hook/media-query';
import { AddProperty } from '../../AddProperty';
import Modal from '../Modal';


const matchProperties = (ids, propertyList) => {
  if(ids && ids.length > 0 && propertyList && propertyList.length > 0) {
    return ids?.map(id => ({
      key: id,
      description: propertyList.find(property => property.key == id)?.description
       ?? "Unknown property"
    }));
  }
};

const PropertySearchPanel = (props) => {
  const { initialPropertyIds, propertySelections, setPropertySelection, multiSelect, showAddPropertyButton } = props;
  const context = useContext(UserContext);
  const [propertySearchText, setPropertySearchText] = useState("");
  const [propertyOptions, setPropertyOptions] = useState([]);
  const [propertySearchResults, setPropertySearchResults] = useState([]);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${tabletWidth})`);

  useEffect(() => {
    getProperties()
      .then((properties) => {
        if(properties && properties.length > 0) {
          setPropertySelection(matchProperties(initialPropertyIds, properties));
        }
      });
  }, []);

  useEffect(() => {
    let choices = propertyOptions.filter(
      p => p.description.toLowerCase().includes(propertySearchText.toLowerCase()));
    setPropertySearchResults(choices);
  }, [propertySearchText, propertyOptions]);

  const propertyOptionFormat = (property) => {
    return {
      key: property.id,
      description: `${property.name}, ${property.address}`
    }
  };

  const getProperties = () => {
    return context.apiCall('get', `/properties`, {}, {})
      .then(({ data }) => {
        let properties = data && data.length > 0
          ? data.map(property => {
            return propertyOptionFormat(property)
          })
          : [];
        setPropertyOptions(properties);
        setPropertySearchResults(properties);
        setShowAddPropertyModal(false);
        return properties;
      });
  };

  const assignCreatedProperty = (property) => {
    getProperties().then(properties => {
      if(!property || !properties) return null;
      let matchedProperty = properties.find(p => p.key == property.id);
      if(propertySelections && propertySelections.length > 0) {
        setPropertySelection(propertySelections?.concat(matchedProperty));
      } else {
        setPropertySelection([matchedProperty]);
      }
    });
  };

  const handlePropertySearch = (event) => {
    const { value } = event.target;
    if(!value || value.length === 0) {
      setPropertySearchResults(propertyOptions);
      setPropertySearchText("");
    } else {
      setPropertySearchText(value);
    }
  };

  const handleAddPropertyCancel = () => {
    setShowAddPropertyModal(false);
  }

  return (
    <div>
      <SearchPanel
        chips
        clearLabel="Clear search text"
        placeholder="Search Properties"
        small
        width={isMobile ? 300 : 400}
        variant={multiSelect ? SearchPanelVariant.checkbox : SearchPanelVariant.radio}
        choices={propertySearchResults}
        value={propertySearchText}
        onSelectionChange={setPropertySelection}
        onChange={handlePropertySearch}
        onClear={handlePropertySearch}
        preSelectedChoices={propertySelections}
        shadow
      />
      {showAddPropertyButton && <button
        className="add-property-button"
        onClick={() => setShowAddPropertyModal(!showAddPropertyModal)}
        type="button"
      >
        <i className="fas fa-plus-circle icon-inline-space"></i>
        Create New Property
      </button>}
      {showAddPropertyModal &&
        <Modal
          titleText="Create New Property"
          content={<AddProperty
            showPageTitle={false}
            afterCreate={assignCreatedProperty}
            handleCancel={handleAddPropertyCancel}
            showAssignPropManagers={false}
            />}
          hasButtons={false}
          closeHandler={handleAddPropertyCancel}
        />
      }
    </div>
  )
};

export default PropertySearchPanel;