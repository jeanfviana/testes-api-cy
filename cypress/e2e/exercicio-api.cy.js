/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(10)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let nome = `Fulano${Math.floor(Math.random() * 10000000)}`
          let email = nome + `@test.com`

          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": nome,
                    "email": email,
                    "password": "teste",
                    "administrador": "true"
               }

          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          let nome = `Fulano ${Math.floor(Math.random() * 10000000)}`
          let email = nome + `@test.com`

          cy.request({
               method: 'POST',
               url: 'usuarios',
               failOnStatusCode: false,
               body: {
                    "nome": nome,
                    "email": email,
                    "password": "teste",
                    "administrador": "true"
               }

          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.email).to.equal('email deve ser um email válido')
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let nome = `Fulano${Math.floor(Math.random() * 10000000)}`
          let email = nome + `@test.com`

          cy.cadastrarUsuario(nome, email, "teste")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'PUT',
                         url: `usuarios/${id}`,
                         body:
                         {
                              "nome": "Fulano alterado",
                              "email": email,
                              "password": "alterado",
                              "administrador": "true"
                         }
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro alterado com sucesso')
                         expect(response.status).to.equal(200)
                    })
               })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let nome = `Fulano${Math.floor(Math.random() * 10000000)}`
          let email = nome + `@test.com`

          cy.cadastrarUsuario(nome, email, "teste")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'DELETE',
                         url: `usuarios/${id}`
                    }).then(response =>{
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                         expect(response.status).to.equal(200)
                    })
               })
     });


});
