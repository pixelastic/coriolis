# Generic faster aliases
alias k='kubectl'
alias kg='k get -o wide'
alias kgv='kg -o json'
alias kR='k delete'
alias kc='kubectl apply -f'
alias kga='kube-get-all'

# Context {{{
alias kct="k config current-context"
alias kctl="kube-list context"
alias kcts="kube-context-switch"
# Completion {{{
function _completion_kube_context {
  reply=($(kube-context-completion))
}
compctl -K _completion_kube_context kube-context-switch
# }}}
# }}}
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
alias kcjl='kube-list cronjob'
alias kcjlw='kube-list-watch cronjob'
alias kcjR='kR cronjob'
alias kcjRa='kR cronjob --all'
alias kcjv='kube-cronjob-details'
alias kcjvi='KUBE_DETAILS_INTERACTIVE=1 kube-cronjob-details'
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
