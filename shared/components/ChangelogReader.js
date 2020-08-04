import React from "react";
import PropTypes from "prop-types";

import {
  Paragraph,
  Subheading,
  Heading,
  TextLink,
  Modal,
  HelpText,
} from "@contentful/forma-36-react-components";

const CHANGELOG_PATH = require("../CHANGELOG.md");

class ChangelogReader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changelogMarkdown: "",
      updateData: [],
      isShown: false,
    };

    this.setShown = this.setShown.bind(this);
  }

  componentDidMount() {
    const changelogText = CHANGELOG_PATH;

    // assign to a node and parse w/ vanilla javascript
    const wrapper = document.createElement("div");
    wrapper.innerHTML = changelogText;

    // construct the data structure for each change update: { date: <date>, items: [] }
    const updates = Array.from(wrapper.querySelectorAll("h3")).map(
      (dateNode) => {
        return {
          date: new Date(dateNode.textContent).toLocaleDateString("en-US"),
          items: Array.from(
            dateNode.nextElementSibling.querySelectorAll("li")
          ).map((liNode) => liNode.textContent),
        };
      }
    );

    this.setState({
      changelogMarkdown: changelogText,
      updateData: updates,
    });
  }

  setShown() {
    this.setState((oldState) => {
      return {
        isShown: !oldState.isShown,
      };
    });
  }

  render() {
    if (!this.state.updateData.length) return null;

    const latestUpdate = this.state.updateData[0];
    const updatedWithin3Days =
      Math.abs(Date.parse(latestUpdate.date) - Date.now()) /
        (1000 * 60 * 60 * 24) <
      3; // days

    return (
      <div className="changelog-reader">
        <HelpText className={updatedWithin3Days ? "f36-color--positive" : ""}>
          Extension last updated: {latestUpdate.date}
        </HelpText>
        <TextLink onClick={this.setShown}>View changelog</TextLink>
        <Modal
          isShown={this.state.isShown}
          title="Changelog"
          onClose={this.setShown}
        >
          {this.state.updateData.map((update) => {
            return (
              <div>
                <Subheading>{update.date}</Subheading>
                <ul>
                  {update.items.map((item) => {
                    return (
                      <li>
                        <Paragraph>{item}</Paragraph>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </Modal>
      </div>
    );
  }
}

ChangelogReader.propTypes = {};
ChangelogReader.defaultProps = {};

export default ChangelogReader;
