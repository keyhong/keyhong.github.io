// 한 번의 클릭으로 코드 블록 복사

$(function () {
    var $copyIcon = $('<i class="fas fa-copy code_copy" title="코드복사" aria-hidden="true"></i>')
    var $notice = $('<div class="codecopy_notice"></div>')
    $('.code-area').prepend($copyIcon)
    $('.code-area').prepend($notice)
    // "복사 성공"이라는 단어가 나타납니다.
    function copy(text, ctx) {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            try {
                document.execCommand('copy') // Security exception may be thrown by some browsers.
                $(ctx).prev('.codecopy_notice')
                    .text("복사성공")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 450, function () {
                        setTimeout(function () {
                            $(ctx).prev('.codecopy_notice').animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
            } catch (ex) {
                $(ctx).prev('.codecopy_notice')
                    .text("복사실패")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 650, function () {
                        setTimeout(function () {
                            $(ctx).prev('.codecopy_notice').animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
                return false
            }
        } else {
            $(ctx).prev('.codecopy_notice').text("浏览器不支持复制")
        }
    }
    // 复制
    $('.code-area .fa-copy').on('click', function () {
        var selection = window.getSelection()
        var range = document.createRange()
        range.selectNodeContents($(this).siblings('pre').find('code')[0])
        selection.removeAllRanges()
        selection.addRange(range)
        var text = selection.toString()
        copy(text, this)
        selection.removeAllRanges()
    })
});
