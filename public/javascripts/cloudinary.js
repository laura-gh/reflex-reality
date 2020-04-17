let imgArr = [];
let idArr = [];

const myWidget = cloudinary.createUploadWidget({
  cloudName: 'detpulnnc',
  uploadPreset: 't6lrbi5e',
  multiple: true
}, (error, result) => { uploadResult(result)
  // if (!error && result && result.event === "success") {
  //   console.log('Done! Here is the image info: ', result.info);
  //   console.log('Public ID: ', result.info.public_id);
  //   console.log('Secure URL: ', result.info.secure_url);
  // }
})

document.getElementById("upload_widget").addEventListener("click", function () {
  myWidget.open();
}, false);

uploadResult = (result) => {
  if(result.event === "success") {
    console.log(result.info.secure_url);
    console.log(result.info.public_id);
    imgArr.push(result.info.secure_url);
    idArr.push(result.info.public_id);
    document.getElementById("imageURL").value = imgArr;
    document.getElementById("imageID").value = idArr;
  }
}