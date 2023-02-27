import { RecipeInstruction } from "@/types/typings";

type Props = {
    instructions: RecipeInstruction[];
};
function InstructionsViewer({ instructions }: Props) {
    return (
        <ol>
            {instructions.map(({ id, description }, index) => (
                <li key={id}>
                    <p className="font-bold">Step {index + 1}</p>
                    <p className="whitespace-pre-line">{description}</p>
                </li>
            ))}
        </ol>
    );
}

export default InstructionsViewer;
