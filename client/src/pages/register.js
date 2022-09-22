import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        profile_photo: '',
        profile_name: ''



    })

    const [alert, setAlert] = useState({
        message: "",
        status: "",
    });

    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === 'profile_photo' ? e.target.files[0] : e.target.value });

    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const forma = new FormData()

        for (const key in form) {
            forma.append(key, form[key])
        }
        axios.post('/api/users/register', forma)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })
                setTimeout(() => navigate('/'), 2000)

            })
            .catch(error => {
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })

    }


    return (
        <div className='Registacija'>
            <h1>Registracija</h1>
            {alert.message && (
                <div className={"alert alert-" + alert.status}>{alert.message}</div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="aba">
                    <label>Vardas</label>
                    <input
                        type="text"
                        name="first_name" onChange={handleForm} />
                </div>
                <div className='regPavarde'>
                    <label>Pavarde</label>
                    <input
                        name="last_name" onChange={handleForm}
                    ></input>
                </div>
                <div className='regPastas'>
                    <label>El. Pastas</label>
                    <input
                        type="email"
                        name="email" onChange={handleForm} />
                </div>
                <div className='regSlaptazodis'>
                    <label>Slaptazodis</label>
                    <input
                        type="password"
                        name="password" onChange={handleForm} />
                </div>

                <div className='regPavarde'>
                    <label>Profilio Vardas</label>
                    <input
                        type="text"
                        name="profile_name" onChange={handleForm}
                    ></input>
                </div>

                <div className='regPavarde'>
                    <label>Profilio nuotrauka</label>
                    <input
                        type="file"
                        name="profile_photo" onChange={handleForm}
                    ></input>
                </div>

                <button className="btn btn-primary">Prideti</button>
            </form>
        </div>

    )
}


export default Register