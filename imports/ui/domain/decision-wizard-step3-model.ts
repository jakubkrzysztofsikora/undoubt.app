export interface DecisionWizardStep3Model {
    choicesImpact: {
        choice: string,
        impactPercentage: number,
        credibility: number,
        stakeholder: string,
        value: string
    }[]
}