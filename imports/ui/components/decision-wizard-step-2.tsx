import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BeenhereIcon from '@material-ui/icons/Beenhere';

import { DecisionWizardStep2Model } from '../domain/decision-wizard-step2-model';
import { useStickyState } from '../infrastructure/useStickyState';
import { UndoubtAppendableList } from './undoubt-appendable-list';
import { DecisionWizardStepProps } from '../infrastructure/decision-wizard-step-props';

export const DecisionWizardStep2: React.FC<DecisionWizardStepProps<DecisionWizardStep2Model>> = ({ model, onChange }) => {
    const [possibleStakeholder, setPossibleStakeholder] = useStickyState('', 'decision_wizard_2_possible_stakeholder');
    const [possibleValue, setPossibleValue] = useStickyState({ stakeholder: '', value: '' }, 'decision_wizard_2_possible_value');
    const [expandedAccordionForStakeholder, setExpandedAccordionForStakeholder] = useStickyState('', 'decision_wizard_2_expanded_accordion');

    const onStakeholdersChange = React.useCallback((value: string) => {
        onChange({ ...model, stakeholders: [value, ...model.stakeholders] });
        setPossibleStakeholder('');
    }, [model]);

    const onStakeholdersDelete = React.useCallback((value: string) => {
        onChange({ ...model, stakeholders: model.stakeholders.filter(x => x !== value), values: model.values.filter(x => x.stakeholder !== value) });
    }, [model]);

    const onValuesChange = React.useCallback((stakeholder: string, value: string) => {
        onChange({ ...model, values: [...model.values, { stakeholder, value }] });
        setPossibleValue('');
    }, [model]);

    const onValuesDelete = React.useCallback((stakeholder: string, value: string) => {
        onChange({ ...model, values: model.values.filter(x => x.stakeholder !== stakeholder && x.value !== value) });
    }, [model]);

    const toggleStakeholderAccordion = React.useCallback((stakeholder: string, expanded: boolean) => {
        if (expanded) {
            setExpandedAccordionForStakeholder(stakeholder);
        }
        else {
            setExpandedAccordionForStakeholder('');
        }
    }, [expandedAccordionForStakeholder])

    return <div>
        <UndoubtAppendableList
            label='Enter stakeholder'
            currentElements={model.stakeholders}
            elementToBeAdded={possibleStakeholder}
            onElementAdded={onStakeholdersChange}
            onElementDeleted={onStakeholdersDelete}
            onElementToBeAddedChange={setPossibleStakeholder}
            customListElementRender={(stakeholder => <Accordion expanded={expandedAccordionForStakeholder === stakeholder} onChange={(e, expanded) => toggleStakeholderAccordion(stakeholder, expanded)} key={stakeholder}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{stakeholder}</Typography>
                    {
                        model.values.filter(x => x.stakeholder === stakeholder).length === 0
                            ? <Typography>
                                Enter values important for {stakeholder} in context of the decison
                            </Typography>
                            : <BeenhereIcon />
                    }
                </AccordionSummary>
                <AccordionDetails>
                    <UndoubtAppendableList
                        label={`Enter value important for ${stakeholder}`}
                        currentElements={model.values.filter(x => x.stakeholder === stakeholder).map(x => x.value)}
                        elementToBeAdded={possibleValue.value}
                        onElementAdded={(value) => onValuesChange(stakeholder, value)}
                        onElementDeleted={(value) => onValuesDelete(stakeholder, value)}
                        onElementToBeAddedChange={(value) => setPossibleValue({ stakeholder, value })}
                    />
                </AccordionDetails>
            </Accordion>)}
        />
    </div>
}