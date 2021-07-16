import { DecisionWizardStep1Model } from "./decision-wizard-step1-model";
import { DecisionWizardStep2Model } from "./decision-wizard-step2-model";
import { DecisionWizardStep3Model } from "./decision-wizard-step3-model";

export interface DecisionWizardModel {
    step1: DecisionWizardStep1Model,
    step2: DecisionWizardStep2Model,
    step3: DecisionWizardStep3Model
}