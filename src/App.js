import { useEffect, useState } from 'react';
import {useLocation} from 'react-router'
import './App.css';

function App() {

  
  // const location = useSearchParams()
  const location = useLocation()
  const search = new URLSearchParams(location.search).get('romans')
  
  const [roman, setRoman] = useState(search || '')
  const [arabic, setArabic] = useState(0)

  const romanConverter = (string) => {
    const roman = {
      M: 1000,
      D: 500,
      C: 100,
      L: 50,
      X: 10,
      V: 5,
      I: 1
    }
    const res = [...string.toUpperCase()].reduce((curr, prev, id, arr) =>
      prev > roman[arr[id]] ? curr -= roman[arr[id]]
        : curr += roman[arr[id]]
      , 0)
    // console.log(res)
    return res
  }

  const convert = (e) => {
    e.preventDefault()
    
    setArabic(romanConverter(roman))
  }

  useEffect(()=>{
    search && setArabic(romanConverter(search))
  }, [search])

  return (
    <div className="App">
      <header className="App-header">
        <h1>{arabic}</h1>
        <input name='roman' type='text' value={roman} onChange={(e)=>setRoman(e.target.value)} />
        <input name="convert" type='submit' value='CONVERT' onClick={(e)=>{convert(e)}} />
      </header>
    </div>
  );
}

export default App;
