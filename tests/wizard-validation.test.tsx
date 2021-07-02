import { render } from '@testing-library/react';
import React from 'react';

import { DecisionWizardModel } from '../imports/ui/domain/decision-wizard-model';
import { DecisionWizardValidationHook, DecisionWizardValidationRule, useDecisionWizardValidation, ValidationRuleType } from '../imports/ui/infrastructure/decision-wizard-validation-engine';

describe('wizard validation engine',  () => {
    const setup = (model: DecisionWizardModel, rules: DecisionWizardValidationRule[]) => {
        const validationEngine: DecisionWizardValidationHook = {
            validationStatus: (step) => { throw new Error(); }
        };
        const TestComponent: React.FC = () => {
            Object.assign(validationEngine, useDecisionWizardValidation(model, rules));
            return null;
        };
        
        render(<TestComponent />);
        return validationEngine;
    };

    it('throws validation error if decision has no name', () => {
        //Given
        const step: number = 0;
        const model: DecisionWizardModel = {
            step1: {
                decisionName: undefined as any,
                choices: ['Test']
            }
        };

        //When
        const validationEngine = setup(model, [
            {
                type: ValidationRuleType.RequiredField,
                field: model => model.step1.decisionName,
                step: step
            }
        ]);
        const result = validationEngine?.validationStatus(step);

        //Then
        expect(result.success).toBe(false);
    });

    it('does not throw validation error if decision has a name', () => {
        //Given
        const step: number = 0;
        const model: DecisionWizardModel = {
            step1: {
                decisionName: 'name',
                choices: ['Test']
            }
        };

        //When
        const validationEngine = setup(model, [
            {
                type: ValidationRuleType.RequiredField,
                field: model => model.step1.decisionName,
                step: step
            }
        ]);
        const result = validationEngine?.validationStatus(step);

        //Then
        expect(result.success).toBe(true);
    });

    it('throws validation error if no choices have been added', () => {
        //Given
        const step: number = 0;
        const model: DecisionWizardModel = {
            step1: {
                decisionName: undefined as any,
                choices: []
            }
        };

        //When
        const validationEngine = setup(model, [
            {
                type: ValidationRuleType.RequiredField,
                field: model => model.step1.choices,
                step: step
            }
        ]);
        const result = validationEngine?.validationStatus(step);

        //Then
        expect(result.success).toBe(false);
    });

    it('does not throw validation error if at least one choice has been added', () => {
        //Given
        const step: number = 0;
        const model: DecisionWizardModel = {
            step1: {
                decisionName: 'name',
                choices: ['Test']
            }
        };

        //When
        const validationEngine = setup(model, [
            {
                type: ValidationRuleType.RequiredField,
                field: model => model.step1.choices,
                step: step
            }
        ]);
        const result = validationEngine?.validationStatus(step);

        //Then
        expect(result.success).toBe(true);
    });
});