import { useEffect } from "react";
import { useState } from "react";
import Genre from "./Genre";

export default function App() {
  let [mainData, setMainData] = useState([]);
  let [list, setList] = useState([]);
  let [loading, setLoading] = useState(true);
  let [left, setLeft] = useState(0);
  let [right, setRight] = useState(9);

  function compare(a, b) {
    let an = a.name;
    let bn = b.name;
    return an.localeCompare(bn);
  }
  function updateList(lefti, righti, arr) {
    setLeft(lefti);
    setRight(righti);
    setLoading(true);
    if (mainData.length === 0) {
      setList(arr.slice(0, 10));
    } else {
      setList(arr.slice(lefti, righti + 1));
    }
    setLoading(false);
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
      updateList(0, 9, data);
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
            <button
              className="left btn"
              onClick={() => {
                updateList(left - 10, right - 10, mainData);
              }}
              disabled={left === 0 ? true : false}
            >
              Prev
            </button>
            <button
              className="next btn"
              onClick={() => {
                right + 10 > mainData.length
                  ? updateList(left + 10, mainData.length, mainData)
                  : updateList(left + 10, right + 10, mainData);
              }}
              disabled={right >= mainData.length - 1 ? true : false}
            >
              Next
            </button>
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
