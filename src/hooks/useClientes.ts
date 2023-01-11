import { useEffect, useState } from "react"
import ColecaoCliente from "../backend/db/ColecaoCliente"
import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"
import TabelaOuForm from "./useTabelaOuForm"

const useClientes = () => {

    const {
        tabelaVisivel,
        formularioVisivel,
        exibirTabela,
        exibirFormulario
    } = TabelaOuForm()
    
    const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(obterTodos, [])

  function obterTodos() {
    repo.obterTodos().then(clientes => {
      setClientes(clientes) 
      exibirTabela()
    })
  }

  function selecionarCliente(cliente: Cliente) {
    setCliente(cliente)
    exibirFormulario()
  }

  async function excluirCliente(cliente: Cliente) {
    await repo.excluir(cliente)
    obterTodos()
    exibirTabela()
}

  function novoCliente() {
    setCliente(Cliente.vazio())
    exibirFormulario()
  }


  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente)
    obterTodos()
    exibirTabela()
  }

  return {
    tabelaVisivel,
    exibirTabela,
    clientes,
    cliente,
    novoCliente,
    salvarCliente,
    excluirCliente,
    selecionarCliente,
    obterTodos
  }
}

export default useClientes