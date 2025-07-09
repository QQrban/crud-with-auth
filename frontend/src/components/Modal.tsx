import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import type { ModalInfoType } from "../types/types";
import { IconButton } from "@mui/material";

type ModalProps = {
    modalInfo: ModalInfoType;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal = ({ modalInfo, setOpenModal }: ModalProps) => {
    const { type, message, header } = modalInfo;

    const closeModal = () => {
        setOpenModal(false);
    }

    return (
        <div>
            <div id="modal">
                <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
                    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                        <IconButton onClick={closeModal} sx={{position: "absolute", top: 7, right: 7}}>
                            <CloseIcon className="text-gray-500" />
                        </IconButton>
                        <div className="my-10 text-center">
                            <CancelIcon
                                color="error"
                                style={{ width: 70, height: 70 }}
                            />
                            <h4
                                className={`text-xl ${
                                    type === "error"
                                        ? "text-red-400"
                                        : "text-green-600"
                                } font-semibold mt-4`}
                            >
                                {header}
                            </h4>
                            <p className="text-sm text-gray-400 leading-relaxed mt-4">
                                {message}
                            </p>
                        </div>
                        <button
                            onClick={closeModal}
                            id="closeButton"
                            type="button"
                            className={`cursor-pointer px-5 py-2.5 w-full rounded-lg text-white text-sm font-medium border-none outline-none ${
                                type === "error"
                                    ? "bg-red-700 hover:bg-red-800"
                                    : "bg-green-700 hover:bg-green-800"
                            }`}
                        >
                            Got it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
