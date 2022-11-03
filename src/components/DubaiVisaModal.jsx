import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeRoute } from "../features/companySlice";

const DubaiVisaModal = ({
  dubaiImage,
  dubaiText,
  setDubaiImage,
  setDubaiText,
  dubaiModal,
  setDubaiModal,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="h-screen z-30 w-screen top-0 left-0 bg-black opacity-95 fixed flex justify-center items-center">
      {dubaiImage.length > 0 ? (
        <div className="w-[700px] h-[400px] z-50 bg-white text-black shadow-2xl flex flex-col rounded-md overflow-scroll">
          <div className="flex my-4 mx-4 justify-between">
            <div className="font-bold ">
              <p>{dubaiText}</p>
            </div>
            <div className="cursor-pointer">
              <AiOutlineClose
                onClick={() => {
                  console.log(dubaiModal);
                  setDubaiImage([]);
                  setDubaiModal(false);
                  console.log(dubaiModal);
                }}
                className="text-2xl active:scale-90 font-bold transition hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col items-center h-full space-y-12">
            {dubaiImage.map((dubaiImage, index) => (
              <div className="flex items-center justify-center space-x-4">
                <p> {index + 1} </p>
                <a
                  className="border px-2 transition hover:scale-110 active:scale-90"
                  href={dubaiImage}
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-[700px] h-[400px] z-50 bg-white text-black shadow-2xl flex flex-col rounded-md overflow-scroll">
          <div className="flex my-4 mx-4 justify-between">
            <div className="font-bold ">
              <p>{dubaiText}</p>
            </div>
            <div className="cursor-pointer">
              <AiOutlineClose
                onClick={() => {
                  console.log(dubaiModal);
                  setDubaiImage([]);
                  setDubaiModal(false);
                  console.log(dubaiModal);
                }}
                className="text-2xl active:scale-90 font-bold transition hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <p>{`There are no ${dubaiText}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DubaiVisaModal;
