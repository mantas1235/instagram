import { Link } from "react-router-dom";

const Header = () => {



    return (
        <header className="mb-4">
            <div className="header_container ">
                <Link
                    to="/home-page"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
                >
                    <span className="fs-4">Mantstagramas</span>
                </Link>

                <ul className="nav">
                    <li className="">
                        <Link to="/home-page">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Ios-home-outline.svg/512px-Ios-home-outline.svg.png" alt="home" className="home_svg" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/new" className="nav-link" aria-current="page">
                            <img src="https://static.thenounproject.com/png/3318800-200.png" className="home_svg" alt="add" />
                        </Link></li>
                    <li className="nav-item">
                        <Link to="/new" className="nav-link" aria-current="page">
                            <img src="https://www.svgrepo.com/show/30539/instagram-logo.svg" className="home_svg" alt="add" />
                        </Link></li>
                    <li className="nav-item">
                        <Link to="/new" className="nav-link" aria-current="page">
                            <img src="https://svgheart.com/wp-content/uploads/2020/06/valentine-fancy-heart-free-svg-cut-file.png" className="home_svg" alt="add" />
                        </Link></li>

                    <li className="nav-item">
                    </li>


                </ul>
                {/* <div>
                    Sveiki, {userInfo.first_name + '  ' + userInfo.last_name}
                </div> */}
            </div>
        </header>
    )

}
export default Header;
