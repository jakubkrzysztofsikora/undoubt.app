import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React from "react";

export const UndoubtSimpleList: React.FC<{elements: string[]; onDelete: (element: string) => void; customListElementRender?: (value: string) => JSX.Element }> = ({elements, onDelete, customListElementRender}) => {
    return <List>
        {elements.map((element, index) => <React.Fragment key={`${element}${index}`}>
            <ListItem>
                {
                    customListElementRender
                        ? <ListItem>{customListElementRender(element)}</ListItem>
                        : <ListItemText primary={element} />
                }
                
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => onDelete(element)}>
                      <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </React.Fragment>)}
    </List>;
}