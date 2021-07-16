import { Paper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { ietCredibility } from '../constants/iet-credibility';
import { DecisionWizardStep3Model } from '../domain/decision-wizard-step3-model';
import { DecisionWizardStepProps } from '../infrastructure/decision-wizard-step-props';

export const DecisionWizardStep3: React.FC<DecisionWizardStepProps<DecisionWizardStep3Model> & { stakeholderValues: { stakeholder: string, value: string }[], choices: string[]}> = ({model, onChange, stakeholderValues, choices}) => {
    const [c, setC] = React.useState(0);
    const marks = ietCredibility;

    return <div>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Decision</TableCell>
                        <TableCell align="right">Stakeholder</TableCell>
                        <TableCell align="right">Value</TableCell>
                        <TableCell align="right">Impact</TableCell>
                        <TableCell align="right">Credibility</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {choices.map(choice => stakeholderValues.sort().map((stakeholderValue) => (
                    <TableRow key={`${stakeholderValue.stakeholder}${stakeholderValue.value}`}>
                    <TableCell component="th" scope="row">
                        {choice}
                    </TableCell>
                    <TableCell align="right">{stakeholderValue.stakeholder}</TableCell>
                    <TableCell align="right">{stakeholderValue.value}</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    </TableRow>
                )))}
                </TableBody>
            </Table>
        </TableContainer>
        
        
        {/* <Slider
    defaultValue={c}
    aria-labelledby="discrete-slider-custom"
    value={c}
    onChange={(e, value) => setC(value as number)}
    valueLabelFormat={(value, index) => marks[index].label}
    step={10}
    valueLabelDisplay="auto"
    marks={marks}
  /> */}</div>
}