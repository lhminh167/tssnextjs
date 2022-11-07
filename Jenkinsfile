pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:v1.7.0-debug
    tty: true
    command:
      - /busybox/sleep
      - infinity
    volumeMounts:
      - name: docker-config
        mountPath: /kaniko/.docker
  volumes:
    - name: docker-config
      configMap:
        name: docker-config
'''
        }
    }
    stages {
        stage('Main') {
            environment {
                PATH = "/busybox:/kaniko:$PATH"
            }
            steps {
                container(name: 'kaniko', shell: '/busybox/sh') {
                    sh '''#!/busybox/sh
                    echo "in kaniko"
                    '''
                    script {
                      checkout scm
                      sh "/kaniko/executor --cache=true --dockerfile `pwd`/Dockerfile --context `pwd` --destination=lhminh167/tssnextjs:${env.BUILD_ID}"
                    }
                }
            }
        }
    }
}
