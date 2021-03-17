var blogDataStorage=[];
var blogNum=1;
function retrieveFromStorage() {
    console.log(localStorage.length);
    for(let i = 1; i < localStorage.length + 1; i++){
        var obj = localStorage.getItem("blogInfo" + i);
        addBlog(JSON.parse(obj));
        console.log(JSON.parse(obj));
    }
}
 function readData() {
    var blogData={};
    blogData.title=document.getElementById("title").value;
    blogData.desc = document.getElementById("desc").value;
    blogData.imageInfo = document.getElementById("imageId").files[0].name;
    localStorage.setItem("blogInfo" + blogNum,JSON.stringify(blogData));
    console.log(blogData.title)
    console.log(blogData.desc);
    console.log(blogData.imageInfo);
    blogNum++;
    return blogData;
}
function addBlog(blogData){
    var title = document.createElement('div');
    var titleText = document.createTextNode(blogData.title);
    title.appendChild(titleText);
    var desc = document.createElement('div');
    var descText = document.createTextNode(blogData.desc);
    desc.appendChild(descText);
    var image = document.createElement('img');
    image.src = blogData.imageInfo;
    document.body.appendChild(title);
    document.body.appendChild(desc);
    document.body.appendChild(image);
    resetData();
}
function resetData() {
    document.getElementById("title").value="";
    document.getElementById("desc").value="";
    document.getElementById("imageId").value="";
}