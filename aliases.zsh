# Generic faster aliases
alias k='kubectl'
alias kg='k get -o wide'
alias kgv='kg -o json'
alias kR='k delete'
alias kc='kubectl apply -f'
alias kga='kube-get-all'

# Pods {{{
alias kpl='kube-pod-list'
alias kplw='kube-pod-list-watch'
alias kpR='kR pod'
alias kpRa='kR pod --all'
alias kpv='kube-pod-details'
alias kpvi='KUBE_DETAILS_INTERACTIVE=1 kube-pod-details'
# Completion {{{
function _completion_kube_pods {
  reply=($(kube-completion "pod"))
}
compctl -K _completion_kube_pods kube-pod-details
# }}}
# }}}

# Deployments {{{
alias kdl='kube-deployment-list'
alias kdlw='kube-deployment-list-watch'
alias kdR='kR deployment'
alias kdRa='kR deployment --all'
alias kdv='kgv deployment | jq "."'
alias kdv='kube-deployment-details'
alias kdvi='KUBE_DETAILS_INTERACTIVE=1 kube-deployment-details'
# Completion {{{
function _completion_kube_deployments {
  reply=($(kube-completion "deployment"))
}
compctl -K _completion_kube_deployments kube-deployment-details
# }}}
# }}}

# Services {{{
alias ksl='kube-service-list'
alias kslw='kube-service-list-watch'
alias ksR='kR service'
alias ksRa='kR service --all'
alias ksv='kgv service | jq "."'
alias ksv='kube-service-details'
alias ksvi='KUBE_DETAILS_INTERACTIVE=1 kube-service-details'
# Completion {{{
function _completion_kube_services {
  reply=($(kube-completion "service"))
}
compctl -K _completion_kube_services kube-service-details
# }}}
# }}}

# Jobs {{{
alias kjl='kube-job-list'
alias kjlw='kube-job-list-watch'
alias kjR='kR job'
alias kjRa='kR job --all'
alias kjv='kgv job | jq "."'
alias kjv='kube-job-details'
alias kjvi='KUBE_DETAILS_INTERACTIVE=1 kube-job-details'
# Completion {{{
function _completion_kube_job {
  reply=($(kube-completion "job"))
}
compctl -K _completion_kube_job kube-job-details
# }}}
# }}}






alias kgw='kg --watch'
alias kRa='kR --all'
alias kgaw="watch 'kubectl get all'"
# Kind-agnostic
alias kl='kubectl logs'
# Pods
alias kpRa='kR pod --all'
# Deployment
alias kdRa='kR deployment --all'
# Services
alias ksRa='kR service --all'
# Ingresses
alias kiRa='kR ingress --all'
alias kiv='kgv ingress'


# TODO: Make a kpl alias
# If no argument, list everything
# If argument, is it as a selector
# kubectl get pods -l env=production,tier=frontend
# TODO: Make a kpe alias
# Should allow for selecting a pod, and a command
# Or execute bash by default maybe
# kubectl exec -it {pod-name} -- /bin/bash
# TODO: Make a kpip alias to get a pod ip
# Should autocomplete on the pod names, then set to json and jq it
# TODO: Make a kpvj, kdvj, ksvj scripts to get data about pods, services and
# deployments as json

# minikube ssh: connect to the cluster
# minikube dashboard: ???
# 
#
# }}}
