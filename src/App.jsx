import './index.css';
import Cursor     from './components/Cursor';
import Nav        from './components/Nav';
import Hero       from './components/Hero';
import About      from './components/About';
import Skills     from './components/Skills';
import Projects   from './components/Projects';
import Experience from './components/Experience';
import Footer     from './components/Footer';


export default function App() {
  return (
    <>
        <Cursor />
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Footer /> 
    </>
  );
}
