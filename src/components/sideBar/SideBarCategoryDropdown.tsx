import { useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const categories = [
    { id: 'auto', name: '자동선택' },
    { id: 'acc', name: '회계 규정' },
    { id: 'aud', name: '감사 규정' },
    { id: 'hr', name: '인사 규정' },
    { id: 'it', name: 'IT/보안 규정' },
    { id: 'org', name: '회사 조직 규정' },
    { id: 'work', name: '업무메뉴얼' },
    { id: 'etc', name: '기타' },
]

export default function SideBarCategoryDropdown() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selected, setSelected ] = useState(categories[0]);
    
    const handleSelect = ( category : { id: string; name: string } ) => {
        setSelected(category);
        setIsOpen(false);
        
    }

    return (
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
                <span>{selected ? selected.name: "자동선택" }</span>
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