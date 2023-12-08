import { Arrow } from "react-konva";

const CustomArrow = ({ startPos, endPos, pointerLength, pointerWidth, fill, stroke, strokeWidth }) => {
    return (
        <Arrow
            points={[startPos.x, startPos.y, endPos.x, endPos.y]}
            pointerLength={pointerLength}
            pointerWidth={pointerWidth}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
        />
    )
}
export default CustomArrow;