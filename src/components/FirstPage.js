import { TypeAnimation } from 'react-type-animation';
import "./FirstPage.css";
// import image from './firstpage.png';
import { useNavigate } from 'react-router-dom';



const Firstpagecontent = () => {

  const navigate = useNavigate();
  return (
    <div className="Firstpage-main">
      <div className="Header1">
        <p>JobAI</p>
        <h2 className='button1' onClick={() => navigate('login')}>Login</h2>
      </div>
      <center><div className='Firstpage-content'>With the power of <font color="blue" size="20px">AI</font><br />
        revolutionalize job search with<br />
        <font color="blue" size="20px"><TypeAnimation
          sequence={[
            'Smart', // Types 'One'
            1000, // Waits 1s
            '',   // Deletes 'One'
            'Personalized', // Types 'Two'
            2000, // Waits 2s
            ''  // Deletes 'Two'
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: '2em', display: 'inline-block' }}
        /></font><br /> recommendations.<br />
        <button className="get-started" onClick={() => navigate('signup')}>
          GET STARTED
        </button>
      </div></center>
    </div>
  );
};

export default Firstpagecontent;