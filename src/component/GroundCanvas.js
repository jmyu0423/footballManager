import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import { Stage, Layer, Group, Circle, Image, Text, Line } from "react-konva";
import { Html } from 'react-konva-utils';
import useImage from 'use-image';
import UpdateNumberModal from 'component/modal/UpdateNumberModal';
import AlertModal from 'component/modal/AlertModal';
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { CustomTextField } from 'component/customUi/CustomField';

const GroundImage = ({ field }) => {
    let img = 'img/ground2.jpg';
    if (field === 'type1') {
        img = 'img/ground2.jpg';
    }
    else if (field === 'type2') {
        img = 'img/ground1.png';
    }
    else if (field === 'type3') {
        img = 'img/ground3.jpg';
    }
    else if (field === 'type4') {
        img = 'img/ground4.jpg';
    }

    const [image] = useImage(img);
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
        value: ""
    }));
}

const awayPlayers = () => {
    return [...Array(11)].map((_, i) => ({
        id: 'away' + i.toString(),
        x: 1380,
        y: (i + 2) * 70,
        isDragging: false,
        value: ""
    }));
}

const INITIAL_HOME = homePlayers();
const INITIAL_AWAY = awayPlayers();

const GroundCanvas = () => {
    const [homePlayers, setHomePlayers] = useState(INITIAL_HOME);
    const [awayPlayers, setAwayPlayers] = useState(INITIAL_AWAY);
    const [playerUpdateModal, setPlayerUpdateModal] = useState(false);
    const [currentPlayerInfo, setCurrentPlayerInfo] = useState({});
    const [updateTarget, setUpdateTarget] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [content, setContent] = useState("");
    const [field, setField] = useState("type1");

    // draw component
    const [isPaint, setIsPaint] = useState(false);
    const [mode, setMode] = useState('brush');
    const [lines, setLines] = useState([]);
    const [brushSize, setBrushSize] = useState(3);

    // draw Tool
    const [toolType, setToolType] = useState("draw");

    const alertClose = () => {
        setAlertOpen(false);
    }

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

    const handelDbClickHomePlayer = (e) => {
        const id = e.target.id();
        let tempList = [...homePlayers];

        for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].id === id) {
                setCurrentPlayerInfo(tempList[i]);
                break;
            }
        }
        setUpdateTarget('home');
        setPlayerUpdateModal(true);
    }

    const handelDbClickAwayPlayer = (e) => {
        const id = e.target.id();
        let tempList = [...awayPlayers];

        for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].id === id) {
                setCurrentPlayerInfo(tempList[i]);
                break;
            }
        }
        setUpdateTarget('away');
        setPlayerUpdateModal(true);
    }

    const closePlayerUpdateModal = () => {
        setPlayerUpdateModal(false);
    }

    const UpdateNumber = (number) => {
        if (number > 99) {
            setContent("등번호는 100을 넘을 수 없습니다.");
            setAlertOpen(true);
            return false;
        }

        let tempHomeList = [...homePlayers];
        let tempAwayList = [...awayPlayers];

        if (updateTarget === 'home') {
            for (let i = 0; i < tempHomeList.length; i++) {
                if (tempHomeList[i].id === currentPlayerInfo.id) {
                    tempHomeList[i].value = number;
                    break;
                }
            }
            setHomePlayers(tempHomeList);
        } else {
            for (let i = 0; i < tempAwayList.length; i++) {
                if (tempAwayList[i].id === currentPlayerInfo.id) {
                    tempAwayList[i].value = number;
                    break;
                }
            }
            setAwayPlayers(tempAwayList);
        }

        setPlayerUpdateModal(false); //모달 닫기
    }

    const changeField = (e) => {
        setField(e.target.value)
    }

    const startDraw = (e) => {
        //겹쳐져 있는 선수도형이 있는지 확인
        const clickX = e.evt.clientX;
        const clickY = e.evt.clientY;
        const shape = e.target.getStage().getIntersection({ x: clickX, y: clickY });

        if (shape && shape.attrs.id) {
            return false;
        }

        setIsPaint(true);
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { mode, brushSize, points: [pos.x, pos.y] }]);
    }

    const endDraw = () => {
        setIsPaint(false);
    }

    //마우스 무브 이벤트
    const handleMouseMove = (e) => {
        if(toolType === "draw"){
            if (!isPaint) {
                return;
            }

            let stage = e.target.getStage();
            let pointer = stage.getPointerPosition();
            let lastLine = lines[lines.length - 1];
            lastLine.points = lastLine.points.concat([pointer.x, pointer.y]);

            // replace last
            lines.splice(lines.length - 1, 1, lastLine);
            setLines(lines.concat());
        }
    }

    const changeToolMode = (e) => {
        setMode(e.target.value)
    }

    const handleMouseWheel = (e) => {
        let oldSize = brushSize;
        let newSize = -(e.evt.deltaY) / 100 + oldSize;

        //최소 사이즈 3
        if (newSize < 3) {
            setBrushSize(3);
        } else {
            setBrushSize(newSize)
        }
    }

    const changeToolType = (e) =>{
        setToolType(e.target.value);
    }

    return (
        <>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ backgroundColor: '#1c3247' }}
                onMouseDown={startDraw}
                onMouseUp={endDraw}
                onMouseMove={handleMouseMove}
                onWheel={handleMouseWheel}
            >
                <Layer>
                    <Html
                        divProps={{
                            style: {
                                position: 'absolute',
                                top: 10,
                                left: 10,
                            },
                        }}
                    >
                        <div style={{ position: 'absolute', top: 20, left: 10 }}>
                            <div style={{ position: 'relative', display: 'flex' }}>
                                <div style={{ marginRight: '8px' }}>
                                    <Select
                                        style={{ backgroundColor: "white", width: '120px', height: '40px' }}
                                        value={field}
                                        onChange={changeField}
                                        label=""
                                        inputProps={{
                                            MenuProps: {
                                                MenuListProps: {
                                                    sx: {
                                                        backgroundColor: 'white'
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        <MenuItem value={'type1'}>Type1</MenuItem>
                                        <MenuItem value={'type2'}>Type2</MenuItem>
                                        <MenuItem value={'type3'}>Type3</MenuItem>
                                        <MenuItem value={'type4'}>Type4</MenuItem>
                                    </Select>
                                </div>
                                <div style={{ marginRight: '8px' }}>
                                    <Select
                                        style={{ backgroundColor: "white", width: '120px', height: '40px' }}
                                        value={toolType}
                                        onChange={changeToolType}
                                        label=""
                                        inputProps={{
                                            MenuProps: {
                                                MenuListProps: {
                                                    sx: {
                                                        backgroundColor: 'white'
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        <MenuItem value={'draw'}>Draw</MenuItem>
                                        <MenuItem value={'arrow'}>Arrow</MenuItem>
                                    </Select>
                                </div>
                                {toolType === "draw" ?
                                <div>
                                    <Select
                                        style={{ backgroundColor: "white", width: '120px', height: '40px' }}
                                        value={mode}
                                        onChange={changeToolMode}
                                        label=""
                                        inputProps={{
                                            MenuProps: {
                                                MenuListProps: {
                                                    sx: {
                                                        backgroundColor: 'white'
                                                    }
                                                }
                                            }
                                        }}
                                    >
                                        <MenuItem value={'brush'}>Brush</MenuItem>
                                        <MenuItem value={'eraser'}>Eraser</MenuItem>
                                    </Select>
                                </div>
                                :
                                null
                                }
                            </div>
                            <div style={{ position: 'relative', display: 'flex' }}>
                                
                            </div>
                        </div>
                    </Html>

                    <GroundImage field={field} />
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
                                id={data.id}
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
                            onDblClick={handelDbClickAwayPlayer}
                        >
                            <Circle
                                radius={20}
                                id={data.id}
                                fill="red"
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
                </Layer>
                <Layer>
                    {lines.map((line, i) => (
                        <Line
                            key={i}
                            points={line.points}
                            stroke="#df4b26"
                            strokeWidth={line.brushSize}
                            tension={0.5}
                            lineCap="round"
                            lineJoin="round"
                            globalCompositeOperation={
                                line.mode === 'eraser' ? 'destination-out' : 'source-over'
                            }
                        />
                    ))}
                </Layer>
            </Stage>

            <UpdateNumberModal
                open={playerUpdateModal}
                onClose={closePlayerUpdateModal}
                currentPlayerInfo={currentPlayerInfo}
                UpdateNumber={UpdateNumber}
            />

            <AlertModal
                open={alertOpen}
                onClose={alertClose}
                content={content}
            />
        </>
    );
};
export default GroundCanvas;