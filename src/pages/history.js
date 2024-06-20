import React, { Component } from "react";
import TableHistory from "../components/table";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKosong: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="w-full flex justify-start items-center flex-col">
        <div className="flex w-full mt-12 h-full flex-col justify-start items-center gap-6 ">
          <div
            data-aos="slide-down"
            className="w-[90%] flex justify-start items-center  text-2xl font-semibold bg-white shadow-md p-4 py-6 rounded-xl mb-12"
          >
            Riwayat
          </div>
        </div>
        <TableHistory />
      </div>
    );
  }
}

export default History;
