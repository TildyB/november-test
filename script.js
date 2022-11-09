let mainDiv =document.getElementById("users")
let loading = document.getElementById("loading")
let inputVmi = document.getElementById("input")
let nothing = document.getElementById("nothing")

nothing.style.display ="none"
let alldata ={
    data:[]
}
const fetchData = async() =>{
    const response = await fetch("https://api.github.com/users",{
        method:"GET"
    })
    const datas = await response.json()
    loading.style.display="none"
    console.log(datas)
    alldata.data = datas
    getData(datas)
}

fetchData()

const showButton = (data) =>(e)=>{
    if (data.style.display === "none") {
        data.style.display = "block";
      } else {
        data.style.display = "none";
      }
      
      if (e.target.innerText === "Show More") {
        e.target.innerText = "Show less"
      } else {
        e.target.innerText = "Show More"
      }
}

const getData = (datas) =>{
    datas.map( (data)=>{
        let userDiv = document.createElement("div")
        userDiv.setAttribute("class","userDiv")  
        let userImage = document.createElement("img")
        userImage.setAttribute("class","userImage") 
        userImage.setAttribute("src",data.avatar_url)
        userDiv.appendChild(userImage)
        let name =document.createElement("h1")
        name.innerText= data.login
        userDiv.appendChild(name)
        let userButton = document.createElement("button")
        userButton.setAttribute("class","userButton") 
        userButton.innerText ="Show More"
        userDiv.appendChild(userButton)
        
        let userData = document.createElement("div")
        userData.setAttribute("class","userData")
           userData.style.display="none"
         let userType = document.createElement("h2")
         userType.innerText = `Rank: ${data.type}`
         userData.appendChild(userType)
     
         let isAdmin = document.createElement("h2")
         isAdmin.innerText=  `Admin: ${data.site_admin}`
         userData.appendChild(isAdmin)
        
         mainDiv.appendChild(userDiv)
         userDiv.appendChild(userData)
         userButton.addEventListener("click",showButton(userData))
       })
}

const inputData = (e) =>{
   const filterString = e.target.value
    const datas = alldata.data;
    filteredData = datas.filter(function (data){
        let testData ="";
        for(let i=0;i<filterString.length;i++){  
            testData +=data.login[i]
            if(testData===filterString){
                return data
            }
        }
    })
    mainDiv.innerHTML="";
    if(filteredData.length ===0 && e.target.value.length !=0){
        nothing.style.display ="block"
    }else{
        nothing.style.display ="none"
    }
    if(e.target.value.length ===0){
        getData(alldata.data)
    }
    getData(filteredData)

}
inputVmi.addEventListener("keyup",inputData)


