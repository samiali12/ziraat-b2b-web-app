
const Dashboard = () => {
    return (

        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="block relative">
                                <img
                                    alt="profile"
                                    src="https://randomuser.me/api/portraits/men/46.jpg"
                                    className="mx-auto object-cover rounded-full h-16 w-16 "
                                />
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold">John Doe</h1>
                                <p className="text-gray-500">Frontend Developer</p>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-400">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <p>
                                    Full Stack Developer with over 5 years of experience in
                                    building web applications. Proficient in JavaScript, React,
                                    and Node.js.
                                </p>
                                <p>
                                    Skilled in creating responsive and user-friendly interfaces,
                                    with a strong eye for design and usability.
                                </p>
                            </div>
                            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                                <p>Contact Information</p>
                                <p className="text-gray-700">Email: john@example.com</p>
                                <p className="text-gray-700">Phone: (123) 456-7890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Dashboard;