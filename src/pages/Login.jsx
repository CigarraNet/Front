import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../context/TokenContext'

function Login() {

  const [numeroDocumento, setNumeroDocumento] = useState('')
  const [passWord, setPassWord ] = useState('')
  const navigate = useNavigate()
  const [mensajeError, setMensajeError] = useState('')
  const {setToken} = useContext(TokenContext)

  const Login = async () =>{
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `username=${encodeURIComponent(numeroDocumento)}&password=${encodeURIComponent(passWord)}`
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/empleados/login', requestOptions)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Error al inicio sesion')
      }

      setToken(data.access_token)
      navigate('/')
    }catch(error){
      setMensajeError(error.message)
    }

  }
  const handleSubmit = e => {
    e.preventDefault()
    Login()
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder='Numero documento' onChange={
        e => {
          e.preventDefault(
            setNumeroDocumento(e.target.value)
          )
        }
      }  value={numeroDocumento}/>
      <input type="passWord"  placeholder='Contraseña ' onChange={
        e => {
          e.preventDefault()
          setPassWord(e.target.value)
        }
      } value={passWord}/>
      <p>{mensajeError}</p>
      <button>Inicio sesion</button>
    </form>
    </>
  )
}

export default Login