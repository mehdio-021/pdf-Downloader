import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function App() {
  const [data, setData] = useState([]);

  const getDate = () => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      const data = response.data;
      setData(data);
      console.log(data);
    });
  };

  const download = () => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: "#table" });
    pdf.save("msi.pdf");
  };
  return (
    <div className="container">
      <h1 className="py-5 text-center">دانلود جدول به صورت pdf</h1>
      <div className="py-5 ">
        <button className="btn btn-success " onClick={getDate}>
          نمایش جدول
        </button>
      </div>
      {data.length > 0 && (
        <>
          <div className="downloadDate">
            <button className="btn btn-primary" onClick={download}>
              دانلود جدول
            </button>
          </div>

          <h2 className="py-5">جدول اطلاعات</h2>

          <table className="table table-borderless" id="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{String(item.completed)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;
