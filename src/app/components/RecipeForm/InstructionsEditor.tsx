"use client";

import { RecipeInstruction } from "@/types/typings";

type Props = {
    instructions: RecipeInstruction[];
    onInstructionsChange: (instructions: RecipeInstruction[]) => void;
    hasFormError: boolean;
};

function InstructionsEditor({
    instructions,
    onInstructionsChange,
    hasFormError,
}: Props) {
    const handleTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const currentInput = e.target.name;
        const newInstructions = instructions.reduce(
            (result: RecipeInstruction[], current) => {
                if (currentInput === current.id) {
                    return [
                        ...result,
                        { ...current, description: e.target.value },
                    ];
                } else {
                    return [...result, current];
                }
            },
            []
        );

        onInstructionsChange(newInstructions);
    };

    const handleAddNewInstruction = () => {
        const id = crypto.randomUUID();
        onInstructionsChange([...instructions, { id: id, description: "" }]);
    };

    return (
        <div className={"flex flex-col"}>
            <p className="label mb-1">
                Instructions
                <span className="ml-1 text-red-500">*</span>
            </p>
            <ol className="space-y-6">
                {instructions.map(({ id, description }, index) => (
                    <li key={id}>
                        <label htmlFor={id} className="label mb-1 font-light">
                            Step {index + 1}
                        </label>
                        <textarea
                            id={id}
                            name={id}
                            maxLength={1000}
                            value={description}
                            onChange={handleTextAreaChange}
                            rows={8}
                            className="textarea"
                        />
                    </li>
                ))}
            </ol>
            {hasFormError ? (
                <p className="text-sm text-red-500 font-semibold">
                    Please add instructions.
                </p>
            ) : (
                <div className="h-5 w-full" />
            )}
            <button
                type="button"
                onClick={handleAddNewInstruction}
                className="primary-button mt-2"
            >
                Add instructions
            </button>
        </div>
    );
}

export default InstructionsEditor;
