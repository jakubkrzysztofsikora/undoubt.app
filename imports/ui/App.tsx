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

    const [decisionName, setDecisionName] = React.useState<string>();

    return (
        <div className='app'>
            <TopHeader title={decisionName || 'New Decision'} />
            <section className='app-content'>
                <ThemeProvider theme={theme}>
                    <DecisionWizard onDecisionNameSet={setDecisionName} />
                </ThemeProvider>
            </section>
            <footer className='app-footer'>
                <div>
                    <p>© undoubt.app</p>
                </div>
                <div className='legal-links'>
                    <a href='https://github.com/jakubkrzysztofsikora/undoubt.app' target='_blank'>Code is open-source on MIT licence. Feel free to join and expand the tool</a>
                </div>
            </footer>
        </div>
    );
};

export default App;
