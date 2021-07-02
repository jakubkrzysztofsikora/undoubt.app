import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { TopHeader } from './containers/top-header';
import { Colors } from './constants/colors';
import { DecisionWizard } from './containers/decision-wizard';

const App: React.FC = () => {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: Colors.primary,
            },
        },
    });

    return (
        <div className='app'>
            <TopHeader title='New Decision' />
            <section className='app-content'>
                <ThemeProvider theme={theme}>
                    <DecisionWizard />
                </ThemeProvider>
            </section>
            <footer className='app-footer'>
                <div>
                    <p>© undoubt.app</p>
                </div>
                <div className='legal-links'></div>
            </footer>
        </div>
    );
};

export default App;
