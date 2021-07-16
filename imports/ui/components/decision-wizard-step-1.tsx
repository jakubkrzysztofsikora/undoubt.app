import React from 'react';

import { useStickyState } from '../infrastructure/useStickyState';
import { DecisionWizardStep1Model } from '../domain/decision-wizard-step1-model';
import { UndoubtTextField } from './undoubt-text-field';
import { UndoubtAppendableList } from './undoubt-appendable-list';
import { DecisionWizardStepProps } from '../infrastructure/decision-wizard-step-props';

export const DecisionWizardStep1: React.FC<DecisionWizardStepProps<DecisionWizardStep1Model>> = ({model, onChange}) => {
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
        <UndoubtAppendableList
            label='Enter possible choice'
            currentElements={model.choices}
            elementToBeAdded={possibleChoice}
            onElementAdded={onChoicesChange}
            onElementDeleted={onChoicesDelete}
            onElementToBeAddedChange={setPossibleChoice}
        />
    </div>;
}