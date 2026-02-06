import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import isEmail from 'validator/lib/isEmail';

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    // Handle Login
    const handleLogin = async (event) => {
        event.preventDefault();
        
        if (!isEmail(email)) {
            setError("Please enter a valid email");
            return;
        }

        if (!password.length) {
            setError("Please enter the password");
            return;
        }

        setError("");
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your detail to log in</p>

                <form onSubmit={ handleLogin }>
                    <Input value={ email } onChange={ ({ target }) => setEmail(target.value)} label="Email Address" placeholder="expensetracker@gmail.com" type="text"></Input>
                    <Input value={ password } onChange={ ({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 characters" type="password"></Input>

                    { error && <p className="text-red-500 text-xs pb-2.5">{ error }</p>}

                    <button type="submit" className="btn-primary">Login</button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account?{ " " }
                        <Link to="/signup" className="font-medium text-primary underline">SignUp</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login;