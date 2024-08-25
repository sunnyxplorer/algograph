function calc_distance(x1, y1, x2, y2){
    const dx = x1 - x2
    const dy = y1 - y2
    const dx2 = dx * dx
    const dy2 = dy * dy
    return Math.sqrt(dx2 + dy2)
}

function calc_inclination(x1, y1, x2, y2){
    const delta_x = x2 - x1;
    const delta_y = y2 - y1;

    const angle_radians = Math.atan2(delta_y, delta_x);
    let angle_degrees = angle_radians * (180 / Math.PI);
    
    let northwise_angle = 90 - angle_degrees;

    if (northwise_angle < 0) {
        northwise_angle += 360;
    } else if (northwise_angle >= 360) {
        northwise_angle -= 360;
    }
    
    return northwise_angle;
}
function compute_amplitude(){
    const step = 1
    return step + (Math.floor(Math.random() * 6) * step)
}
function arbitrary_orientation(){
    return (Math.random() < 0.5) ? 270 : 90;
}

function map_point(x, y, northwise_angle, length) {
    const angle_from_x = 90 - northwise_angle;
    const angle_in_radians = angle_from_x * (Math.PI / 180);

    const x2 = x + length * Math.cos(angle_in_radians);
    const y2 = y + length * Math.sin(angle_in_radians);

    return { x: x2, y: y2 };
}

function phase_synthesis(endpoints){
    const {x1, y1, xn, yn } = endpoints
    const slope = calc_inclination(x1, y1, xn, yn)
    const synth = []
    const interval = 20

    function loop_insert(inline_distance, x, y){
        const difference = calc_distance(x, y, xn, yn)
            if(difference <= interval){
                return
            }
        const inline_next = map_point(x1, y1, slope, inline_distance )
        const amp = compute_amplitude()
        const orient = arbitrary_orientation()
        const trend_point = map_point(inline_next.x, inline_next.y, (orient + slope), amp )
        synth.push({
            x: Math.round(trend_point.x),
            y: Math.round(trend_point.y)
        })
        loop_insert(inline_distance + interval, inline_next.x, inline_next.y)
    }
    loop_insert(interval, x1, y1)
    return synth
}

export default phase_synthesis