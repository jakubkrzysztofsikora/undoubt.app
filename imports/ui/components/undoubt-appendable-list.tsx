import React from 'react';
import { UndoubtSimpleList } from './undoubt-simple-list';
import { UndoubtTextField } from './undoubt-text-field';

export const UndoubtAppendableList: React.FC<{
    label: string,
    currentElements: string[],
    elementToBeAdded: string,
    onElementToBeAddedChange: (value: string) => void,
    onElementAdded: (value: string) => void,
    onElementDeleted: (value: string) => void
    customListElementRender?: (value: string) => JSX.Element}> = ({label, currentElements, elementToBeAdded, onElementToBeAddedChange, onElementAdded, onElementDeleted, customListElementRender}) => {
    return <>
        <UndoubtTextField label={label} value={elementToBeAdded} onChange={onElementToBeAddedChange} onEnter={onElementAdded} />
        <UndoubtSimpleList elements={currentElements} onDelete={onElementDeleted} customListElementRender={customListElementRender} />
    </>;
}