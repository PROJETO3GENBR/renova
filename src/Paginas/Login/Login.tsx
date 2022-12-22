import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import {Box} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import {login} from '../../services/Service';
import UserLogin from '../../models/UserLogin';
import './Login.css';
import { toast } from 'react-toastify';


function Login() {
    let navigate = useNavigate();
    const [token, setToken] = useLocalStorage('token');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario:'',
            senha: "",
            token: ""
        }
        )

        function updatedModel(e: ChangeEvent<HTMLInputElement>) {

            setUserLogin({
                ...userLogin,
                [e.target.name]: e.target.value
            })
        }

            useEffect(()=>{
                if(token != ''){
                    navigate('/home')
                }
            }, [token])

            async function onSubmit(e: ChangeEvent<HTMLFormElement>){
                e.preventDefault();
                try{
                    await login(`/auth/logar`, userLogin, setToken)
                    toast.success('Usuário logado com sucesso!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "colored",
                        progress: undefined,
                        });
                }catch(error){
                    toast.error('Dados do usuário inconsistentes. Erro ao logar!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "colored",
                        progress: undefined,
                        });
                }
            }
    
        return (
            <Grid container direction='row' justifyContent='center' alignItems='center'>
                <Grid alignItems='center' xs={6}>
                    <Box paddingX={20}>
                        <form onSubmit={onSubmit}>
                            <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>
                            <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth />
                            <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password'fullWidth />
                            <Box marginTop={2} textAlign='center'>
                                    <Button type='submit' variant='contained' id="bt-logar">
                                        Logar
                                    </Button>
                            </Box>
                        </form>
                        <Box display='flex' justifyContent='center' marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                            </Box>
                            <Link to='/cadastrar'>
                                <Typography variant='subtitle1' gutterBottom align='center' >Cadastre-se</Typography>
                            </Link>
                                
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={6} className='imagem'>
    
                </Grid>
            </Grid>
        );
    }
    
    export default Login;