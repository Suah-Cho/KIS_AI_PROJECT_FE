export default function SideBody(
    { isOpen } : { isOpen: boolean; }
) {
    return (
        <div>
            <nav className={`${isOpen ? "block" : "hidden"} mt-4 space-y-2 px-4`}>
                <a className="block px-4 py-2 hover:bg-gray-700 rounded">Home</a>
                <a className="block px-4 py-2 hover:bg-gray-700 rounded">Settings</a>
            </nav>
        </div>
    )
}