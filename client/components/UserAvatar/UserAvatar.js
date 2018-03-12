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
    return (
      <Popup
        className={styles.root}
        position='top center'
        inverted
        trigger={
          <Link to='/' className={styles.link} style={{height: this.props.size, width: this.props.size}} >
            <Image src={require(`../../assets/${user.profileImage}`)} avatar style={{height: this.props.size, width: this.props.size}} />
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
