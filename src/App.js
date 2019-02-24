
import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import { CsvToHtmlTable } from 'react-csv-to-table';


const endpoint = 'http://localhost:8080/upload'


class App extends Component {

  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0,
      tableData: null
    }
  }

  selectFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  uploadFile = () => {
    console.log("Uploading file")
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post(endpoint, data)
      .then(res => {
        console.log(res.data)
        this.setState({
          tableData: res.data
        })
      })
  }

  render() {

    if (this.state.tableData == null) {

      return (
        <div className="App">
          <input type="file" name="" id="" onChange={this.selectFile} />
          <button onClick={this.uploadFile}>Upload</button>
        </div>
      )

    } else {

      return ( 
        <div className="App"> 
          <CsvToHtmlTable data={this.state.tableData} csvDelimiter="," tableClassName="table table-striped table-hover"/>
        </div>
      )

    }
  }
}

export default App