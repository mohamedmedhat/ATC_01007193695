pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = "yourusername/angular-frontend"
        DOCKER_IMAGE_BACKEND = "yourusername/springboot-backend"
        SONARQUBE_URL = "http://localhost:9000"
        SONARQUBE_TOKEN = "your_sonarqube_token"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/mohamedmedhat/ATC_01007193695'
            }
        }

        stage('Lint & Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run lint'
                    sh 'npm run test'
                }
            }
        }

        stage('SonarQube Analysis Frontend') {
            steps {
                dir('frontend') {
                    withSonarQubeEnv('SonarQube') {
                        sh 'sonar-scanner'
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        docker.build("${DOCKER_IMAGE_FRONTEND}:latest")
                    }
                }
            }
        }

        stage('Lint & Test Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean install'
                    sh 'mvn test'
                }
            }
        }

        stage('SonarQube Analysis Backend') {
            steps {
                dir('backend') {
                    withSonarQubeEnv('SonarQube') {
                        sh 'sonar-scanner'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    script {
                        docker.build("${DOCKER_IMAGE_BACKEND}:latest")
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
