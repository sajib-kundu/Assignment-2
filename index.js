
/*
Please Flow the Guideline
i)  starting page is index.js
ii) Server is running in localhost and  listening 5500 port

1. For Home Page Route only  /
2. For About Page Route   /about
3. For Contact Page Route  /contact
4. For File Write Page Route  /file-write
Finally Upload a file please use POSTMAN  and method is POST and Route /upload
You can find your file in uploads directory 
*/

const http= require('http');
const fs= require('fs');
const multer = require('multer');


// Set up Multer
const storage = multer.memoryStorage(); // Use memory storage 
const upload = multer({ storage: storage });


const server= http.createServer(function (req,res){         // Server Creation

    // Home Page Code
    if(req.url=="/"){ 
                                          
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let data = fs.readFileSync('home.html','utf8');
        res.end(data);
    }
 // about Page code
    else if(req.url=="/about"){                           
      res.writeHead(200, { 'Content-Type': 'text/html' });  
      let data =fs.readFileSync('about.html','utf8');
        res.end(data);
    }
  // Contact Page Code
    else if(req.url=="/contact"){                         
      res.writeHead(200, { 'Content-Type': 'text/html' });  
      let data =fs.readFileSync('contact.html','utf8');
        res.end(data);
    }
  // File Writing Section
    else if(req.url=="/file-write"){                        
        fs.writeFile('demo.txt','hello world',function (err){
            if(err){
                res.writeHead(400, { 'Content-Type': 'text/html' });
                let data =fs.readFileSync('file_write_f.html','utf8');
                res.end(data);
            }
            else {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                let data =fs.readFileSync('file_write_s.html','utf8');
                res.end(data);
            }
        });
    }

// File Upload code satrt
    
    else if(req.method === 'POST'&& req.url === '/upload'){

        if(req.method && req.url ){

            handleFileUpload(req, res);
        }
        else {
         res.writeHead(400, { 'Content-Type': 'text/plain' });
         res.end('Hello, this is a file upload server!\nSend a POST request and /upload Route to upload a file.\n');
              }  

    } 

    else {                              // this section run when user send worng Route path or Method 
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Please Enter the Right Route Path and Method.\n');
        }

    // Handle file upload
    function handleFileUpload(req, res) {
    upload.single('file')(req, res, (err) => {
      if (err) {                    // This Block is executed when multipule upload at a time
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(' Internal Server Error \nYou can upload a single file at a time Plse Check it....\n');
        return;
      }
  
      // Access the file from req.file
      const uploadedFile = req.file;
      
      // Do something with the file (e.g., save it to disk)
      if (uploadedFile) {

     
        //Read the file Details with this code in command section
           /*
        console.log('Original Name:', uploadedFile.originalname);
        console.log('File Size:', uploadedFile.size);

        const fileContents = uploadedFile.buffer.toString('utf-8');
       console.log('File Contents:', fileContents);
       */
        saveFile(uploadedFile);    // Call the File writhing fuction
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File uploaded successfully!\n');
      } 
      
      else {                // This Block is executed when No File upload 
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('No file provided in the request.\n');
      }
    });
  }
  
  // Save file to disk (File writhing fuction Description)
  function saveFile(file) {
    const filePath = `./uploads/${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);
    console.log(`File saved to: ${filePath}`);
    return;
  }

  
//end of file upload code


}); //end of Server creation



server.listen(5500,function (){                     // Listining Port
    console.log("Server is Running with 5500 port....");
});

