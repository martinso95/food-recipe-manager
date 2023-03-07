"use client";

import { RecipeInstruction } from "@/types/typings";

type Props = {
    instructions: RecipeInstruction[];
    onInstructionsChange: (instructions: RecipeInstruction[]) => void;
};

function InstructionsEditor({ instructions, onInstructionsChange }: Props) {
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
            <p className="label mb-1">Instructions</p>
            <ol className="space-y-6">
                {instructions.map(({ id, description }, index) => (
                    <li key={id}>
                        <label htmlFor={id} className="label mb-1 font-light">
                            Step {index + 1}
                        </label>
                        <textarea
                            id={id}
                            name={id}
                            value={description}
                            onChange={handleTextAreaChange}
                            rows={8}
                            className="textarea"
                        />
                    </li>
                ))}
            </ol>
            <button
                type="button"
                onClick={handleAddNewInstruction}
                className="button mt-4"
            >
                Add instructions
            </button>
        </div>
    );
}

export default InstructionsEditor;
