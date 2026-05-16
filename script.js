class Node{
    constructor(data){
        this.data = data
        this.next = null
        this.prev = null
    }
}

class HistoryApp{

    constructor(){
        this.head = null
        this.tail = null
        this.current = null
    }

    openApp(name){

        const newNode = new Node(name)

        if(!this.head){
            this.head = this.tail = this.current = newNode
            return
        }

        this.current.next = null
        this.tail = this.current

        this.tail.next = newNode
        newNode.prev = this.tail

        this.tail = newNode
        this.current = newNode
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

    closeCurrent(){

        if(!this.current) return

        let temp = this.current

        // satu node
        if(this.head === this.tail){
            this.head = this.tail = this.current = null
            return
        }

        // awal
        if(temp === this.head){
            this.head = this.head.next
            this.head.prev = null
            this.current = this.head
        }

        // akhir
        else if(temp === this.tail){
            this.tail = this.tail.prev
            this.tail.next = null
            this.current = this.tail
        }

        // tengah
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

const app = new HistoryApp()


function openApp(name){

    app.openApp(name)

    updateUI()

    document.getElementById("status")
    .innerText = `Membuka ${name}`
}


function backApp(){

    let result = app.back()

    updateUI()

    document.getElementById("status")
    .innerText = result
    ? `Kembali ke ${result}`
    : "Tidak ada history sebelumnya"
}


function forwardApp(){

    let result = app.forward()

    updateUI()

    document.getElementById("status")
    .innerText = result
    ? `Maju ke ${result}`
    : "Tidak ada history berikutnya"
}


function closeCurrent(){

    app.closeCurrent()

    updateUI()

    document.getElementById("status")
    .innerText = "App ditutup"
}


function updateUI(){

    const historyList =
    document.getElementById("historyList")

    const nodes =
    document.getElementById("nodes")

    historyList.innerHTML = ""
    nodes.innerHTML = ""

    let history = app.getHistory()

    history.forEach((item,index)=>{

        // history
        let li = document.createElement("li")

        li.innerText = item.active
        ? `${item.name} ← Active`
        : item.name

        historyList.appendChild(li)

        // visual node
        let node = document.createElement("div")

        node.className = item.active
        ? "node active"
        : "node"

        node.innerText = item.name

        nodes.appendChild(node)

        // arrow
        if(index < history.length-1){

            let arrow =
            document.createElement("div")

            arrow.className = "arrow"

            arrow.innerHTML = "↔"

            nodes.appendChild(arrow)
        }
    })
}