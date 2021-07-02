import { Button } from '@material-ui/core';
import React from 'react';
import { ValidationResult } from '../infrastructure/decision-wizard-validation-engine';

export const DecisionWizardNav: React.FC<{activeStep: number, stepsLength: number, handleBack: () => void, handleNext: () => void, className: string, validationStatus: ValidationResult}> = ({activeStep, stepsLength, handleBack, handleNext, className, validationStatus}) => {
   
    return  <div className={className}>
    <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
    </Button>
    <Button
        variant="contained"
        color="primary"
        disabled={!validationStatus.success}
        onClick={handleNext}
    >
        {activeStep === stepsLength - 1
            ? 'Finish'
            : 'Next'}
    </Button>
</div>;
}