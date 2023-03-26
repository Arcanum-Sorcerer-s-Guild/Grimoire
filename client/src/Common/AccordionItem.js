import { Collapse } from 'react-collapse';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const AccordionItem = ({open, toggle, title, desc}) => {
    return (
        <div
            className="pt-[10px]"
        >
            <div
                className="flex justify-between items-center cursor-pointer bg-gray-100 py-[25px] px-[50px]"
                onClick={toggle}
            >
                <p className="text-[22px] font-semibold">
                    {title}
                </p>
                <div className="text-[30px]">
                    { open ? <AiOutlineMinus /> : <AiOutlinePlus /> }
                </div>
            </div>
            <Collapse isOpened={open}>
                <div className="bg-gray-100 px-[50px] pb-[20px]">
                    {desc}
                </div>
            </Collapse>
        </div>
    );
}
 
export default AccordionItem;