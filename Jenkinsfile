pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {

        stage('Información') {
            steps {
                echo "Rama: ${env.BRANCH_NAME}"

                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Instalar dependencias') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Compilar frontend') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Desplegar') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }

            steps {
                echo 'Rama principal detectada: despliegue pendiente de configurar.'
            }
        }
    }
}