import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeRoute } from "../features/companySlice";

const ReservationModal = ({ reservation, setReservationModal }) => {
  const dispatch = useDispatch();
  return (
    <div className="h-screen z-30 w-screen top-0 left-0 bg-black opacity-95 fixed flex justify-center items-center">
      {reservation.length > 0 ? (
        <div className="w-[700px] h-[400px] z-50 bg-white text-black shadow-2xl flex flex-col rounded-md overflow-scroll">
          <div className="flex justify-end mr-4 mt-4 cursor-pointer">
            <AiOutlineClose
              onClick={() => {
                setReservationModal(false);
              }}
              className="text-2xl active:scale-90 font-bold transition hover:scale-105"
            />
          </div>
          <div className="flex flex-col items-center h-full space-y-12">
            {reservation.map((reservation) => (
              <div className="flex flex-col items-center justify-center">
                <div className="flex space-x-4 items-center">
                  <p>Available Seats</p>
                  <p>{reservation.availableSeats}</p>
                </div>
                <div className="flex space-x-4 items-center">
                  <p>Booked Seats</p>
                  <p>{reservation.bookedSeats.join()}</p>
                </div>
                <div>
                  <p>{reservation.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-[700px] h-[400px] z-50 bg-white text-black shadow-2xl flex flex-col rounded-md overflow-scroll">
          <div className="flex justify-end mr-4 mt-4 cursor-pointer">
            <AiOutlineClose
              onClick={() => {
                setReservationModal(false);
              }}
              className="text-2xl active:scale-90 font-bold transition hover:scale-105"
            />
          </div>
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <p>There are no reservations</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationModal;
