import { useState } from "react";
import axios from "axios";

const NewPost = () => {
    const [postForm, setPostForm] = useState({
        title: "",
        city: "",
        image: "",
        content: "",
        comment_count: "",
        userId: ""



    });
    const handleForm = (e) => {
        setPostForm({ ...postForm, [e.target.name]: e.target.name === 'profile_photo' ? e.target.files[0] : e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData

        for (const key in postForm) {
            form.append(key, postForm[key])
        }

        axios.post("/api/posts/", form)
            .then((resp) => console.log(resp));
    };



    return (
        <div className='newPost'>
            <h1>Prideti naują Knygą</h1>
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
                    <input type="file" name="Nuotrauka" onChange={(e) => handleForm(e)} />
                </div>

                <div className='kontentas'>
                    <label>kontentas</label>
                    <input type="text" name="content" onChange={(e) => handleForm(e)} />
                </div>
                <div className="pavadinimas" >
                    <label>komentarai</label>
                    <input type="text" name="comment_count" onChange={(e) => handleForm(e)} />
                </div>
                <div className="pavadinimas" >
                    <select className="form-control" name="userId" required onChange={handleForm}>
                        <option value=''>Pasirinkite vartotoja</option>
                        {postForm.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}


                    </select>
                </div>

                <button className='button_prideti'>Prideti</button>
            </form>
        </div>
    );
}

export default NewPost