"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";


interface ImageModalProps {
    src?: string | null;
    onClose: () => void;
    isOpen?: boolean;
}

const ImageModal : React.FC<ImageModalProps> = ({src, onClose, isOpen = false}) => {
    if(!src){
        return null;
    }
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80">
                <Image src={src} alt="Image" fill  className="object-cover" />
            </div>
        </Modal>
    )
}

export default ImageModal;