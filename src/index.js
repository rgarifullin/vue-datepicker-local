import component from './VueDatepickerLocal.vue'
function install (app) {
  app.component(component.name, component)
}
component.install = install
export default component
