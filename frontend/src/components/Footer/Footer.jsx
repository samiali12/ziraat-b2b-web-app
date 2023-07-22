
const Footer = () => {
    return (

        <footer class="bg-white">
            <div class="max-w-6xl mx-auto px-4 ">
                <div class="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">

                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-700 uppercase">Menu</h2>
                        <ul class="text-gray-500 font-medium">
                            <li class="mb-4">
                                <a href="#" class="hover:underline">Home</a>
                            </li>
                            <li class="mb-4">
                                <a href="#" class="hover:underline">Products</a>
                            </li>
                            <li class="mb-4">
                                <a href="#" class="hover:underline">Services</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-700 uppercase">Company</h2>
                        <ul class="text-gray-500 font-medium">
                            <li class="mb-4">
                                <a href="#" class=" hover:underline">About</a>
                            </li>
                            <li class="mb-4">
                                <a href="#" class="hover:underline">FAQ'S</a>
                            </li>

                            <li class="mb-4">
                                <a href="#" class="hover:underline">Blog</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-700 uppercase">Help center</h2>
                        <ul class="text-gray-500  font-medium">

                            <li class="mb-4">
                                <a href="#" class="hover:underline">Twitter</a>
                            </li>
                            <li class="mb-4">
                                <a href="#" class="hover:underline">Facebook</a>
                            </li>
                            <li class="mb-4">
                                <a href="#" class="hover:underline">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-700 uppercase">Legal</h2>
                        <ul class="text-gray-500 font-medium">
                            <li class="mb-4">
                                <a href="#" class="hover:underline">Privacy Policy</a>
                            </li>
                            <li class="mb-4">
                                <a href="#" class="hover:underline">Licensing</a>
                            </li>
                            <li class="mb-4">
                                <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="px-4 py-6 bg-gray-100 md:flex md:items-center md:justify-between">
                    <span class="text-sm text-gray-500 sm:text-center">© 2023 <a href="https://ziraatb2b/">Ziraat B2B Marketplace™</a>. All Rights Reserved.
                    </span>
                    <div class="flex mt-4 space-x-5 sm:justify-center md:mt-0">
                        <a href="#" class="text-gray-400 hover:text-gray-900 ">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd" />
                            </svg>
                            <span class="sr-only">Facebook page</span>
                        </a>

                        <a href="#" class="text-gray-400 hover:text-gray-900 ">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd" />
                            </svg>
                            <span class="sr-only">Twitter page</span>
                        </a>


                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer;