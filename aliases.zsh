# Generic faster aliases
alias k='kubectl'
alias kc='kubectl apply -f'

alias kpl='kube-pod-list'





alias kR='k delete'
alias kg='k get -o wide'
alias kgv='kg -o json'
alias kgw='kg --watch'
alias kRa='kR --all'
alias kga='kg all'
alias kgaw="watch 'kubectl get all'"
# Kind-agnostic
alias kl='kubectl logs'
# Pods
alias kpRa='kR pod --all'
alias kpR='kR pod'
# alias kplw='kg pods --watch'
# alias kpl='kg pods'
alias kpv='kgv pod'
# Deployment
alias kdRa='kR deployment --all'
alias kdR='kR deployment'
alias kdlw='kg deployments --watch'
alias kdl='kg deployments'
alias kdv='kgv deployment'
# Services
alias ksRa='kR service --all'
alias ksR='kR service'
alias kslw='kg services --watch'
alias ksl='kg services'
alias ksv='kgv service'
# Ingresses
alias kiRa='kR ingress --all'
alias kiR='kR ingress'
alias kilw='kg ingress --watch'
alias kil='kg ingress'
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
