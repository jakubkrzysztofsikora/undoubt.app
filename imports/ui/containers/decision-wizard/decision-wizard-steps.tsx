import React from 'react';
import { DecisionWizardStep1 } from '../../components/decision-wizard-step-1';
import { DecisionWizardStep2 } from '../../components/decision-wizard-step-2';
import { DecisionWizardStep3 } from '../../components/decision-wizard-step-3';
import { DecisionWizardStep1Model } from '../../domain/decision-wizard-step1-model';
import { DecisionWizardStep2Model } from '../../domain/decision-wizard-step2-model';
import { DecisionWizardStep3Model } from '../../domain/decision-wizard-step3-model';
import { useStickyState } from '../../infrastructure/useStickyState';

export interface DecisionWizardStep {
    title: string,
    model: any,
    order: number,
    content?: JSX.Element,
}

export interface DecisionWizardStepCollection {
    [key: number]: DecisionWizardStep
}

const initialStep1Model: DecisionWizardStep1Model = { decisionName: '', choices: [] };
const initialStep2Model: DecisionWizardStep2Model = { stakeholders: [], values: [] };
const initialStep3Model: DecisionWizardStep3Model = { choicesImpact: []};

const Steps: DecisionWizardStepCollection = {
    0: {
        title: 'What should we decide?',
        order: 0,
        model: initialStep1Model
    },
    1: {
        title: 'Who is the stakeholder of that decision?',
        order: 1,
        model: initialStep2Model
    },
    2: {
        title: 'Impact of the decision?',
        order: 2,
        model: initialStep3Model
    },
    3: {
        title: 'Decision made!',
        order: 3,
        model: null
    },
}

const getStepContent = (step: DecisionWizardStep, onStepChange: (newModel: any, stepNumber: number) => void, getModelValue: (stepNumber: number, propertyPredicate: (model: any) => any) => any) => {
    switch (step.order) {
        case 0:
            return <div><DecisionWizardStep1 model={step.model} onChange={(newModel) => onStepChange(newModel, step.order)} /></div>;
        case 1:
            return <div><DecisionWizardStep2 model={step.model} onChange={(newModel) => onStepChange(newModel, step.order)} /></div>;
        case 2:
            const stakeholderValues = getModelValue(1, x => x.values);
            const choices = getModelValue(0, x => x.choices);
            return <div><DecisionWizardStep3 model={step.model} onChange={(newModel) => onStepChange(newModel, step.order)} stakeholderValues={stakeholderValues} choices={choices} /></div>;
        case 3:
            return <div></div>;
        default:
            throw new Error();
    }
}

export const useDecisionWizardSteps = () => {
    const [steps, setSteps] = useStickyState<DecisionWizardStep[]>(Object
            .values(Steps), 'decision_wizard_steps');
    const onStepChange = React.useCallback((newModel: any, stepOrder: number) => {
        setSteps((previous: DecisionWizardStep[]) => [...previous.filter(x => x.order !== stepOrder), {...previous.find(x => x.order === stepOrder), model: newModel}]);
    }, []);
    const stepsOutput = React.useMemo(() => steps.map((step) => ({
        ...step,
        content: getStepContent(step, onStepChange, (stepNumber, predicate) => predicate(steps.find(x => x.order === stepNumber)?.model))
    })).sort((a, b) => a.order - b.order), [steps, onStepChange]);

    return stepsOutput;
};