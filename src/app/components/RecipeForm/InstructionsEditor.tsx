"use client";

import { RecipeInstruction } from "@/types/typings";

type Props = {
    className?: string;
    instructions: RecipeInstruction[];
    onInstructionsChange: (instructions: RecipeInstruction[]) => void;
};

function InstructionsEditor({
    className,
    instructions,
    onInstructionsChange,
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
        <div className={`${className} flex flex-col`}>
            <p>Instructions:</p>
            <ol>
                {instructions.map(({ id, description }, index) => (
                    <li key={id}>
                        <p>Step {index + 1}</p>
                        <textarea
                            name={id}
                            value={description}
                            onChange={handleTextAreaChange}
                            rows={8}
                            className="border-2 w-full resize-none"
                        />
                    </li>
                ))}
            </ol>
            <button
                type="button"
                onClick={handleAddNewInstruction}
                className="border-2 w-fit px-5"
            >
                Add new instruction
            </button>
        </div>
    );
}

export default InstructionsEditor;
