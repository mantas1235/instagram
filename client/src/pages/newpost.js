import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const NewPost = () => {
    const [postForm, setPostForm] = useState({
        title: "",
        city: "",
        image: "",
        content: ""
    });


    const [alert, setAlert] = useState({
        message: "",
        status: "",
    });

    const navigate = useNavigate()

    const handleForm = (e) => {
        setPostForm({ ...postForm, [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData()

        for (const key in postForm) {
            form.append(key, postForm[key])
        }

        axios.post("/api/posts/new/", form)
            .then(resp => {
                setAlert({
                    message: resp.data,
                    status: 'success'
                })
                setTimeout(() => navigate('/'), 2000)

            })
            .catch(error => {
                console.log(error)
                setAlert({
                    message: error.response.data,
                    status: 'danger'
                })
            })
    };



    return (
        <div className='newPost'>
            <h1>Prideti naują posta</h1>
            <form onSubmit={(e) => handleSubmit(e)} className='form_newPost'>
                <div className="pavadinimas" >
                    <label>Pavadinimas</label>
                    <input type="text" name="title" onChange={(e) => handleForm(e)} />
                </div>
                <div className="Miestas" >
                    <label>Miestas</label>
                    <input type="text" name="city" onChange={(e) => handleForm(e)} />
                </div>
                <div className='nuotrauka'>
                    <label>Nuotrauka</label>
                    <input type="file" name="image" onChange={(e) => handleForm(e)} />
                </div>

                <div className='kontentas'>
                    <label>kontentas</label>
                    <input type="text" name="content" onChange={(e) => handleForm(e)} />
                </div>

                <button className='button_prideti'>Prideti</button>
            </form>
        </div>
    );
}

export default NewPost