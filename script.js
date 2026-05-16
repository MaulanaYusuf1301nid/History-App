class Node{
    constructor(data){
        this.data = data
        this.next = null
        this.prev = null
    }
}

class DoubleLinkedList{

    constructor(){
        this.head = null
        this.tail = null
        this.current = null
    }

    insertBack(data){

        const newNode = new Node(data)

        if(!this.head){
            this.head = this.tail = this.current = newNode
            return
        }

        this.tail.next = newNode
        newNode.prev = this.tail

        this.tail = newNode
        this.current = newNode
    }

    insertFront(data){

        const newNode = new Node(data)

        if(!this.head){
            this.head = this.tail = this.current = newNode
            return
        }

        newNode.next = this.head
        this.head.prev = newNode

        this.head = newNode
        this.current = newNode
    }

    insertMiddle(after,data){

        let temp = this.head

        while(temp){

            if(temp.data === after){

                const newNode = new Node(data)

                // kalau tail
                if(temp === this.tail){

                    temp.next = newNode
                    newNode.prev = temp

                    this.tail = newNode
                    this.current = newNode

                    return true
                }

                newNode.next = temp.next
                newNode.prev = temp

                temp.next.prev = newNode
                temp.next = newNode

                this.current = newNode

                return true
            }

            temp = temp.next
        }

        return false
    }

    back(){

        if(this.current && this.current.prev){
            this.current = this.current.prev
            return this.current.data
        }

        return null
    }

    forward(){

        if(this.current && this.current.next){
            this.current = this.current.next
            return this.current.data
        }

        return null
    }

    deleteFront(){

        if(!this.head) return

        if(this.head === this.tail){
            this.head = this.tail = this.current = null
            return
        }

        this.head = this.head.next
        this.head.prev = null

        this.current = this.head
    }

    deleteBack(){

        if(!this.tail) return

        if(this.head === this.tail){
            this.head = this.tail = this.current = null
            return
        }

        this.tail = this.tail.prev
        this.tail.next = null

        this.current = this.tail
    }

    deleteCurrent(){

        if(!this.current) return

        let temp = this.current

        if(this.head === this.tail){
            this.head = this.tail = this.current = null
            return
        }

        if(temp === this.head){

            this.head = this.head.next
            this.head.prev = null

            this.current = this.head
        }

        else if(temp === this.tail){

            this.tail = this.tail.prev
            this.tail.next = null

            this.current = this.tail
        }

        else{

            temp.prev.next = temp.next
            temp.next.prev = temp.prev

            this.current = temp.prev
        }
    }

    getHistory(){

        let result = []
        let temp = this.head

        while(temp){

            result.push({
                name:temp.data,
                active:temp === this.current
            })

            temp = temp.next
        }

        return result
    }
}

const allowedApps = [
    "WhatsApp",
    "TikTok",
    "Instagram",
    "YouTube",
    "Chrome",
    "Spotify",
    "VS Code",
    "Dota 2",
    "Galeri",
    "My Best"
]

const dll = new DoubleLinkedList()


// LOAD SELECT OPTION
function loadSelect(){

    const frontSelect =
    document.getElementById("frontApp")

    const middleSelect =
    document.getElementById("middleApp")

    allowedApps.forEach(app=>{

        let option1 =
        document.createElement("option")

        option1.value = app
        option1.textContent = app

        frontSelect.appendChild(option1)

        let option2 =
        document.createElement("option")

        option2.value = app
        option2.textContent = app

        middleSelect.appendChild(option2)
    })
}


// INSERT BELAKANG
function insertBack(name){

    dll.insertBack(name)

    updateUI()

    status(`Membuka ${name}`)
}


// INSERT DEPAN
function insertFrontUI(){

    const app =
    document.getElementById("frontApp").value

    if(!allowedApps.includes(app)){
        status("Aplikasi tidak valid")
        return
    }

    dll.insertFront(app)

    updateUI()

    status(`${app} ditambahkan di depan`)
}


// INSERT TENGAH
function insertMiddleUI(){

    const newApp =
    document.getElementById("middleApp").value

    const afterApp =
    document.getElementById("afterApp").value

    // validasi app
    if(!allowedApps.includes(newApp)){
        status("Aplikasi tidak valid")
        return
    }

    let result =
    dll.insertMiddle(afterApp,newApp)

    if(result){
        status(`${newApp} disisipkan setelah ${afterApp}`)
    }
    else{
        status("App tujuan tidak ditemukan")
    }

    updateUI()
}


// BACK
function backApp(){

    let result = dll.back()

    updateUI()

    status(
        result
        ? `Kembali ke ${result}`
        : "Tidak ada previous"
    )
}


// FORWARD
function forwardApp(){

    let result = dll.forward()

    updateUI()

    status(
        result
        ? `Maju ke ${result}`
        : "Tidak ada next"
    )
}


// DELETE DEPAN
function deleteFront(){

    dll.deleteFront()

    updateUI()

    status("Node depan dihapus")
}


// DELETE BELAKANG
function deleteBack(){

    dll.deleteBack()

    updateUI()

    status("Node belakang dihapus")
}


// DELETE CURRENT
function deleteCurrent(){

    dll.deleteCurrent()

    updateUI()

    status("Current node dihapus")
}


// STATUS
function status(text){

    document.getElementById("status")
    .innerText = text
}


// UPDATE UI
function updateUI(){

    const historyList =
    document.getElementById("historyList")

    const nodes =
    document.getElementById("nodes")

    historyList.innerHTML = ""
    nodes.innerHTML = ""

    const history = dll.getHistory()

    history.forEach((item,index)=>{

        // HISTORY
        const li =
        document.createElement("li")

        li.innerText =
        item.active
        ? `${item.name} ← CURRENT`
        : item.name

        historyList.appendChild(li)

        // NODE
        const node =
        document.createElement("div")

        node.className =
        item.active
        ? "node active"
        : "node"

        node.innerText = item.name

        nodes.appendChild(node)

        // DOUBLE ARROW
        if(index < history.length-1){

            const arrow =
            document.createElement("div")

            arrow.className = "arrow"

            arrow.innerHTML = "↔"

            nodes.appendChild(arrow)
        }
    })
}


// LOAD
loadSelect()
