
const EmailVerification = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
                <p className="text-gray-600 mb-4">
                    An email with a verification link has been sent to your email address. Please click the link to verify your email.
                </p>
                {/*<button
                    
                    className="bg-[#28844b] hover:bg-[#339659] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                    
    </button>*/}
            </div>
        </div>
    );
};

export default EmailVerification;