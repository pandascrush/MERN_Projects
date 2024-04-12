import axios from 'axios'
import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

function Dashboard() {

    const nav = useNavigate()

    axios.defaults.withCredentials = true
    useEffect(()=>{
        axios.get('http://localhost:5000/auth/verify')
        .then(res => {
            if(res.data.status){
                
            }
            else{
                nav('/')
            }
        })
    },[])

  return (
    <div>
        Dashboard
    </div>
  )
}

export default Dashboard