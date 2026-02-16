import { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import useAuth from "../../store/useAuth";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (!fullName.length) {
            setError("Pleae enter your name");
            return;
        }
        
        if (!isEmail(email)) {
            setError('Please enter a valid email');
            return;
        }
        
        if (!password.length) {
            setError("please enter the password");
            return;
        }

        setError("");

        try {
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("email", email);
            formData.append("password", password);
            if (profilePic) {
                formData.append("profilePic", profilePic);
            }

            await signup(formData);
            navigate("/dashboard");
        } catch (error) {
            if (error.response?.message) {
                setError(error.response.message)
            } else {
                setError("An unexpected error occured. Please try again.");
            }
        }
    }
    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6 ">Join us today by entering your details below</p>

                <form onSubmit={handleSignUp}>

                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}></ProfilePhotoSelector>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input value={fullName} onChange={({ target }) => setFullName(target.value)} label="Full Name" placeholder="Full name" type="text"></Input>
                        <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email" placeholder="expensetracker@gmail.com" type="text" autoComplete="username"></Input>

                        <div className="col-span-2">
                            <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 charecters" type="password" autoComplete="current-password"></Input>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                    <button type="submit" className="btn-primary">SIGN UP</button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-primary underline">Login</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
};

export default SignUp;