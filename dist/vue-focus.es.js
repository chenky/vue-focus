function _defFilter(el, binding, vnode) {
  const { componentInstance: { value } } = vnode;
  return !value;
}
function _setFocus(el, binding, vnode) {
  var _a;
  const { tagName } = el;
  const { filter = _defFilter } = binding.value;
  const filterRes = filter(el, binding, vnode);
  if (!filterRes) {
    return;
  }
  if (["INPUT", "TEXTAREA"].indexOf(tagName.toUpperCase()) !== -1) {
    el == null ? void 0 : el.focus();
  } else {
    (_a = el == null ? void 0 : el.querySelector("input, textarea")) == null ? void 0 : _a.focus();
  }
}
var index = {
  install(Vue, options) {
    Vue.directive("focus", {
      inserted: function(el, binding, vnode) {
        _setFocus(el, binding, vnode);
      },
      componentUpdated(el, binding, vnode) {
        const { value: { focus }, oldValue: { focus: oldFocus } } = binding;
        if (focus && focus !== oldFocus) {
          _setFocus(el, binding, vnode);
        }
      }
    });
  }
};
export { index as default };
