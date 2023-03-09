import { RecipeInstruction } from "@/types/typings";

type Props = {
    instructions: RecipeInstruction[];
};
function InstructionsViewer({ instructions }: Props) {
    return (
        <ol className="space-y-6">
            {instructions.map(({ id, description }, index) => (
                <li key={id}>
                    <p className="label mb-1 font-light">Step {index + 1}</p>
                    <p className="textarea-view">{description}</p>
                </li>
            ))}
        </ol>
    );
}

export default InstructionsViewer;
