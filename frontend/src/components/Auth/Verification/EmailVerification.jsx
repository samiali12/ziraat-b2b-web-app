import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendEmailVerification } from "../../../features/authFeatures/authSlice";
import { useEffect } from "react";
import MetaData from "../../../app/MetaData";

const EmailVerification = () => {

    const params = useParams()
    const dispatch = useDispatch()

    const { isLoading, isSuccess, isError } = useSelector(state => state.auth)

    const onSubmit = async () => {

        await dispatch(sendEmailVerification(params.email))

    }

    useEffect(() => {

        if (isSuccess) {
            alert("Email verification send")
        }

    }, [isLoading, isSuccess, isError])





    return (
        <>
            <MetaData title="Email Verification" />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
                    <p className="text-gray-600 mb-4">
                        An email with a verification link has been sent to your email address. Please click the link to verify your email.
                    </p>
                    {<button
                        type="submit"
                        onClick={onSubmit}
                        className="bg-[#28844b] hover:bg-[#339659] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Re-Send Email
                    </button>}
                </div>
            </div>
        </>
    );
};

export default EmailVerification;