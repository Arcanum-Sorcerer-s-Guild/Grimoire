import { Collapse } from 'react-collapse';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const AccordionItem = ({open, toggle, title, date, desc}) => {
    return (
        <div className="pt-2 shadow-md">
            <div
                className="flex justify-between items-center cursor-pointer py-3 px-5
                bg-slate-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onClick={toggle}
            >
                <p className="text-xl  text-blue-800 dark:text-amber-500">
                    {title}
                    <span className={`${open && "hidden"} text-sm m-2 text-gray-500 dark:text-gray-400`}>by "username" on</span>
                    <span className={`${open && "hidden"} text-sm text-gray-500 dark:text-gray-400`}>{date}</span>
                </p>
                <div className="flex text-sm">
                    <div className={`mr-5 ${open && "hidden"}`}>tag tag tag</div>
                    <div>
                         { open ? <AiOutlineMinus /> : <AiOutlinePlus /> }
                    </div>
                </div>
            </div>
            <Collapse isOpened={open}>
            <div className="text-sm px-5 pb-5
                 bg-slate-200 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                    <p className={`${!open && "hidden"} text-sm mb-2 text-gray-500 dark:text-gray-400`}>by "username"
                        <span className={`${!open && "hidden"} text-sm ml-2 text-gray-500 dark:text-gray-400 `}>created: {date}</span>
                        <span className={`${!open && "hidden"} text-sm ml-2 text-gray-500 dark:text-gray-400 `}>updated: {date}</span>
                    </p>
                    {desc}
                    <div className={`mt-5 ${!open && "hidden"}`}>tag tag tag</div>
                </div>
            </Collapse>
        </div>
    );
}
 
export default AccordionItem;