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
      profileImage: PropTypes.string.isRequired
    }),
  }

  render() {
    const { user } = this.props;
    return (
      <Popup
        className={styles.root}
        position='top center'
        inverted
        trigger={
          <Link to='/' className={styles.link} >
            <Image src={require(`../../assets/${user.profileImage}`)} avatar />
          </Link>
        }
      >
        <Popup.Header className={styles.tooltipHeader}>
          {`${user.firstName} ${user.lastName}`}
        </Popup.Header>
      </Popup>
    )
  }
}
