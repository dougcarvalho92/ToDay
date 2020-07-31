# Prova da Equipe .NET

## Requisitos

Desenvoler uma aplicação de TODO list.

Crie um README em seu repositório explicando como você construiu sua aplicação, quais tecnologias foram utilizadas, quais foram as dificuldades, porque escolheu uma determinada biblioteca...

Entrega da prova será feita pelo git, você pode fazer um fork deste repositório e nos enviar o link.

### BackEnd

Desenvoler uma Web API seguindo os padrões REST e utilizando preferencialmente .NET CORE (C#) ou NodeJS.

Preferencialmente utilizar o padrão de arquitetura DDD e interessante também utilizar TDD (opcional).

O banco de dados de sua aplicação poderá ser em memória, caso opte por rodar em um banco de dados físico, utilize Code First gerando Migrations do EF.


### FrontEnd

Desenvolver preferencialmente em Angular utilizando algum framework de preferência [Material](https://material.angular.io/) ou ReactJS


## Funcionalidades

### Usuário

- Login
- Cadastro

### Lista de tarefas

- Filtrar por Nome e Categoria
- Criar lista
- Marcar como concluída
- Editar
- Excluir

### Tarefa

- Adicionar
- Concluir
- Editar
- Excluir


## Modelo de dados

```js
// usuario
{
    id:number,
    nome:string,
    email:string,
    senha:string,
}

// categoria
{
    id:number,
    nome:string,
}

// lista
{
    id:number,
    nome:string,
    categoriaId:number,
    concluida:boolean,
}

// tarefa
{
    id:number,
    listaId:number,
    nome:string,
    concluida:boolean,
    usuarioId:number
}
```