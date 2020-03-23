$('#file-input').on('change',function(){
    var fileName = $(this).val();
    $(this).next('.custom-file-label').html(fileName);
})

$("#btn-submit").click(function (event) {
    event.preventDefault()

    var form_data = new FormData()
    var file = $('#file-input')[0].files[0]
    var fileInput = $('.custom-file-input')
    
    if (!file) {
        fileInput.addClass('is-invalid')
        return false
    }

    if (!isValidExtension(file.name)) {
        fileInput.addClass('is-invalid')
        return false
    }

    form_data.append('file', file)

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
            fileInput.removeClass('is-invalid')
        },
        error: function(error) {
            alert(error)
            $("#btn-submit").prop("disabled", false);
        }
    })
})

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function isValidExtension(filename) {
    var extension = getExtension(filename)
    switch (extension.toLowerCase()) {
        case 'txt':
        case 'csv':
            return true
    }
    return false
}