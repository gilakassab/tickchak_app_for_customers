import React, { useContext } from 'react'
import { userContext } from '/components/App';
import '../css/Home.css'
import MainHeader from '../components/MainHeader';
import SecondHeader from '../components/SecondHeader';
function Home() {
  const { user, setUser } = useContext(userContext);
  return (
    <div>
      <MainHeader /> 
       <SecondHeader />
      {/* <Events/>
      <AboutUs />
      <Contact /> */}
    </div>
  )
}

export default Home

