import React from "react";

import { DecisionWizardModel } from "../domain/decision-wizard-model";

export enum ValidationRuleType {
    RequiredField
}

export interface DecisionWizardValidationRule {
    type: ValidationRuleType,
    field: (model: DecisionWizardModel) => any,
    step: number
}

export interface ValidationResult {
    success: boolean,
    step: number,
    cause?: ValidationRuleType,
}

export interface DecisionWizardValidationHook {
    validationStatus: (step: number) => { success: boolean, step: number }
}

export const useDecisionWizardValidation = (model: DecisionWizardModel, rules: DecisionWizardValidationRule[]) => {
    const [validationResults, setValidationResults] = React.useState<ValidationResult[]>([]);

    React.useEffect(() => {
        setValidationResults([]);

        for (const rule of rules) {
            const fieldValue = rule.field(model);
            switch (rule.type) {
                case ValidationRuleType.RequiredField:
                    setValidationResults(current => [...current, {
                        success: (fieldValue || fieldValue === 0) &&
                            fieldValue !== '' &&
                            (fieldValue as [])?.length > 0,
                        cause: rule.type,
                        step: rule.step
                    }]);
                    break;
                default:
                    break;
            }
        }
    }, [model, rules]);

    return {
        validationStatus: (step: number) => validationResults.filter(x => x.step === step).reduce((accu, current) => ({
            success: accu.success && current.success,
            step: step
        }), {
            success: true,
            step: step
        } as ValidationResult)
    } as DecisionWizardValidationHook;
}