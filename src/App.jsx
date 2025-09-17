import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react'

function App() {
  const [displayData, setDisplayData] = useState([])
  const [allData, setAllData] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').then(data => data.json())
    .then(data => setAllData(data)).catch(error => alert(error))

    console.log(allData)
    displayData.push(allData[0])
  }, [])

  useEffect(() => {
    setDisplayData(allData.slice(0, 10))
  }, [allData])

  const handlePrevious = () => {
    const newPage = page - 1;
    if (newPage != 0) {
      setPage(newPage);
      setDisplayData(allData.slice((newPage - 1) * 10, newPage * 10));
    }
  }

  const handleNext = () => {
    const newPage = page + 1;
    if (newPage * 10 < allData.length + 10) {
      setPage(newPage);
      setDisplayData(allData.slice((newPage - 1) * 10, newPage * 10));
    }
  }

  return (
    < div style={{ width: '550px', display : 'flex'  , justifyContent : 'center', flexDirection : 'column'}}>

      <h1 style={{textAlign : 'center'}}>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>ID</th>
            <th style={{ width: '150px' }}>Name</th>
            <th style={{ width: '250px' }}>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {displayData?.map((data, index) => (
            <tr key={index}>
              <td>{data?.id}</td>
              <td>{data?.name}</td>
              <td>{data?.email}</td>
              <td>{data?.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px', width: '550px' }}>
        <button onClick={handlePrevious}>Previous</button>
        <div>{page}</div>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}

export default App
