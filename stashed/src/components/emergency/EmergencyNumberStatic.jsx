import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon/Icon';

const EmergencyNumberStatic = (props) => {
  const { emergency } = props;
  const { phoneNumberOne, phoneNumberTwo, phoneNumberThree, subtext, contact } = emergency;
  return (
    <div className="emergencyNumberItem" key={`row-${emergency.id}`}>
      <div className="emergencyTitle">
        {!props.doneEditing ? contact : props.newContact}
        {subtext !== null && subtext !== ''
          && (
          <div className="emergencyNumberDescription">
            <p>
              {!props.doneEditing ? subtext : props.newSubtext}
            </p>
          </div>
          )
        }
      </div>
      <div className="emergencyNumberContainer">
        <div className="emergencyNumber">
        {phoneNumberOne.subtext !== '' ?
          <div>
            <span>{!props.doneEditing ? phoneNumberOne.subtext : props.newNumberOne.subtext}:&nbsp;</span>
            <a href={`tel:${!props.doneEditing ? phoneNumberOne.number : props.newNumberOne.number}`}>
            {!props.doneEditing ? phoneNumberOne.number : props.newNumberOne.number}
            </a>
          </div> :
          <a href={`tel:${!props.doneEditing ? phoneNumberOne.number : props.newNumberOne.number}`}>
          {!props.doneEditing ? phoneNumberOne.number : props.newNumberOne.number}
          </a>
        }
        </div>
        {phoneNumberTwo !== undefined
          && (
          <div className="emergencyNumber">
            {phoneNumberTwo.subtext !== '' ?
              <div>
                <span>
                  {!props.doneEditing ? phoneNumberTwo.subtext : props.newNumberTwo.subtext}:&nbsp;
                </span>
                <a href={`tel:${!props.doneEditing ? phoneNumberTwo.number : props.newNumberTwo.number}`}>
                  {!props.doneEditing ? phoneNumberTwo.number : props.newNumberTwo.number}
                </a>
              </div> :
              <a href={`tel:${!props.doneEditing ? phoneNumberTwo.number : props.newNumberTwo.number}`}>
                {!props.doneEditing ? phoneNumberTwo.number : props.newNumberTwo.number}
              </a>
            }
          </div>
          )
        }
        {phoneNumberThree !== undefined
          && (
          <div className="emergencyNumber">
            {phoneNumberThree.subtext !== '' ?
              <div>
                <span>
                  {!props.doneEditing ? phoneNumberThree.subtext : props.newNumberThree.subtext}:&nbsp;
                </span>
                <a href={`tel:${!props.doneEditing ? phoneNumberThree.number : props.newNumberThree.number}`}>
                  {!props.doneEditing ? phoneNumberThree.number : props.newNumberThree.number}
                </a>
              </div> :
              <a href={`tel:${!props.doneEditing ? phoneNumberThree.number : props.newNumberThree.number}`}>
                {!props.doneEditing ? phoneNumberThree.number : props.newNumberThree.number}
              </a>
            }
          </div>
          )
        }
        <div className="emergencyNumberEditButtons">
          <div className="emergencyNumberEditIcon" onClick={props.onEditingNumber} role="presentation">
            <Icon icon="pencil" />
          </div>
          <div className="emergencyNumberIcon" onClick={props.onArchivingNumber} role="presentation">
            <Icon icon="archive" />
          </div>
        </div>
      </div>
    </div>
  );
}

EmergencyNumberStatic.propTypes = {
  doneEditing: PropTypes.bool.isRequired,
  newContact: PropTypes.string.isRequired,
  newSubtext: PropTypes.string,
  newNumberOne: PropTypes.shape({
    number: PropTypes.string.isRequired,
    subtext: PropTypes.string,
    ext: PropTypes.string
  }).isRequired,
  newNumberTwo: PropTypes.shape({
    number: PropTypes.string,
    subtext: PropTypes.string,
    ext: PropTypes.string
  }),
  newNumberThree: PropTypes.shape({
    number: PropTypes.string,
    subtext: PropTypes.string,
    ext: PropTypes.string
  }),
  onEditingNumber: PropTypes.func.isRequired,
  onArchivingNumber: PropTypes.func.isRequired,
  emergency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subtext: PropTypes.string,
    contact: PropTypes.string.isRequired,
    phoneNumberOne: PropTypes.shape({}).isRequired,
    phoneNumberTwo: PropTypes.shape({}),
    phoneNumberThree: PropTypes.shape({})
  }),
}

EmergencyNumberStatic.defaultProps = {
  emergency: null,
  newSubtext: "",
  newNumberTwo: null,
  newNumberThree: null
}

export default EmergencyNumberStatic
