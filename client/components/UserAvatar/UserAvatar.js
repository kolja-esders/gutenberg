import React from 'react';
import { Image, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'found';

import styles from './UserAvatar.scss';

export default class UserAvatar extends React.Component {

  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
    }),
    size: PropTypes.number
  }

  static defaultProps = {
    size: 50
  }

  render() {
    const { user } = this.props;
    const profileImage = `https://s3-eu-west-1.amazonaws.com/gutenberg-images/profile/${user.profileImage}`;
    return (
      <Popup
        className={styles.root}
        position='top center'
        inverted
        trigger={
          <Image src={profileImage} avatar centered style={{ height: this.props.size, width: this.props.size }} />
        }
      >
        <Popup.Header className={styles.tooltipHeader}>
          {`${user.firstName} ${user.lastName}`}
        </Popup.Header>
      </Popup>
    )
  }
}
