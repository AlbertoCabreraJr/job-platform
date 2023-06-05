import { useState, useEffect } from 'react'
import axios from 'axios'
import { RAPID_API_KEY } from '@env'

const rapidApiKey = RAPID_API_KEY

const useFetch = (endpoint: string, query: any) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: { ...query }
  }

  const fetchData = async () => {
    setIsLoading(true)

    try {
      const response = await axios.request(options)
      setData(response.data.data)
    } catch (error) {
      setError(error)
      alert('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, isLoading, error, refetch }
}

export default useFetch