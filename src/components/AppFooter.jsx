import { Link } from "react-router"

export default function AppFooter() {
    
    return(
        <footer className="rounded-lg shadow mt-4">
            <div className="p-4 md:py-8">
                <hr className="my-6 border-gray-500 dark:border-gray-400" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 
                <Link to="/" className="hover:underline"> RawG Project</Link>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}