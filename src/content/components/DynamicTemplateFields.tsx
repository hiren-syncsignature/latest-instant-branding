import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { updateCustomField } from "../../store/editorSlice";
import TextEditor from "./TextEditor";

// Interface for template configuration
interface TemplateConfig {
  id: string;
  name: string;
  fields: Array<{
    id: string;
    type: "title" | "subtitle" | "description" | "cta" | "custom";
    label: string;
    placeholder?: string;
    required?: boolean;
    defaultValue?: string;
  }>;
}

// Template configurations
const templateConfigurations: TemplateConfig[] = [
  {
    id: "professional-1",
    name: "Professional Profile",
    fields: [
      {
        id: "title",
        type: "title",
        label: "Title",
        placeholder: "Enter your professional title",
        required: true,
        defaultValue: "Professional Title",
      },
      {
        id: "description",
        type: "description",
        label: "Description",
        placeholder: "Add a brief professional description",
        required: true,
        defaultValue:
          "Add your professional description here. Keep it concise and impactful.",
      },
      {
        id: "cta",
        type: "cta",
        label: "Call to Action",
        placeholder: "Enter your call to action",
        defaultValue: "Learn More",
      },
    ],
  },
  {
    id: "minimal-1",
    name: "Minimal",
    fields: [
      {
        id: "title",
        type: "title",
        label: "Title",
        placeholder: "Enter your title",
        required: true,
        defaultValue: "Minimal Style",
      },
      {
        id: "cta",
        type: "cta",
        label: "Call to Action",
        placeholder: "Enter your call to action",
        defaultValue: "Discover",
      },
    ],
  },
  {
    id: "creative-1",
    name: "Creative Portfolio",
    fields: [
      {
        id: "title",
        type: "title",
        label: "Title",
        placeholder: "Enter your creative title",
        required: true,
        defaultValue: "Creative Solutions",
      },
      {
        id: "subtitle",
        type: "subtitle",
        label: "Tagline",
        placeholder: "Add a catchy tagline",
        required: true,
        defaultValue: "Design • Development • Strategy",
      },
      {
        id: "description",
        type: "description",
        label: "Description",
        placeholder: "Describe your creative services",
        defaultValue: "Innovative ideas deserve beautiful presentation.",
      },
      {
        id: "cta",
        type: "cta",
        label: "Call to Action",
        placeholder: "Enter your call to action",
        defaultValue: "Let's Create",
      },
    ],
  },
  {
    id: "corporate-1",
    name: "Corporate",
    fields: [
      {
        id: "title",
        type: "title",
        label: "Company Name",
        placeholder: "Enter your company name",
        required: true,
        defaultValue: "Corporate Excellence",
      },
      {
        id: "subtitle",
        type: "subtitle",
        label: "Industry",
        placeholder: "Enter your industry or sector",
        defaultValue: "Business Solutions",
      },
      {
        id: "description",
        type: "description",
        label: "Value Proposition",
        placeholder: "Enter your value proposition",
        defaultValue: "Professional solutions for business growth and success.",
      },
      {
        id: "cta",
        type: "cta",
        label: "Call to Action",
        placeholder: "Enter your call to action",
        defaultValue: "Contact Us",
      },
    ],
  },
];

interface DynamicTemplateFieldsProps {
  templateId?: string;
}

const DynamicTemplateFields: React.FC<DynamicTemplateFieldsProps> = ({
  templateId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeTemplate = useSelector(
    (state: RootState) => state.editor.activeTemplate
  );
  const customFields = useSelector(
    (state: RootState) => state.editor.customFields
  );

  // Use either the passed templateId or the activeTemplate from Redux
  const currentTemplateId = templateId || activeTemplate;

  // Find the template configuration
  const templateConfig = currentTemplateId
    ? templateConfigurations.find((t) => t.id === currentTemplateId)
    : null;

  // If no template is active, find the configuration for standard fields
  const standardConfig = templateConfigurations.find(
    (t) => t.id === "professional-1"
  );

  // The fields to display are either from the active template or the standard template
  const fieldsToDisplay = templateConfig
    ? templateConfig.fields
    : standardConfig?.fields || [];

  // Update custom field value
  const handleFieldUpdate = (fieldId: string, value: string) => {
    dispatch(updateCustomField({ id: fieldId, value }));
  };

  // Map template fields to appropriate editor components
  const renderFields = () => {
    return fieldsToDisplay.map((field) => {
      // Find the custom field in the state, if it exists
      const customField = customFields.find((cf) => cf.id === field.id);

      // Get the value from either the custom field or the standard field
      let valueSelector, actionCreator;

      switch (field.type) {
        case "title":
          valueSelector = (state: RootState) => state.editor.title;
          actionCreator = (value: string) => ({
            type: "editor/setTitle",
            payload: value,
          });
          break;
        case "description":
          valueSelector = (state: RootState) => state.editor.otherContent;
          actionCreator = (value: string) => ({
            type: "editor/setOtherContent",
            payload: value,
          });
          break;
        case "cta":
          valueSelector = (state: RootState) => state.editor.ctaWebsite;
          actionCreator = (value: string) => ({
            type: "editor/setCtaWebsite",
            payload: value,
          });
          break;
        default:
          // For custom fields, use custom selectors and actions
          valueSelector = (state: RootState) => {
            const foundField = state.editor.customFields.find(
              (f) => f.id === field.id
            );
            return foundField ? foundField.value : "";
          };
          actionCreator = (value: string) => ({
            type: "editor/updateCustomField",
            payload: { id: field.id, value },
          });
      }

      // Get template suggestions for each field type
      const getTemplateSuggestions = (fieldType: string) => {
        switch (fieldType) {
          case "title":
            return [
              "Professional Title",
              "Creative Solutions",
              "Innovation Hub",
              "Your Brand Name",
              "Expert Services",
            ];
          case "subtitle":
            return [
              "Design • Development • Strategy",
              "Est. 2022",
              "Your Tagline Here",
              "Premium Services",
            ];
          case "description":
            return [
              "Add your professional description here. Keep it concise and impactful.",
              "Highlight your key achievements and expertise in your field.",
              "Share your mission statement and what drives your passion.",
              "Tell your story and what makes your brand unique.",
            ];
          case "cta":
            return [
              "Learn More",
              "Get Started",
              "Contact Us",
              "Visit Website",
              "Book a Demo",
            ];
          default:
            return [];
        }
      };

      // Determine if this field should be a single line input
      const isSingleLine =
        field.type === "title" ||
        field.type === "subtitle" ||
        field.type === "cta";

      return (
        <div key={field.id} className="mb-3">
          <TextEditor
            id={`field-${field.id}`}
            label={field.label}
            valueSelector={valueSelector}
            actionCreator={actionCreator}
            isSingleLine={isSingleLine}
            rows={field.type === "description" ? 3 : undefined}
            placeholder={field.placeholder}
            templateOptions={getTemplateSuggestions(field.type)}
          />
        </div>
      );
    });
  };

  return <div className="space-y-3">{renderFields()}</div>;
};

export default DynamicTemplateFields;
