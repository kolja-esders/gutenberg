import React from 'react';
import BodyClassName from 'react-body-classname';
import { Button, Grid, Segment, Rating, Header } from 'semantic-ui-react';
import { Link } from 'found';
import { Helmet } from 'react-helmet';
import styles from './WelcomeView.scss';

class WelcomeView extends React.Component {
  render() {
    return (
      <BodyClassName className={styles.welcome}>
        <div className={styles.container}>
          <Helmet>
            <title>Gutenberg</title>
          </Helmet>
          <header className={styles.header}>
            <h1 className={styles.brandName}>
              <Link to='/' className={styles.brandNameLink}>Gutenberg</Link>
            </h1>
            <nav className={styles.nav}>
              <div>
                <Button basic inverted as={Link} to='/login' className={styles.item}>Log in</Button>
                <Button color='green' as={Link} to='/signup' className={styles.item}>Sign up</Button>
              </div>
            </nav>
          </header>
          <main className={styles.content}>
            <section id={styles.hero} className={styles.inverted}>
              <div className={styles.centeredContainer}>
                <h1>Books From Your Friends.</h1>
                <h2>Learn about your friends newly discovered books and share your tips.</h2>
              </div>
            </section>

            <section>
              <Grid padded columns='equal' className={styles.sellingPoints}>
                <Grid.Row>
                  <Grid.Column className={styles.box}>
                    <Segment className={styles.content}>
                      <Rating className={styles.rating} disabled size='massive' rating={5} maxRating={5} />
                      <Header size='huge'>Stars You Care About</Header>
                      <p className={styles.desc}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column className={styles.box}>
                    <Segment className={styles.content}>
                      <Header size='huge'>All Your Friends in One Place</Header>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column className={styles.box}>
                    <Segment className={styles.content}>
                      <Header size='huge'>The Things You Love</Header>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </section>
            <section className={styles.extendedFeature}>
              <h1>How It Works</h1>
            </section>
          </main>
        </div>
      </BodyClassName>
    );
  }
}

export default WelcomeView;
