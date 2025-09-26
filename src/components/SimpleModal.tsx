import { FaTimes } from "react-icons/fa";

interface SimpleModalProps{
    isOpen: boolean;
    onClose: () => void;
    title:string;
    propriedades:string[];
    onCreate: () => void;
}
export default function SimpleModal(props: SimpleModalProps){
    return(
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${props.isOpen ? "flex" : "hidden"}`} style={{ display: props.isOpen ? 'flex' : 'none' }}>
            <div className="bg-white p-6 rounded shadow-lg w-1/3 justify-center items-center ">
                <div className="flex justify-end">
                    <button onClick={props.onClose} className="rounded py-2 px-2 text-gray-500"><FaTimes size={16}/></button>
                </div>
                <h1 className="text-black text-2xl text-center">{props.title}</h1>
                {
                    props.propriedades.map((props, index) => (
                        <input key={index} type="text" className="bg-gray-100 border border-gray-300 rounded w-full p-2 mt-4" placeholder={props} />
                    ))
                }
                <button onClick={()=> props.onCreate} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 w-full">
                    Criar Cardápio
                </button>
            </div>
        </div>
    )
}