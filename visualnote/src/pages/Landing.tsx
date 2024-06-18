import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

type Props = {};

function Landing(props: Props): JSX.Element {
 return (
  <div>
   <Navbar />
   <Hero />
  </div>
 );
}

export default Landing;
