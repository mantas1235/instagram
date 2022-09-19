import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'



const Home = () => {


    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState({
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

    const [keyword, setKeyword] = useState('')

    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('/api/users/')
            .then(resp => {
                if (resp.data.message)
                    setAlert({
                        message: resp.data.message,
                        status: "danger",
                    });
                setUsers(resp.data);
            })
            .catch((error) => {
                setAlert({
                    message: error.response.data,
                    status: "danger",
                })
            })
    }, [refresh]);




    useEffect(() => {
        axios.get("/api/posts/")
            .then(resp => {

                //   const donePosts = resp.data
                //     .map((post) => {
                //       const date = new Date(post.createdAt);
                //       post.createdAt = date.toLocaleDateString("lt-LT");
                //       return post;
                //     })
                setPosts(resp.data);
            })
            .catch((error) => {
                setAlert({
                    message: error.response.data,
                    status: "danger",
                })
            })
    }, [refresh]);

    const handleDelete = (id) => {
        //   if (isNaN(id) || !loggedIn)

        //   return;


        axios.delete("/api/posts/delete/" + id, posts)
            .then((resp) => {
                setAlert({
                    message: resp.message,
                    status: "success",
                });
                setRefresh(!refresh);

            })
            .catch((error) => {
                setAlert({
                    message: error.response.data,
                    status: "danger",
                })
                window.scrollTo(0, 0)

                if (error.response.status === 401)
                    setTimeout(() => navigate('/login'), 2000)
            })
            .finally(() => {
                setTimeout(
                    () =>
                        setAlert({
                            message: "",
                            status: "",
                        }),
                    3000
                );
            })


    };



    //     const handleSearch= (e)=>{
    //       e.preventDefault()

    //     if(keyword === '')
    //     return setRefresh(!refresh)

    //     axios.get('/api/posts/search/'+keyword)
    //     .then(resp => {
    //       setPosts(resp.data)
    //     })
    //     .catch((error) => {
    //       setAlert({
    //         message: error.response.data,
    //         status: "danger",
    //       })
    //     window.scrollTo(0, 0)

    // setTimeout(()=> navigate('/login'), 2000) 
    //     })

    //     }

    return (

        <div className="main_container">

            <div className="users">
                {users.length > 0 &&
                    users.map((user) => {
                        return (
                            <div className="useriai" key={user.id}>
                                <img src={user.profile_photo} alt="" />
                                <span>{user.profile_name}</span>
                            </div>

                        )

                    })}

            </div>




            <div className="conteiner">
                {alert.message && (
                    <div className={"alert alert-" + alert.status}>{alert.message}</div>
                )}
                {/* <div className="form-group dflex">
        <form onSubmit={handleSearch} >
        <div className="filter mb-5">
              <input type='text' className='form-control' onChange={(e)=>setKeyword(e.target.value)}
              onBlur={()=>{
                if (keyword==='')
                setRefresh(!refresh)
              }}></input>
              <button className="btn btn-primary">Ieskoti</button>
                 </div> 
                 </form> 
                 </div> */}
                <div className="articles">
                    {posts.length > 0 &&
                        posts.map((post) => {
                            return (<>

                                <div key={post.id} className="box">
                                    <div className="title">
                                        <h3>{post.user.first_name}</h3>
                                    </div>
                                    <div className="image">
                                        <img src={post.image} alt={post.title} />
                                    </div>
                                    <div className="svg_kontainer">
                                        <span className="svg">

                                            <Link><img className="heart" src="https://i.pinimg.com/originals/50/9e/af/509eaf4abcbd88d8e1fc4a9734cd9e2e.png" alt="" /></Link>
                                            <Link><img className="heart" src="https://static.thenounproject.com/png/638755-200.png" alt="" /></Link>
                                            <Link><img className="heart" src="https://cdn2.iconfinder.com/data/icons/instagram-outline/19/7-512.png" alt="" /></Link>
                                        </span>
                                        <span className="last_svg"><Link><img className="heart" src="https://www.clipartmax.com/png/small/473-4737744_bookmark-png-clipart-bookmark-icon-instagram.png" alt="" /></Link></span>
                                    </div>
                                    <div className="category">
                                        <p>{post.city}</p>
                                    </div>

                                    <div className="comments">
                                        {post.comment_count + "comments"}
                                    </div>
                                    <Link to={"/post/" + post.id} className="btn btn-success"> Skiatyti placiau </Link>
                                    <Link to={"/edit/" + post.id} className="btn btn-primary"> Redaguoti </Link>

                                    <button className="btn btn-danger" onClick={(e) => handleDelete(post.id)}> Delete </button>


                                </div></>
                            );
                        })}
                </div>
            </div>
        </div>);

}


export default Home