let currPage = 1

init(currPage)
backForward()

function init(page){
    document.getElementById('monster-container').innerHTML = ''
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsters => monsters.forEach(e => renderMonster(e)))
    .catch(error => window.alert("There was a problem with the server"))
}

function renderMonster(monster){
    monsterName = document.createElement('h2')
    monsterName.innerText = monster.name
    monsterAge = document.createElement('h4')
    monsterAge.innerText = `Age: ${monster.age}`
    monsterDescription = document.createElement('p')
    monsterDescription.innerText = `Description: ${monster.description}`
    document.getElementById('monster-container').prepend(monsterName,monsterAge,monsterDescription)
}

function backForward(){
    document.getElementById('forward').addEventListener('click', e => init(++currPage))
    document.getElementById('back').addEventListener('click', e => init(--currPage))
    document.getElementById('createBtn').addEventListener('click', e => createMonster(e))
}

function createMonster(e){
    e.preventDefault()
    let newName = e.target.parentNode.inputName.value
    let newAge = e.target.parentNode.inputAge.value
    let newDescription = e.target.parentNode.inputDescription.value
    if(newAge === "" || newName === "" || newDescription === ""){
        window.alert("Please fill all the form...")
    }
    else{
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "name": newName,
                "age" : newAge,
                "description" : newDescription
            })
            })
        .then(response => response.json())
        .then(obj => renderMonster(obj))
        .catch(error => window.alert("There was an error"))
        e.target.parentNode.reset()
    }
}