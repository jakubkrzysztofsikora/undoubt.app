import React from 'react';
import { DecisionWizardStep1 } from '../components/decision-wizard-step-1';
import { DecisionWizardStep1Model } from '../domain/decision-wizard-step1-model';
import { useStickyState } from '../infrastructure/useStickyState';

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

const Steps: DecisionWizardStepCollection = {
    0: {
        title: 'What should we decide?',
        order: 0,
        model: initialStep1Model
    },
    1: {
        title: 'Who is the stakeholder of that decision?',
        order: 1,
        model: null
    },
    2: {
        title: 'Impact of the decision?',
        order: 2,
        model: null
    },
    3: {
        title: 'Decision made!',
        order: 3,
        model: null
    },
}

const getStepContent = (step: DecisionWizardStep, onStepChange: (newModel: any, stepNumber: number) => void) => {
    switch (step.order) {
        case 0:
            return <div><DecisionWizardStep1 model={step.model} onChange={(newModel) => onStepChange(newModel, step.order)} /></div>;
        case 1:
            return <div></div>;
        case 2:
            return <div></div>;
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
        content: getStepContent(step, onStepChange)
    })).sort((a, b) => a.order - b.order), [steps, onStepChange]);

    return stepsOutput;
};