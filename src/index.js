function _defFilter(el, binding, vnode) {
    // 默认有文本的情况不focus
    // console.log('_defFilter', vnode, !!text)
    // 输入框的文本值
    const { componentInstance: { value } } = vnode
    return !value
}
function _setFocus(el, binding, vnode) {
    const { tagName } = el
    // console.log('binding', binding)
    const { filter = _defFilter } = binding.value
    const filterRes = filter(el, binding, vnode)
    // console.log('filterRes', filterRes)
    // 执行过滤函数返回为false时，不执行focus()
    if (!filterRes) {
        return
    }

    if (['INPUT', 'TEXTAREA'].indexOf(tagName.toUpperCase()) !== -1) {
        el?.focus()
    } else {
        el?.querySelector("input, textarea")?.focus()
    }
}

export default {
    install(Vue, options) {
        Vue.directive('focus', {
            // 当被绑定的元素插入到 DOM 中时……
            inserted: function (el, binding, vnode) {
                // console.log('inserted')
                _setFocus(el, binding, vnode)
            },
            componentUpdated(el, binding, vnode) {
                // console.log('componentUpdated')
                const { value: { focus }, oldValue: { focus: oldFocus } } = binding
                if (focus && focus !== oldFocus) {
                    _setFocus(el, binding, vnode)
                }
            }
        })
    }
}

