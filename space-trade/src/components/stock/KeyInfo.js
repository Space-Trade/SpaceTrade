import React from "react";
import PropTypes from "prop-types";

const KeyInfo = ({keyData, keyDataLabel}) => (
  <div className="Key-info">
    <h3>
      Key Informations
    </h3>
    <div className="Key-info__columns">
      {keyData.map((val, index) => {
        return (
          <div className="Key-info__info" key={index}>
            <h4 className="Key-info__label">{keyDataLabel[parseInt(index)]}</h4>
            <h3>{val}</h3>
          </div>
        );
      })}
    </div>
  </div>
);

KeyInfo.propTypes = {
  keyData: PropTypes.array,
  keyDataLabel: PropTypes.array,
};

export default KeyInfo;
