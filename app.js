
//import des modules

const express = require('express')
 
const multer = require('multer')

const fs = require('fs')
const pdfparser = require('pdf-parse')
const {PDFNet} = require('@pdftron/pdfnet-node');
 
const path = require('path')
 
const app = express()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
  });
   
  var upload = multer({ storage: storage }).single('file');
 
app.use(express.static('uploads'))
 


/* app.post('/file', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(req.file.path)
        res.json({
            path:req.file.filename
        }) 
    })
}) */

//extraire les données
const pdfFile = fs.readFileSync('./uploads/1679308997054.pdf')
pdfparser(pdfFile).then(function(data){
  console.log(data.text)
})


//modifier 
app.get('/generateInvoice',(req,res)=>{
  const inputPath = path.resolve(__dirname,'./uploads/1679308997054.pdf');
  const ouputPath = path.resolve(__dirname,'./uploads/cvCorrect.pdf');

  const replaceText = async() =>{
    const pdfDoc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
    await pdfDoc.initStdSecurityHandler();
    const replacer = await PDFNet.ContentReplacer.create();
    await replacer.addString('NAOURES HAJRI','HAJRI NAOURES');
    pdfDoc.save(ouputPath,PDFNet.SDFDoc.SaveOptions.e_linearized);
  }
   // add your own license key as the second parameter, e.g. in place of 'YOUR_LICENSE_KEY'.
PDFNet.runWithCleanup(replaceText,"demo:1679655292865:7d12d2c10300000000afbe89e4384bcf73302013b1089b4c628ea71f2c").then(()=>{
  fs.readFile(ouputPath,(err,data)=>
  {if(err){
    res.statusCode=500;
    res.end(err);
  }else{
    res.setHeader('ContentType','application/pdf');
    res.end(data);
  }})
})  .catch(err => {
  res.statusCode=500;
  res.end(err);
}
) })

 
 







app.listen(3000, () => {
    console.log("App is listening on port 3000")
})



