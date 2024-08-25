import { canvas, context } from "./canvas.js";
import submap from "./submap.js"

    const config = {
        separation: 1,
        orbits: 400,
        cardinals: 12,
        center: {x: 400, y: 400}
    };

    submap(config)

document.addEventListener('keydown', (event) => {
    if(event.code !== 'Space') return;
    context.clearRect(0,0, canvas.width, canvas.height)
   submap(config);
})






