const canvas = document.getElementById('fabric');
const context = canvas.getContext('2d');

    canvas.addEventListener('mousedown', function (event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        console.log({ x: x, y: y });
    });

    CanvasRenderingContext2D.prototype.polyline = function (poly) {
        context.beginPath();
        context.moveTo(poly[0].x, poly[0].y);
        for (let index = 1; index < poly.length; index++) {
            context.lineTo(poly[index].x, poly[index].y);
        }
        context.strokeStyle = '#afcde344';
        context.lineWidth = 1;
        context.stroke();
    };

export { canvas, context }