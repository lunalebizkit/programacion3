import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {limpiarToken} from '../store/slice/inicioSesionSlice';
import IconButton from '@mui/material/IconButton';
const LogOut= ()=>{
    const user= useSelector(state=> state.inicioSesion.estado)
    const registro= useSelector(state=> state.registro.error)
    const estado= useSelector(state=> state.registro.estado)
    const {usuario}=useSelector(state=> state.inicioSesion)
    const history= useHistory()
    const dispatch= useDispatch()
    const [visible, setVisible] = useState(false)

    useEffect(()=>{
      hidebutton();
    }, [user, estado, history])

    const hidebutton = () => {
      var token= JSON.parse(localStorage.getItem('usuario'))
      alert(token?.usuario);
      if (token && token.usuario) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    const triggerLogOut = () => {
  
      limpiarStorage();
      hidebutton();
      history.push('/inicioSesion');
  };

    const limpiarStorage= ()=>{ 
      localStorage.removeItem('usuario')
      dispatch(limpiarToken())
    }; 
    
    return(
        <>{ visible && <>
        <Typography>{usuario.usuario}</Typography>
        <IconButton color='error' onClick={()=>triggerLogOut()}>
        <PowerSettingsNewIcon/></IconButton></>} </>
             
    )
}
export default LogOut;