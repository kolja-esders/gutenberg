import React from 'react';
import { Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import styles from './UserAvatar.scss';

export default class UserAvatar extends React.Component {

  static propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
    }),
    size: PropTypes.number,
    showPopup: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    size: 50,
    showPopup: false,
    className: ''
  }

  render() {
    const { user } = this.props;
    const profileImage = `https://s3-eu-west-1.amazonaws.com/gutenberg-images/profile/${user.profileImage}`;

    if (!this.props.showPopup) {
      return <div className={[styles.image, this.props.className].join(' ')} style={{ backgroundImage: `url(${profileImage})`, height: this.props.size, width: this.props.size }} />;
    }

    return (
      <Popup
        className={styles.root}
        position='top center'
        inverted
        trigger={
          <div className={styles.image} style={{ backgroundImage: `url(${profileImage})`, height: this.props.size, width: this.props.size }} />
        }
      >
        <Popup.Header className={styles.tooltipHeader}>
          {`${user.firstName} ${user.lastName}`}
        </Popup.Header>
      </Popup>
    );
  }
}
