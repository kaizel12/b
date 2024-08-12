document.getElementById('showMore').addEventListener('click', function() {
    document.getElementById('extraMessage').classList.toggle('hidden');
    document.getElementById('showMore').innerText = document.getElementById('extraMessage').classList.contains('hidden') ? 'Tampilkan Lebih Banyak Cinta' : 'Sembunyikan Pesan';
});

const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const maxHearts = 100;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function Heart() {
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height);
    this.size = random(5, 15);
    this.speed = random(1, 3);
    this.alpha = random(0.5, 1);
}

Heart.prototype.draw = function() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y - this.size / 2, this.size / 2, 0, Math.PI, true);
    ctx.arc(this.x + this.size / 2, this.y, this.size / 2, Math.PI, 0, true);
    ctx.lineTo(this.x, this.y + this.size);
    ctx.closePath();
    ctx.fill();
}

Heart.prototype.update = function() {
    this.y -= this.speed;
    if (this.y + this.size < 0) {
        this.y = canvas.height + this.size;
        this.x = random(0, canvas.width);
    }
    this.draw();
}

for (let i = 0; i < maxHearts; i++) {
    hearts.push(new Heart());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let heart of hearts) {
        heart.update();
    }
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
