import {ref, computed} from 'vue'

const cvs = document.querySelector('canvas')
const ctx = cvs.getContext('2d')

cvs.width = innerWidth
cvs.height = innerHeight

const gravitasi = 0.2

class Tanah {
    constructor(x, y, lebar, tinggi) {
        this.posisiX = x
        this.posisiY = y
        this.lebar = lebar
        this.tinggi = tinggi
    }
    gambar() {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.posisiX, this.posisiY, this.lebar, this.tinggi)
    }
}

class Senjata {
    constructor() {
        this.posisiX = p1.posisiX + p1.lebar
        this.posisiY = p1.posisiY
        this.lebar = 40
        this.tinggi = 10
    }
    gambar() {
        ctx.fillStyle = "brown"
        ctx.fillRect(this.posisiX, this.posisiY, this.lebar, this.tinggi)
    }
    kemampuan() {
        if (o_ditekan == true) {
            this.gambar()
        }
    }
}

class Karakter {
    constructor() {
        this.posisiX = 0
        this.posisiY = 0
        this.kecepatanX = 0
        this.kecepatanY = 0
        this.lebar = 40
        this.tinggi = 60
        this.warna = "darkblue"
    }
    gambar() {
        ctx.fillStyle = this.warna
        ctx.fillRect(this.posisiX, this.posisiY, this.lebar, this.tinggi)
    }
    gerak() {
        this.gambar()
        this.posisiX += this.kecepatanX  
        this.posisiY += this.kecepatanY
        this.kecepatanY += gravitasi

        if (this.posisiX + this.lebar > tanah1.posisiX && this.posisiX < tanah1.posisiX + tanah1.lebar) {
            if (this.posisiY + this.tinggi >= tanah1.posisiY) {
                this.posisiY = tanah1.posisiY - this.tinggi
                this.kecepatanY = 0
            }
        }
        if (this.posisiX + this.lebar > tanah2.posisiX && this.posisiX < tanah2.posisiX + tanah2.lebar) {
            if (this.posisiY + this.tinggi >= tanah2.posisiY) {
                this.posisiY = tanah2.posisiY - this.tinggi
                this.kecepatanY = 0
            }
        }
    }
}

class PrajuritPedang extends Karakter {
    gerak() {
        super.gerak()
        senjata1.kemampuan()
    }
}

class Musuh extends Karakter {
    constructor() {
        super();
        this.posisiX = 750;
        this.posisiY = 300;
        this.warna = "red";
        this.arah = 1; 
        setInterval(() => {
            this.arah *= -1; 
        }, 2000); 
    }
    
    gerak() {
        super.gerak();
        this.kecepatanX = 2 * this.arah; 
        if (senjata1.posisiX + senjata1.lebar >= this.posisiX && o_ditekan) {
            this.lebar = 100
            this.tinggi = 40
            this.posisiY = 360
            this.arah = 0
        }
    }
}


const tanah1 = new Tanah(0, 500, 400, 445)
const tanah2 = new Tanah(580, 400, 800, 500)

const p1 = new PrajuritPedang()
const m1 = new Musuh()

const senjata1 = new Senjata()

let a_ditekan = false
let d_ditekan = false
let w_ditekan = false
let s_ditekan = false
let o_ditekan = false

//Skill Pasif
const update_tinggi_ref = ref(senjata1.lebar)
const pasif = ref(0)
console.log(update_tinggi_ref.value, pasif.value)
const update_tinggi_computed = computed(() => {
    return update_tinggi_ref.value + pasif.value
})


function animation() {
    requestAnimationFrame(animation)
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    
    tanah1.gambar()
    tanah2.gambar()
    
    senjata1.posisiX = p1.posisiX + p1.lebar
    senjata1.posisiY = p1.posisiY
    
    // update_tinggi_ref.value = senjata1.lebar

    setTimeout(()=>{
        pasif.value = 150
    },2000)

    senjata1.lebar = update_tinggi_computed.value
    m1.gerak()
    p1.gerak()

    
    if (a_ditekan == true && p1.posisiX > 0) { p1.kecepatanX = -5
    } else if (d_ditekan == true) { p1.kecepatanX = 5       
    } else if (w_ditekan == true) { p1.kecepatanY = -7
    } else { p1.kecepatanX = 0}
}

animation()

addEventListener('keydown', ({key}) => {
    switch(key) {
        case 'a':
            a_ditekan = true
            break
        case 'd':
            d_ditekan = true
            break
        case 'w':
            w_ditekan = true
            break
        case 'o':
            o_ditekan = true
            console.log("o ditekan")
            break     
    }
})
addEventListener('keyup', ({key}) => {
    switch(key) {
        case 'a':
            a_ditekan = false
            break
        case 'd':
            d_ditekan = false
            break 
        case 'w':
            w_ditekan = false
            break
        case 'o':
            o_ditekan = false
            break     
    }
})
