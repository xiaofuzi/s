export default function($el) {
    let event = {
        element: $el,
        eventHandler: {
            events: {},
            bindEvent: function(event, callback, targetElement) {
                //bind event listener to DOM element
                //在冒泡阶段触发
                targetElement.addEventListener(event, callback, false);

                if (this.events[event]) {
                    var counter = this.events[event].length;
                    this.events[event].push({
                        eventId: counter,
                        event: callback,
                        target: targetElement
                    })
                } else {
                    this.events[event] = [];
                    this.events[event].push({
                        eventId: 0,
                        event: callback,
                        target: targetElement
                    })
                }

            },
            findEvent: function(event) {
                if (this.events[event]) {
                    return this.events[event][0];
                } else {
                    return false;
                }
            },
            /*
             * return all listen events
             */
            all: function(event) {
                if (this.events[event]) {
                    return this.events[event];
                } else {
                    return false;
                }
            },
            unbindEvent: function(event, targetElement) {
                var foundEvent = this.findEvent(event);
                if (foundEvent) {
                    targetElement.removeEventListener(event, foundEvent.event, false);

                    //update events array
                    this.events = this.events[event].filter(function(e) {
                        return e.counter !== event.counter;
                    }, event);
                }
            },
            remove: function(event, targetElement) {
                var self = this;
                var events = this.all(event);
                if (events) {
                    events.forEach(function(e) {
                        self.unbindEvent(e, targetElement)
                    })
                    self.events[event] = [];
                }
            },
            /*
             * 检查该事件类型是否被绑定
             */
            isBinding: function(event) {
                if (this.findEvent(event)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        on: function(event, callback) {
            this.eventHandler.bindEvent(event, callback, this.element);
        },
        /*
         * bind once
         */
        once: function(event, callback) {
            this.eventHandler.remove(event);
            this.on(event, callback);
        },
        off: function(event) {
            this.eventHandler.unbindEvent(event, this.element);
        },
        /*
         * delegate 事件,给动态添加元素绑定监听事件
         */
        // delegate: function(selector, event, fn) {
        //     var self = this;
        //     self.on(event, function(e) {
        //         var context = this;
        //         var children = self.create(self.selector + ' ' + selector).elements;
        //         children.forEach(function(child) {
        //             if (e.target == child) {
        //                 fn.call(context, e);
        //             }
        //         })
        //     })
        // },
        /*
         * 触发指定事件
         */
        //浏览器事件，默认冒泡
        trigger: function(type) {
            var el = this.element;
            var event = document.createEvent('HTMLEvents');
            event.initEvent(type, true, true);
            el.dispatchEvent(event);
        }
    }
    return event
}
