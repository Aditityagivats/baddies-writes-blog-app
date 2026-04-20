import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';
const app = express();
let port = 3000;
import methodOverride from "method-override";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

let blogs=[
    {
        id:uuidv4(),
        username:"aditityagivats",
        post:"Learning Backend is really important to understand the whole enviroment of the project."

    },

     {
        id:uuidv4(),
        username:"Chirag Baliyan",
        post:"Learning Backend is really important to understand the whole enviroment of the project."

    },

     {
        id:uuidv4(),
        username:"Harshit Swarrop",
        post:"Learning Backend is really important to understand the whole enviroment of the project."

    },
];

//home route
app.get("/blogs" ,(req,res)=>{
    res.render("index.ejs",{blogs} );
});


app.get("/blogs/new" , (req,res)=>{
    res.render("new.ejs"); 
});

app.post("/blogs" , (req,res)=>{
    const {username , post }=req.body;
    let id = uuidv4();
    blogs.push({username,post,id});
    console.log(blogs);
    res.redirect("/blogs");

});

//see post route get by id
app.get("/blogs/:id" , (req,res)=>{
    let {id} = req.params;
    let blog = blogs.find((blog)=> blog.id === id);
    res.render("show.ejs" ,{blog});
});

//update post route
app.patch("/blogs/:id", (req,res)=>{
    let {id} = req.params;
     let blog = blogs.find((blog)=> blog.id === id);
     let newPost =req.body.post;
     blog.post= newPost;
     res.redirect("/blogs");

});

//edit 
app.get("/blogs/:id/edit" , (req,res)=>{
    let {id} = req.params;
     let blog = blogs.find((blog)=> blog.id === id);
     res.render("edit.ejs" , {blog});

}); 

//destroy route
app.delete("/blogs/:id", (req,res)=>{
     let {id} = req.params;
      blogs = blogs.filter((blog)=> blog.id !== id);
      res.redirect("/blogs")    ;
});

app.listen(port , ()=>{
    console.log(`Server running on port ${port}`);
});