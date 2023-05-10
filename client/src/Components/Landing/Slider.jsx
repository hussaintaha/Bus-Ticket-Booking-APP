import { useEffect, useState } from "react";
import styles from "../../Styles/landing.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { error } from "../../Utils/notification";
import safty from "../../Images/safetyplus.svg";
import "../../Styles/style.css";
import Select from "react-select";
// import { colourOptions } from "./Docs/data";

function Slider() {
  const [hover, sethover] = useState(false);
  const [source, setsource] = useState("aaa");
  const [destination, setdestination] = useState("");
  const [date, setdate] = useState("");
  const [showName, setShowNames] = useState(false);
  const [showNamedes, setShowNamesdes] = useState(false);
  const [output, setOutput] = useState([]);
  const [outputdes, setOutputdes] = useState([]);
  const [dateinfo, setdateinfo] = useState({});
  const [cityClicked, setCityclicked] = useState(false);
  const [CityDesclicked, setCityDesclicked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let mindate = new Date().toISOString().split("T")[0];
    let maxdate = new Date().toISOString().split("T")[0];
    console.log(mindate, maxdate);
    setdate(mindate);
    setdateinfo({
      ...dateinfo,
      mindate: mindate,
      maxdate: maxdate,
    });
  }, []);

  // useEffect(() => {
  //   if (source === "") {
  //     setShowNames(false);
  //     return;
  //   }
  //   if (cityClicked === true) {
  //     setCityclicked(false);
  //     return;
  //   }
  //   let timerID = setTimeout(() => {
  //     handleGetRequest();
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timerID);
  //   };
  // }, [source]);

  // useEffect(() => {
  //   if (destination === "") {
  //     setShowNamesdes(false);
  //     return;
  //   }
  //   if (CityDesclicked === true) {
  //     setCityDesclicked(false);
  //     return;
  //   }
  //   let timerID = setTimeout(() => {
  //     handleGetRequestdes();
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timerID);
  //   };
  // }, [destination]);

  // const handleGetRequest = async () => {
  //   try {
  //     let res = await axios.post("http://localhost:8080/city", {
  //       source,
  //     });
  //     res = res.data;
  //     setOutput(res);
  //     setShowNames(true);
  //     console.log(output);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleGetRequestdes = async () => {
    try {
      let res = await axios.post("http://localhost:8080/city", {
        destination,
      });
      res = res.data;

      setOutputdes(res);
      setShowNamesdes(true);
    } catch (err) {
      console.log(err);
    }
  };

  // function handelhover() {
  //   sethover(true);
  // }

  // function handelhoverout() {
  //   sethover(false);
  // }

  function handleclicked() {
    if (date === "" || destination === "" || source === "") {
      error("Please Fill All The Details");
      console.log("Please Fill All The Details");
      return;
    }
    if (source === destination) {
      error("Source And Destination Can't Be Same");
      console.log("Please Fill All The Details");
      return;
    }
    console.log("source", source);
    console.log("destination", destination);
    getcityinfo();
    // setsource("");
    // getcityinfo(source, destination, date);
  }

  async function getcityinfo() {
    try {
      let res = await axios.post("http://localhost:8080/city/showcity", {
        source,
        destination,
        date,
      });
      if (res.data.status === "success") {
        navigate({
          pathname: "/selectbus",
          search: `?from=${source}&to=${destination}&date=${date}`,
        });
      } else {
        setsource("");
        setdestination("");
        error("City Not Found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function handlecityclicked(name) {
  //   setCityclicked(true);
  //   setsource(name);
  //   setShowNames(false);
  // }
  // function handlecityclicked1(name) {
  //   setCityDesclicked(true);
  //   setdestination(name);
  //   setShowNamesdes(false);
  // }

  function handledateclicked() {
    setShowNamesdes(false);
    setShowNames(false);
  }

  //SELECTOR----------------//

  let colourOptions = [];

  const getcity = async () => {
    try {
      let res = await axios.get("http://localhost:8080/city");
      res = res.data;
      for (var i = 0; i < res.length; i++) {
        const obj = {
          value: `${res[i].name} ${res[i].state}`,
          label: `${res[i].name} ${res[i].state}`,
        };
        colourOptions.push(obj);
      }
    } catch (err) {
      console.log(err);
    }
  };
  getcity();

  const [isClearable, setIsClearable] = useState(false);
  const [isSearchable, setIsSearchable] = useState(true);
  // const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <>
      <div className="mainDiv">
        <div className="childDiv">
          <div className="basic">
            <Select
              className="selecttag"
              classNamePrefix="select"
              placeholder="FROM"
              onChange={(e) => {
                setsource(e.value);
              }}
              // defaultValue={colourOptions[0]}
              // isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="color"
              options={colourOptions}
            />

            <Select
              className="selecttag"
              classNamePrefix="select"
              placeholder="TO"
              // defaultValue={colourOptions[0]}
              // isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="color"
              options={colourOptions}
              onChange={(e) => {
                setdestination(e.value);
              }}
            />
            <input
              type="date"
              className="selecttag inputDate"
              value={date}
              min={dateinfo.mindate}
              onChange={(e) => setdate(e.target.value)}
              onClick={() => handledateclicked()}
            />
            <button className="selecttag searchButton" onClick={handleclicked}>
              Search
            </button>

            {/* <div
              style={{
                color: "hsl(0, 0%, 40%)",
                display: "inline-block",
                fontSize: 12,
                fontStyle: "italic",
                marginTop: "1em",
              }}
            >
              <Checkbox
          checked={isClearable}
          onChange={() => setIsClearable((state) => !state)}
        >
          Clearable
        </Checkbox>
        <Checkbox
          checked={isSearchable}
          onChange={() => setIsSearchable((state) => !state)}
        >
          Searchable
        </Checkbox>
        <Checkbox
          checked={isDisabled}
          onChange={() => setIsDisabled((state) => !state)}
        >
          Disabled
        </Checkbox>
        <Checkbox
          checked={isLoading}
          onChange={() => setIsLoading((state) => !state)}
        >
          Loading
        </Checkbox>
        <Checkbox checked={isRtl} onChange={() => setIsRtl((state) => !state)}>
          RTL
        </Checkbox>
            </div> */}
          </div>
        </div>
      </div>
      <div className="QuickRoutes">
        <div className="headding">
          <h1>Quick Routes</h1>
        </div>
        <div className="quickRouteParent">
          <div className="quickRoutes">
            <button>Kalka to Shimla</button>
            <button>alpaiguri to Darjeeling</button>
            <button>Vasco  to Londa. .</button>
            <button>Mumbai to Goa.</button>
            <button>Kanyakumari –Trivandrum</button>

          </div>
          <div className="quickRoutes">
            <button>Matheran Hill</button>
            <button>Siliguri- Newmal </button>
            <button>Mandapam – Pamban</button>
            <button>Kalka to Shimla</button>
            <button>alpaiguri to Darjeeling</button>
          </div>
          <div className="quickRoutes">
            <button>Matheran Hill</button>
            <button>Siliguri- Newmal </button>
            <button>Mandapam – Pamban</button>
            <button>Kalka to Shimla</button>
            <button>alpaiguri to Darjeeling</button>
          </div>
          <div className="quickRoutes">
            <button>Kalka to Shimla</button>
            <button>alpaiguri to Darjeeling</button>
            <button>Matheran Hill</button>
            <button>Siliguri- Newmal </button>
            <button>Mandapam – Pamban</button>
          </div>
        </div>
      </div>

      <div>
        <div className="yellowParent">
          <div className="yellowChid">
            <h1>BUSES</h1>
            <h2>265</h2>
            <h4>Total No. of Buses Currently Tracking</h4>
          </div>
          <div className="yellowChid">
            <h1>Routes</h1>
            <h2>647</h2>
            <h4>Total No. of Routes
              Covered on Daily Basis</h4>
          </div>
          <div className="yellowChid">
            <h1>Users</h1>
            <h2>39352</h2>
            <h4>Total No. of
              Chartered Bus App Users </h4>
          </div>

        </div>

      </div>   

    </>
  );
}
export default Slider;
