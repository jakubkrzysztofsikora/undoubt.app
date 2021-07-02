import { Step,
    StepIconProps,
    StepLabel,
    Stepper }
    from "@material-ui/core";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from "react";
import clsx from "clsx";

import { useStickyState } from "../infrastructure/useStickyState";
import { ColorlibConnector, useColorlibStepIconStyles, useStyles } from "./decision-wizard.styles";
import { DecisionWizardNav } from "../components/decision-wizard-nav";
import { useDecisionWizardSteps } from "./decision-wizard-steps";
import { useDecisionWizardValidation, ValidationRuleType } from "../infrastructure/decision-wizard-validation-engine";
import { DecisionWizardStep1Model } from "../domain/decision-wizard-step1-model";
import { DecisionWizardModel } from "../domain/decision-wizard-model";

const ColorlibStepIcon = (props: StepIconProps) => {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <HelpOutlineIcon />,
        2: <SupervisorAccountIcon />,
        3: <TouchAppIcon />,
        4: <CheckCircleIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}



export const DecisionWizard = () => {
    const [activeStep, setActiveStep] = useStickyState(0, 'activeStep');
    const classes = useStyles();
    const steps = useDecisionWizardSteps();
    const validationRules = React.useMemo(() => [
        {
            type: ValidationRuleType.RequiredField,
            field: (model: DecisionWizardModel) => model.step1.decisionName,
            step: 0
        },
        {
            type: ValidationRuleType.RequiredField,
            field: (model: DecisionWizardModel) => model.step1.choices,
            step: 0
        }
    ], []);
    const wizardModel = React.useMemo(() => ({
        step1: steps.find(x => x.order === 0)?.model,
    }), [steps]);
    const validationEngine = useDecisionWizardValidation(wizardModel, validationRules); 

    const handleNext = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    };

    return <div className={classes.wizard}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
            {steps.map((step) => (
                <Step key={step.title}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{step.title}</StepLabel>
                </Step>
            ))}
        </Stepper>
        <div className={classes.stepContent}>
            <div className={classes.instructions}>
                {steps[activeStep].content}
            </div>
            <DecisionWizardNav
                className={classes.nav}
                activeStep={activeStep}
                stepsLength={steps.length}
                handleBack={handleBack}
                handleNext={handleNext}
                validationStatus={validationEngine.validationStatus(activeStep)}
            />
        </div>
    </div>;
}