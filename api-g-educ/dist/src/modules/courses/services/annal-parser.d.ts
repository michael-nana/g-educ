type ParsedQuestion = {
    statement: string;
    options: string[];
};
export declare function parseAnnalText(text: string): {
    lessons: {
        title: string;
        text: string;
    }[];
    exercises: {
        title: string;
        text: string;
    }[];
    questions: ParsedQuestion[];
};
export {};
