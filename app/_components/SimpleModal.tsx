import { ReactNode, RefObject } from "react";
import { FaXmark } from "react-icons/fa6";

export default function SimpleModal({ header, reference, children, closeModal }: {
    header: string,
    reference: RefObject<HTMLDialogElement | null>
    children: ReactNode,
    closeModal: () => void,
}) {
    return (
        <dialog ref={reference} id='about-modal' className='backdrop:bg-black/50 m-auto bg-lime-900 outline p-8 rounded-xl h-1/2 w-xs md:w-lg text-white'>
            <h3 className='font-bold text-2xl mb-2'>{header}</h3>
            {children}
            <button type="button" className="absolute top-5 end-5 cursor-pointer hover:*:fill-blue-200" onClick={closeModal}><FaXmark /></button>
        </dialog>
    );
}