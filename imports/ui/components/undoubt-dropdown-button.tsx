import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import FontAwesome from 'react-fontawesome';

export const UndoubtDropdownButton: React.FC<{
    elements: {
        label: string;
        onClick: (event: React.MouseEvent<EventTarget>) => void;
        isChosen: boolean;
    }[];
    label: string;
    singleAction?: boolean;
    onSingleActionClick?: (event: React.MouseEvent<EventTarget>) => void;
}> = ({ elements, label, singleAction = false, onSingleActionClick }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = (event: React.MouseEvent<EventTarget>) => {
        if (singleAction && onSingleActionClick) {
            onSingleActionClick(event);
        } else {
            setOpen(prevOpen => !prevOpen);
        }
    };

    function handleListKeyDown(event: React.KeyboardEvent<any>) {
        if (event.nativeEvent.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <button
                ref={anchorRef}
                aria-controls='menu-list-grow'
                aria-haspopup='true'
                onClick={handleToggle}>
                {label}
                <FontAwesome name='plus-circle' />
            </button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                keepMounted={false}
                transition
                style={{ zIndex: 1000 }}
                disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                        }}>
                        <Paper id='menu-list-grow'>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList onKeyDown={handleListKeyDown}>
                                    {elements
                                        .filter(element => !element.isChosen)
                                        .map(element => {
                                            return (
                                                <MenuItem
                                                    key={element.label}
                                                    onClick={event => {
                                                        element.onClick(event);
                                                        handleClose(event);
                                                    }}>
                                                    {element.label}
                                                </MenuItem>
                                            );
                                        })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
};
