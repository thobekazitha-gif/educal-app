import { GoogleGenAI, Type } from "@google/genai";
import type { FormState, UnitPlan, StudyGuide } from '../types';
import { MaterialType } from '../types';

// FIX: Initialize the GoogleGenAI client according to the coding guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const unitPlanSchema = {
    type: Type.OBJECT,
    properties: {
        unitTitle: { type: Type.STRING },
        subject: { type: Type.STRING },
        gradeLevel: { type: Type.STRING },
        unitObjectives: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        lessons: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    lessonNumber: { type: Type.INTEGER },
                    lessonTitle: { type: Type.STRING },
                    lessonObjectives: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                    },
                    materials: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                    },
                    procedure: {
                        type: Type.OBJECT,
                        properties: {
                            introduction: { type: Type.STRING },
                            mainActivity: { type: Type.STRING },
                            conclusion: { type: Type.STRING },
                        },
                        required: ['introduction', 'mainActivity', 'conclusion'],
                    },
                    homework: { type: Type.STRING },
                },
                required: ['lessonNumber', 'lessonTitle', 'lessonObjectives', 'materials', 'procedure'],
            },
        },
        unitAssessments: {
            type: Type.OBJECT,
            properties: {
                formative: { type: Type.STRING },
                summative: { type: Type.STRING },
            },
            required: ['formative', 'summative'],
        },
    },
    required: ['unitTitle', 'subject', 'gradeLevel', 'unitObjectives', 'lessons', 'unitAssessments'],
};

const studyGuideSchema = {
    type: Type.OBJECT,
    properties: {
        topic: { type: Type.STRING },
        gradeLevel: { type: Type.STRING },
        capsReference: { type: Type.STRING, description: "Relevant curriculum reference, e.g., CAPS document reference. If not applicable, use 'N/A'." },
        topicOverview: { type: Type.STRING },
        contentBreakdown: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    subTopic: { type: Type.STRING },
                    details: { type: Type.STRING },
                    keyTerms: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                term: { type: Type.STRING },
                                definition: { type: Type.STRING },
                            },
                            required: ['term', 'definition'],
                        },
                    },
                },
                required: ['subTopic', 'details', 'keyTerms'],
            },
        },
        practiceActivities: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    type: { type: Type.STRING, description: "e.g., Multiple Choice, Short Answer, Practical Task" },
                    questions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                answer: { type: Type.STRING },
                            },
                            required: ['question', 'answer'],
                        },
                    },
                },
                required: ['title', 'type', 'questions'],
            },
        },
    },
    required: ['topic', 'gradeLevel', 'capsReference', 'topicOverview', 'contentBreakdown', 'practiceActivities'],
};

const generatePrompt = (formState: FormState): string => {
    const { materialType, topic, gradeLevel, objectives } = formState;
    const objectivesText = objectives ? `Key learning objectives to focus on are: ${objectives}.` : '';

    if (materialType === MaterialType.UnitPlan) {
        return `
            Act as an expert curriculum designer. Generate a comprehensive Unit Plan based on the following details.
            The output MUST be a JSON object that strictly adheres to the provided schema. Do not include any markdown formatting (like \`\`\`json).

            Topic: ${topic}
            Grade Level: ${gradeLevel}
            ${objectivesText}

            The Unit Plan should be detailed, practical for a classroom setting, and engaging for students.
            Ensure the lessons are sequential and build upon each other. Assessments should directly measure the stated objectives.
        `;
    } else { // StudyGuide
        return `
            Act as an expert educator and content creator. Generate a detailed Study Guide for a student based on the following details.
            The output MUST be a JSON object that strictly adheres to the provided schema. Do not include any markdown formatting (like \`\`\`json).

            Topic: ${topic}
            Grade Level: ${gradeLevel}
            ${objectivesText}

            The Study Guide should be clear, concise, and easy for a student to understand and use for self-study.
            Break down complex topics into smaller, manageable sections. Include key terms with definitions and provide practical activities to test understanding.
            For 'capsReference', provide a relevant curriculum reference if applicable (e.g., from South Africa's CAPS curriculum), otherwise state 'N/A'.
        `;
    }
};

export const generateMaterial = async (formState: FormState): Promise<UnitPlan | StudyGuide> => {
    const prompt = generatePrompt(formState);
    const schema = formState.materialType === MaterialType.UnitPlan ? unitPlanSchema : studyGuideSchema;

    try {
        // FIX: Use the 'gemini-2.5-flash' model as per guidelines.
        const model = 'gemini-2.5-flash';
        
        // FIX: Use ai.models.generateContent to call the Gemini API.
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            }
        });

        // FIX: Extract text directly from the response object.
        const jsonText = response.text;
        
        if (!jsonText) {
            throw new Error("API returned an empty response.");
        }
        
        // FIX: Parse the JSON string to get the structured data.
        return JSON.parse(jsonText) as UnitPlan | StudyGuide;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // FIX: Provide a more user-friendly error message.
        throw new Error("Failed to generate educational material. The model may have returned an invalid format. Please try again or refine your search.");
    }
};
