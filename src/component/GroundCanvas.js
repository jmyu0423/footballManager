import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Stage, Layer, Group, Circle, Image, Text } from "react-konva";
import useImage from 'use-image';

const GroundImage = () => {
    const [image] = useImage('img/ground2.jpg');
    return (
        <Image image={image} width={650} height={900} offsetX={- (window.screen.width / 3)} offsetY={- (window.screen.height / 40)} />
    );
}

const homePlayers = () => {
    return [...Array(11)].map((_, i) => ({
        id: 'home' + i.toString(),
        x: 550,
        y: (i + 2) * 70,
        isDragging: false,
        value: "1"
    }));
}

const awayPlayers = () => {
    return [...Array(11)].map((_, i) => ({
        id: 'away' + i.toString(),
        x: 1380,
        y: (i + 2) * 70,
        isDragging: false,
        value: "1"
    }));
}

const INITIAL_HOME = homePlayers();
const INITIAL_AWAY = awayPlayers();

const GroundCanvas = () => {
    const [homePlayers, setHomePlayers] = useState(INITIAL_HOME);
    const [awayPlayers, setAwayPlayers] = useState(INITIAL_AWAY);

    const handleDragHomeStart = (e) => {
        const id = e.target.id();
        setHomePlayers(
            homePlayers.map((data) => {
                return {
                    ...data,
                    isDragging: data.id === id,
                };
            }),
        );
    };

    const handleDragHomeEnd = (e) => {
        setHomePlayers(
            homePlayers.map((data) => {
                return {
                    ...data,
                    isDragging: false,
                };
            }),
        );
    };

    const handleDragAwayStart = (e) => {
        const id = e.target.id();
        setAwayPlayers(
            awayPlayers.map((data) => {
                return {
                    ...data,
                    isDragging: data.id === id,
                };
            }),
        );
    };

    const handleDragAwayEnd = (e) => {
        setAwayPlayers(
            awayPlayers.map((data) => {
                return {
                    ...data,
                    isDragging: false,
                };
            }),
        );
    };

    const handelDbClickHomePlayer = (e) =>{
        const id = e.target.id();
        let tempList = [...homePlayers];
 
        for(let i=0; i<tempList.length; i++){
            if(tempList[i].id === id){
                tempList[i].value = "2";           
            }
        }
        setHomePlayers(tempList)
    }

    return (
        <Stage width={window.innerWidth} height={window.innerHeight} style={{ backgroundColor: '#1c3247' }}>
            <Layer>
                <GroundImage />
                {homePlayers.map((data) => (
                    <Group
                        key={data.id}
                        id={data.id}
                        draggable
                        x={data.x}
                        y={data.y}
                        scaleX={data.isDragging ? 1.1 : 1}
                        scaleY={data.isDragging ? 1.1 : 1}
                        onDragStart={handleDragHomeStart}
                        onDragEnd={handleDragHomeEnd}
                        onDblClick={handelDbClickHomePlayer}
                    >
                        <Circle
                            radius={20}
                            fill="white"
                            strokeWidth={1} // border width
                            stroke="black" // border color
                        />
                        <Text
                            text={data.value}
                            id={data.id}
                            fontSize={18}
                            fill="black"
                            x={-20}
                            y={-6}
                            align="center"
                            verticalAlign="middle"
                            width={40}
                        />
                    </Group>
                ))}

                {awayPlayers.map((data) => (
                    <Group
                        key={data.id}
                        id={data.id}
                        draggable
                        x={data.x}
                        y={data.y}
                        scaleX={data.isDragging ? 1.1 : 1}
                        scaleY={data.isDragging ? 1.1 : 1}
                        onDragStart={handleDragAwayStart}
                        onDragEnd={handleDragAwayEnd}
                    >
                        <Circle
                            radius={20}
                            fill="red"
                            strokeWidth={1} // border width
                            stroke="black" // border color
                        />
                        <Text
                            text={data.value}
                            fontSize={18}
                            fill="black"
                            x={-20}
                            y={-6}
                            align="center"
                            verticalAlign="middle"
                            width={40}
                        />
                    </Group>
                ))}
            </Layer>
        </Stage>
    );
};
export default GroundCanvas;