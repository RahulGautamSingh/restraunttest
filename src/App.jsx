import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Genre from "./Genre";

export default function App() {
  let [mainData, setMainData] = useState([]);
  let [list, setList] = useState([]);
  let [loading, setLoading] = useState(true);
  let [genreData, setGenreData] = useState([]);
  let [currData, setCurrData] = useState([]);
  let [left, setLeft] = useState(0);
  let [right, setRight] = useState(9);
  let genreRef = useRef();
  let searchData = useRef();
  function compare(a, b) {
    let an = a.name;
    let bn = b.name;
    return an.localeCompare(bn);
  }
  function updateList(lefti, righti, arr) {
    setLoading(true);
    setLeft(lefti);
    setRight(righti);

    setList(arr.slice(lefti, righti + 1));

    setLoading(false);
  }
  function updateCurrentData(arr, data) {
    let res = [];
    if (data[0] === "genre") {
      if (data[1] === "All") {
        res = [...arr];
      } else {
        arr.forEach((elem) => {
          let genreList = elem.genre.split(",");
          if (genreList.includes(data[1])) res.push(elem);
        });
      }
    } else {
      let str = data[1].toLowerCase().split(" ");

      arr.forEach((elem) => {
        str.forEach((word) => {
          let regex = new RegExp(word, "i");
          if (
            regex.test(elem.name) ||
            regex.test(elem.city) ||
            regex.test(elem.genre)
          )
            res.push(elem);
        });
      });
    }
    setCurrData(res);
    console.log(res);
    updateList(0, 9, res);
  }
  function updateGenreData(arr) {
    let res = ["All"];
    arr.forEach((item) => {
      let genreList = item.genre.split(",");
      genreList.forEach((elem) => {
        if (!res.includes(elem)) res.push(elem);
      });
    });

    res.sort((a,b)=>a.localeCompare(b))
    setGenreData(res);
  }
  useEffect(() => {
    async function fetchData() {
      let response = await fetch("http://128.199.195.196:3001/", {
        headers: {
          Authorization: "Bearer iqi509189dxznal;,ggi",
        },
      });
      let data = await response.json();
      data.sort(compare);
      setMainData(data);
      updateGenreData(data);
      updateCurrentData(data, ["genre", "All"]);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);



  return (
    <div className="container">
      <div className="navbar">
        <p>Explorer</p>
      </div>

      <div className="main">
        {!loading && (
          <div className="table">
            <div className="header">
              <h1>List of Restraunts</h1>
            </div>
            <div className="searchbar">
              <input
                type="text"
                placeholder="Search the table..."
                ref={searchData}
                onChange={(e)=>{
                    console.log("hello->",e.target.value)
                    if(e.target.value==="")
                    updateCurrentData(mainData,["genre",genreRef.current.value])
                }}
              />
              <button
                onClick={() =>
                  updateCurrentData(currData, [
                    "search",
                    searchData.current.value,
                  ])
                }
              
              >
                Search
              </button>
            </div>
            <button
              className="left btn"
              onClick={() => {
                updateList(left - 10, right - 10, currData);
              }}
              disabled={left === 0 ? true : false}
            >
              Prev
            </button>
            <button
              className="next btn"
              onClick={() => {
                right + 10 > currData.length
                  ? updateList(left + 10, currData.length, currData)
                  : updateList(left + 10, right + 10, currData);
              }}
              disabled={right >= currData.length - 1 ? true : false}
            >
              Next
            </button>
            <label htmlFor="genres">Filter by Genre:</label>

            <select
              name="genres"
              id="genres"
              ref={genreRef}
              onChange={(e) =>
                updateCurrentData(mainData, ["genre", genreRef.current.value])
              }
            >
              {genreData.map((elem) => {
                return <option value={elem}>{elem}</option>;
              })}
            </select>
            <table>
              <tr>
                <th className="name">Name</th>
                <th className="city">City</th>
                <th className="state">State</th>
                <th className="phone">Phone Number</th>
                <th className="genre">Genre</th>
              </tr>

              {list.map((elem) => {
                return (
                  <tr>
                    <td className="name">{elem.name}</td>
                    <td className="city">{elem.city}</td>
                    <td className="state">{elem.state}</td>
                    <td className="phone">{elem.telephone}</td>
                    <td className="genre">
                      {<Genre genre={elem.genre.split(",")} />}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
