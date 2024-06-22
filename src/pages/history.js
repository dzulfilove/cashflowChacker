import React, { Component } from "react";
import TableHistory from "../components/table";
import { urlAPI } from "../config/database";
import axios from "axios";
class History extends Component {
  constructor(props) {
    super(props);
    const user = sessionStorage.getItem("userEmail");

    this.state = {
      dataRiwayat: [],
      user: user,
    };
  }

  componentDidMount() {
    this.getHistory();
  }
  getHistory = async () => {
    const url = urlAPI + "/history-check/by-user";
    try {
      console.log("cek");

      const response = await axios.post(
        url,
        {
          user: this.state.user,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const dataHasil = response.data;
      const idHistory = dataHasil.data[0];
      console.log("data Riwayat", dataHasil.data);

      this.setState({ dataRiwayat: dataHasil.data });
      return dataHasil.data;
    } catch (error) {
      console.log(error);
    }
  };

  
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
        <TableHistory data={this.state.dataRiwayat} />
      </div>
    );
  }
}

export default History;
