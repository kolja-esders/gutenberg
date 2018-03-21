import React from 'react';
import BodyClassName from 'react-body-classname';
import { Button, Grid, Segment, Rating, Header } from 'semantic-ui-react';
import { Link } from 'found';
import { Helmet } from 'react-helmet';

import styles from './WelcomeView.scss';

import Footer from '../Footer';

class WelcomeView extends React.Component {

  //componentDidMount = () => {
    //window.addEventListener('scroll', this.handleScroll);
  //}

  //componentWillUnmount = () => {
    //window.removeEventListener('scroll', this.handleScroll);
  //}

  //handleScroll = (e) => {
    //let supportPageOffset = window.pageXOffset !== undefined;
    //let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
    //let scroll = {
       //x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
       //y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
    //};
    ////const itemTranslate = Math.min(0, (scrollTop / 3) - 60);
    //console.log(scroll);

    //this.setState({
      //transform: itemTranslate
    //});
  //}

  render() {
    return (
      <BodyClassName className={styles.welcome}>
        <div className={styles.container} onScroll={this.onScroll}>
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
            <section className={[styles.hero, styles.inverted].join(' ')}>
              <h1>Books From Your Friends.</h1>
              <h2>Learn about your friends newly discovered books and share your tips.</h2>
            </section>
            <section>
              <Grid padded columns='equal' className={styles.sellingPoints}>
                <Grid.Row>
                  <Grid.Column className={styles.box}>
                    <Segment className={styles.content}>
                      <Rating className={styles.rating} disabled size='massive' rating={5} maxRating={5} />
                      <Header size='huge'>Stars You Care About</Header>
                      <p className={styles.desc}>
                        Did you ever wonder whether you would actually like the book with the 5-star rating from random strangers that might have a very different taste in things?
                      </p>
                      <p className={styles.desc}>
                        Gutenberg is here to help. See what friends with a similar taste in books like and find the next book you'll love.
                      </p>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column className={styles.box}>
                    <Segment className={styles.content}>
                      <div className={styles.iconContainer}>
                        <div className={styles.friendsAIcon} />
                        <div className={styles.friendsBIcon} />
                        <div className={styles.friendsCIcon} />
                      </div>
                      <Header size='huge'>You and Your Friends</Header>
                      <p className={styles.desc}>
                        Whether your soccer team mates, travel friends, or chess opponent, Gutenberg can accommodate them all.
                      </p>
                      <p className={styles.desc}>
                        Just create a group and invite them to see what they are reading and learning about.
                      </p>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column className={styles.box}>
                    <Segment className={styles.content}>
                      <div className={styles.iconContainer}>
                        <div className={styles.onePlaceIcon} />
                      </div>
                      <Header size='huge'>All in One Place</Header>
                      <p className={styles.desc}>
                        Create your personal library with all your favorite books in one place.
                      </p>
                      <p className={styles.desc}>
                        Saw that super interesting book in a shop window? Mark it as <span className={styles.emph}>to-read</span> so that you never forget about it.
                      </p>
                      <p className={styles.desc}>
                        Tracking your books was never so easy.
                      </p>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </section>

            <section className={styles.extendedFeature}>
              <h1>How It Works</h1>
            </section>
            <section>
              <div className={styles.tileWrap}>
                <div className={styles.tile}>
                  <div className={styles.tileHead} style={{ backgroundColor: '#66bb6a' }}>
                    <span className={styles.tileHeadText}>
                      1.
                    </span>
                  </div>
                  <Header size='huge'>Sign up</Header>
                  <div className={styles.expl}>
                    <p>See that button right below?<br/>
                     Gently press it to get started!</p>
                    <Button color='green' as={Link} to='/signup'>Sign up</Button>
                  </div>
                </div>
                <div className={styles.tile}>
                  <div className={styles.tileHead} style={{ backgroundColor: '#42a5f5' }}>
                    <span className={styles.tileHeadText}>
                      2.
                    </span>
                  </div>
                  <Header size='huge'>Find your books</Header>
                  <div className={styles.expl}>
                    <p>
                      Simply find books you've read and build your personal library.
                    </p>
                    <p>
                      Always wanted to learn about Jujutsu? Just add <span className={styles.emph}>Jujutsu for Dummies</span> to your to-do list.
                    </p>
                  </div>
                </div>
                <div className={styles.tile}>
                  <div className={styles.tileHead} style={{ backgroundColor: '#ef5350' }}>
                    <span className={styles.tileHeadText}>
                      3.
                    </span>
                  </div>
                  <Header size='huge'>Share with friends</Header>
                  <div className={styles.expl}>
                    <p>
                      Create a group, invite your friends, and learn about the latest and greatest discovery of your friends.
                    </p>
                    <p>
                      As easy as pie. Just maybe not as tasty.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </BodyClassName>
    );
  }
}

export default WelcomeView;
