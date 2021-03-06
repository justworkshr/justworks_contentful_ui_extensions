import React from "react";
import PropTypes from "prop-types";

import { EntryCard } from "@contentful/forma-36-react-components";
import "../style.css";

const LoadingEntryCard = props => {
  return (
    <EntryCard
      className="entry-card loading-entry-card"
      loading={true}
      size={props.size}
    />
  );
};

LoadingEntryCard.propTypes = {
  size: PropTypes.string
};
LoadingEntryCard.defaultProps = {
  size: "small"
};

export default LoadingEntryCard;
