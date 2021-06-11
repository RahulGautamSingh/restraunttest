import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Genre from "./Genre";

export default function App() {
  let [mainData, setMainData] = useState([]);
  let [list, setList] = useState([]);
  //   let [condition,setCondition] = useState({"genre":"All","search":""})
  let [loading, setLoading] = useState(true);
  let [genreData, setGenreData] = useState([]);
  let [currData, setCurrData] = useState([]);
  let [left, setLeft] = useState(0);
  let [right, setRight] = useState(9);
  let genreRef = useRef();
  let searchRef = useRef();

  function compare(a, b) {
    let an = a.name;
    let bn = b.name;
    return an.localeCompare(bn);
  }
  function updateList(lefti, righti, arr, dir) {
    if (dir === "left" && right === currData.length - 1) {
      setRight(Math.floor(currData.length / 10) * 10 - 1);
      righti = Math.floor(currData.length / 10) * 10 - 1;
    } else {
      setRight(righti);
    }
    setLoading(true);
    setLeft(lefti);
    setList(arr.slice(lefti, righti + 1));
    setLoading(false);
  }
  function updateCurrentData(data, genre, search) {
    let res = [];
    if (genre === "All") res = [...data];
    else {
      data.forEach((elem) => {
        let genreList = elem.genre.split(",");
        if (genreList.includes(genre)) res.push(elem);
      });
    }


    if (search !== "") {
       let newRes = []
      let str = search.toLowerCase().split(" ");
      res.forEach((elem) => {
        str.forEach((word) => {
          let regex = new RegExp(word, "i");
          if (
            regex.test(elem.name) ||
            regex.test(elem.city) ||
            regex.test(elem.genre)
          )
           newRes.push(elem)
        });
      });
      setCurrData(newRes);
      updateList(0, 9, newRes);
    }
  else{
    setCurrData(res);
    updateList(0, 9, res);
  }
  }
  function updateGenreData(arr) {
    let res = ["All"];
    arr.forEach((item) => {
      let genreList = item.genre.split(",");
      genreList.forEach((elem) => {
        if (!res.includes(elem)) res.push(elem);
      });
    });
    res.sort((a, b) => a.localeCompare(b));
    setGenreData(res);
  }
  //change the updateCurrData using search && genre tags
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
      updateCurrentData(data, "All", "");
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
        {loading && <p>Loading...</p>}
        {!loading && (
          <div className="table">
            <div className="header">
              <h1>List of Restraunts</h1>
            </div>
            <div className="searchbar">
              <input
                className="search-input"
                type="text"
                placeholder="Search the table..."
                ref={searchRef}
                onChange={(e) => {
                  console.log("hello->", e.target.value);
                  if (e.target.value === "")
                    updateCurrentData(mainData, genreRef?.current.value, "");
                }}
              />
              <button
                className="searchbtn"
                onClick={() =>
                  updateCurrentData(
                    mainData,
                    genreRef?.current.value,
                    searchRef.current.value
                  )
                }
              >
                Search
              </button>
            </div>

            <div className="table-bar">
              <div className="buttons">
                <button
                  className="btn"
                  onClick={() => {
                    updateList(left - 10, right - 10, currData, "left");
                  }}
                  disabled={left === 0 ? true : false}
                >
                  Prev
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    right + 10 > currData.length
                      ? updateList(
                          left + 10,
                          currData.length - 1,
                          currData,
                          "right"
                        )
                      : updateList(left + 10, right + 10, currData, "right");
                  }}
                  disabled={right >= currData.length - 1 ? true : false}
                >
                  Next
                </button>
              </div>
              <div className="filter-section">
                <label htmlFor="genres">Filter by Genre:</label>

                <select
                  name="genres"
                  id="genres"
                  ref={genreRef}
                  onChange={(e) =>
                    updateCurrentData(
                      mainData,
                      genreRef.current.value,
                      searchRef?.current.value
                    )
                  }
                >
                  {genreData.map((elem) => {
                    return <option value={elem}>{elem}</option>;
                  })}
                </select>
              </div>
            </div>
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
