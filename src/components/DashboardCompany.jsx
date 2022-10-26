import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBus, addTerminal, addRoute } from "../features/userSlice";
import StaffBusTable from "./StaffBusTable";
import StaffTerminalTable from "./StaffTerminalTable";
import StaffRouteTable from "./StaffRouteTable";

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [image, setImage] = useState("");

  const [routeData, setRouteData] = useState({
    company: user.company._id,
    state: {
      from: "",
      to: "",
    },
    terminal: {
      from: "",
      to: "",
    },
    buses: [
      {
        id: "",
        seats: "",
      },
    ],
    fare: "",
    departureTimes: [],
    departureDate: "",
    recurring: "",
  });

  const handleAddBus = (e) => {
    const newBus = {
      id: e.target.value,
    };
    setRouteData({
      ...routeData,
      buses: [
        {
          ...routeData.buses[0],
          id: e.target.value,
        },
      ],
    });
  };
  const addTheRoute = (e) => {
    e.preventDefault();
    dispatch(addRoute(routeData));
    console.log(routeData);
    setRouteData({
      ...routeData,
      state: {
        from: "",
        to: "",
      },
      fare: "",
      departureTimes: [],
      departureDate: "",
      recurring: "",
    });
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusData({ ...busData, picture: reader.result });
      };

      reader.readAsDataURL(image);
    } else {
      setBusData({ ...busData, picture: "" });
    }
  }, [image]);

  const [busData, setBusData] = useState({
    company: user.company._id,
    seats: "",
    picture: "",
    name: "",
    plateNumber: "",
  });

  const [terminalData, setTerminalData] = useState({
    company: user.company._id,
    location: "",
    address: "",
    landmark: " ",
  });

  const addTheBus = (e) => {
    e.preventDefault();
    console.log(busData);
    dispatch(addBus(busData));
    setBusData({
      company: user.company._id,
      seats: "",
      picture: "",
      name: "",
      plateNumber: "",
    });
  };

  const addTheTerminal = (e) => {
    e.preventDefault();
    dispatch(addTerminal(terminalData));

    setTerminalData({
      company: user.company._id,
      destination: "",
      landmark: " ",
    });
  };
  return (
    <div>
      {user.company.buses.length > 0 && <StaffBusTable />}
      <div className="my-7 max-w-7xl">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Add Bus
        </button>
        <form
          onSubmit={addTheBus}
          className="shadow-2xl relative text-black w-4/4  lg:w-3/6 mx-auto my-4 space-y-4 py-2 px-2 rounded-md"
        >
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="seats">Seats</label>
            <input
              value={busData.seats}
              onChange={(e) => {
                setBusData({ ...busData, seats: e.target.value });
              }}
              className="text-black px-2 py-1 outline-none border shadow-sm rounded-sm"
              type="text"
              name="seats"
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="picture">Picture</label>
            <input
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
              className="text-black px-2 py-1 outline-none border shadow-sm rounded-sm"
              type="file"
              accept="image/*"
              name="picture"
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="name">Name</label>
            <input
              value={busData.name}
              onChange={(e) => {
                setBusData({ ...busData, name: e.target.value });
              }}
              className="text-black px-2 py-1 outline-none border shadow-sm rounded-sm"
              type="text"
              name="name"
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="plateNumber">Plate Number</label>
            <input
              value={busData.plateNumber}
              onChange={(e) => {
                setBusData({ ...busData, plateNumber: e.target.value });
              }}
              className="text-black px-2 py-1 outline-none border shadow-sm rounded-sm"
              type="text"
              name="plateNumber"
            />
          </div>
          <div className="flex justify-center lg:justify-start">
            <button
              className="bg-black active:scale-90 text-white px-4 py-2 font-bold rounded-sm transition hover:scale-105"
              type="submit"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
      {user.company.terminals.length > 0 && <StaffTerminalTable />}
      <div className="my-7 max-w-7xl">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Add Terminal
        </button>
        <form
          onSubmit={addTheTerminal}
          className="shadow-2xl relative text-black w-3/4 lg:w-3/6 mx-auto my-4 space-y-4 py-2 px-2 rounded-md"
        >
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="location">Location</label>
            <input
              value={terminalData.location}
              onChange={(e) => {
                setTerminalData({
                  ...terminalData,
                  location: e.target.value,
                });
              }}
              className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
              type="text"
              placeholder="e.g Benin-Ugbowo"
              name="location"
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="address">Address</label>
            <input
              value={terminalData.address}
              onChange={(e) => {
                setTerminalData({
                  ...terminalData,
                  address: e.target.value,
                });
              }}
              className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
              type="text"
              name="address"
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="landmark">Landmark</label>
            <input
              value={terminalData.landmark}
              onChange={(e) => {
                setTerminalData({ ...terminalData, landmark: e.target.value });
              }}
              className="text-black border px-2 py-1 outline-none rounded-sm shadow-sm"
              type="text"
              name="landmark"
            />
          </div>
          <div className="flex justify-center lg:justify-start">
            <button
              className="bg-black active:scale-90 text-white px-4 py-2 font-bold flex justify-center rounded-sm transition hover:scale-105"
              type="submit"
            >
              ADD TERMINAL
            </button>
          </div>
        </form>
      </div>

      {user.company.routes.length > 0 && (
        <div className="max-w-md lg:max-w-5xl mx-auto">
          <StaffRouteTable />
        </div>
      )}
      <div className="my-7 max-w-7xl ">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Add Route
        </button>
        <form
          onSubmit={addTheRoute}
          className="shadow-2xl relative text-black w-3/4 lg:w-3/6 mx-auto my-4 space-y-4 py-2 px-2 rounded-md"
        >
          <div className="flex space-y-2 flex-col  items-center lg:items-start">
            <label htmlFor="state">State</label>
            <input
              value={routeData.state.to}
              placeholder="To where"
              onChange={(e) => {
                setRouteData({
                  ...routeData,
                  state: {
                    ...routeData.state,
                    to: e.target.value,
                  },
                });
              }}
              className="text-black border px-2 py-1 outline-none w-full shadow-sm rounded-sm"
              type="text"
              name="state"
            />
            <input
              value={routeData.state.from}
              placeholder="From where"
              onChange={(e) => {
                setRouteData({
                  ...routeData,
                  state: {
                    ...routeData.state,
                    from: e.target.value,
                  },
                });
              }}
              className="text-black border px-2 py-1 outline-none w-full shadow-sm rounded-sm"
              type="text"
              name="state"
            />
          </div>

          <div className="flex flex-col items-center lg:items-start space-y-2">
            <label htmlFor="terminal">Terminal</label>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              onChange={(e) => {
                setRouteData((state) => ({
                  ...state,
                  terminal: {
                    ...state.terminal,
                    from: e.target.value,
                  },
                }));
              }}
            >
              <option value="">Terminal From</option>
              {user.company.terminals.map((terminal) => (
                <option value={terminal._id}>{terminal.landmark}</option>
              ))}
            </select>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              onChange={(e) => {
                setRouteData({
                  ...routeData,
                  terminal: {
                    ...routeData.terminal,
                    to: e.target.value,
                  },
                });
              }}
            >
              <option value="">Terminal To</option>
              {user.company.terminals.map((terminal) => (
                <option value={terminal._id}>{terminal.landmark}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center lg:items-start space-y-2">
            <label htmlFor="buses">Bus</label>
            <select
              className="text-black border px-2 py-1 outline-none shadow-sm w-full rounded-sm"
              onChange={handleAddBus}
            >
              <option value="">Bus</option>
              {user.company.buses.map((bus) => (
                <option value={bus._id}>{bus.name}</option>
              ))}
            </select>
            <input
              onChange={(e) => {
                setRouteData({
                  ...routeData,
                  buses: [
                    {
                      ...routeData.buses[0],
                      seats: e.target.value,
                    },
                  ],
                });
              }}
              className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
              type="text"
              placeholder="Number Of Seats"
              name="seats"
            />
          </div>

          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="fare">Fare</label>
            <input
              value={routeData.fare}
              onChange={(e) => {
                setRouteData({ ...routeData, fare: e.target.value });
              }}
              className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
              type="text"
              name="fare"
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="departureTimes">Departure Time</label>
            <input
              value={routeData.departureTimes}
              onChange={(e) => {
                setRouteData({
                  ...routeData,
                  departureTimes: [e.target.value],
                });
              }}
              className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
              type="time"
              name="departureTimes"
              multiple
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="departureDate">Departure Date</label>
            <input
              value={routeData.departureDate}
              onChange={(e) => {
                setRouteData({ ...routeData, departureDate: e.target.value });
              }}
              className="text-black border px-2 py-1 outline-none shadow-sm rounded-sm"
              type="date"
              name="departureDate"
            />
          </div>
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="recurring">Recurring</label>

            <select
              value={routeData.recurring}
              onChange={(e) => {
                setRouteData({ ...routeData, recurring: e.target.value });
              }}
              name="recurring"
              id="recurring"
              className="text-black shadow-sm px-2 py border"
            >
              <option value="">Please Select</option>
              <option value="once">Once</option>
              <option value="once a week">Once a week</option>
              <option value="once a month">Once a month</option>
            </select>
          </div>
          <div className="flex justify-center lg:justify-start">
            <button
              className="bg-black active:scale-90 text-white px-4 py-2 font-bold flex justify-center rounded-sm transition hover:scale-105"
              type="submit"
            >
              ADD ROUTE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
