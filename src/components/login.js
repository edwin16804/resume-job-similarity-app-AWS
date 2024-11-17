import "./login.css";
import image from 'C:/Users/EDWIN/OneDrive/Desktop/JobAI/application/src/assets/login.jpg';
const Login=()=>{
    return(
        <div className="login-page">
            <div className="main">
                <div className='login-details'>
                    <h2>Welcome back!</h2>
                    <form>
                        <label for="email">Email</label>
                        <input type='email' name="email"></input><br/>
                        <label for="password">Password</label>
                        <input type='password' name="password"></input><br/>
                        <center><a href="signup">Don't have an account?Sign up</a></center>
                        <center><button type="submit" className='login-btn'>Login</button></center>
                    </form>
                </div>  
                <img src={image} alt="logo" style={{height:500, width:700,position:'absolute',left:700,top:80,display:'flex'}}/>
            </div>
        </div>

    )
}

export default Login;