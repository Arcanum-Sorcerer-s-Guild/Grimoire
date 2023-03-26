import { Collapse } from 'react-collapse';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const AccordionItem = ({open, toggle, title, desc}) => {
    return (
        <div className="pt-2">
            <div
                className="flex justify-between items-center cursor-pointer bg-gray-100 py-3 px-5
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onClick={toggle}
            >
                <p className="text-xl font-semibold">
                    {title}
                </p>
                <div className="text-sm">
                    { open ? <AiOutlineMinus /> : <AiOutlinePlus /> }
                </div>
            </div>
            <Collapse isOpened={open}>
                <div className="bg-gray-100 px-5 pb-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                    {desc}
                </div>
            </Collapse>
        </div>
    );
}
 
export default AccordionItem;