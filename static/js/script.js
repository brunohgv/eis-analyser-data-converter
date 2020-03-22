$('#file-input').on('change',function(){
    var fileName = $(this).val();
    $(this).next('.custom-file-label').html(fileName);
})

$("#btn-submit").click(function (event) {
    event.preventDefault()

    var form_data = new FormData()
    form_data.append('file', $('#file-input')[0].files[0])

    $("#btnSubmit").prop("disabled", true);

    $.ajax({
        type: 'POST',
        mimeType: "multipart/form-data",
        data: form_data,
        url: '/convert',
        processData: false,
        contentType: false,
        cache: false,
        success: function(response) {
            var blob = new Blob([response])
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = 'converted.txt'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            $("#btn-submit").prop("disabled", false);
        },
        error: function(error) {
            alert(error)
            $("#btn-submit").prop("disabled", false);
        }
    })
})