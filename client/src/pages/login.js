import { useState, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [alert, setAlert] = useState({
        message: "",
        status: "",
    });

    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/users/login', form)
            .then(resp => {
                // setLoggedIn(true)
                // setUserInfo(resp.data.user)
                setAlert({
                    message: resp.data.message,
                    status: 'success'
                })
                setTimeout(() => {
                    // if (resp.data.user.role == 1)
                    //     return navigate('/home-page')


                    navigate('/home-page')
                }, 1000)

            })
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })

    }




    return <div className="container_login">
        <div className="phone_image">
            <img src="https://i.pinimg.com/originals/9c/60/d8/9c60d8083f3f2253ce9a3bfdc01ebb68.png" alt="" />
        </div>
        <h1>Prisijungimas</h1>
        {alert.message && (
            <div className={"alert alert-" + alert.status}>{alert.message}</div>
        )}

        <form onSubmit={handleSubmit} className='login_form'>

            <div className="login_email">
                <label>El. Pastas</label>
                <input
                    type="email"
                    name="email" onChange={handleForm} />
            </div>

            <div className="login_password">
                <label>Slaptazodis</label>
                <input
                    type="password"
                    name="password" onChange={handleForm} />
            </div>
            <button className="button-34">Prisijungti</button>
        </form>
    </div>
}

export default Login