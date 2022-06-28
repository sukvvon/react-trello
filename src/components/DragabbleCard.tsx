import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : null};
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  border: 0;
  background-color: transparent;
  color: black;
  cursor: pointer;
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DragabbleCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDragabbleCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const deleteToDo = (toDoId: number) => {
    setToDos((allBoards) => ({
      ...allBoards,
      [boardId]: [...allBoards[boardId].filter((todo) => todo.id !== toDoId)],
    }));
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
          <DeleteButton onClick={() => deleteToDo(toDoId)}>X</DeleteButton>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
