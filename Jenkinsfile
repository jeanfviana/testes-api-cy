pipeline {
    agent any

    stages {
        stage('Clonar git') {
            steps {
                git branch: 'main', url: 'https://github.com/jeanfviana/testes-api-cy.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
                bat 'npm install --save-dev start-server-and-test'
            }
        }
        stage('Realizar testes') {
            steps {
                ansiColor('xterm') {
                    bat 'npx start-test http://localhost:3000'
                }
            }
        }
    }
}
