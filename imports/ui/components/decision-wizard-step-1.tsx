import React from 'react';

import { useStickyState } from '../infrastructure/useStickyState';
import { DecisionWizardStep1Model } from '../domain/decision-wizard-step1-model';
import { UndoubtSimpleList } from './undoubt-simple-list';
import { UndoubtTextField } from './undoubt-text-field';

export const DecisionWizardStep1: React.FC<{model: DecisionWizardStep1Model, onChange: (newModelValue: DecisionWizardStep1Model) => void}> = ({model, onChange}) => {
    const [possibleChoice, setPossibleChoice] = useStickyState('', 'decision_wizard_1_possible_choice');
    const onDecisionNameChange = React.useCallback((value: string) => {
        onChange({...model, decisionName: value});
    }, [model]);
    const onChoicesChange = React.useCallback((value: string) => {
        onChange({...model, choices: [value, ...model.choices]});
        setPossibleChoice('');
    }, [model]);
    const onChoicesDelete = React.useCallback((value: string) => {
        onChange({...model, choices: model.choices.filter(x => x !== value)});
    }, [model]);

    return <div>
        <UndoubtTextField label='Decision name' value={model.decisionName} onChange={onDecisionNameChange} required />
        <UndoubtTextField label='Enter possible choice' value={possibleChoice} onChange={setPossibleChoice} onEnter={onChoicesChange} />
        <UndoubtSimpleList elements={model.choices} onDelete={onChoicesDelete} />
    </div>;
}