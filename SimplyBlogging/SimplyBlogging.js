var blogNum = 1;
function getBlogNumber(){
    if (!localStorage.getItem("blogNum")){
        localStorage.setItem("blogNum", "2");
        console.log("First BlogNumber stored!");
        return 1;
    }
    else{
        currNum = parseInt(localStorage.getItem("blogNum"));
        console.log("currNum = ", currNum);
        var nextNum = currNum + 1;
        console.log("nextnum = ", nextNum);
        var currNumString = (nextNum).toString();
        console.log("currNumString = ", currNumString);
        localStorage.setItem("blogNum", currNumString);
        return currNum;
        
    }
}
function retrieveFromStorage() {
    console.log("LocalStorage = ",localStorage.length);
    for(let i = 1; i < localStorage.length; i++){
        console.log(localStorage.getItem("blogNum"))
        var obj = localStorage.getItem("blogInfo" + i);
        addBlog(JSON.parse(obj));
        console.log(JSON.parse(obj));
    }
}
 function readData() {  
    var blogNum = getBlogNumber();
    var blogData={};
    blogData.title=document.getElementById("title").value;
    blogData.desc = document.getElementById("desc").value;
    blogData.imageInfo = document.getElementById("imageId").files[0].name;
    localStorage.setItem("blogInfo" + blogNum,JSON.stringify(blogData));
    console.log("Title = ", blogData.title);
    console.log("Description = ", blogData.desc);
    console.log("imageInfo = ", blogData.imageInfo);
    return blogData;
}
function addBlog(blogData){
    var blogPost = document.createElement('div');
    blogPost.className = "article";
    var title = document.createElement('div');
    var titleText = document.createTextNode(blogData.title);
    title.appendChild(titleText);
    var desc = document.createElement('div');
    var descText = document.createTextNode(blogData.desc);
    desc.appendChild(descText);
    var image = document.createElement('img');
    image.src = blogData.imageInfo;
    document.body.appendChild(blogPost);
    blogPost.appendChild(title);
    blogPost.appendChild(desc);
    blogPost.appendChild(image);
    resetData();
}
function resetData() {
    document.getElementById("title").value="";
    document.getElementById("desc").value="";
    document.getElementById("imageId").value="";
}