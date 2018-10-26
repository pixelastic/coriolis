# Generic faster aliases
alias k='kubectl'
alias kg='k get -o wide'
alias kgv='kg -o json'
alias kR='k delete'
alias kc='kubectl apply -f'
alias kga='kube-get-all'

# Pods {{{
alias kpl='kube-list pod'
alias kplw='kube-list-watch pod'
alias kpR='kR pod'
alias kpRa='kR pod --all'
alias kpv='kube-pod-details'
alias kpvi='KUBE_DETAILS_INTERACTIVE=1 kube-pod-details'
# Completion {{{
function _completion_kube_pod {
  reply=($(kube-completion "pod"))
}
compctl -K _completion_kube_pod kube-pod-details
# }}}
# }}}
# StatefulSet {{{
alias kstl='kube-list statefulset'
alias kstlw='kube-list-watch statefulset'
alias kstR='kR statefulset'
alias kstRa='kR statefulset --all'
alias kstv='kube-statefulset-details'
alias kstvi='KUBE_DETAILS_INTERACTIVE=1 kube-statefulset-details'
# Completion {{{
function _completion_kube_statefulset {
  reply=($(kube-completion "statefulset"))
}
compctl -K _completion_kube_statefulset kube-statefulset-details
# }}}
# Deployments {{{
alias kdl='kube-list deployment'
alias kdlw='kube-list-watch deployment'
alias kdR='kR deployment'
alias kdRa='kR deployment --all'
alias kdv='kube-deployment-details'
alias kdvi='KUBE_DETAILS_INTERACTIVE=1 kube-deployment-details'
# Completion {{{
function _completion_kube_deployment {
  reply=($(kube-completion "deployment"))
}
compctl -K _completion_kube_deployment kube-deployment-details
# }}}
# }}}
# Services {{{
alias ksl='kube-list service'
alias kslw='kube-list-watch service'
alias ksR='kR service'
alias ksRa='kR service --all'
alias ksv='kube-service-details'
alias ksvi='KUBE_DETAILS_INTERACTIVE=1 kube-service-details'
# Completion {{{
function _completion_kube_service {
  reply=($(kube-completion "service"))
}
compctl -K _completion_kube_service kube-service-details
# }}}
# }}}
# CronJobs {{{
alias kcl='kube-list cronjob'
alias kclw='kube-list-watch cronjob'
alias kcR='kR cronjob'
alias kcRa='kR cronjob --all'
alias kcv='kube-cronjob-details'
alias kcvi='KUBE_DETAILS_INTERACTIVE=1 kube-cronjob-details'
# Completion {{{
function _completion_kube_cronjob {
  reply=($(kube-completion "cronjob"))
}
compctl -K _completion_kube_cronjob kube-cronjob-details
# }}}
# }}}
# Jobs {{{
alias kjl='kube-list job'
alias kjlw='kube-list-watch job'
alias kjR='kR job'
alias kjRa='kR job --all'
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
