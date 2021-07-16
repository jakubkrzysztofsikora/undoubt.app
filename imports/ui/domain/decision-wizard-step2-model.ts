export interface DecisionWizardStep2Model {
    stakeholders: string[],
    values: {
        stakeholder: string,
        value: string
    }[]
}