// import React, { useEffect } from 'react'
// import { Controller, useForm } from 'react-hook-form'
// import { useNavigate, Link } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { Card, TextField, Container, Button, Collapse } from '@mui/material'
// import { loginAction } from '../store/auth/authActions'
// import { reset } from '../store/auth/authSlice'
// import LogInAlert from '../components/alerts/LogIn'

// const Login = () => {
//   const { control, handleSubmit } = useForm()
//   const { isLoggedIn, authErr, isLoading, username } = useSelector(state => state.auth)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   useEffect(() => {
//     if (isLoggedIn)
//       navigate('/')
//   }, [isLoggedIn, navigate])

//   const navigateToSignUp = () => dispatch(reset())

//   const onSubmit = data => dispatch(loginAction({
//     username: data.email,
//     password: data.password,
//   }))

//   return (
//     <Container>
//       <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
//         <h2>Log in</h2>
//         <Link to={'/signup'} onClick={navigateToSignUp}>or Sign Up</Link>
//         <Controller
//           name={'email'}
//           control={control}
//           defaultValue={username}
//           render={({ field }) => (
//             <TextField sx={{ width: 1/2, my: 1 }} { ...field } label={'email'} />
//           )}
//         />
//         <Controller
//           name={'password'}
//           control={control}
//           defaultValue=""
//           render={({ field }) => (
//             <TextField sx={{ width: 1/2, my: 1 }} { ...field } label={'password'} />
//           )}
//         />
//         <Button
//           disabled={isLoading}
//           sx={{ width: 1/2, mt: 1, mb: 2 }}
//           color="primary"
//           variant="outlined"
//           onClick={handleSubmit(onSubmit)}
//         >
//           Submit
//         </Button>
//       </Card>
//       <Collapse in={!!authErr} sx={{ width: 1, mt: 1 }}>
//         <LogInAlert err={authErr} />
//       </Collapse>
//     </Container>
//   );
// }

// export default Login;
