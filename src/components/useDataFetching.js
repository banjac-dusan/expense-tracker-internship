import { useEffect, useState } from "react"
import axios from "axios"

function useDataFetching(props) {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get(`http://localhost:3000/${props.url}`)
            .then(res => {
                console.log(res)
                setData(res.data)
            })
            .catch (err => {
                console.log(err.message)
                setError(true)
                
            })
            .finally (setLoading(false))

    },[])

    return (
        {data, loading, error} 





    //     <>
    // { error ? <p>Something whent wrong, try again</p> : <div>
    //     {loading ? <p>Loading...</p> : <ul>
    //         {data.map(d => (
    //         <li key={d.id}>{d.type}{d.amount}</li>
    //         ))}
    //     </ul>}
    // </div>}
    // </>
  )
}

export default useDataFetching;