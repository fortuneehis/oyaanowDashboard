import * as React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCompany } from "../features/companySlice";
import { addBus, addTerminal, addRoute } from "../features/companySlice";
import AdminTerminalTable from "./AdminTerminalTable";
import AdminBusTable from "./AdminBusTable";
import AdminRouteTable from "./AdminRouteTable";

export default function Company() {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);

  let routeList = [];
  company.forEach((comp) => {
    if (comp.routes.length !== 0) {
      routeList.push(
        <AdminRouteTable
          routes={comp.routes}
          id={comp._id}
          companyName={comp.name}
        />
      );
    }
  });

  let tableList = [];
  company.forEach((comp) => {
    if (comp.buses.length !== 0) {
      tableList.push(
        <AdminBusTable
          buses={comp.buses}
          id={comp._id}
          companyName={comp.name}
        />
      );
    }
  });

  let terminals = [];

  const compTerminals = company.filter((company) => {
    if (company.terminals.length > 0) {
      return company;
    }
  });
  compTerminals.map((comp) => {
    terminals.push(...comp.terminals);
  });

  let buses = [];

  const compBuses = company.filter((company) => {
    if (company.buses.length > 0) {
      return company;
    }
  });
  compBuses.map((comp) => {
    buses.push(...comp.buses);
  });

  let terminalList = [];
  company.forEach((comp) => {
    if (comp.terminals.length !== 0) {
      terminalList.push(
        <AdminTerminalTable
          terminals={comp.terminals}
          id={comp._id}
          companyName={comp.name}
        />
      );
    }
  });

  const [routeData, setRouteData] = useState({
    company: "",
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
      company: "",
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

  const [terminalData, setTerminalData] = useState({
    company: "",
    location: "",
    address: "",
    landmark: " ",
  });

  const addTheTerminal = (e) => {
    e.preventDefault();
    dispatch(addTerminal(terminalData));

    setTerminalData({
      company: "",
      location: "",
      address: "",
      landmark: " ",
    });
  };
  const [busData, setBusData] = useState({
    company: "",
    seats: "",
    picture: "",
    name: "",
    plateNumber: "",
  });

  const [image, setImage] = useState("");

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

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  const addTheBus = (e) => {
    e.preventDefault();
    dispatch(addBus(busData));
    // dispatch(getCompany());

    console.log(busData);

    setBusData({
      company: "",
      seats: "",
      picture: " ",
      name: "",
      plateNumber: "",
    });
    setImage("");
  };
  return (
    <div className="w-full">
      {tableList.length > 0 && (
        <div className="my-7 max-w-7xl">
          <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
            Buses
          </button>
        </div>
      )}
      <div className="max-w-3xl mx-auto">{tableList}</div>

      <div className="my-7 max-w-7xl ">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Add Bus
        </button>
        <form
          onSubmit={addTheBus}
          className="shadow-2xl relative text-black w-4/4 lg:w-3/6 mx-auto my-4 space-y-4 py-2 px-2 rounded-md"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <label htmlFor="company">Company</label>
            <select
              value={busData.company}
              className="text-black border px-2 py-1 outline-none rounded-sm shadow-sm"
              name="company"
              id="company"
              onChange={(e) => {
                setBusData({ ...busData, company: e.target.value });
              }}
            >
              <option value="">Select company</option>
              {company.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
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
              className="bg-black text-white px-4 py-2 font-bold rounded-sm transition hover:scale-105 active:scale-90"
              type="submit"
            >
              ADD
            </button>
          </div>
        </form>
      </div>

      {terminalList.length > 0 && (
        <div className="my-7 max-w-7xl">
          <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
            Terminals
          </button>
        </div>
      )}
      {terminalList}
      <div className="my-7 max-w-7xl ">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Add Terminal
        </button>
        <form
          onSubmit={addTheTerminal}
          className="shadow-2xl relative text-black w-3/4 lg:w-3/6 mx-auto my-4 space-y-4 py-2 px-2 rounded-md"
        >
          <div className="flex flex-col lg:flex-row  items-center justify-between">
            <label htmlFor="company">Company</label>
            <select
              value={terminalData.company}
              className="text-black border px-2 py-1 outline-none rounded-sm shadow-sm"
              name="company"
              id="company"
              onChange={(e) => {
                setTerminalData({ ...terminalData, company: e.target.value });
              }}
            >
              <option value="">Select company</option>
              {company.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
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
              className="bg-black text-white px-4 py-2 font-bold flex justify-center rounded-sm transition active:scale-90 hover:scale-105"
              type="submit"
            >
              ADD TERMINAL
            </button>
          </div>
        </form>
      </div>
      {routeList.length > 0 && (
        <div className="my-7 max-w-7xl">
          <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
            Routes
          </button>
        </div>
      )}
      <div className="max-w-md lg:max-w-5xl mx-auto">{routeList}</div>

      <div className="my-7 max-w-7xl ">
        <button className="bg-slate-800 text-white w-full text-xl py-2 font-bold">
          Add Route
        </button>
        <form
          onSubmit={addTheRoute}
          className="shadow-2xl relative text-black w-3/4 lg:w-3/6 mx-auto my-4 space-y-4 py-2 px-2 rounded-md"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <label htmlFor="CompanyID">Company</label>
            <select
              value={routeData.company}
              className="text-black border px-2 py-1 outline-none rounded-sm shadow-sm"
              name="company"
              id="company"
              onChange={(e) => {
                setRouteData({ ...routeData, company: e.target.value });
              }}
            >
              <option value="">Select company</option>
              {company.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

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
              {terminals.map((terminal) => (
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
              {terminals.map((terminal) => (
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
              {buses.map((bus) => (
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
              className="bg-black text-white px-4 py-2 font-bold flex justify-center rounded-sm transition active:scale-90 hover:scale-105"
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
