import { useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { categories, type  CategoryOption } from "../../constants/categories";

export default function SideBarCategoryDropdown({
    categoryValue, onCategoryChange
}:{
    categoryValue: CategoryOption;
    onCategoryChange: (value: CategoryOption) => void;
}) {
    const [ isOpen, setIsOpen ] = useState(false);

    const current = categories.find(c => c.id === (categoryValue.id ?? 'auto')) ?? categories[0];
    
    const handleSelect = ( category : CategoryOption ) => {
        onCategoryChange(category.id === 'auto' ? categories[0] : category);
        setIsOpen(false);
        console.log("Selected category:", category);
    }

    return (
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
                <span>{current.name}</span>
                { isOpen ? <FiChevronUp /> : <FiChevronDown /> }
            </button>
            {/* 옵션 목록 */}
            { isOpen && (
                <ul className="absolute left-0 my-1 w-full bg-gray-700 rounded shadow-lg z-10">
                    {categories.map((cat) => (
                        <li
                        key={cat.id}
                        onClick={() => handleSelect(cat)}
                        className="px-3 py-2 hover:bg-gray-600 cursor-pointer"
                        >
                        {cat.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}