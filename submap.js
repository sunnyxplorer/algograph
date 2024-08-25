import { context } from "./canvas.js";
import phase_synthesis from "./phasing.js"

export default function submap(config){
        const { separation, orbits, cardinals, center } = config
        function angular_cords(angle){
            const radius = separation + (Math.floor(Math.random() * orbits) * separation);
            const radians = angle * (Math.PI / 180);
            const delta_x = Math.round(radius * Math.sin(radians));
            const delta_y = Math.round(radius * Math.cos(radians));
            return {
                x: center.x + delta_x,
                y: center.y + delta_y
            };
        }

        function compute_angles(bearing){
            const angles = [];
            const step = 360 / bearing;
                for (let i = 0; i < bearing; i++) {
                    angles.push(i * step);
                }
            return angles;
        }

        const angles = compute_angles(cardinals);
        const positions = angles.map(angle => angular_cords(angle));

        /** Draw faint outline */ 
        // const vertices = positions.concat(positions[0])
        // context.polyline(vertices)

        function quadraticBezier(start, control, end){
            context.beginPath()
            context.moveTo(start.x, start.y)
            context.quadraticCurveTo(control.x, control.y, end.x, end.y)
            context.strokeStyle = '#afcde3';
            context.stroke()
        }

        function midpoint(a, b){
            return {
                x: (a.x + b.x) / 2,
                y: (a.y + b.y) /2
            }
        }

        const phase_vertices = []
        positions.forEach((vtx, index, array) => {
            const current = vtx;
            const next = (index === array.length - 1) ? array[0] : array[index + 1];

            const interpoints = phase_synthesis({
                x1: current.x,
                y1: current.y,
                xn: next.x,
                yn: next.y
            })
            phase_vertices.push(current, ...interpoints)
        }
);
        const transition_vertices = []
        phase_vertices.forEach((vtx, index, array) => {
            const last = array.at(index - 1)
            const current = vtx;
            const next = (index === array.length - 1) ? array[0] : array[index + 1];

            const start = midpoint(last, current)
            const end = midpoint(next, current)

            transition_vertices.push({
                start,
                control: current,
                end
            })
        })

        transition_vertices.forEach(pos => {
            quadraticBezier(pos.start, pos.control, pos.end)
        })
    }