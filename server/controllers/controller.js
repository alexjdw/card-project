var mongoose = require('mongoose');
var shortID = require('shortid'); //Makes little random strings of text that are unique.
const file_upload_dir = './card-angular-app/dist/card-angular-app/assets/img/upload/';
const url_prefix = '/assets/img/upload/';

function fileUpload(request, response) {
    if (Object.keys(request.files).length == 0) {
        return response.status(400).json({error: 'No files were uploaded.'});
    }
    let ext = request.files.file.name.split('.');
    ext = '.' + ext[ext.length-1]; // grab file extension, like .jpg
    var filename = shortID.generate() + ext;
    request.files.file.mv(file_upload_dir + filename, function(err) {
        if (err) {
            console.log("Tried to upload to " + file_upload_dir + filename);
            console.log(err)
            return response.status(500).json({error: 'File failed to save.', fileErrObj: err});
        }

        console.log("File uploaded!")
        response.json({filename: url_prefix + filename});
    });
    
}

module.exports.fileUpload = fileUpload;
