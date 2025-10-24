// FIX: Centralized and exported all type definitions to resolve module errors.
export enum MaterialType {
    UnitPlan = 'Unit Plan',
    StudyGuide = 'Study Guide',
}

export interface FormState {
    materialType: MaterialType;
    topic: string;
    gradeLevel: string;
    objectives: string;
}

export interface UnitPlan {
    unitTitle: string;
    subject: string;
    gradeLevel: string;
    unitObjectives: string[];
    lessons: {
        lessonNumber: number;
        lessonTitle: string;
        lessonObjectives: string[];
        materials: string[];
        procedure: {
            introduction: string;
            mainActivity: string;
            conclusion: string;
        };
        homework?: string;
    }[];
    unitAssessments: {
        formative: string;
        summative: string;
    };
}

export interface StudyGuide {
    topic: string;
    gradeLevel: string;
    capsReference: string;
    topicOverview: string;
    contentBreakdown: {
        subTopic: string;
        details: string;
        keyTerms: {
            term: string;
            definition: string;
        }[];
    }[];
    practiceActivities: {
        title: string;
        type: string;
        questions: {
            question: string;
            answer: string;
        }[];
    }[];
}
