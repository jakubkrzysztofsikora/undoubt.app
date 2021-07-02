import React from 'react';


export const TopHeader: React.FC<{title: string}> = ({title}) => {
    return (
        <header className='app-header'>
            <div>
                <a href='https://undoubt.pl'>
                </a>
            </div>
            <div className='app-header__page-title'>
                <h1>{title}</h1>
            </div>
        </header>
    );
};
