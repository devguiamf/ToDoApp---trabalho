import React, { Component } from "react";
import axios from 'axios'

import PageHeader from "../template/pageHeader";
import CadastroForm from "./cadastroForm";
import CadastroList from "./cadastroList";

const URL = 'http://localhost:3003/api/cadastros'

export default class Cadastro extends Component {
  constructor(props){
    super(props)
    this.state = { nome: '', list: [] }
    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.refresh()
  }

  refresh(nome = ''){
    const search = nome ? `&nome__regex=/${nome}/` : ''
    axios.get(`${URL}?sort=nome${search}`)
      .then(resp => this.setState({...this.state, nome: '', list: resp.data}))
  }

  handleSearch() {
    this.refresh(this.state.nome)
  }

  handleChange(e){
    this.setState({...this.state, nome: e.target.value})
  }

  handleAdd(){
    const nome = this.state.nome
    axios.post(URL, { nome })
      .then(resp => this.refresh())
  }

  handleClear(){ 
    this.refresh()
  } 

  handleRemove(cadastro) {
    axios.delete(`${URL}/${cadastro._id}`)
      .then(resp => this.refresh(this.state.nome))
  }

  render() {
    return (
      <div>
        <PageHeader name='Cadastro' small='Nomes'></PageHeader>
        
        <CadastroForm
          nome={this.state.nome}
          handleChange={this.handleChange}
          handleAdd={this.handleAdd}
          handleSearch={this.handleSearch}
          handleClear={this.handleClear} />

        <CadastroList
          list={this.state.list}
          handleRemove={this.handleRemove}/>
      </div>
    );
  }
}