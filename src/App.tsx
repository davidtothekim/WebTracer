// Styles
import './styles/style.scss'

// Dependencies
import { useState, useEffect } from 'react'

// Components
import Header from './components/Header/Header';
import Main from './components/Main/Main';


function App() {

  // States
  const [webtimeData, setWebtimeData] = useState([]);
  const [screentimeData, setScreentimeData] = useState(0);

  // Functions
    // Get webtracking data from service context
  const fetchWebtimeData = () => {
    chrome.runtime.sendMessage({cmd: 'getWebsiteTimes'}, response => {
      setWebtimeData(response)
      // console.log(response);
    })
  }

  // Get total screen time data from service context
  const fetchScreentimeData = () => {
    chrome.runtime.sendMessage({cmd: 'getTotalScreenTime'}, response => {
      setScreentimeData(response);
    })
  }

  // useEffects
  useEffect(() => {
    fetchWebtimeData();
    fetchScreentimeData();
    const intervalId: number = setInterval(() => {fetchWebtimeData(); fetchScreentimeData()}, 5000); // fetch data every 5 seconds

    // Clean up
    return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      <Header/>
      <Main webtimeData={webtimeData} setWebtimeData={setWebtimeData} screentimeData={screentimeData} setScreentimeData={setScreentimeData}/>
    </>
  )
}

export default App
