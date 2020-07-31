// 自定义日历范围选择组件（倒数的时间段） sunxc 2018.12.15
;(function($) {
  var calendarRange = (function() {
    /**
     * 插件函数
     * @param {dom} element 插件追加dom容器对象
     * @param {object} options 插件配置对象
     *
     */
    function calendarRange(element, options) {
      // calendar容器dom
      this.element = element
      // 合并插件配置 defaults + options
      this.options = $.extend(true, $.fn.calendarRange.defaults, options || {})
      // 插件初始化
      this.init()
    }
    calendarRange.prototype = {
      init: function() {
        // 初始化插件 dom + 事件
        var me = this
        // 展示月的个数 强制转换为 12 避免出现 bug
        me.manyMonths = me.options.manyMonths > 12 ? 12 : me.options.manyMonths
        // 确定按钮
        me.calendarConfirmBtn = me.options.calendarConfirmBtn
        // 重置按钮
        me.calendarResetBtn = me.options.calendarResetBtn

        // dom
        // 开始
        var html = `<div class="calendar-range" id="calendarDom">
            <input id="calendarStartDate" type="hidden" value=""/>
            <input id="calendarEndDate" type="hidden" value=""/>
            <div class="calendar-week">
                <div class="week-text color-blue">日</div>
                <div class="week-text">一</div>
                <div class="week-text">二</div>
                <div class="week-text">三</div>
                <div class="week-text">四</div>
                <div class="week-text">五</div>
                <div class="week-text color-blue">六</div>
            </div>
            <div class="calendar-scroll">
                <div class="scroll-content clearfix">`
        // 日期拼接
        /**
         * 生成日期 html
         * @param {number || string} manyMonths 月份的个数
         */
        function creationDateList(manyMonths) {
          let htmlStr = ''
          var now = me.options.calendarStartDate
            ? new Date(me.options.calendarStartDate)
            : new Date()
          // 当前的年 月
          var year = now.getFullYear()
          var month = now.getMonth() + 1
          // 根据月的数量循环生成 html
          for (let i = 0; i < me.manyMonths; i++) {
            // 如果是只要一个月的数据便不做过多的加减判断
            if (me.manyMonths != 1) {
              // 非首次循环自加1，否则得出需要展示的最小的月份，正排
              if (i != 0) {
                month++
                // 判断月份转换年和月
                if (month < 1) {
                  month = month - i + 12 + 1
                  month = month > 12 ? 12 : month
                  year -= 1
                } else if (month > 12) {
                  month -= 12
                  month = month === 0 ? 1 : month
                  year++
                }
              } else {
                month -= me.manyMonths - 1
                // 判断月份转换年和月
                if (month < 1) {
                  month += 12
                  month = month > 12 ? 12 : month
                  year--
                } else if (month > 12) {
                  month -= 12
                  month = month === 0 ? 1 : month
                  year++
                }
              }
            }
            // 月份数组
            let monthsArray = null
            if (me._isLeapYear(year)) {
              monthsArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            } else {
              monthsArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            }
            htmlStr += `<div class="content-title">${year}年${month}月</div>`
            for (let x = 0; x < monthsArray[month - 1]; x++) {
              let week = new Date(`${year}/${month}/${x + 1}`).getDay()
              // 月份首日判断：是周几就 margin-left 几个 content-item 的距离
              if (x === 0) {
                htmlStr += `<div class="content-item ${
                  week === 0 || week === 6 ? 'color-blue' : ''
                }" data-date="${year}/${month}/${x +
                  1}" style="margin-left:${(100 / 7) * week}%;">${x + 1}</div>`
              } else {
                htmlStr += `<div class="content-item ${
                  week === 0 || week === 6 ? 'color-blue' : ''
                }" data-date="${year}/${month}/${x + 1}">${x + 1}</div>`
              }
            }
          }
          return htmlStr
        }
        html += creationDateList(me.manyMonths)
        // 结束
        html += `</div>
                </div>
                <div class="calendar-btn">
                    <div class="reset-btn" id="calendarResetBtn">重置</div>
                    <div class="confirm-btn" id="calendarConfirmBtn">确定</div>
                </div>
            </div>`

        me.element.append(html)
        // 日期点击事件
        $('body').on('click', '#calendarDom .content-item', function(e) {
          me._clickHandle(e)
        })
        // 重置 按钮点击事件
        $('body').on('click', '#calendarResetBtn', function() {
          me._resetTimeData()
        })
        // 确定 按钮点击事件
        // $start, $end
        $('body').on('click', '#calendarConfirmBtn', function() {
          const $start = $('#calendarStartDate').val()
          const $end = $('#calendarEndDate').val()
          if ($start && $end) {
            // 提交数据事件
            me.options.callback($start, $end)
          }
        })
      },
      /**
       *
       * @param {number} year 是否是闰年
       */
      _isLeapYear: function(year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
      },
      /**
       * 每个小日期的点击事件
       * @param {object} e 点击的 dom 元素
       */
      _clickHandle: function(e) {
        const me = this
        const $this = $(e.target)
        const index = $this.index()
        const $calendarStartDate = $('#calendarStartDate')
        const $calendarEndDate = $('#calendarEndDate')
        // 已经点击了两次
        if ($calendarStartDate.val() && $calendarEndDate.val()) {
          // 清空数据重新执行
          me._resetTimeData()
          me._clickHandle(e)
        } else if ($calendarStartDate.val()) {
          // 之前已经点击了一次开始
          const startIndex = $('#calendarDom')
            .find('.content-item-start')
            .index()
          // 判断当前的索引值如果小于之前点击的索引值，将当前点击的重置为开始点击的
          if (index < startIndex) {
            $this
              .addClass('content-item-start')
              .siblings()
              .removeClass('content-item-start')
            $calendarStartDate.val($this.attr('data-date'))
          } else {
            $this.addClass('content-item-end')
            $calendarEndDate.val($this.attr('data-date'))
          }
        } else {
          //从未点击过
          $this.addClass('content-item-start')
          $calendarStartDate.val($this.attr('data-date'))
        }
      },
      /**
       * 重置数据事件
       * @param {object} $this 点击的 dom 元素
       */
      _resetTimeData: function($this) {
        $this = $this || $('#calendarDom .content-item')
        const $calendarStartDate = $('#calendarStartDate')
        const $calendarEndDate = $('#calendarEndDate')
        $calendarStartDate.val('')
        $calendarEndDate.val('')
        $this
          .siblings()
          .removeClass('content-item-start')
          .removeClass('content-item-end')
      }
    }

    return calendarRange
  })()

  $.fn.calendarRange = function(options) {
    return this.each(function() {
      var me = $(this)
      // 获取实例
      var instance = me.data('calendarRange')
      // 判断：实例如果未创建，创建实例
      if (!instance) {
        me.data('calendarRange', (instance = new calendarRange(me, options)))
      }

      if ($.type(options) === 'string') return instance[options]()
    })
  }
  $.fn.calendarRange.defaults = {
    // 指定开始的日期 yyyy/mm/dd
    calendarStartDate: '',
    //展示的之前月份个数 默认为 3，最大为 12，大于 12 会强制转换为 12 避免出现 bug
    manyMonths: 3,
    /**
     * 回调函数 主要是为了提交数据用的
     * @param {date} $start 开始时间
     * @param {date} $end 结束时间
     */
    callback: function($start, $end) {
      console.log($start, $end)
    }
  }
})($)
// // 测试语法
// $('#id1').calendarRange({
//   calendarStartDate: '2008/2/2',
//   manyMonths: 20,
//   callback: function($start,$end) {
//     console.log(`start：${$start}\nend：${$end}`)
//   }
// })
