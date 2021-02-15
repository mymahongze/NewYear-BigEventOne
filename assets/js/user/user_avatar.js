$(function () {
    // 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
  
    // 创建裁剪区域
    $image.cropper(options)

    // 点击弹出文件选择框
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })
    // 更换裁剪区域的图片
    $('#file').on('change',function (e) {
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 拿到用户选择的文件
        var file = e.target.files[0]
        // 将文件转化为路径
        var imgURL = URL.createObjectURL(file)
        // 重新初始化裁剪区域
        $image.cropper('destroy').attr('src',imgURL).cropper(options)
    })

    // 将裁剪后的头像上传到服务器
    $("#btnUpload").on("click", function () { 
        var dataURL = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
          }).toDataURL('image/png')
    
        $.ajax({
            method:"POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                  }
                  layer.msg('更换头像成功！')
                  window.parent.getUserInfo()
            }
        });
    })

    
})